import React from 'react'
import './index.scss'
import aboutThird1 from '/src/assets/aboutThird1.svg'
import aboutThird2 from '/src/assets/aboutThird2.svg'
import aboutThird3 from '/src/assets/aboutThird3.svg'
import aboutThird4 from '/src/assets/aboutThird4.svg'
import aboutThird5 from '/src/assets/aboutThird5.svg'
import aboutThird6 from '/src/assets/aboutThird6.svg'
import { useTranslation } from 'react-i18next'
const AboutPageThird = () => {
    const { t } = useTranslation()
    return (
        <section id='aboutPageThird'>
            <div className="container">
                <div className="aboutThirdBox">
                    <div className="aboutThirdCard aboutThirdCard1">
                        <div className="thirdTextBox">
                            <div className="svg">
                                <img src={aboutThird1} alt="about-svg1" />
                            </div>
                            <h2>{t("siteRoot.aboutPage.thirdSection.visionTitle")}</h2>
                            <p>{t("siteRoot.aboutPage.thirdSection.visionText")}</p>
                        </div>
                        <div className="thirdImageBox">
                            <img src={aboutThird3} className='thirdImage1' alt="svgLeft" />
                            <img src={aboutThird5} className='thirdImage2' alt="svgLeft" />
                        </div>
                    </div>
                    <div className="aboutThirdCard aboutThirdCard2">
                        <div className="thirdImageBox">
                            <img src={aboutThird4} className='thirdImage1' alt="svgRight" />
                            <img src={aboutThird6} className='thirdImage2' alt="svgRight" />
                        </div>
                        <div className="thirdTextBox">
                            <div className="svg">
                                <img src={aboutThird2} alt="about-svg2" />

                            </div>
                            <h2>{t("siteRoot.aboutPage.thirdSection.missionTitle")}</h2>
                            <p>{t("siteRoot.aboutPage.thirdSection.missionText")}</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutPageThird
