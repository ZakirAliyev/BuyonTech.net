import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

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
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useGetAllLogosQuery, useGetAllProjectsQuery } from "../../../services/apis/userApi.jsx";

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [footerHeight, setFooterHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const categoryParam = searchParams.get("category");
    const [active, setActive] = useState(categoryParam || "development");

    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true); // ✅ ilk açılışı izləmək
    const { t } = useTranslation()

    const { data: getAllProject, isLoading, isError, isFetching } = useGetAllProjectsQuery()
    const { data: getAllLogos } = useGetAllLogosQuery()

    const allLogos = getAllLogos?.data
    const allProjects = getAllProject?.data

    const marketingProjects = allProjects?.filter(
        (item) => item.categoryType?.toLowerCase() == "marketing"
    );

    const developmentProjects = allProjects?.filter(
        (item) => item.categoryType?.toLowerCase() == "development"
    );

    // --- LOGO-ları filterləyirik
    const marketingLogos = allLogos?.filter(
        (item) => item.categoryType?.toLowerCase() == "marketing"
    );

    const developmentLogos = allLogos?.filter(
        (item) => item.categoryType?.toLowerCase() == "development"
    );

    useEffect(() => {
        const timer = setTimeout(() => setShowFooter(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        if (!categoryParam) {
            setSearchParams({ category: "development" });
        } else if (categoryParam !== active) {
            setSearchParams({ category: active });
        }
    }, [active]);


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
        setSearchParams({ category: next });
        setTimeout(() => {
            setIsTransitioning(false);
            setShowFooter(true);
        }, 800);
    };

    return (
        <section id="homePage" style={{ overflow: "hidden", position: "relative" }}>
            <Navbar />
            <SwitchProduct active={active} setActive={handleSwitch} disabled={isTransitioning} />
            <Helmet>
                <title>
                    {
                        t('siteRoot.header.links.home')
                    }
                </title>
            </Helmet>
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
                            borderBottomLeftRadius: "35px",
                            borderBottomRightRadius: "35px"
                        }}>
                            <div className="container">
                                {active === "development" ? (
                                    <>
                                        <HomeBanner />
                                        <LogoScroll developmentLogos={developmentLogos} />
                                        <AboutScroll />
                                        <ServicesGrid />
                                        <PortfolioGrid developmentProjects={developmentProjects} />
                                        <WhyChoose />
                                        <Faq />
                                    </>
                                ) : (
                                    <>
                                        <CreativeMarketing />
                                        <LogoScroll marketingLogos={marketingLogos} />
                                        <AboutScrollMarketing />
                                        <PerspectiveSection />
                                        <MarketingServices />
                                        <PortfolioGridMarketing marketingProjects={marketingProjects} />
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