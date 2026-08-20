"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  duration?: number;
};

/**
 * Value can be:
 *   "6,842"           -> counts 0 → 6842, formatted with commas
 *   "91.8%"           -> counts 0 → 91.8, appends %
 *   "PKR 214.6M"      -> counts 0 → 214.6, prefixes "PKR " and appends "M"
 *   "On-time"         -> non-numeric: rendered as-is
 */
export default function CountUp({ value, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(\D*)$/);
    if (!match) return;

    const [, prefix, numStr, suffix] = match;
    const clean = numStr.replace(/,/g, "");
    const target = parseFloat(clean);
    const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
    const useComma = numStr.includes(",");

    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = target * eased;
              const formatted =
                (useComma
                  ? current.toLocaleString("en-US", {
                      minimumFractionDigits: decimals,
                      maximumFractionDigits: decimals,
                    })
                  : current.toFixed(decimals));
              setDisplay(`${prefix}${formatted}${suffix}`);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
