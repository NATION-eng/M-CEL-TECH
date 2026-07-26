import { Users, GitBranch, TrendingUp } from "lucide-react";

/**
 * Abstract composition representing collaboration and digital
 * transformation: connected nodes rising into a growth curve.
 */
export function AboutVisual() {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brand-slate/8 bg-gradient-to-br from-brand-mist to-white shadow-card"
      role="img"
      aria-label="Illustration representing collaboration between teams and digital transformation"
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
        <defs>
          <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#0A1128" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      <svg viewBox="0 0 480 360" className="h-full w-full">
        <path
          d="M40 300 C 140 300, 160 190, 240 190 C 320 190, 340 90, 440 70"
          fill="none"
          stroke="#3D63F0"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
        />
        <line x1="90" y1="150" x2="180" y2="200" stroke="#3D63F0" strokeWidth="1.5" opacity="0.3" />
        <line x1="180" y1="200" x2="290" y2="140" stroke="#3D63F0" strokeWidth="1.5" opacity="0.3" />
        <line x1="290" y1="140" x2="380" y2="190" stroke="#22D3EE" strokeWidth="1.5" opacity="0.4" />
      </svg>

      <div className="absolute left-[14%] top-[38%] flex h-14 w-14 items-center justify-center rounded-xl border border-white bg-white text-brand-blue-600 shadow-card">
        <Users className="h-6 w-6" />
      </div>
      <div className="absolute left-[52%] top-[32%] flex h-14 w-14 items-center justify-center rounded-xl border border-white bg-brand-navy text-brand-cyan shadow-card">
        <GitBranch className="h-6 w-6" />
      </div>
      <div className="absolute left-[74%] top-[46%] flex h-16 w-16 items-center justify-center rounded-xl border border-white bg-brand-blue-500 text-white shadow-card-hover">
        <TrendingUp className="h-7 w-7" />
      </div>
    </div>
  );
}
