import React from 'react'
import './index.scss'
import about1 from '/src/assets/about1.svg'
import about2 from '/src/assets/about2.svg'
import about3 from '/src/assets/about3.svg'
import about4 from '/src/assets/about4.svg'
import about5 from '/src/assets/about5.svg'
import CountUp from "react-countup";
import { useTranslation } from 'react-i18next'

const AboutPageSecond = () => {
    const { t } = useTranslation()
    return (
        <section id='aboutPageSecond'>
            <div className="container">
                <div className="aboutSecond">
                    <div className="aboutSecondTexts">
                        <h2>
                            {t("siteRoot.aboutPage.secondSection.titlePart1")}
                            <span className="span1"> {t("siteRoot.aboutPage.secondSection.titlePart2")}</span>{" "}
                            {t("siteRoot.aboutPage.secondSection.titlePart3")}
                            <span className="span2">  {t("siteRoot.aboutPage.secondSection.titlePart4")}</span> {' '}
                            {t("siteRoot.aboutPage.secondSection.titlePart5")}
                        </h2>
                        <div className="text134">
                            <p>{t("siteRoot.aboutPage.secondSection.description")}</p>
                        </div>
                    </div>
                    <div className="aboutSecondCards">
                        <div className="card1 cards">
                            <div className="number">
                                <CountUp
                                    start={0}
                                    end={200}
                                    duration={2.5}
                                    separator=","
                                    {...(typeof window !== "undefined" && { enableScrollSpy: true })}
                                />
                                +</div>
                            <div className="text">{t("siteRoot.aboutPage.secondSection.cards.completedProjects")}</div>
                            <div className="svg">
                                <img src={about1} alt="svg1" />
                            </div>
                        </div>
                        <div className="card2 cards">
                            <div className="number">

                                <CountUp
                                    start={0}
                                    end={10}
                                    duration={2.5}
                                    separator=","
                                    {...(typeof window !== "undefined" && { enableScrollSpy: true })}
                                />
                                M+

                            </div>
                            <div className="text">{t("siteRoot.aboutPage.secondSection.cards.adSpend")}</div>
                            <div className="svg">
                                <img src={about2} alt="svg2" />

                            </div>
                        </div>
                        <div className="card3 cards  ">
                            <div className="number">
                                <CountUp
                                    start={0}
                                    end={13}
                                    duration={2.5}
                                    separator=","
                                    {...(typeof window !== "undefined" && { enableScrollSpy: true })}
                                />
                                +</div>
                            <div className="text">{t("siteRoot.aboutPage.secondSection.cards.yearExperience")}</div>
                            <div className="svg">
                                <img src={about3} alt="svg3" />

                            </div>
                        </div>
                        <div className="card4 cards">
                            <div className="number">
                                <CountUp
                                    start={0}
                                    end={8}
                                    duration={2.5}
                                    separator=","
                                    {...(typeof window !== "undefined" && { enableScrollSpy: true })}
                                />
                                +</div>
                            <div className="text">{t("siteRoot.aboutPage.secondSection.cards.country")}</div>
                            <div className="svg">
                                <img src={about4} alt="svg4" />
                            </div>
                        </div>
                        <div className="card5 cards">
                            <div className="number">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="27" viewBox="0 0 60 27" fill="none">
                                    <path d="M46.5 0C53.95 0 60 5.95 60 13.45C60 20.85 53.95 26.875 46.5 26.875C42.875 26.875 39.5 25.475 36.95 22.95L30 16.8L22.925 23.075C20.5 25.5 17.1 26.9 13.5 26.9C6.05 26.9 0 20.85 0 13.45C0 6.05 6.05 0 13.5 0C17.1 0 20.5 1.4 23.05 3.95L30 10.1L37.075 3.825C39.5 1.4 42.9 0 46.5 0ZM19.5 19.425L26.25 13.45L19.6 7.575C17.9 5.875 15.775 5 13.5 5C8.825 5 5 8.775 5 13.45C5 18.125 8.825 21.9 13.5 21.9C15.775 21.9 17.9 21.025 19.5 19.425ZM40.5 7.475L33.75 13.45L40.4 19.325C42.1 21.025 44.25 21.9 46.5 21.9C51.175 21.9 55 18.125 55 13.45C55 8.775 51.175 5 46.5 5C44.225 5 42.1 5.875 40.5 7.475Z" fill="black" />
                                </svg>
                            </div>
                            <div className="text">{t("siteRoot.aboutPage.secondSection.cards.coffeeDrank")}</div>
                            <div className="svg">
                                <img src={about5} alt="svg5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutPageSecond
