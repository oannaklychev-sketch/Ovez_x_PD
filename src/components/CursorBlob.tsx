import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/** Animated cursor blob — soft brand-colored follower for desktop */
export function CursorBlob() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 120}px, ${y - 120}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[5] w-[240px] h-[240px] rounded-full"
      style={{
        background: "radial-gradient(circle, var(--brand) 0%, transparent 65%)",
        opacity: 0.18,
        filter: "blur(40px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
