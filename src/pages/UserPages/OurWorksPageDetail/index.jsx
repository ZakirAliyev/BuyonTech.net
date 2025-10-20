import './index.scss'
import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import mid from "/src/assets/mid.png";
import nas from "/src/assets/nas.png";
import OurWorksPageDetailThird from '../../../components/UserComponents/OurWorksPageDetail/ThirdSection/index.jsx';
import OurWorksPageDetailSecond from '../../../components/UserComponents/OurWorksPageDetail/SecondSection/index.jsx';
import Footer from "../../../components/UserComponents/Footer/index.jsx";
import { useEffect, useState } from "react";
import OurWorksPageDetailFirst from '../../../components/UserComponents/OurWorksPageDetail/FirstSection/index.jsx';
import CaseStudyHeaderMarketing from '../../../components/UserComponents/CaseStudyHeaderMarketing/index.jsx';

function OurWorksPageDetail() {
    const imageBox = [
        {
            id: 1,
            image: mid

        },
        {
            id: 2,
            image: nas

        },
        {
            id: 3,
            image: mid

        }
        ,
        {
            id: 4,
            image: nas

        }
        ,
        {
            id: 5,
            image: mid

        }
    ]
    const worksData = [
        {
            id: 1,
            desc: "We created a sleek and user-friendly website for LEGNO to showcase their interior design expertise and portfolio.",
            title: "Legno",
            year: "2025",
            category: "Portfolio website",
            services: ["Website design", "Branding", "Development"],
            image: mid
        },
        {
            id: 2,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 3,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 4,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 5,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 6,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 7,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 8,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        }
    ];

    const [footerHeight, setFooterHeight] = useState(0);
    const [showFooter, setShowFooter] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        <main id={"ourWorksPageDetail"} style={{ overflow: "hidden", position: "relative", background: "#fff" }}>
            <div style={{
                position: "relative",
                zIndex: 100,
                background: "var(--bg-color)",
            }}>
                <Navbar />
                {/* <OurWorksPageDetailFirst imageBox={imageBox} /> */}
                <CaseStudyHeaderMarketing/>
                <OurWorksPageDetailSecond />
                <OurWorksPageDetailThird worksData={worksData} />
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

export default OurWorksPageDetail;