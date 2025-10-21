import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next';
// import Loading from '../../../../components/OurComponents/Loading';
import { IoClose } from 'react-icons/io5';
import { useGetOneOurTeamsQuery } from '../../../../services/apis/userApi';
import TeamCard from '../../../../components/UserComponents/TeamCard';

const DetailGuest = ({ isOpen, onClose, guestId }) => {
    const { t, i18n } = useTranslation();
    const { data: guestData, isLoading, isError, isFetching } = useGetOneOurTeamsQuery(guestId, {
        skip: !guestId
    });
    const guest = guestData?.data
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
        <div className={`detailGuest ${isOpen ? " activePopupDetail" : ""}`}
            onClick={onClose}
        >
            {
                isLoading || isFetching ? (
                    <div className="loadingWrapper">
                        {/* <Loading /> */}
                    </div>
                ) : isError ? (
                    <p>{t('adminRoot.guestPage.loadError')}</p>
                ) : (
                    <div className="popupInsideDetail">
                        <button className='guestClose' onClick={onClose} aria-label="Close">
                            <IoClose />
                        </button>
                        <div className="col-3 " style={{ padding: "10px" }}
                            onClick={(e) => e.stopPropagation()}

                        >
                            <div className="teamCardAdmin">
                                <div id="teamCard">
                                    <div className="imageBox">
                                        <img src={imgLocal + guest?.cardImage} alt="" />
                                    </div>
                                    <div className="absoluteBox">
                                        <div className="absoluteBoxInside">
                                            <h2>
                                                {getLocalizedName(guest, i18n.language)}
                                            </h2>
                                            <p>
                                                {getLocalizedCountry(guest, i18n.language)}

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default DetailGuest
