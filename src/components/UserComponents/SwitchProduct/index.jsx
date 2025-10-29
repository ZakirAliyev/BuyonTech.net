// import "./index.scss";

// function SwitchProduct({active, setActive}) {
//     return (
//         <section id="switchProduct">
//             <div className="zakirinki">
//                 <div className="switch-container">
//                     <div
//                         className={`switch-option ${active === "development" ? "active" : ""}`}
//                         onClick={() => setActive("development")}
//                     >
//                         DEVELOPMENT
//                     </div>
//                     <div
//                         className={`switch-option ${active === "marketing" ? "active" : ""}`}
//                         onClick={() => setActive("marketing")}
//                     >
//                         MARKETING
//                     </div>
//                     <div className={`slider ${active}`}></div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default SwitchProduct;



import { useEffect, useState, useRef } from "react";
import "./index.scss";

function SwitchProduct({ active, setActive }) {
    const switchRef = useRef(null);
    const [showClone, setShowClone] = useState(false);
    const [hideCloneSmoothly, setHideCloneSmoothly] = useState(false);
      const [fadeOutDown, setFadeOutDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const switchTop = switchRef.current?.getBoundingClientRect().top;

            // ↓ Scroll down → clone gets hidden
            if (currentScroll > lastScrollY) {
                if (showClone) {
                    setFadeOutDown(true);
                    setTimeout(() => {
                        setShowClone(false);
                        setFadeOutDown(false);
                    }, 400);
                }
                setHideCloneSmoothly(false);
            }
            // ↑ Scroll up → clone appears if original is out of view
            else if (currentScroll < lastScrollY) {
                if (switchTop < -100) {
                    setShowClone(true);
                    setHideCloneSmoothly(false);
                }

                // Əgər artıq əsl komponent görünür → klonu smooth şəkildə gizlət
                if (switchTop >= -20 && showClone) {
                    setHideCloneSmoothly(true);
                    setTimeout(() => setShowClone(false), 300); // animasiya ilə yox olsun
                }
            }

            setLastScrollY(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, showClone]);

    return (
        <>
            {showClone && (
                <section
                    className={`switchProductClone ${hideCloneSmoothly
                            ? "disappearing"
                            : fadeOutDown
                                ? "fadeOutDown"
                                : "appearing"
                        }`}
                >
                    <div className="zakirinki">
                        <div className="switch-container">
                            <div
                                className={`switch-option ${active === "development" ? "active" : ""
                                    }`}
                                onClick={() => setActive("development")}
                            >
                                DEVELOPMENT
                            </div>
                            <div
                                className={`switch-option ${active === "marketing" ? "active" : ""
                                    }`}
                                onClick={() => setActive("marketing")}
                            >
                                MARKETING
                            </div>
                            <div className={`slider ${active}`}></div>
                        </div>
                    </div>
                </section>
            )}

            {/* Əsl komponent (sabit qalır) */}
            <section id="switchProduct" ref={switchRef}>
                <div className="zakirinki">
                    <div className="switch-container">
                        <div
                            className={`switch-option ${active === "development" ? "active" : ""
                                }`}
                            onClick={() => setActive("development")}
                        >
                            DEVELOPMENT
                        </div>
                        <div
                            className={`switch-option ${active === "marketing" ? "active" : ""
                                }`}
                            onClick={() => setActive("marketing")}
                        >
                            MARKETING
                        </div>
                        <div className={`slider ${active}`}></div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SwitchProduct;
