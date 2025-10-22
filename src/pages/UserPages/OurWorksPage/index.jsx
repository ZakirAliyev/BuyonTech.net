import './index.scss'
import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import { IoChevronDownOutline } from "react-icons/io5";
import WorkCard from "../../../components/UserComponents/WorkCard/index.jsx";
import mid from "/src/assets/mid.png";
import nas from "/src/assets/nas.png";
import { useEffect, useState } from 'react';
import Footer from '../../../components/UserComponents/Footer/index.jsx';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useGetAllProjectsQuery } from '../../../services/apis/userApi.jsx';

function OurWorksPage() {
    const [footerHeight, setFooterHeight] = useState(0);
    const [showFooter, setShowFooter] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { t } = useTranslation()
    const { data: getAllProjects, isLoading, isError, isFetching } = useGetAllProjectsQuery()
    const myProjects = getAllProjects?.data
    useEffect(() => {
        const timer = setTimeout(() => setShowFooter(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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



    ];
  
    return (


        <section id={"ourWorksPage"} style={{ overflow: "hidden", position: "relative", background: "#fff" }}>
            <Helmet>
                <title>
                    {
                        t('siteRoot.header.links.portfolio')
                    }
                </title>
            </Helmet>
            <div style={{
                position: "relative",
                zIndex: 100,
                background: "var(--bg-color)",
            }}>
                <Navbar />
                <div className={"container"}>
                    <div className={"ourWorks"} style={{ paddingBottom: "16px" }}>
                        <div className={"textWrapper"}>
                            <h2>
                                {
                                    t('siteRoot.portfolioPage.title')
                                }
                            </h2>
                            <div className={"select"}>
                                <div className={"option"}>
                                    All projects
                                    <IoChevronDownOutline className={"icon"} />
                                </div>
                            </div>
                        </div>
                        {myProjects?.map((work) => (
                            <WorkCard key={work.id} item={work} />
                        ))}
                    </div>
                </div>

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

export default OurWorksPage;


