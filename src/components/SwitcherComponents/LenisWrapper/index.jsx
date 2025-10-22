import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

function LenisWrapper() {
  const location = useLocation();

  useEffect(() => {
    // /admin ilə başlayan routelarda Lenis aktiv olmasın
    if (location.pathname.startsWith("/admin")) return;

    const lenis = new Lenis({
      duration: 2,
      easing: (t) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [location.pathname]);

  return null; // Ekrana heç nə göstərmir
}

export default LenisWrapper;
