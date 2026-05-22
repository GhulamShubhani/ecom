import Image from "next/image";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 496 160"
      fill="none"
    >

      <path d="M61 53 L61 107 L105 80 Z" fill="#ffffff" />

      <text
        x="145"
        y="94"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="74"
        fontWeight="900"
        letterSpacing="6"
        fill="#000000"
      >
        PLAY ME
      </text>
    </svg>
  );
}