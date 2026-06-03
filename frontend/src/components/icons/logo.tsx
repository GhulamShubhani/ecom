export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 560 160"
      fill="none"
      {...props}
    >
      {/* Dress icon */}
      <path d="M60 40 L40 80 L52 80 L48 120 L72 120 L68 80 L80 80 Z" fill="#CC0000" />
      <circle cx="60" cy="30" r="10" fill="#CC0000" />

      <text
        x="100"
        y="102"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="68"
        fontWeight="900"
        letterSpacing="4"
        fill="#ffffff"
      >
        APNI DUKAN
      </text>
    </svg>
  );
}