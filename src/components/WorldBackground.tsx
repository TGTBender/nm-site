"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { buildWorld, setParallax } from "@/lib/world";

/**
 * Mounts the world background and keeps it in step with the page.
 *
 * The original study ran on `load`, which fires once. In a routed app the
 * document height and section list change on every navigation, so this
 * rebuilds on pathname change as well as on resize and on any body size
 * change, and tears its listeners down on unmount.
 *
 * Routes with no `.sec` sections leave the world empty, so pages that still
 * paint their own backgrounds are unaffected.
 */
export function WorldBackground() {
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    const rebuild = (delay = 60) => {
      clearTimeout(timer);
      timer = setTimeout(buildWorld, delay);
    };

    // Fonts land after first paint and change section heights, so build once
    // now and again once they have settled.
    buildWorld();
    setParallax();
    if (document.fonts?.ready) document.fonts.ready.then(() => buildWorld());

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setParallax();
        raf = 0;
      });
    };
    const onResize = () => rebuild(120);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => rebuild(60))
        : null;
    ro?.observe(document.body);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <div id="world" aria-hidden />
      <div id="grain" aria-hidden />
    </>
  );
}
