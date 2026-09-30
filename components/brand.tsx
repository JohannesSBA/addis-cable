export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 35 20 8h5l15 27M12 35 23 15l11 20M18 35l5-9 5 9"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
      />
      <path d="M9 29h28" stroke="currentColor" strokeWidth="3.2" />
    </svg>
  );
}
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Addis Cable home">
      <BrandMark />
      <span>
        ADDIS<span className="brand-second">CABLE</span>
      </span>
    </a>
  );
}
