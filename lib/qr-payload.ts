export type ParsedCode = { size: string; encryptedId: string };

// Accept printed label URLs and manual codes without following an untrusted URL.
export function parseQrPayload(
  raw: string,
  selectedSize?: string,
): ParsedCode | null {
  const value = raw.trim();
  if (!value || value.length > 4096) return null;
  const valid = (size: string, id: string): ParsedCode | null => {
    if (!/^\d{1,4}(?:\.\d{1,2})?(?:\s*mm(?:²|2))?$/i.test(size)) return null;
    if (!id.trim() || id.length > 2048 || /[\s\u0000-\u001f]/.test(id))
      return null;
    return { size: size.replace(/\s*mm(?:²|2)$/i, ""), encryptedId: id };
  };
  const path = (pathname: string) => {
    const parts = pathname.split(/[\/\\]/).filter(Boolean);
    const index = parts.findIndex((p) => p.toLowerCase() === "authorized");
    if (index < 0 || parts.length !== index + 3) return null;
    try {
      return valid(
        decodeURIComponent(parts[index + 1]),
        decodeURIComponent(parts[index + 2]),
      );
    } catch {
      return null;
    }
  };
  if (/^authorized:/i.test(value))
    return path(value.replace(/^authorized:/i, "authorized/"));
  try {
    const url = new URL(value);
    const found = path(url.pathname);
    if (found) return found;
    const size =
      url.searchParams.get("size") ??
      url.searchParams.get("s") ??
      url.searchParams.get("gauge");
    const id =
      url.searchParams.get("id") ??
      url.searchParams.get("code") ??
      url.searchParams.get("encryptedId") ??
      url.searchParams.get("qr");
    return size && id ? valid(size, id) : null;
  } catch {
    /* A pasted path or printed code does not need to be a URL. */
  }
  const found = path(value.replace(/^authorized:/i, "authorized/"));
  if (found) return found;
  // Reject a malformed label path instead of treating the whole URL as an ID.
  if (/authorized[/:\\]|:\/\//i.test(value)) return null;
  const pair = value.match(/^(\d{1,4}(?:\.\d{1,2})?)\s*[,;|\s]\s*(\S+)$/);
  if (pair) return valid(pair[1], pair[2]);
  return selectedSize ? valid(selectedSize, value) : null;
}

export function verificationPath(code: ParsedCode) {
  return `/authorized/${encodeURIComponent(code.size)}/${encodeURIComponent(code.encryptedId)}`;
}
