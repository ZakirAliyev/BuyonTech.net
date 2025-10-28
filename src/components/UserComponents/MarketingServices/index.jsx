import './index.scss'
import marketingVoice from "/src/assets/marketing-voice.svg"
import brandSvg from "/src/assets/brandSvg.svg"
import marketingCamara from "/src/assets/marketingCamara.svg"
import socialSvg from "/src/assets/socialSvg.svg"
import contentSvg from "/src/assets/contentSvg.svg"
import analytkSvg from "/src/assets/analytkSvg.svg"
import strategySvg from "/src/assets/strategySvg.svg"
import seoSvg from "/src/assets/seoSvg.svg"
import { useTranslation } from 'react-i18next'

function MarketingServices() {
    const { t } = useTranslation()
    return (
        <section id={"marketingServices"}>
            <div className={"container"}>
                <div className={"servicesText"}>{t("siteRoot.homePageMarketing.marketingServices.title")}</div>
                <div className="cardBoxs">
                    <div className="cardBox1 cardBox2">
                        <div className="firstCard cubCard allCards">
                            <img src={marketingVoice} alt="marketingVoice" />
                            <div className="textBox">
                                <h2>
                                    {t("siteRoot.homePageMarketing.marketingServices.digitalTitle")}
                                </h2>
                                <p>
                                    {t("siteRoot.homePageMarketing.marketingServices.digitalDesc")}
                                </p>
                            </div>
                        </div>
                        <div className="secondCard cubCard allCards">
                            <img src={brandSvg} alt="marketingVoice" />
                            <div className="textBox">
                                <h2>{t("siteRoot.homePageMarketing.marketingServices.brandingTitle")}</h2>
                                <p>{t("siteRoot.homePageMarketing.marketingServices.brandingDesc")}</p>
                            </div>
                        </div>
                        <div className="thirdCard duzCard2 cubCard allCards">
                            <img src={marketingCamara} alt="marketingVoice" />
                            <div className="textBox">
                                <h2>{t("siteRoot.homePageMarketing.marketingServices.productionTitle")}</h2>
                                <p>{t("siteRoot.homePageMarketing.marketingServices.productionDesc")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="cardBox1">

                        <div className="fourthCard duzCard allCards">
                            <div className="textBox">
                                <h2>{t("siteRoot.homePageMarketing.marketingServices.socialTitle")}</h2>
                                <p>{t("siteRoot.homePageMarketing.marketingServices.socialDesc")}</p>
                            </div>
                            <img src={socialSvg} alt="socialSvg" />
                        </div>
                        <div className="fifthCard duzCard allCards">
                            <div className="textBox">
                                <h2>{t("siteRoot.homePageMarketing.marketingServices.contentTitle")}</h2>
                                <p>{t("siteRoot.homePageMarketing.marketingServices.contentDesc")}</p>
                            </div>
                            <img src={contentSvg} alt="contentSvg" />
                        </div>

                    </div>
                    <div className="cardBox1">
                        <div className="sixthCard cubCard allCards">
                            <img src={analytkSvg} alt="analytkSvg" />
                            <div className="textBox">
                                <h2>{t("siteRoot.homePageMarketing.marketingServices.analyticsTitle")}</h2>
                                <p>{t("siteRoot.homePageMarketing.marketingServices.analyticsDesc")}</p>

                            </div>
                        </div>
                        <div className="seventhCard cubCard allCards">
                            <img src={strategySvg} alt="strategySvg" />
                            <div className="textBox">
                                <h2>{t("siteRoot.homePageMarketing.marketingServices.strategyTitle")}</h2>
                                <p>{t("siteRoot.homePageMarketing.marketingServices.strategyDesc")}</p>
                            </div>
                        </div>
                        <div className="eightCard duzCard2 cubCard allCards">
                            <img src={seoSvg} alt="seoSvg" />
                            <div className="textBox">
                                <h2>{t("siteRoot.homePageMarketing.marketingServices.seoTitle")}</h2>
                                <p>{t("siteRoot.homePageMarketing.marketingServices.seoDesc")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MarketingServices;
