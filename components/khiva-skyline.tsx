type KhivaSkylineProps = {
  className?: string;
  variant?: "hero" | "divider";
};

export function KhivaSkyline({ className = "", variant = "hero" }: KhivaSkylineProps) {
  if (variant === "divider") {
    return (
      <svg
        viewBox="0 0 1440 120"
        aria-hidden="true"
        className={className}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="khiva-divider-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#183F6B" stopOpacity="0.08" />
            <stop offset="45%" stopColor="#1E8F97" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C69A63" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path
          d="M0 108H180V88H208V34H228V88H272V100H356V80H390V56H414V80H480V96H620V90H665V28H686V90H760V98H910V86H946V62H970V86H1082V100H1218V76H1256V46H1278V76H1330V92H1440V120H0Z"
          fill="url(#khiva-divider-gradient)"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 720 520"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="khiva-hero-gradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#C69A63" stopOpacity="0.18" />
          <stop offset="52%" stopColor="#1E8F97" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#183F6B" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="khiva-wall-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E8D7B7" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#C69A63" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M0 520V404H98V386H176V398H274V378H392V404H478V392H560V404H632V388H720V520H0Z"
        fill="url(#khiva-wall-gradient)"
      />
      <path
        d="M18 488H164V446H180V154H192V84H206V154H218V446H322V424H368V366H414V424H462V446H520V438H548V306H560V212H578V170H596V212H606V306H620V438H702V488H18Z"
        fill="url(#khiva-hero-gradient)"
      />
      <path
        d="M166 446H228"
        stroke="#183F6B"
        strokeOpacity="0.16"
        strokeWidth="2"
      />
      <path
        d="M548 306H620"
        stroke="#183F6B"
        strokeOpacity="0.14"
        strokeWidth="2"
      />
      <path
        d="M0 492H720"
        stroke="#183F6B"
        strokeOpacity="0.16"
        strokeWidth="2"
      />
    </svg>
  );
}
