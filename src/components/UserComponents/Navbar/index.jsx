import { useRef, useState } from 'react';
import './index.scss'
import { useTranslation } from "react-i18next";
import { TfiWorld } from "react-icons/tfi";
import logo from "/src/assets/sariLogo.webp"
import { useNavigate } from "react-router";

import MobileMenu from '../MobileMenu';
import LanguageSelectForHome from '../../SwitcherComponents/LanguageSwitcherForSite';

function Navbar() {
    const [open, setOpen] = useState(false);


    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleClickLink = (navigator) => {
        navigate(navigator)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    const menuRef = useRef(null);

    const handleClickOutside = (e) => {
        // Əgər klik edilən yer menyunun özündən və ya onun uşaqlarından deyilsə
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false);
        }
    };
    return (
        <>
            <section id={"navbar"}>
                <div className={"container"}>
                    <nav>
                        <div className={"links"}>
                            <div onClick={() => {
                                handleClickLink('/')
                            }} className={`link ${location.pathname == '/' ? "activeNav" : ""}`}>
                                {t("siteRoot.header.links.home")}
                            </div>
                            <div onClick={() => {
                                handleClickLink('/about')
                            }} className={`link ${location.pathname == '/about' ? "activeNav" : ""}`}>
                                {t("siteRoot.header.links.about")}

                            </div>
                            <div onClick={() => {
                                handleClickLink('/our-works')
                            }} className={`link ${location.pathname == '/our-works' ? "activeNav" : ""}`}>
                                {t("siteRoot.header.links.portfolio")}

                            </div>

                        </div>
                        <img src={`${logo}`} alt={"Logo"} onClick={() => navigate("/")} />
                        <div className={"buttonWrapper"}>
                            <button className='contactLink' onClick={() => {
                                handleClickLink('/contact')
                            }}>
                                {t("siteRoot.header.button")}

                            </button>
                            {/* <TfiWorld className={"icon"} style={{ fontSize: "20px" }} /> */}
                            <LanguageSelectForHome />
                        </div>
                        <MobileMenu setOpen={setOpen} open={open} />
                    </nav>
                </div>
            </section>


            {open && (
                <div className="menuOverlay"
                    onClick={() => setOpen(false)}
                >
                    <div className="menuBox"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="menuLinks">
                            <div className={` ${location.pathname == '/' ? "activeNav" : ""}`} onClick={() => handleClickLink("/")}>
                                {t("siteRoot.header.links.home")}

                            </div>
                            <div className={` ${location.pathname == '/about' ? "activeNav" : ""}`} onClick={() => handleClickLink("/about")}>
                                {t("siteRoot.header.links.about")}

                            </div>
                            <div className={` ${location.pathname == '/our-works' ? "activeNav" : ""}`} onClick={() => handleClickLink("/our-works")}>
                                {t("siteRoot.header.links.portfolio")}

                            </div>
                            <div className={` ${location.pathname == '/contact' ? "activeNav" : ""}`} onClick={() => handleClickLink("/contact")}>
                                {t("siteRoot.header.links.contact")}

                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;