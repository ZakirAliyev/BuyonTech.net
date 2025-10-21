import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import az from "/src/assets/az.png";
import en from "/src/assets/en.png";
import Popup from '../../../../components/Admin/Popup';
import InputElement from '../../../../components/Admin/FormElements/InputElement';
import EditButton from '../../../../components/Admin/FormElements/EditBtn';
import { useTranslation } from 'react-i18next';
import { useUpdateOurTeamsMutation } from '../../../../services/apis/userApi';
import SingleImageUpload from '../../../../components/Admin/FormElements/SingleElement';
const EditGuest = ({ editPopupOpen, setEditPopupOpen, editGuest, setEditGuest }) => {
    const [updateGuest, { isLoading: updateLoading }] = useUpdateOurTeamsMutation();
    const imgLocal = 'https://buyonidatech-production.up.railway.app/files/ourteam/'

    const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    const { t } = useTranslation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: editGuest?.id || "",
            fullName: editGuest?.fullName || "",
            fullNameEng: editGuest?.fullNameEng || "",
            position: editGuest?.position || "",
            positionEng: editGuest?.positionEng || "",
            cardImage: editGuest?.cardImage || ""
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required(t('adminRoot.guestPage.validation.name')),
            fullNameEng: Yup.string().required(t('adminRoot.guestPage.validation.nameEng')),
            position: Yup.string().required(t('adminRoot.guestPage.validation.country')),
            positionEng: Yup.string().required(t('adminRoot.guestPage.validation.countryEng')),
            cardImage: Yup.mixed()
                .test(
                    "required-if-no-existing",
                    t("adminRoot.guestPage.validation.img"),
                    function (value) {
                        const hasExisting = !!this.options.context?.existingImage;
                        if (hasExisting) return true;
                        return value !== null && value !== undefined;
                    }
                )
                .test("fileSize", t("adminRoot.guestPage.validation.fileSize"),
                    (value) => {
                        if (!value) return false;
                        if (typeof value === "string") return true;
                        return value.size <= FILE_SIZE;
                    })
                .test("fileFormat", t("adminRoot.guestPage.validation.fileFormat"),
                    (value) => {
                        if (!value) return false;
                        if (typeof value === "string") return true;
                        return SUPPORTED_FORMATS.includes(value.type);
                    }),
        }),
        validationContext: { existingImage: editGuest?.cardImage },
        onSubmit: async (values, { resetForm }) => {
            try {
                const fd = new FormData();
                fd.append("Id", values.id);
                fd.append("CardImage", values.cardImage);
                fd.append("FullName", values.fullName);
                fd.append("FullNameEng", values.fullNameEng);
                fd.append("Position", values.position);
                fd.append("PositionEng", values.positionEng);

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
                                    name="fullName"
                                    placeholder={t('adminRoot.guestPage.form.placeholders.name')}
                                    imgSrc={az}
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type={'text'}
                                    error={formik.errors.fullName}
                                    touched={formik.touched.fullName}
                                />
                            </div>
                            <div className="col-12" style={{ padding: "0" }}>
                                <InputElement
                                    name="position"
                                    placeholder={t('adminRoot.guestPage.form.placeholders.country')}
                                    imgSrc={az}
                                    value={formik.values.position}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.position}
                                    type={'text'}

                                    touched={formik.touched.position}
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
                                    name="fullNameEng"
                                    placeholder={t('adminRoot.guestPage.form.placeholders.nameEng')}
                                    imgSrc={en}
                                    value={formik.values.fullNameEng}
                                    onChange={formik.handleChange}
                                    type={'text'}

                                    onBlur={formik.handleBlur}
                                    error={formik.errors.fullNameEng}
                                    touched={formik.touched.fullNameEng}
                                />
                            </div>
                            <div className="col-12" style={{ padding: "0" }}>
                                <InputElement
                                    name="positionEng"
                                    placeholder={t('adminRoot.guestPage.form.placeholders.countryEng')}
                                    type={'text'}

                                    imgSrc={en}
                                    value={formik.values.positionEng}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.positionEng}
                                    touched={formik.touched.positionEng}
                                />
                            </div>
                        </div>
                    </div>



                    <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                        <SingleImageUpload
                            file={formik.values.cardImage}
                            name="cardImage"
                            existImageUrl={imgLocal}
                            formikData={formik}
                            setFile={(file) => {
                                formik.setFieldValue("cardImage", file);
                                formik.setFieldTouched("cardImage", true, false);
                                formik.validateField("cardImage");
                            }}
                            existingImage={editGuest?.cardImage}
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
