import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import az from "/public/admins/az.png";
import en from "/public/admins/en.png";
import Popup from '../../../../components/Admin/Popup';
import InputElement from '../../../../components/Admin/FormElements/InputElement';
import TextareaElement from '../../../../components/Admin/FormElements/TextareaElement';
import EditButton from '../../../../components/Admin/FormElements/EditBtn';
import { useUpdateGuestsMutation } from '../../../../services/userApi';
import { useTranslation } from 'react-i18next';
const EditGuest = ({ editPopupOpen, setEditPopupOpen, editGuest, setEditGuest }) => {
    const [updateGuest, { isLoading: updateLoading }] = useUpdateGuestsMutation();
    const { t } = useTranslation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: editGuest?.id || "",
            name: editGuest?.name || "",
            surname: editGuest?.surname || "",
            nameEng: editGuest?.nameEng || "",
            surnameEng: editGuest?.surnameEng || "",
            country: editGuest?.country || "",
            countryEng: editGuest?.countryEng || "",
            description: editGuest?.description || "",
            descriptionEng: editGuest?.descriptionEng || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('adminRoot.guestPage.validation.name')),
            surname: Yup.string().required(t('adminRoot.guestPage.validation.surname')),
            nameEng: Yup.string().required(t('adminRoot.guestPage.validation.nameEng')),
            surnameEng: Yup.string().required(t('adminRoot.guestPage.validation.surnameEng')),
            country: Yup.string().required(t('adminRoot.guestPage.validation.country')),
            countryEng: Yup.string().required(t('adminRoot.guestPage.validation.countryEng')),
            description: Yup.string().required(t('adminRoot.guestPage.validation.description')),
            descriptionEng: Yup.string().required(t('adminRoot.guestPage.validation.descriptionEng')),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const fd = new FormData();
                fd.append("Id", values.id);
                fd.append("Name", values.name);
                fd.append("Surname", values.surname);
                fd.append("NameEng", values.nameEng);
                fd.append("SurnameEng", values.surnameEng);
                fd.append("Country", values.country);
                fd.append("CountryEng", values.countryEng);
                fd.append("Description", values.description);
                fd.append("DescriptionEng", values.descriptionEng);

                await updateGuest(fd).unwrap();
                toast.success(t("adminRoot.guestPage.editGuest.success"));
                resetForm();
                setEditPopupOpen(false);
                setEditGuest(null);
            } catch (err) {
                toast.error(t("adminRoot.guestPage.editGuest.error"));
                console.error(err);
            }
        },
    });

    return (
        <Popup
            isActive={editPopupOpen}
            onClose={() => {
                setEditPopupOpen(false);
                setEditGuest(null)
                formik.resetForm();
            }}
        >
            <h2>{t("adminRoot.guestPage.editGuest.title")}</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    {/* Name & Surname */}
                    <div
                        className="inputsBox"
                        style={{ marginBottom: "24px" }}
                    >
                        <div
                            className="col-6"
                            style={{
                                padding: "0",
                                paddingRight: "24px",
                                borderRight: "1px solid #CCC",
                            }}
                        >
                            <div
                                className="col-12"
                                style={{ padding: "0", marginBottom: "12px" }}
                            >
                                <InputElement
                                    name="name"
                                    placeholder={t("adminRoot.guestPage.form.placeholders.name")}
                                    imgSrc={az}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    error={formik.errors.name}
                                    touched={formik.touched.name}
                                />
                            </div>
                            <div className="col-12" style={{ padding: "0" }}>
                                <InputElement
                                    name="surname"
                                    placeholder={t("adminRoot.guestPage.form.placeholders.surname")}
                                    imgSrc={az}
                                    value={formik.values.surname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    error={formik.errors.surname}
                                    touched={formik.touched.surname}
                                />
                            </div>
                        </div>

                        <div
                            className="col-6"
                            style={{ padding: "0", paddingLeft: "24px" }}
                        >
                            <div
                                className="col-12"
                                style={{ padding: "0", marginBottom: "12px" }}
                            >
                                <InputElement
                                    name="nameEng"
                                    placeholder={t("adminRoot.guestPage.form.placeholders.nameEng")}
                                    imgSrc={en}
                                    value={formik.values.nameEng}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    error={formik.errors.nameEng}
                                    touched={formik.touched.nameEng}
                                />
                            </div>
                            <div className="col-12" style={{ padding: "0" }}>
                                <InputElement
                                    name="surnameEng"
                                    placeholder={t("adminRoot.guestPage.form.placeholders.surnameEng")}
                                    imgSrc={en}
                                    value={formik.values.surnameEng}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    error={formik.errors.surnameEng}
                                    touched={formik.touched.surnameEng}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Country */}
                    <div
                        className="col-12"
                        style={{ padding: "0", marginBottom: "12px" }}
                    >
                        <InputElement
                            name="country"
                            placeholder={t("adminRoot.guestPage.form.placeholders.country")}
                            imgSrc={az}
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            error={formik.errors.country}
                            touched={formik.touched.country}
                        />
                    </div>
                    <div
                        className="col-12"
                        style={{ padding: "0", marginBottom: "24px" }}
                    >
                        <InputElement
                            name="countryEng"
                            placeholder={t("adminRoot.guestPage.form.placeholders.countryEng")}
                            imgSrc={en}
                            value={formik.values.countryEng}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            error={formik.errors.countryEng}
                            touched={formik.touched.countryEng}
                        />
                    </div>

                    {/* Description */}
                    <div
                        className="col-12"
                        style={{ padding: "0", marginBottom: "12px" }}
                    >
                        <TextareaElement
                            name="description"
                            placeholder={t("adminRoot.guestPage.form.placeholders.description")}
                            imgSrc={az}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.description}
                            touched={formik.touched.description}
                        />
                    </div>
                    <div
                        className="col-12"
                        style={{ padding: "0", marginBottom: "16px" }}
                    >
                        <TextareaElement
                            name="descriptionEng"
                            placeholder={t("adminRoot.guestPage.form.placeholders.descriptionEng")}
                            imgSrc={en}
                            value={formik.values.descriptionEng}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.descriptionEng}
                            touched={formik.touched.descriptionEng}
                        />
                    </div>

                    {/* Submit */}
                    <div
                        className="col-12"
                        style={{ padding: "0", marginBottom: "16px" }}
                    >
                        <EditButton editLoading={updateLoading} />
                    </div>
                </div>
            </form>
        </Popup>
    )
}

export default EditGuest
