"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  stagger?: boolean;
  className?: string;
  as?: "div" | "section" | "ol" | "ul" | "aside";
  delay?: number;
  once?: boolean;
  id?: string;
};

export default function Reveal({
  children,
  stagger,
  className = "",
  as = "div",
  delay = 0,
  once = true,
  id,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay) {
              window.setTimeout(() => setInView(true), delay);
            } else {
              setInView(true);
            }
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, once]);

  const cls =
    (stagger ? "reveal-stagger" : "reveal") +
    (inView ? " in" : "") +
    (className ? " " + className : "");

  const Tag = as as keyof React.JSX.IntrinsicElements;
  return (
    <Tag ref={ref as React.RefObject<HTMLElement>} className={cls} id={id}>
      {children}
    </Tag>
  );
}
