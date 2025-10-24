// import './index.scss'
// import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
// import { IoChevronDownOutline } from "react-icons/io5";
// import WorkCard from "../../../components/UserComponents/WorkCard/index.jsx";
// import mid from "/src/assets/mid.png";
// import nas from "/src/assets/nas.png";
// import { useEffect, useMemo, useRef, useState } from 'react';
// import Footer from '../../../components/UserComponents/Footer/index.jsx';
// import { Helmet } from 'react-helmet';
// import { useTranslation } from 'react-i18next';
// import { useGetAllProjectsQuery } from '../../../services/apis/userApi.jsx';
// import SearchBox from '../../../components/UserComponents/OurWorksSearchBox/index.jsx';
// import SearchBoxWithFilter from '../../../components/Admin/FormElements/SearchBoxWithFilter/index.jsx';

// function OurWorksPage() {
//     const [footerHeight, setFooterHeight] = useState(0);
//     const [showFooter, setShowFooter] = useState(false);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//     const { t, i18n } = useTranslation()
//     const { data: getAllProjects, isLoading, isError, isFetching } = useGetAllProjectsQuery()
//     const myProjects = getAllProjects?.data
//     const [query, setQuery] = useState("");
//     // ▼ Dropdown state
//     const [isOpen, setIsOpen] = useState(false);
//     const [selected, setSelected] = useState('all'); // 'all' | 'Development' | 'Marketing' | ...

//     // ▼ Unikal kateqoriyalar (serverdən gələnlərdən avtomatik)
//     const categories = useMemo(() => {
//         const set = new Set();
//         set.add('Development');
//         set.add('Marketing');
//         return ['all', ...Array.from(set)];
//     }, [myProjects]);

//     // const filteredProjects = useMemo(() => {
//     //     if (selected === 'all') return myProjects;
//     //     return myProjects.filter(p => (p?.categoryType || '').toLowerCase() === selected.toLowerCase());
//     // }, [selected, myProjects]);
//     const selectRef = useRef(null);
//     useEffect(() => {
//         const onClickOutside = (e) => {
//             if (selectRef.current && !selectRef.current.contains(e.target)) setIsOpen(false);
//         };
//         document.addEventListener('click', onClickOutside);
//         return () => document.removeEventListener('click', onClickOutside);
//     }, []);

//     useEffect(() => {
//         const timer = setTimeout(() => setShowFooter(true), 0);
//         return () => clearTimeout(timer);
//     }, []);

//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const labelFor = (val) => {
//         if (val == 'all') return `${t('siteRoot.portfolioPage.selectTitle')}`;
//         return val;
//     };
//     const getLocalizedName = (item, lang) => {
//         switch (lang?.split("-")[0]) {
//             case "az": return `${item?.title || ""}`.trim();
//             case "en": return `${item?.titleEng || ""}`.trim();
//             default: return `${item?.title || ""}`.trim();
//         }
//     };
//     const normalize = (s) =>
//         (s || "")
//             .toLowerCase()
//             .normalize("NFD")
//             .replace(/\p{Diacritic}/gu, "");

//     const filteredProjects = useMemo(() => {
//         const q = normalize(query);
//         return myProjects?.filter(p => {
//             const catOk = selected === 'all'
//                 ? true
//                 : (p?.categoryType || '').toLowerCase() === selected.toLowerCase();

//             const title = getLocalizedName(p, i18n.language);
//             const searchOk = q ? normalize(title).includes(q) : true;

//             return catOk && searchOk;
//         });
//     }, [myProjects, selected, query, i18n.language]);

//     return (


//         <section id={"ourWorksPage"} style={{ overflow: "hidden", position: "relative", background: "#fff" }}>
//             <Helmet>
//                 <title>
//                     {
//                         t('siteRoot.header.links.portfolio')
//                     }
//                 </title>
//             </Helmet>
//             <div style={{
//                 position: "relative",
//                 zIndex: 100,
//                 background: "var(--bg-color)",
//             }}>
//                 <Navbar />
//                 <div className={"container"}>
//                     <div className={"ourWorks"} style={{ paddingBottom: "16px" }}>
//                         <div className={"textWrapper"}>
//                             <h2>
//                                 {
//                                     t('siteRoot.portfolioPage.title')
//                                 }
//                             </h2>
//                             <div className="filteringBox">
//                                 <SearchBoxWithFilter
//                                     value={query}
//                                     onChange={(val) => setQuery(val)}
//                                     placeholder={t('siteRoot.common.searchProject')}
//                                     onFilterSearch={({ start, end }) => {
//                                         if (!start || !end) return;

