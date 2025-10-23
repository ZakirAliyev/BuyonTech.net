import './index.scss'
import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import { IoChevronDownOutline } from "react-icons/io5";
import WorkCard from "../../../components/UserComponents/WorkCard/index.jsx";
import mid from "/src/assets/mid.png";
import nas from "/src/assets/nas.png";
import { useEffect, useMemo, useRef, useState } from 'react';
import Footer from '../../../components/UserComponents/Footer/index.jsx';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useGetAllProjectsQuery } from '../../../services/apis/userApi.jsx';
import SearchBox from '../../../components/UserComponents/OurWorksSearchBox/index.jsx';

function OurWorksPage() {
    const [footerHeight, setFooterHeight] = useState(0);
    const [showFooter, setShowFooter] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { t, i18n } = useTranslation()
    const { data: getAllProjects, isLoading, isError, isFetching } = useGetAllProjectsQuery()
    const myProjects = getAllProjects?.data
    const [query, setQuery] = useState("");
    // ▼ Dropdown state
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('all'); // 'all' | 'Development' | 'Marketing' | ...

    // ▼ Unikal kateqoriyalar (serverdən gələnlərdən avtomatik)
    const categories = useMemo(() => {
        const set = new Set();
        set.add('Development');
        set.add('Marketing');
        return ['all', ...Array.from(set)];
    }, [myProjects]);

    // const filteredProjects = useMemo(() => {
    //     if (selected === 'all') return myProjects;
    //     return myProjects.filter(p => (p?.categoryType || '').toLowerCase() === selected.toLowerCase());
    // }, [selected, myProjects]);
    const selectRef = useRef(null);
    useEffect(() => {
        const onClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('click', onClickOutside);
        return () => document.removeEventListener('click', onClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowFooter(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const labelFor = (val) => {
        if (val === 'all') return `${t('siteRoot.aboutPage.portfolioPage.selectTitle')}`;
        return val;
    };
    const getLocalizedName = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az": return `${item?.title || ""}`.trim();
            case "en": return `${item?.titleEng || ""}`.trim();
            default: return `${item?.title || ""}`.trim();
        }
    };
    const normalize = (s) =>
        (s || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");

    const filteredProjects = useMemo(() => {
        const q = normalize(query);
        return myProjects?.filter(p => {
            const catOk = selected === 'all'
                ? true
                : (p?.categoryType || '').toLowerCase() === selected.toLowerCase();

            const title = getLocalizedName(p, i18n.language);
            const searchOk = q ? normalize(title).includes(q) : true;

            return catOk && searchOk;
        });
    }, [myProjects, selected, query, i18n.language]);

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
                            <div className="filteringBox">
                                <SearchBox
                                    value={query}
                                    onChange={(e) => setQuery(e)}
                                    placeholder={t('siteRoot.common.searchProject') || 'Search Product'} />
                                <div
                                    className={`select ${isOpen ? 'open' : ''}`}
                                    ref={selectRef}
                                    onClick={() => setIsOpen(o => !o)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="option">
                                        {labelFor(selected)}
                                        <IoChevronDownOutline className="icon" />
                                    </div>

                                    {isOpen && (
                                        <div className="menu" onClick={e => e.stopPropagation()}>
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    className={`item ${selected === cat ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setSelected(cat);
                                                        setIsOpen(false);
                                                    }}
                                                    type="button"
                                                >
                                                    {labelFor(cat)}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* {filteredProjects?.map((work) => (
                            <WorkCard key={work.id} item={work} />
                        ))} */}

                        {isLoading ? (
                            <div className="listState">{t('siteRoot.common.loading') || 'Loading…'}</div>
                        ) : filteredProjects.length ? (
                            filteredProjects.map(work => <WorkCard key={work.id} item={work} />)
                        ) : (
                            <div className="listState">{t('siteRoot.common.nothingFound') || 'Nothing found'}</div>
                        )}
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


