type Phase = "wax" | "half1" | "full" | "half2" | "wane";

const PHASE_PATHS: Record<Exclude<Phase, "full">, string> = {
  wax: "M14 2A12 12 0 0 1 14 26A6 12 0 0 0 14 2Z",
  half1: "M14 2A12 12 0 0 1 14 26Z",
  half2: "M14 2A12 12 0 0 0 14 26Z",
  wane: "M14 2A12 12 0 0 0 14 26A6 12 0 0 1 14 2Z",
};

export function Moon({ phase, className = "" }: { phase: Phase; className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      {phase === "full" ? (
        <circle cx="14" cy="14" r="12" fill="currentColor" />
      ) : (
        <>
          <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <path d={PHASE_PATHS[phase]} fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export function MoonPhases({ className = "", size = "size-8" }: { className?: string; size?: string }) {
  const phases: Phase[] = ["wax", "half1", "full", "half2", "wane"];
  return (
    <div className={`flex items-center gap-[0.5em] ${className}`}>
      {phases.map((p) => (
        <Moon key={p} phase={p} className={size} />
      ))}
    </div>
  );
}

/** Constelaciones finas de fondo, como en las láminas de marca. */
export function Constellations({ className = "" }: { className?: string }) {
  const stars: [number, number, number][] = [
    [120, 640, 2.5], [210, 590, 3], [260, 660, 2], [360, 620, 2.5], [420, 700, 2], [230, 520, 2],
    [1180, 110, 2], [1250, 160, 3], [1330, 140, 2], [1370, 210, 2.5], [1270, 240, 2], [1350, 290, 2.5],
  ];
  return (
    <svg
      viewBox="0 0 1440 880"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <path
        d="M120 640 L210 590 L260 660 L360 620 L420 700 M210 590 L230 520 M1180 110 L1250 160 L1330 140 L1370 210 M1250 160 L1270 240 L1350 290"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      {stars.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="currentColor" />
      ))}
    </svg>
  );
}

export function ArrowRight({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeft({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
