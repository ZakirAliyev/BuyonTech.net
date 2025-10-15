import { useEffect, useState } from "react";
import './index.scss'
import Navbar from "../../../components/UserComponents/Navbar";
import Footer from "../../../components/UserComponents/Footer";
import AboutPageFirst from "../../../components/UserComponents/AboutPageComponents/FirstSection";
import AboutPageSecond from "../../../components/UserComponents/AboutPageComponents/SecondSection";
import AboutPageThird from "../../../components/UserComponents/AboutPageComponents/ThirdSection";
import AboutFourthSection from "../../../components/UserComponents/AboutPageComponents/FourthSection";

function AboutPage() {
    const [footerHeight, setFooterHeight] = useState(0);
    const [showFooter, setShowFooter] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const imageBox = [
        {
            id: 1,

        },
        {
            id: 2,

        },
        {
            id: 3,

        }
        ,
        {
            id: 4,

        }
        ,
        {
            id: 5,

        },
            {
            id: 3,

        }
        ,
        {
            id: 4,

        }
        ,
        {
            id: 5,

        },


    ]
    useEffect(() => {
        const timer = setTimeout(() => setShowFooter(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (

        <main id={"aboutPage"} style={{ overflow: "hidden", position: "relative", background: "#fff" }}>
            <div style={{
                position: "relative",
                zIndex: 100,
                background: "var(--bg-color)",
            }}>
                <Navbar />
                <AboutPageFirst />
                <AboutPageSecond />
                <AboutPageThird />
                <AboutFourthSection data={imageBox} />
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
        </main>
    );
}

export default AboutPage;

