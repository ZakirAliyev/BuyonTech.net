// WorkCard.jsx
import './index.scss'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function WorkCard({ item }) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const imgLocal = 'https://api.buyontech.net/files/projects/cards/'

    const getLocalizedName = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az":
                return `${item?.title || ""} `.trim();
            case "en":
                return `${item?.titleEng || ""} `.trim();
            default:
                return `${item?.title || ""}`.trim();
        }
    };
    const getLocalizedSubName = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az":
                return `${item?.subTitle || ""} `.trim();
            case "en":
                return `${item?.subTitleEng || ""} `.trim();
            default:
                return `${item?.subTitle || ""}`.trim();
        }
    };
    const getLocalizedCountry = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az":
                return item?.projectType || "";
            case "en":
                return item?.projectTypeEng || "";
            default:
                return item?.projectType || "";
        }
    };
    return (
        <section id="workCard" style={{ cursor: "pointer" }} onClick={() => {
            navigate(`/our-works/${item?.id}`)
       setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 200);

        }}>
            <div className="container">
                <div
                    className="row box"
                    style={{
                        background: `url("${imgLocal + item?.cardImage}") no-repeat center center`,
                        backgroundSize: 'cover'
                    }}
                >
                    <div className="boxLeft col-4">
                        <h2>{
                            getLocalizedName(item, i18n.language)}</h2>
                        <p>
                            {
                                getLocalizedSubName(item, i18n.language)}
                        </p>
                    </div>

                    <div className="col-4 midImageWrapper">
                        <div className="midImageBackdrop" aria-hidden="true" />
                        <img src={imgLocal + item?.cardImage} alt={getLocalizedName(item, i18n.language)} className="midImage" />
                    </div>

                    <div className="boxLeft1 col-4">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: '18px'
                        }}>
                            <div className="detailBlock detailBlock-year">
                                <p>{t("siteRoot.portfolioPage.workCard.year")}</p>
                                <div className="pe">{item?.year}</div>
                            </div>
                            <div className="detailBlock detailBlock-category">
                                <p>{t("siteRoot.portfolioPage.workCard.category")}</p>

                                <div className="p">
                                    {
                                        getLocalizedCountry(item, i18n.language)}
                                </div>
                            </div>
                        </div>
                        <div className="detailBlock detailBlock-services">
                            <p>{t("siteRoot.portfolioPage.workCard.services")}</p>

                            {item?.services && item?.services?.slice(0,3).map((service, i) => (
                                <div className="p" key={i}>{service?.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WorkCard;
