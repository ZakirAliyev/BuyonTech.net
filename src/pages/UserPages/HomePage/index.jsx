import {useState, useEffect} from "react";
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

function HomePage() {
    const [footerHeight, setFooterHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <section id="homePage">
            <Navbar/>
            <SwitchProduct/>
            <HomeBanner/>
            <LogoScroll/>
            <AboutScroll/>
            <ServicesGrid/>
            <PortfolioGrid/>
            <WhyChoose/>
            <Faq/>
            {windowWidth >= 992 && (
                <div
                    style={{
                        height: `${footerHeight}px`,
                        position: "relative",
                        zIndex: -90,
                    }}
                ></div>
            )}
            <Footer setFooterHeight={setFooterHeight}/>
        </section>
    );
}

export default HomePage;
