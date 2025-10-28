

import './index.scss'
import mobileApp from "/src/assets/mobileApp.png"
import macbook from "/src/assets/macbook.png"
import tablet from "/src/assets/tablet.png"
import design from "/src/assets/design.png"
import adminPanel from "/src/assets/adminPanel.png"
import seo from "/src/assets/seo.png"
import technic from "/src/assets/technic.png"
import dnsImage from '/src/assets/dnsImage.png'
import payments from '/src/assets/payments.png'
import { useTranslation } from 'react-i18next'
function ServicesGrid() {
    const { t } = useTranslation()
    return (
        <section id={"servicesGrid"}>
            <div className={"container"}>
                <div className={"servicesText"}>    {t("siteRoot.homePage.serviceSection.title")}</div>
                <div className="parent">
                    <div className="div firstDiv div1">
                        <h2>{t("siteRoot.homePage.serviceSection.mobileAppTitle")}</h2>
                        <p>{t("siteRoot.homePage.serviceSection.mobileAppDesc")}</p>
                        <img src={mobileApp} alt={"Image"} className={"mobileApp"} />
                    </div>
                    <div className="secondDiv div2">
                        <div>
                            <h2>{t("siteRoot.homePage.serviceSection.frontendTitle")}</h2>
                            <p>{t("siteRoot.homePage.serviceSection.frontendDesc")}</p>
                        </div>
                        <img src={macbook} alt={"Image"} className={"macbook"} />
                    </div>
                    <div className="div div3 thirdDiv div100" style={{
                        color: "black"
                    }}>
                        <div>
                            <h2>{t("siteRoot.homePage.serviceSection.backendTitle")}</h2>
                            <p>{t("siteRoot.homePage.serviceSection.backendDesc")}</p> </div>
                        <img src={tablet} alt={"Image"} className={"tablet"} />
                    </div>
                    <div className="div fourthDiv div4">
                        <div>
                            <h2>{t("siteRoot.homePage.serviceSection.domainTitle")}</h2>
                            <p>{t("siteRoot.homePage.serviceSection.domainDesc")}</p>
                        </div>
                        <img src={dnsImage} alt={"Image"} className={"dnsImage"} />
                    </div>
                    <div className="divdivdiv fifthDiv div5">
                        <div>
                            <h2>{t("siteRoot.homePage.serviceSection.designTitle")}</h2>
                            <p style={{
                                maxWidth: '280px',
                                width: '100%'
                            }}>{t("siteRoot.homePage.serviceSection.designDesc")}</p>
                        </div>
                        <img src={design} alt={"Image"} className={"design"} />
                    </div>
                    <div className="divdivdiv sixthDiv div6" style={{
                        color: "black"
                    }}>
                        <div>
                            <h2>{t("siteRoot.homePage.serviceSection.adminTitle")}</h2>
                            <p style={{
                                maxWidth: '280px',
                                width: '100%'
                            }}>{t("siteRoot.homePage.serviceSection.adminDesc")}</p>
                        </div>
                        <img src={adminPanel} alt={"Image"} className={"adminPanel"} />
                    </div>
                    <div className="div div3 div100 div7">
                        <div>
                            <h2>{t("siteRoot.homePage.serviceSection.paymentTitle")}</h2>
                            <p>{t("siteRoot.homePage.serviceSection.paymentDesc")}</p>
                        </div>
                        <img src={payments} alt={"Image"} className={"payments"} />
                    </div>
                    <div className="div div3 div100 div8" style={{
                        color: "black"
                    }}>
                        <div>
                            <h2>{t("siteRoot.homePage.serviceSection.seoTitle")}</h2>
                            <p>{t("siteRoot.homePage.serviceSection.seoDesc")}</p>
                        </div>
                        <img src={seo} alt={"Image"} className={"seo"} />
                    </div>
                    <div className="div div3 div100 div9">
                        <div>
                            <h2>{t("siteRoot.homePage.serviceSection.technicTitle")}</h2>
                            <p>{t("siteRoot.homePage.serviceSection.technicDesc")}</p>
                        </div>
                        <img src={technic} alt={"Image"} className={"seo"} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicesGrid;