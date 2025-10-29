import './index.scss'
import { useTranslation } from "react-i18next";
import mavisi from "/src/assets/mavisi.png"
import sarisi from "/src/assets/sarisi.png"
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router';

function Footer({ setFooterHeight }) {
    const { t } = useTranslation();
    const footerRef = useRef(null);

    useEffect(() => {
        if (footerRef.current) {
            let newHeight = footerRef.current.offsetHeight;

            if (window.innerWidth > 992) {
                newHeight += 100;
            }

            footerRef.current.style.height = newHeight + "px";
            setFooterHeight(newHeight);
        }
    }, [setFooterHeight]);
    const navigate = useNavigate()
    const handleClickLink = (navigator) => {
        navigate(navigator)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <section id="footer" ref={footerRef}>
            <div className="container">
                <div className="row">
                    <div className="col-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="title">
                            {t("siteRoot.footer.sections.navigation.title")}
                        </div>
                        <p onClick={() => {
                            handleClickLink('/')
                        }}>
                            {t("siteRoot.footer.sections.navigation.links.development")}

                        </p>
                        <p onClick={() => {
                            handleClickLink('/')
                        }}>
                            {t("siteRoot.footer.sections.navigation.links.marketing")}

                        </p>
                        <p onClick={() => {
                            handleClickLink('/about')
                        }}>
                            {t("siteRoot.footer.sections.navigation.links.about")}

                        </p>
                        <p onClick={() => {
                            handleClickLink('/our-works')
                        }}>
                            {t("siteRoot.footer.sections.navigation.links.portfolio")}

                        </p>
                    </div>
                    <div className="col-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="title">
                            {t("siteRoot.footer.sections.social.title")}

                        </div>
                        <p>
                            {t("siteRoot.footer.sections.social.links.instagram")}

                        </p>
                        <p>
                            {t("siteRoot.footer.sections.social.links.tiktok")}

                        </p>
                        <p>
                            {t("siteRoot.footer.sections.social.links.facebook")}

                        </p>
                        <p>
                            {t("siteRoot.footer.sections.social.links.linkedin")}

                        </p>
                        <p>
                            {t("siteRoot.footer.sections.social.links.whatsapp")}

                        </p>
                    </div>
                    <div className="col-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="title">
                            {t("siteRoot.footer.sections.contact.title")}

                        </div>
                        <p>+994 10 265 59 90</p>
                        <p>info@buyontech.net</p>
                    </div>
                </div>
                <div className="row row70">
                    <div className="portugal col-6 col-md-12 col-xs-12 col-sm-12">
                        {t("siteRoot.footer.copyright.textLeft")}

                    </div>
                    <div className="col-6 col-md-12 col-xs-12 col-sm-12 portugal" style={{ textAlign: "right" }}>
                        {t("siteRoot.footer.copyright.textRight")}

                    </div>
                </div>
                <div className="bottomFooter">
                    {t("siteRoot.footer.bottom")}

                </div>
                <img src={mavisi} alt="Image" className="mavisi" />
                <img src={sarisi} alt="Image" className="sarisi" />
                <div className="design"></div>
            </div>
        </section>
    );
}

export default Footer;
