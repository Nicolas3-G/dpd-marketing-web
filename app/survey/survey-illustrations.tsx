type IllustrationProps = {
  className?: string;
};

export function StepOneIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="48" y="28" width="104" height="72" rx="6" fill="currentColor" opacity="0.15" />
      <rect x="56" y="36" width="88" height="52" rx="4" fill="currentColor" opacity="0.25" />
      <path
        d="M68 52h48M68 62h36M68 72h42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M72 48l6 6 12-14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <rect x="132" y="88" width="28" height="8" rx="2" fill="currentColor" opacity="0.5" />
      <path
        d="M140 96v20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <ellipse cx="140" cy="118" rx="14" ry="5" fill="currentColor" opacity="0.2" />
      <rect x="36" y="88" width="22" height="28" rx="3" fill="currentColor" opacity="0.35" />
      <path
        d="M42 96h10M42 104h8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function StepTwoIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44 100V44c0-4 3-7 7-7h98c4 0 7 3 7 7v56"
        fill="currentColor"
        opacity="0.15"
      />
      <path d="M52 36h88v64H52V36z" fill="currentColor" opacity="0.22" />
      <rect x="64" y="72" width="12" height="20" rx="2" fill="currentColor" opacity="0.55" />
      <rect x="82" y="58" width="12" height="34" rx="2" fill="currentColor" opacity="0.75" />
      <rect x="100" y="66" width="12" height="26" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="118" y="50" width="12" height="42" rx="2" fill="currentColor" opacity="0.85" />
      <path
        d="M60 52h72"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <circle cx="148" cy="48" r="16" fill="currentColor" opacity="0.12" />
      <path
        d="M148 40v16M140 48h16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M156 56l18 10M156 56l10 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export function StepThreeIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 24l28 48H72L100 24z"
        fill="currentColor"
        opacity="0.75"
      />
      <rect x="88" y="68" width="24" height="36" rx="2" fill="currentColor" opacity="0.55" />
      <ellipse cx="100" cy="112" rx="22" ry="6" fill="currentColor" opacity="0.2" />
      <path
        d="M76 108c8-12 20-18 24-18s16 6 24 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="52" cy="56" r="6" fill="currentColor" opacity="0.25" />
      <circle cx="152" cy="44" r="8" fill="currentColor" opacity="0.2" />
      <path
        d="M44 72l16-8M156 60l-14 10M48 88l12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <rect x="36" y="96" width="10" height="10" rx="2" fill="currentColor" opacity="0.3" transform="rotate(12 41 101)" />
      <rect x="148" y="88" width="12" height="12" rx="2" fill="currentColor" opacity="0.28" transform="rotate(-18 154 94)" />
    </svg>
  );
}