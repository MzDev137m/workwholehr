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

  // Render the chosen tag. Cast the ref through `any` because the union of
  // possible IntrinsicElement refs is too wide for TypeScript to unify —
  // we know at runtime the element is always a valid HTMLElement.
  const anyRef = ref as unknown as React.Ref<never>;
  const props = { className: cls, id, ref: anyRef, children };
  switch (as) {
    case "section": return <section {...props} />;
    case "ol":      return <ol {...props} />;
    case "ul":      return <ul {...props} />;
    case "aside":   return <aside {...props} />;
    default:        return <div {...props} />;
  }
}
