import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next';
// import Loading from '../../../../components/OurComponents/Loading';
import { IoClose } from 'react-icons/io5';
import { useGetOneContactQuery, useGetOneOurTeamsQuery } from '../../../../services/apis/userApi';
import TeamCard from '../../../../components/UserComponents/TeamCard';
import InputElement from '../../../../components/Admin/FormElements/InputElement';
import TextareaElement from '../../../../components/Admin/FormElements/TextareaElement';

const DetailContact = ({ isOpen, onClose, guestId }) => {
    const { t, i18n } = useTranslation();
    const { data: guestData, isLoading, isError, isFetching } = useGetOneContactQuery(guestId, {
        skip: !guestId
    });
    const guest = guestData?.data
    const imgLocal = 'https://api.buyontech.net/files/ourteam/'



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
                            <form action="" className='formBoxDetail' onSubmit={(e) => {
                                e.preventDefault()
                            }}>
                                <h2 className='contactInfo'>
                                    {t("adminRoot.contactDetailModal.placeholders.contactInfo") }

                                </h2>
                                <div className=" row">
                                    <div className="inputsBox row" style={{ marginBottom: "24px" }}>
                                        {/* Name & Surname */}
                                        <div
                                            className="col-6"
                                            style={{ padding: "0", paddingRight: "24px", borderRight: "1px solid #CCC" }}
                                        >
                                            <InputElement
                                                name="name"
                                                placeholder={t("adminRoot.contactDetailModal.placeholders.name")}
                                                value={guest?.name || ""}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-6" style={{ padding: "0", paddingLeft: "24px" }}>
                                            <InputElement
                                                name="surname"
                                                placeholder={t("adminRoot.contactDetailModal.placeholders.surname")}
                                                value={guest?.surname || ""}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                                        <InputElement
                                            name="email"
                                            placeholder={t("adminRoot.contactDetailModal.placeholders.email")}
                                            value={guest?.email || ""}
                                            readOnly
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                                        <InputElement
                                            name="phoneNumber"
                                            placeholder={t("adminRoot.contactDetailModal.placeholders.phoneNumber")}
                                            value={guest?.phoneNumber || ""}
                                            readOnly
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                                        <TextareaElement
                                            name="description"
                                            placeholder={t("adminRoot.contactDetailModal.placeholders.description")}
                                            value={guest?.description || ""}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default DetailContact
