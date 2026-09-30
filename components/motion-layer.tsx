"use client";
import { useEffect, useRef } from "react";
// Three compositor-only depths share one passive scroll listener and one RAF.
export function MotionLayer() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-depth]"),
    );
    let frame = 0,
      current = window.scrollY,
      target = current;
    const reset = () => {
      nodes.forEach((node) => node.style.removeProperty("transform"));
    };
    const draw = () => {
      current += (target - current) * 0.12;
      nodes.forEach((node) => {
        const parent = node.closest<HTMLElement>("[data-parallax]");
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        if (rect.bottom < -160 || rect.top > window.innerHeight + 160) return;
        const offset = Math.max(
          -800,
          Math.min(800, current - (rect.top + window.scrollY)),
        );
        const mobile = window.innerWidth < 768 ? 0.55 : 1;
        node.style.transform = `translate3d(0,${offset * Number(node.dataset.depth) * mobile}px,0)`;
      });
      frame =
        Math.abs(target - current) > 0.15 ? requestAnimationFrame(draw) : 0;
    };
    const scroll = () => {
      if (media.matches) return;
      target = window.scrollY;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const change = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (media.matches) reset();
      else scroll();
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll, { passive: true });
    media.addEventListener("change", change);
    scroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      media.removeEventListener("change", change);
      reset();
    };
  }, []);
  return null;
}
export function CinemaVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const control = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let visible = true,
      pausedByUser = false;
    const update = () => {
      const play =
        visible &&
        !document.hidden &&
        !reduce.matches &&
        !connection?.saveData &&
        !pausedByUser;
      video.autoplay = play;
      if (play) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(video);
    reduce.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    const button = control.current;
    const toggle = () => {
      pausedByUser = !pausedByUser;
      update();
      if (button) {
        button.textContent = pausedByUser ? "Play film ↗" : "Pause film Ⅱ";
        button.setAttribute(
          "aria-label",
          pausedByUser ? "Play background film" : "Pause background film",
        );
      }
    };
    button?.addEventListener("click", toggle);
    update();
    return () => {
      observer.disconnect();
      reduce.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      button?.removeEventListener("click", toggle);
    };
  }, []);
  return (
    <>
      <video
        ref={ref}
        className={className}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        ref={control}
        type="button"
        className="film-control"
        aria-label="Pause background film"
      >
        Pause film Ⅱ
      </button>
    </>
  );
}
