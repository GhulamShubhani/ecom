import { ImageResponse } from "next/og";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME,
    },
    ...props,
  };

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <svg viewBox="0 0 114 112" width={64} height={58}>
            <g transform="translate(0,112) scale(0.1,-0.1)" fill="white">
              <path d="M440 1111c-104 -20 -212 -72 -300 -146 -58 -48 -142 -154 -136 -170 8 -21 296 -385 305 -385 4 0 30 28 57 62 27 35 56 72 65 83 9 11 50 61 90 110 171 209 168 203 123 224 -24 10 -29 8 -62 -26 -21 -21 -86 -102 -147 -180 -60 -78 -114 -141 -120 -139 -13 3 -215 244 -215 256 0 16 59 78 109 115 102 74 246 125 356 125 153 0 347 -91 442 -207l37 -45 23 27c29 34 24 43 -70 131 -76 71 -157 118 -257 149 -63 19 -234 28 -300 16z" />
              <path d="M778 637c-31 -40 -110 -140 -177 -224 -67 -83 -121 -156 -121 -162 0 -6 10 -15 21 -22 34 -18 54 0 174 153 142 181 151 191 163 187 5 -2 48 -49 93 -104 46 -55 92 -109 102 -119 27 -31 21 -46 -40 -106 -67 -64 -140 -109 -233 -141 -93 -32 -257 -32 -350 0 -99 34 -168 78 -242 152 -62 63 -67 66 -82 50 -24 -26 -20 -43 23 -87 144 -151 281 -209 486 -209 161 1 267 35 384 123 76 58 161 155 161 185 0 15 -284 390 -298 394 -4 1 -32 -31 -64 -70z" />
            </g>
          </svg>
        </div>
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await fetch(
            new URL("../fonts/Inter-Bold.ttf", import.meta.url)
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
