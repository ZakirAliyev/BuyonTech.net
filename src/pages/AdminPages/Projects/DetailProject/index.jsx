import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next';
// import Loading from '../../../../components/OurComponents/Loading';
import { IoClose } from 'react-icons/io5';
import { useGetOneProjectsQuery } from '../../../../services/apis/userApi';

const DetailProject = ({ isOpen, onClose, guestId }) => {
    const { t, i18n } = useTranslation();
    const { data: guestData, isLoading, isError, isFetching } = useGetOneProjectsQuery(guestId, {
        skip: !guestId
    });
    const imgLocal = 'https://api.buyontech.net/files/projects/cards/'

    const guest = guestData?.data
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
    const getLocalizedNameSub = (item, lang) => {
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
                        <button className={`${location?.pathname == '/admin/projects' ? "guestClose2" : "guestClose"}`}

                            onClick={onClose} aria-label="Close">
                            <IoClose />
                        </button>
                        <div className={`${location.pathname == '/admin/projects' ? "col-8" : "col-3 "}`} style={{ padding: "10px" }}
                            onClick={(e) => e.stopPropagation()}

                        >
                            <div className="wokSection">
                                <section id="workCardS">
                                    <div className="container">
                                        <div
                                            className="row box"
                                            style={{
                                                background: `url("${imgLocal + guest?.cardImage}") no-repeat center center`,
                                                backgroundSize: 'cover'
                                            }}
                                        >
                                            <div className="boxLeft col-4">
                                                <h2>{getLocalizedName(guest, i18n.language)}</h2>
                                                <p>{getLocalizedNameSub(guest, i18n.language)}</p>
                                            </div>

                                            <div className="col-4 midImageWrapper">
                                                <div className="midImageBackdrop" aria-hidden="true" />
                                                <img src={imgLocal + guest?.cardImage} alt={getLocalizedName(guest, i18n.language)} className="midImage" />
                                            </div>

                                            <div className="boxLeft1 col-4">
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    gap: '18px'
                                                }}>
                                                    <div className="detailBlock detailBlock-year">
                                                        <p>Year</p>
                                                        <div className="pe">{guest?.year}</div>
                                                    </div>
                                                    <div className="detailBlock detailBlock-category">
                                                        <p>Category</p>
                                                        <div className="p">{getLocalizedCountry(guest, i18n.language)}</div>
                                                    </div>
                                                </div>
                                                <div className="detailBlock detailBlock-services">
                                                    <p>Services</p>
                                                    {guest?.services && guest?.services.map((service, i) => (
                                                        <div className="p" key={i}>{service?.name}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default DetailProject