//                                         // 🔹 dd.MM.yyyy → ISO çevirmə funksiyası
//                                         const parseDate = (dateStr) => {
//                                             const [day, month, year] = dateStr.split(".");
//                                             return new Date(`${year}-${month}-${day}`);
//                                         };

//                                         const startDate = parseDate(start);
//                                         const endDate = parseDate(end);

//                                         // 🔹 createTime dd.MM.yyyy formatındadır, ona görə eyni parse tətbiq edirik
//                                         const filtered = myProjects?.filter((p) => {
//                                             if (!p.createTime) return false;
//                                             const created = parseDate(p.createTime);
//                                             return created >= startDate && created <= endDate;
//                                         });
//                                         console.log("Filtered projects:", filtered);
//                                     }}
//                                 />

//                                 <div
//                                     className={`select ${isOpen ? 'open' : ''}`}
//                                     ref={selectRef}
//                                     onClick={() => setIsOpen(o => !o)}
//                                     role="button"
//                                     tabIndex={0}
//                                 >
//                                     <div className="option">
//                                         {labelFor(selected)}
//                                         <IoChevronDownOutline className="icon" />
//                                     </div>

//                                     {isOpen && (
//                                         <div className="menu" onClick={e => e.stopPropagation()}>
//                                             {categories.map(cat => (
//                                                 <button
//                                                     key={cat}
//                                                     className={`item ${selected === cat ? 'active' : ''}`}
//                                                     onClick={() => {
//                                                         setSelected(cat);
//                                                         setIsOpen(false);
//                                                     }}
//                                                     type="button"
//                                                 >
//                                                     {labelFor(cat)}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                         {/* {filteredProjects?.map((work) => (
//                             <WorkCard key={work.id} item={work} />
//                         ))} */}

//                         {isLoading ? (
//                             <div className="listState">{t('siteRoot.common.loading') || 'Loading…'}</div>
//                         ) : filteredProjects.length ? (
//                             filteredProjects.map(work => <WorkCard key={work.id} item={work} />)
//                         ) : (
//                             <div className="listState">{t('siteRoot.common.nothingFound') || 'Nothing found'}</div>
//                         )}
//                     </div>
//                 </div>

//             </div>
//             {showFooter && (
//                 windowWidth >= 992 ? (
//                     <>
//                         <div style={{
//                             height: `${footerHeight}px`,
//                             position: "relative",
//                             zIndex: -90,
//                         }}></div>
//                         <Footer setFooterHeight={setFooterHeight} />
//                     </>
//                 ) : (
//                     <Footer setFooterHeight={setFooterHeight} />
//                 )
//             )}
//         </section>
//     );
// }

// export default OurWorksPage;


import './index.scss';
import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import { IoChevronDownOutline } from "react-icons/io5";
import WorkCard from "../../../components/UserComponents/WorkCard/index.jsx";
import Footer from '../../../components/UserComponents/Footer/index.jsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useGetAllProjectsQuery } from '../../../services/apis/userApi.jsx';
import SearchBoxWithFilter from '../../../components/Admin/FormElements/SearchBoxWithFilter/index.jsx';

function OurWorksPage() {
    const [footerHeight, setFooterHeight] = useState(0);
    const [showFooter, setShowFooter] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { t, i18n } = useTranslation();
    const { data: getAllProjects, isLoading } = useGetAllProjectsQuery();
    const myProjects = getAllProjects?.data || [];

    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState("all");
    const [dateRange, setDateRange] = useState({ start: null, end: null });

    const selectRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const onClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("click", onClickOutside);
        return () => document.removeEventListener("click", onClickOutside);
    }, []);

    const [minMaxRange, setMinMaxRange] = useState({ min: "", max: "" });

    useEffect(() => {
        if (myProjects?.length) {
            const validDates = myProjects
                .map(p => {
                    if (!p.createTime) return null;
                    if (p.createTime.includes("T")) return new Date(p.createTime);
                    if (p.createTime.includes(".")) {
                        const [d, m, y] = p.createTime.split(".");
                        return new Date(`${y}-${m}-${d}`);
                    }
                    return null;
                })
                .filter(Boolean);

            if (validDates.length) {
                const min = new Date(Math.min(...validDates));
                const max = new Date(Math.max(...validDates));

                const format = (d) =>
                    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                        d.getDate()
                    ).padStart(2, "0")}`;

                setMinMaxRange({ min: format(min), max: format(max) });
            }
        }
    }, [myProjects]);


    // Handle footer show and resize
    useEffect(() => {
        const timer = setTimeout(() => setShowFooter(true), 0);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const labelFor = (val) => (val === "all" ? t("siteRoot.portfolioPage.selectTitle") : val);

    const getLocalizedName = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az": return item?.title?.trim() || "";
            case "en": return item?.titleEng?.trim() || "";
            default: return item?.title?.trim() || "";
        }
    };

    const normalize = (s) =>
        (s || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");



    const filteredProjects = useMemo(() => {
        const q = normalize(query);

        // ✅ Date parse helper
        const safeParse = (val) => {
            if (!val) return null;

            // dd.mm.yyyy formatı
            if (val.includes(".")) {
                const [day, month, year] = val.split(".");
                return new Date(`${year}-${month}-${day}T00:00:00`);
            }

            // yyyy-mm-dd formatı
            if (val.includes("-")) {
                return new Date(`${val}T00:00:00`);
            }

            return null;
        };

        const startDate = safeParse(dateRange.start);
        const endDate = safeParse(dateRange.end);

        return (myProjects || []).filter((p) => {
            const title = getLocalizedName(p, i18n.language);
            const searchOk = q ? normalize(title).includes(q) : true;
            const catOk =
                selected === "all"
                    ? true
                    : (p?.categoryType || "").toLowerCase() === selected.toLowerCase();

            let dateOk = true;

            // ✅ Əgər interval seçilibsə ancaq onda filter et
            if (startDate && endDate) {
                const rawCreated = p.createTime;
                let created = null;

                if (rawCreated) {
                    // 1️⃣ ISO formatdadırsa (2025-10-22T...)
                    if (rawCreated.includes("T")) {
                        created = new Date(rawCreated);
                    }
                    // 2️⃣ dd.MM.yyyy formatındadırsa
                    else if (rawCreated.includes(".")) {
                        const [day, month, year] = rawCreated.split(".");
                        created = new Date(`${year}-${month}-${day}T00:00:00`);
                    }
                }

                if (created && !isNaN(created)) {
                    const createdTime = created.setHours(0, 0, 0, 0);
                    const startTime = startDate.setHours(0, 0, 0, 0);
                    const endTime = endDate.setHours(23, 59, 59, 999);
                    dateOk = createdTime >= startTime && createdTime <= endTime;
                } else {
                    dateOk = false;
                }
            }

            return searchOk && catOk && dateOk;
        });
    }, [query, selected, dateRange, i18n.language, myProjects]);

    console.log(filteredProjects)
    return (
        <section
            id="ourWorksPage"
            style={{ overflow: "hidden", position: "relative", background: "#fff" }}
        >
            <Helmet>
                <title>{t("siteRoot.header.links.portfolio")}</title>
            </Helmet>

            <div
                style={{
                    position: "relative",
                    zIndex: 100,
                    background: "var(--bg-color)",
                }}
            >
                <Navbar />
                <div className="container">
                    <div className="ourWorks" style={{ paddingBottom: "16px" }}>
                        <div className="textWrapper">
                            <h2>{t("siteRoot.portfolioPage.title")}</h2>

                            <div className="filteringBox">
                                {/* 🔍 Search + Date Filter */}
                                <SearchBoxWithFilter
                                    value={query}
                                    onChange={(val) => setQuery(val)}
                                    placeholder={t("siteRoot.common.searchProject")}
                                    onFilterSearch={({ start, end }) => setDateRange({ start, end })}
                                    minMaxRange={minMaxRange}
                                />

                                {/* ▼ Category dropdown */}
                                <div
                                    className={`select ${isOpen ? "open" : ""}`}
                                    ref={selectRef}
                                    onClick={() => setIsOpen((o) => !o)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="option">
                                        {labelFor(selected)}
                                        <IoChevronDownOutline className="icon" />
                                    </div>

                                    {isOpen && (
                                        <div className="menu" onClick={(e) => e.stopPropagation()}>
                                            {["all", "Development", "Marketing"].map((cat) => (
                                                <button
                                                    key={cat}
                                                    className={`item ${selected === cat ? "active" : ""}`}
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

                        {/* ▼ Project list */}
                        {isLoading ? (
                            <div className="listState">{t("siteRoot.common.loading")}</div>
                        ) : filteredProjects.length ? (
                            filteredProjects.map((work) => (
                                <WorkCard key={work.id} item={work} />
                            ))
                        ) : (
                            <div className="listState">{t("siteRoot.common.nothingFound")}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* ▼ Footer */}
            {showFooter && (
                windowWidth >= 992 ? (
                    <>
                        <div
                            style={{
                                height: `${footerHeight}px`,
                                position: "relative",
                                zIndex: -90,
                            }}
                        ></div>
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

