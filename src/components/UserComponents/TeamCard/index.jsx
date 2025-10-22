import React from 'react'
import professor from '/src/assets/professor.png'
import './index.scss'
import { useTranslation } from 'react-i18next'
const TeamCard = ({ item }) => {
    const { i18n } = useTranslation()
    const imgLocal = 'https://api.buyontech.net/files/ourteam/'

    const getLocalizedName = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az":
                return `${item?.fullName || ""} `.trim();
            case "en":
                return `${item?.fullNameEng || ""} `.trim();
            default:
                return `${item?.fullName || ""}`.trim();
        }
    };
    const getLocalizedCountry = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az":
                return item?.position || "";
            case "en":
                return item?.positionEng || "";
            default:
                return item?.position || "";
        }
    };
    return (
        <div id="teamCard">
            <div className="imageBox">
                <img src={imgLocal + item?.cardImage} alt="" />
            </div>
            <div className="absoluteBox">
                <div className="absoluteBoxInside">
                    <h2>
                        {getLocalizedName(item, i18n.language)}
                    </h2>
                    <p>
                        {getLocalizedCountry(item, i18n.language)}

                    </p>
                </div>
            </div>
        </div>
    )
}

export default TeamCard
