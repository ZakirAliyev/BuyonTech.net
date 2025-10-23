import React, { useRef } from 'react'
import './index.scss'
import { useTranslation } from 'react-i18next';
const OurWorksPageDetailSecond = ({ oneProje }) => {
    const { i18n } = useTranslation()
    const getLocalizedKey = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az":
                return `${item?.key || ""} `.trim();
            case "en":
                return `${item?.keyEng || ""} `.trim();
            default:
                return `${item?.key || ""}`.trim();
        }
    };
    const getLocalizedValue = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az":
                return `${item?.value || ""} `.trim();
            case "en":
                return `${item?.valueEng || ""} `.trim();
            default:
                return `${item?.value || ""}`.trim();
        }
    };
    return (
        <section id='ourWorksPageDetailSecond'>
            <div className={"container"}>
                <div className={"ourWorksTexts"}>
                    <ul>
                        {
                            oneProje?.descriptions?.map((item, index) => {
                                return <li key={index}>
                                    <h3>
                                        {getLocalizedKey(item, i18n.language)}
                                    </h3>
                                    <p>
                                        {getLocalizedValue(item, i18n.language)}

                                    </p>
                                </li>
                            })
                        }
                        {/* <li>
                            <h3>
                                Elegant Design
                            </h3>
                            <p>We crafted a clean and modern interface that reflects LEGNO’s sophisticated interior design style. The website highlights their portfolio with a minimal yet elegant structure. Every detail was built to emphasize aesthetics and usability.</p>
                        </li>
                        <li>
                            <h3>
                                User Experience
                            </h3>
                            <p>The platform was designed with smooth navigation and intuitive layouts. Visitors can easily explore services, projects, and brand identity without distractions. This seamless experience mirrors the comfort and harmony of LEGNO’s design philosophy.</p>
                        </li>
                        <li>
                            <h3>
                                Brand Identity
                            </h3>
                            <p>
                                The website communicates LEGNO’s unique voice through consistent visuals and storytelling. We combined warm tones and refined typography to align with the brand’s identity. This ensures that every visitor connects instantly with the company’s values.
                            </p>
                        </li> */}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default OurWorksPageDetailSecond
