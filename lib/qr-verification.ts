import { Pool } from "pg";

export type VerificationStatus = "fresh" | "repeat" | "invalid";

export type VerificationResult = {
  status: VerificationStatus;
  sizeLabel: string;
  encryptedId: string;
  scanCount: number;
  url?: string | null;
  tableName?: string;
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

function normalizeSize(rawSize: string) {
  const digitsOnly = rawSize.replace(/[^\d]/g, "");
  return digitsOnly.length ? digitsOnly : null;
}

async function tableExists(tableName: string) {
  const res = await pool.query(
    "SELECT to_regclass($1)::text AS name",
    [tableName],
  );
  return Boolean(res.rows[0]?.name);
}

async function ensureScanColumn(tableName: string) {
  await pool.query(
    `ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS scan_count INTEGER NOT NULL DEFAULT 0`,
  );
}

export async function verifyCable(
  size: string,
  encryptedId: string,
): Promise<VerificationResult> {
  const sizeLabel = size.replace(/-/g, " ");
  const normalizedSize = normalizeSize(size);

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      status: "invalid",
      sizeLabel,
      encryptedId,
      scanCount: 0,
    };
  }

  if (!normalizedSize) {
    return {
      status: "invalid",
      sizeLabel,
      encryptedId,
      scanCount: 0,
    };
  }

  const tableName = `qr_codes${normalizedSize}`;
  if (!(await tableExists(tableName))) {
    return {
      status: "invalid",
      sizeLabel,
      encryptedId,
      scanCount: 0,
    };
  }

  await ensureScanColumn(tableName);

  const result = await pool.query(
    `WITH updated AS (
       UPDATE ${tableName}
       SET scan_count = COALESCE(scan_count, 0) + 1
       WHERE encrypted_id = $1
       RETURNING id, encrypted_id, url, scan_count
     )
     SELECT id, encrypted_id, url, scan_count, scan_count - 1 AS prev_scan_count
     FROM updated`,
    [encryptedId],
  );

  const row = result.rows[0];

  if (!row) {
    return {
      status: "invalid",
      sizeLabel,
      encryptedId,
      scanCount: 0,
      tableName,
    };
  }

  const previousScans = Number(row.prev_scan_count ?? 0);

  return {
    status: previousScans === 0 ? "fresh" : "repeat",
    sizeLabel,
    encryptedId,
    scanCount: previousScans,
    url: row.url,
    tableName,
  };
}
