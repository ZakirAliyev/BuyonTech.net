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
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useGetAllProjectsQuery, useGetOneProjectsQuery } from '../../../services/apis/userApi.jsx';
import { useParams } from 'react-router';

function OurWorksPageDetail() {

    const { id } = useParams()
    const { data: getAllProjects, isLoading, isError, isFetching } = useGetAllProjectsQuery()
    const { data: getOneProject, isLoading: getOneLoading, isError: getOneError, isFetching: getOneFetc } = useGetOneProjectsQuery(id)

    const [footerHeight, setFooterHeight] = useState(0);
    const [showFooter, setShowFooter] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { t } = useTranslation()
    useEffect(() => {
        const timer = setTimeout(() => setShowFooter(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const oneProje = getOneProject?.data
    return (
        <main id={"ourWorksPageDetail"} style={{ overflow: "hidden", position: "relative", background: "#fff" }}>
            <Helmet>
                <title>
                    {
                        t('siteRoot.portfolioPage.detailSection.title')
                    }
                </title>
            </Helmet>
            <div style={{
                position: "relative",
                zIndex: 100,
                background: "var(--bg-color)",
            }}>
                <Navbar />
                {/* <OurWorksPageDetailFirst imageBox={imageBox} /> */}
                {
                    oneProje?.categoryType == "marketing" ? <CaseStudyHeaderMarketing oneProje={oneProje} /> : <OurWorksPageDetailFirst oneProje={oneProje} />
                }

                <OurWorksPageDetailSecond oneProje={oneProje} />
                <OurWorksPageDetailThird worksData={getAllProjects} />
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