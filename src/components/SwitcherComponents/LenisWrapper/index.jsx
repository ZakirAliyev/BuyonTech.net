// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Lenis from "@studio-freight/lenis";

// function LenisWrapper() {
//   const location = useLocation();
//   const lenis = new Lenis();
// const lenisRef = useRef(null);
//   useEffect(() => {
//     // /admin ilə başlayan routelarda Lenis aktiv olmasın
//     if (location.pathname.startsWith("/admin")) return;

//     const lenis = new Lenis({
//       duration: 2,
//       easing: (t) => 1 - Math.pow(2, -10 * t),
//       smoothWheel: true,
//       smoothTouch: true,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => lenis.destroy();
//   }, []);
//   useEffect(() => {
//     // hər dəfə route dəyişəndə səhifəni yuxarı aparır
//     lenis.scrollTo(0, { duration: 1 });
//   }, [location.pathname]);
//   return null; // Ekrana heç nə göstərmir
// }

// export default LenisWrapper;

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

function LenisWrapper() {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      smoothTouch: true,
    });

    lenisRef.current = lenis;

    // requestAnimationFrame loop
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []); // yalnız bir dəfə işə düşür

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1 });
    }
  }, [location.pathname]);

  return null;
}

export default LenisWrapper;
