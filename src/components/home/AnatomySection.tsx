import type React from "react";
import { useLocale, L } from "@/components/site/L";
import { home } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { Ruler } from "lucide-react";

export function AnatomySection() {
  const t = home[useLocale()].anatomy;
  return (
    <section
      id="anatomy"
      aria-labelledby="anatomy-heading"
      className="relative overflow-hidden blueprint-grid scroll-mt-20 py-24 sm:py-32"
    >
      <svg
        className="pointer-events-none absolute -left-24 top-10 h-[560px] w-[900px] text-blueprint-ink opacity-[0.13]"
        viewBox="0 0 900 560"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1">
          <rect x="90" y="80" width="320" height="200" />
          <rect x="450" y="120" width="250" height="140" />
          <line x1="90" y1="320" x2="410" y2="320" />
          <line x1="90" y1="300" x2="90" y2="340" />
          <line x1="410" y1="300" x2="410" y2="340" />
          <line x1="450" y1="300" x2="700" y2="300" />
          <line x1="450" y1="280" x2="450" y2="320" />
          <line x1="700" y1="280" x2="700" y2="320" />
          <path d="M90 80 L250 30 L410 80" />
          <path d="M450 120 L575 70 L700 120" />
          <path d="M120 380 L330 380 L300 440 L150 440 Z" />
          <path d="M150 440 L300 440 L285 480 L165 480 Z" />
          <line x1="470" y1="400" x2="690" y2="400" />
          <line x1="470" y1="380" x2="470" y2="420" />
          <line x1="690" y1="380" x2="690" y2="420" />
          <circle cx="760" cy="360" r="46" />
          <circle cx="760" cy="360" r="30" />
          <line x1="760" y1="310" x2="760" y2="410" />
          <line x1="710" y1="360" x2="810" y2="360" />
        </g>
      </svg>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="label-mono text-brand">{t.text01}</p>
          <h2
            id="anatomy-heading"
            className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-white"
          >
            <Words>{t.text02}</Words>
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/60">
            {t.text03}
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <Reveal className="h-full">
            <figure className="glass glass-interactive flex h-full flex-col overflow-hidden rounded-[28px] p-5 sm:p-7">
              <svg
                viewBox="0 0 440 290"
                className="assemble h-auto w-full text-white/85"
                role="img"
                aria-label={t.text04}
              >
                <defs>
                  <pattern
                    id="anat-shingle"
                    width="6"
                    height="6"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      opacity="0.9"
                    />
                  </pattern>
                  <pattern id="anat-deck" width="5" height="5" patternUnits="userSpaceOnUse">
                    <line
                      x1="0"
                      y1="0"
                      x2="5"
                      y2="0"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.7"
                    />
                  </pattern>
                  <pattern id="anat-insul" width="9" height="9" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.9" fill="currentColor" opacity="0.85" />
                    <circle cx="6.5" cy="6" r="0.9" fill="currentColor" opacity="0.85" />
                  </pattern>
                </defs>
                <g stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none">
                  <polygon
                    points="220,48 348,230.2 92,230.2"
                    fill="currentColor"
                    opacity="0.05"
                    stroke="none"
                  />
                  <polygon
                    points="197.4,51.2 357.4,221.2 348,230.2 188,60.2"
                    fill="url(#anat-insul)"
                    opacity="0.85"
                  />
                  <polygon
                    points="242.6,51.2 82.6,221.2 92,230.2 252,60.2"
                    fill="url(#anat-insul)"
                    opacity="0.85"
                  />
                  <polygon
                    points="207.6,41.7 367.6,211.7 357.4,221.2 197.4,51.2"
                    fill="url(#anat-deck)"
                    opacity="0.85"
                  />
                  <polygon
                    points="232.4,41.7 72.4,211.7 82.6,221.2 242.6,51.2"
                    fill="url(#anat-deck)"
                    opacity="0.85"
                  />
                  <polygon
                    points="211.3,38.2 371.3,208.2 367.6,211.7 207.6,41.7"
                    fill="#f26b1d"
                    opacity="0.62"
                  />
                  <polygon
                    points="228.7,38.2 68.7,208.2 72.4,211.7 232.4,41.7"
                    fill="#f26b1d"
                    opacity="0.62"
                  />
                  <polygon
                    points="215.6,34.1 375.6,204.1 371.3,208.2 211.3,38.2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <polygon
                    points="224.4,34.1 64.4,204.1 68.7,208.2 228.7,38.2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <polygon
                    points="220,30 380,200 375.6,204.1 215.6,34.1"
                    fill="url(#anat-shingle)"
                  />
                  <polygon points="220,30 224.4,34.1 64.4,204.1 60,200" fill="url(#anat-shingle)" />
                  <polygon
                    points="220,30 380,200 375.6,204.1 215.6,34.1"
                    fill="currentColor"
                    opacity="0.1"
                    stroke="none"
                  />
                  <polygon
                    points="220,30 224.4,34.1 64.4,204.1 60,200"
                    fill="currentColor"
                    opacity="0.1"
                    stroke="none"
                  />
                  <polyline points="60,200 220,30 380,200" strokeWidth="2" />
                  <polyline
                    points="64.4,204.1 220,30 375.6,204.1"
                    strokeWidth="0.9"
                    opacity="0.55"
                  />
                  <polyline
                    points="82.6,221.2 220,48 357.4,221.2"
                    strokeWidth="0.9"
                    opacity="0.45"
                  />
                  <path d="M200 30 L220 18 L240 30" fill="currentColor" opacity="0.28" />
                  <path d="M200 30 L220 18 L240 30" />
                  <path d="M380 200 L389 204" />
                  <path d="M380 200 L380 232" strokeWidth="2" />
                  <path d="M374 232 L386 232" strokeWidth="1" opacity="0.6" />
                  <path d="M389 240 L352 240 L352 232" />
                  <path d="M389 240 L352 240" strokeWidth="2" />
                  <path d="M389 232 L389 240" strokeWidth="2" />
                  <line x1="220" y1="56" x2="220" y2="248" opacity="0.5" />
                  <line x1="100" y1="248" x2="348" y2="248" strokeWidth="1.5" opacity="0.7" />
                  <line x1="100" y1="248" x2="100" y2="262" opacity="0.4" />
                  <line x1="348" y1="248" x2="348" y2="262" opacity="0.4" />
                  <rect
                    x="8"
                    y="8"
                    width="424"
                    height="274"
                    fill="none"
                    opacity="0.35"
                    strokeDasharray="4 5"
                  />
                </g>
                <g className="callouts">
                  <g>
                    <line
                      x1="220"
                      y1="12"
                      x2="220"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="0.9"
                      opacity="0.55"
                    />
                    <circle
                      cx="220"
                      cy="12"
                      r="10.5"
                      fill="#0d1b26"
                      stroke="#f26b1d"
                      strokeWidth="1.4"
                    />
                    <text
                      x="220"
                      y="12"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ff8a3d"
                      fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {t.text05}
                    </text>
                  </g>
                  <g>
                    <line
                      x1="302"
                      y1="58"
                      x2="270"
                      y2="88"
                      stroke="currentColor"
                      strokeWidth="0.9"
                      opacity="0.55"
                    />
                    <circle
                      cx="302"
                      cy="58"
                      r="10.5"
                      fill="#0d1b26"
                      stroke="#f26b1d"
                      strokeWidth="1.4"
                    />
                    <text
                      x="302"
                      y="58"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ff8a3d"
                      fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {t.text06}
                    </text>
                  </g>
                  <g>
                    <line
                      x1="344"
                      y1="118"
                      x2="316"
                      y2="143"
                      stroke="currentColor"
                      strokeWidth="0.9"
                      opacity="0.55"
                    />
                    <circle
                      cx="344"
                      cy="118"
                      r="10.5"
                      fill="#0d1b26"
                      stroke="#f26b1d"
                      strokeWidth="1.4"
                    />
                    <text
                      x="344"
                      y="118"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ff8a3d"
                      fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {t.text07}
                    </text>
                  </g>
                  <g>
                    <line
                      x1="258"
                      y1="126"
                      x2="280"
                      y2="115"
                      stroke="currentColor"
                      strokeWidth="0.9"
                      opacity="0.55"
                    />
                    <circle
                      cx="258"
                      cy="126"
                      r="10.5"
                      fill="#0d1b26"
                      stroke="#f26b1d"
                      strokeWidth="1.4"
                    />
                    <text
                      x="258"
                      y="126"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ff8a3d"
                      fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {t.text08}
                    </text>
                  </g>
                  <g>
                    <line
                      x1="352"
                      y1="188"
                      x2="316"
                      y2="167"
                      stroke="currentColor"
                      strokeWidth="0.9"
                      opacity="0.55"
                    />
                    <circle
                      cx="352"
                      cy="188"
                      r="10.5"
                      fill="#0d1b26"
                      stroke="#f26b1d"
                      strokeWidth="1.4"
                    />
                    <text
                      x="352"
                      y="188"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ff8a3d"
                      fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {t.text09}
                    </text>
                  </g>
                  <g>
                    <line
                      x1="190"
                      y1="116"
                      x2="224"
                      y2="92"
                      stroke="currentColor"
                      strokeWidth="0.9"
                      opacity="0.55"
                    />
                    <circle
                      cx="190"
                      cy="116"
                      r="10.5"
                      fill="#0d1b26"
                      stroke="#f26b1d"
                      strokeWidth="1.4"
                    />
                    <text
                      x="190"
                      y="116"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ff8a3d"
                      fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {t.text10}
                    </text>
                  </g>
                  <g>
                    <line
                      x1="414"
                      y1="186"
                      x2="386"
                      y2="204"
                      stroke="currentColor"
                      strokeWidth="0.9"
                      opacity="0.55"
                    />
                    <circle
                      cx="414"
                      cy="186"
                      r="10.5"
                      fill="#0d1b26"
                      stroke="#f26b1d"
                      strokeWidth="1.4"
                    />
                    <text
                      x="414"
                      y="186"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ff8a3d"
                      fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {t.text11}
                    </text>
                  </g>
                </g>
              </svg>
              <figcaption className="mt-auto flex items-start gap-2.5 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
                <Ruler className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden="true" />
                {t.text12}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <ol className="glass flex h-full flex-col justify-center gap-0.5 rounded-[28px] p-5 sm:p-6">
              <li className="flex gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-white/[0.06]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/50 font-mono text-[11px] font-semibold text-brand">
                  {t.text13}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[15px] font-extrabold leading-snug text-white">
                    {t.text14}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-white/55">
                    {t.text15}
                  </span>
                </span>
              </li>
              <li className="flex gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-white/[0.06]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/50 font-mono text-[11px] font-semibold text-brand">
                  {t.text16}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[15px] font-extrabold leading-snug text-white">
                    {t.text17}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-white/55">
                    {t.text18}
                  </span>
                </span>
              </li>
              <li className="flex gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-white/[0.06]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/50 font-mono text-[11px] font-semibold text-brand">
                  {t.text19}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[15px] font-extrabold leading-snug text-white">
                    {t.text20}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-white/55">
                    {t.text21}
                  </span>
                </span>
              </li>
              <li className="flex gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-white/[0.06]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/50 font-mono text-[11px] font-semibold text-brand">
                  {t.text22}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[15px] font-extrabold leading-snug text-white">
                    {t.text23}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-white/55">
                    {t.text24}
                  </span>
                </span>
              </li>
              <li className="flex gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-white/[0.06]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/50 font-mono text-[11px] font-semibold text-brand">
                  {t.text25}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[15px] font-extrabold leading-snug text-white">
                    {t.text26}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-white/55">
                    {t.text27}
                  </span>
                </span>
              </li>
              <li className="flex gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-white/[0.06]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/50 font-mono text-[11px] font-semibold text-brand">
                  {t.text28}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[15px] font-extrabold leading-snug text-white">
                    {t.text29}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-white/55">
                    {t.text30}
                  </span>
                </span>
              </li>
              <li className="flex gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-white/[0.06]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/50 font-mono text-[11px] font-semibold text-brand">
                  {t.text31}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[15px] font-extrabold leading-snug text-white">
                    {t.text32}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-white/55">
                    {t.text33}
                  </span>
                </span>
              </li>
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
