import React from 'react'
import './index.scss'
import professor from '/src/assets/professor.png'
import { useTranslation } from 'react-i18next';

const AboutPageFirst = () => {
    const { t } = useTranslation();
    return (
        <section id='aboutPageFirst'>
            <div className="container">
                <div className="aboutPageFirstBox">
                    <div className="row">
                        <div className="ortalama col-8 col-md-8 col-sm-12 col-xs-12">
                            <div className="textBox">
                                <h1>{t("siteRoot.aboutPage.firstSection.title")}</h1>
                                <p>{t("siteRoot.aboutPage.firstSection.text")}</p>
                            </div>
                        </div>
                        <div className=" colImage col-4 col-md-4 col-sm-12 col-xs-12">
                            <img src={professor} alt="" className={"professor"} />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default AboutPageFirst
