import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import HomeBanner from "../../../components/UserComponents/HomeBanner/index.jsx";
import Faq from "../../../components/UserComponents/Faq/index.jsx";
import LogoScroll from "../../../components/UserComponents/LogoScroll/index.jsx";
import AboutScroll from "../../../components/UserComponents/AboutScroll/index.jsx";
import ServicesGrid from "../../../components/UserComponents/ServicesGrid/index.jsx";
import PortfolioGrid from "../../../components/UserComponents/PortfolioGrid/index.jsx";
import WhyChoose from "../../../components/UserComponents/WhyChoose/index.jsx";
import Footer from "../../../components/UserComponents/Footer/index.jsx";
import SwitchProduct from "../../../components/UserComponents/SwitchProduct/index.jsx";
import CreativeMarketing from "../../../components/UserComponents/CreativeMarketing/index.jsx";
import AboutScrollMarketing from "../../../components/UserComponents/AboutScrollMarketing/index.jsx";
import PortfolioGridMarketing from "../../../components/UserComponents/PortfolioGridMarketing/index.jsx";
import FaqMarketing from "../../../components/UserComponents/FaqMarketing/index.jsx";
import MarketingVideos from "../../../components/UserComponents/MarketingVideos/index.jsx";
import PerspectiveSection from "../../../components/UserComponents/PerspectiveSection/index.jsx";
import MarketingServices from "../../../components/UserComponents/MarketingServices/index.jsx";

function HomePage() {
    const [footerHeight, setFooterHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [active, setActive] = useState("development");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true); // ✅ ilk açılışı izləmək

    useEffect(() => {
        const timer = setTimeout(() => setShowFooter(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const variants = {
        enter: (direction) => ({
            x: direction === "right" ? "100%" : "-100%",
            position: "absolute",
        }),
        center: {
            x: 0,
            position: "relative",
        },
        exit: (direction) => ({
            x: direction === "right" ? "-100%" : "100%",
            position: "absolute",
        }),
    };

    const [direction, setDirection] = useState("right");

    const handleSwitch = (next) => {
        if (isTransitioning || next === active) return;
        setIsFirstLoad(false); // ✅ artıq ilk load bitib
        setDirection(next === "marketing" ? "right" : "left");
        setIsTransitioning(true);
        setShowFooter(false);

        setActive(next);

        setTimeout(() => {
            setIsTransitioning(false);
            setShowFooter(true);
        }, 800);
    };

    return (
        <section id="homePage" style={{ overflow: "hidden", position: "relative" }}>
            <Navbar />
            <SwitchProduct active={active} setActive={handleSwitch} disabled={isTransitioning} />

            <div style={{
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                overflow: "hidden",
            }}>
                <AnimatePresence mode="sync" custom={direction}>
                    <motion.div
                        key={active}
                        custom={direction}
                        variants={variants}
                        initial={isFirstLoad ? false : "enter"}
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <div style={{
                            position: "relative",
                            zIndex: 100,
                            background: "var(--bg-color)",
                        }}>
                            <div className="container">
                                {active === "development" ? (
                                    <>
                                        <HomeBanner />
                                        <LogoScroll />
                                        <AboutScroll />
                                        <ServicesGrid />
                                        <PortfolioGrid />
                                        <WhyChoose />
                                        <Faq />
                                    </>
                                ) : (
                                    <>
                                        <CreativeMarketing />
                                        <LogoScroll />
                                        <AboutScrollMarketing />
                                        <PerspectiveSection/>
                                        <MarketingServices/>
                                        <PortfolioGridMarketing />
                                        <MarketingVideos />
                                        <FaqMarketing />
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {showFooter && (
                windowWidth >= 992 ? (
                    <>
                        <div style={{
                            height: `${footerHeight}px`,
                            position: "relative",
                            zIndex: -90,
                        }}></div>
                        <Footer setFooterHeight={setFooterHeight} />
                    </>
                ) : (
                    <Footer setFooterHeight={setFooterHeight} />
                )
            )}
        </section>
    );
}

export default HomePage;