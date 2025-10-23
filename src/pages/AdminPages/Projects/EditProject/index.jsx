// import React, { useState } from 'react'
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import toast from "react-hot-toast";
// import az from "/src/assets/az.png";
// import en from "/src/assets/en.png";
// import Popup from '../../../../components/Admin/Popup';
// import InputElement from '../../../../components/Admin/FormElements/InputElement';
// import EditButton from '../../../../components/Admin/FormElements/EditBtn';
// import { useTranslation } from 'react-i18next';
// import { useUpdateOurTeamsMutation } from '../../../../services/apis/userApi';
// import SingleImageUpload from '../../../../components/Admin/FormElements/SingleElement';
// import TextareaElement from '../../../../components/Admin/FormElements/TextareaElement';
// import MultiFileUpload from '../../../../components/Admin/FormElements/MultipleUploadElement';
// const EditProject = ({ editPopupOpen, setEditPopupOpen, editGuest, setEditGuest }) => {
//     const [updateGuest, { isLoading: updateLoading }] = useUpdateOurTeamsMutation();
//     const imgLocal = 'https://api.buyontech.net/files/projects/cards/'
//     const imgLocal2 = 'https://api.buyontech.net/files/projects/files/'
//     const handleSplit = (val) => {
//         const arr = val.split(",")
//             .map((s) => s.trim())
//         return arr;
//     }
//     const [projectImages, setProjectImages] = useState([]);
//     const [deleteServiceIds, setDeleteServiceIds] = useState([]);
//     const [deleteLinkIds, setDeleteLinkIds] = useState([]);
//     const [deleteFileIds, setDeleteFileIds] = useState([]);
//     const FILE_SIZE = 5 * 1024 * 1024;
//     const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
//     const { t } = useTranslation()
//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             id: editGuest?.id || "",
//             cardImage: editGuest?.cardImage || "",

//             title: editGuest?.title || "",
//             titleEng: editGuest?.titleEng || "",
//             subTitle: editGuest?.subTitle || "",
//             subTitleEng: editGuest?.subTitleEng || "",
//             year: editGuest?.year || "",
//             projectType: editGuest?.projectType || "",
//             projectTypeEng: editGuest?.projectTypeEng || "",
//             services: (editGuest?.services || []).map((s) => s.name).join(', '),
//             files: [],
//             profilName: editGuest?.profilName || "",
//             links: (editGuest?.links || []).map((l) => l.name).join(", "),
//             descriptions: editGuest?.descriptions?.length
//                 ? editGuest.descriptions
//                 : [],
//             categoryType: editGuest?.categoryType || ""
//         },
//         validationSchema: Yup.object({
//             title: Yup.string().required(t("adminRoot.projectPage.validation.title")),
//             titleEng: Yup.string().required(t("adminRoot.projectPage.validation.titleEng")),

//             subTitle: Yup.string().required(t("adminRoot.projectPage.validation.subTitle")),
//             subTitleEng: Yup.string().required(t("adminRoot.projectPage.validation.subTitleEng")),

//             year: Yup.string().required(t("adminRoot.projectPage.validation.year")),

//             projectType: Yup.string().required(t("adminRoot.projectPage.validation.projectType")),
//             projectTypeEng: Yup.string().required(t("adminRoot.projectPage.validation.projectTypeEng")),

//             services: Yup.array()
//                 .required(t("adminRoot.projectPage.validation.services")),

//             files: Yup.array()
//                 .min(4, t("adminRoot.projectPage.validation.files"))
//                 .required(t("adminRoot.projectPage.validation.files")),

//             profilName: Yup.string().required(t("adminRoot.projectPage.validation.profilName")),
//             links: Yup.string()
//                 .required(t("adminRoot.projectPage.validation.links")),

//             categoryType: Yup.string().required(t("adminRoot.projectPage.validation.categoryType")),

//             cardImage: Yup.mixed()
//                 .test(
//                     "required-if-no-existing",
//                     t("adminRoot.guestPage.validation.img"),
//                     function (value) {
//                         const hasExisting = !!this.options.context?.existingImage;
//                         if (hasExisting) return true;
//                         return value !== null && value !== undefined;
//                     }
//                 )
//                 .test("fileSize", t("adminRoot.guestPage.validation.fileSize"),
//                     (value) => {
//                         if (!value) return false;
//                         if (typeof value === "string") return true;
//                         return value.size <= FILE_SIZE;
//                     })
//                 .test("fileFormat", t("adminRoot.guestPage.validation.fileFormat"),
//                     (value) => {
//                         if (!value) return false;
//                         if (typeof value === "string") return true;
//                         return SUPPORTED_FORMATS.includes(value.type);
//                     }),
//         }),
//         validationContext: { existingImage: editGuest?.cardImage },
//         onSubmit: async (values, { resetForm }) => {
//             try {
//                 const fd = new FormData();
//                 fd.append("Id", values.id);
//                 fd.append("Title", values.title);
//                 fd.append("TitleEng", values.titleEng);
//                 fd.append("SubTitle", values.subTitle);
//                 fd.append("SubTitleEng", values.subTitleEng);
//                 fd.append("Year", values.year);
//                 fd.append("ProjectType", values.projectType);
//                 fd.append("ProjectTypeEng", values.projectTypeEng);
//                 fd.append("ProfilName", values.profilName);
//                 fd.append("CardImage", values.cardImage);
//                 fd.append("CategoryType", values.categoryType);
//                 fd.append("descriptionsJson", JSON.stringify(values.descriptions));
//                 values.services.forEach((item, i) => fd.append(`Services`, item));
//                 (deleteServiceIds || []).forEach((id) => fd.append("DeleteServiceIds", id));
//                 // values.files.forEach((item, i) => fd.append(`Files[${i}].Name`, item.name));
//                 if (projectImages?.length) {
//                     projectImages.forEach((file) => fd.append("Files", file));
//                 }
//                 (deleteFileIds || []).forEach((id) => fd.append("DeleteFileIds", id));
//                 const allLinks = handleSplit(values.links);
//                 allLinks.forEach((item, i) => fd.append(`Links`, item));
//                 (deleteLinkIds || []).forEach((id) => fd.append("DeleteLinkIds", id));
//                 await updateGuest(fd).unwrap();
//                 toast.success(t("adminRoot.guestPage.editGuest.success"));
//                 resetForm();
//                 setProjectImages([])
//                 setDeleteServiceIds([]);
//                 setDeleteLinkIds([]);
//                 setDeleteFileIds([]);
//                 setEditPopupOpen(false);
//                 setEditGuest(null);
//             } catch (err) {
//                 toast.error(t("adminRoot.guestPage.editGuest.error"));
//                 console.error(err);
//             }
//         },
//     });

//     return (
//         <Popup
//             isActive={editPopupOpen}
//             onClose={() => {
//                 setEditPopupOpen(false);
//                 setEditGuest(null)
//                 setProjectImages([])
//                 setDeleteServiceIds([]);
//                 setDeleteLinkIds([]);
//                 setDeleteFileIds([]);
//                 formik.resetForm();
//             }}
//         >
//             <h2>{t("adminRoot.guestPage.editGuest.title")}</h2>
//             <form onSubmit={formik.handleSubmit}  >
//                 <div className="row">

//                     <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

//                         <SingleImageUpload
//                             file={formik.values.cardImage}
//                             name="cardImage"
//                             formikData={formik}
//                             existImageUrl={imgLocal}

//                             setFile={(file) => {
//                                 formik.setFieldValue("cardImage", file);
//                                 formik.setFieldTouched("cardImage", true, false);
//                                 formik.validateField("cardImage");
//                             }}

//                         />
//                     </div>
//                     <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

//                         <MultiFileUpload
//                             type={'image'}
//                             files={projectImages}
//                             setFiles={setProjectImages}
//                             formik={formik} name={'files'}

//                         />
//                     </div>
//                     <div className="inputsBox" style={{ marginBottom: "24px" }}>
//                         <div className="col-6" style={{ padding: "0", paddingRight: "24px", borderRight: "1px solid #CCC" }}>
//                             <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
//                                 <InputElement
//                                     name="title"
//                                     placeholder={t('adminRoot.projectPage.form.placeholders.title')}
//                                     imgSrc={az}
//                                     value={formik.values.title}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     type={'text'}
//                                     error={formik.errors.title}
//                                     touched={formik.touched.title}
//                                 />
//                             </div>
//                             <div className="col-12" style={{ padding: "0" }}>

//                                 <InputElement
//                                     name="subTitle"
//                                     placeholder={t('adminRoot.projectPage.form.placeholders.subTitle')}
//                                     imgSrc={az}
//                                     value={formik.values.subTitle}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     error={formik.errors.subTitle}
//                                     type={'text'}

//                                     touched={formik.touched.subTitle}
//                                 />
//                             </div>

//                         </div>
//                         <div className="col-6" style={{ padding: "0", paddingLeft: "24px" }}>
//                             <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
//                                 <InputElement
//                                     name="titleEng"
//                                     placeholder={t('adminRoot.projectPage.form.placeholders.titleEng')}
//                                     imgSrc={en}
//                                     value={formik.values.titleEng}
//                                     onChange={formik.handleChange}
//                                     type={'text'}

//                                     onBlur={formik.handleBlur}
//                                     error={formik.errors.titleEng}
//                                     touched={formik.touched.titleEng}
//                                 />
//                             </div>
//                             <div className="col-12" style={{ padding: "0" }}>

//                                 <InputElement
//                                     name="subTitleEng"
//                                     placeholder={t('adminRoot.projectPage.form.placeholders.subTitleEng')}
//                                     type={'text'}

//                                     imgSrc={en}
//                                     value={formik.values.subTitleEng}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     error={formik.errors.subTitleEng}
//                                     touched={formik.touched.subTitleEng}
//                                 />
//                             </div>
//                         </div>
//                     </div>



//                     <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

//                         <InputElement
//                             name="projectType"
//                             placeholder={t('adminRoot.projectPage.form.placeholders.projectType')}
//                             imgSrc={az}
//                             value={formik.values.projectType}
//                             onChange={formik.handleChange}
//                             type={'text'}

//                             onBlur={formik.handleBlur}
//                             error={formik.errors.projectType}
//                             touched={formik.touched.projectType}
//                         />
//                     </div>


//                     <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

//                         <InputElement
//                             name="projectTypeEng"
//                             placeholder={t('adminRoot.projectPage.form.placeholders.projectTypeEng')}
//                             imgSrc={en}
//                             value={formik.values.projectTypeEng}
//                             onChange={formik.handleChange}
//                             type={'text'}

//                             onBlur={formik.handleBlur}
//                             error={formik.errors.projectTypeEng}
//                             touched={formik.touched.projectTypeEng}
//                         />
//                     </div>
//                     <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

//                         <InputElement
//                             name="year"
//                             placeholder={t('adminRoot.projectPage.form.placeholders.year')}
//                             value={formik.values.year}
//                             onChange={formik.handleChange}
//                             type={'text'}

//                             onBlur={formik.handleBlur}
//                             error={formik.errors.year}
//                             touched={formik.touched.year}
//                         />
//                     </div>
//                     <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

//                         <InputElement
//                             name="services"
//                             placeholder={t('adminRoot.projectPage.form.placeholders.services')}
//                             type={'text'}

//                             value={formik.values.services}
//                             onChange={(e) => {
//                                 const arr = e.target.value.split(",")
//                                     .map((s) => s.trim())
//                                 formik.setFieldValue("services", arr);
//                             }}
//                             onBlur={formik.handleBlur}
//                             error={formik.errors.services}
//                             touched={formik.touched.services}
//                         />
//                     </div>
//                     <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

//                         <InputElement
//                             name="categoryType"
//                             placeholder={t('adminRoot.projectPage.form.placeholders.categoryType')}
//                             value={formik.values.categoryType}
//                             onChange={formik.handleChange}
//                             type={'text'}

//                             onBlur={formik.handleBlur}
//                             error={formik.errors.categoryType}
//                             touched={formik.touched.categoryType}
//                         />
//                     </div>
//                     <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

//                         <InputElement
//                             name="profilName"
//                             placeholder={t('adminRoot.projectPage.form.placeholders.profilName')}
//                             value={formik.values.profilName}
//                             onChange={formik.handleChange}
//                             type={'text'}

//                             onBlur={formik.handleBlur}
//                             error={formik.errors.profilName}
//                             touched={formik.touched.profilName}
//                         />
//                     </div>
//                     <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

//                         <TextareaElement
//                             name="links"
//                             placeholder={t('adminRoot.projectPage.form.placeholders.links')}
//                             type={'text'}
//                             value={formik.values.links}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             error={formik.errors.links}
//                             touched={formik.touched.links}
//                         />
//                     </div>


//                     <>
//                         {formik.values.descriptions.map((desc, index) => (
//                             <div key={index} className="inputsBox" style={{ marginBottom: "24px", position: 'relative' }}>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         const newDescriptions = formik.values.descriptions.filter((_, i) => i !== index)
//                                         formik.setFieldValue("descriptions", newDescriptions)
//                                     }}
//                                     style={{
//                                         position: "absolute",
//                                         top: "10px",
//                                         right: "-35px",
//                                         background: "#ff4d4f",
//                                         color: "white",
//                                         border: "none",
//                                         borderRadius: "50%",
//                                         width: "24px",
//                                         height: "24px",
//                                         cursor: "pointer",
//                                         fontSize: "14px",
//                                         lineHeight: "24px",
//                                         textAlign: "center",
//                                     }}
//                                 >
//                                     ×
//                                 </button>

//                                 <div
//                                     className="col-6"
//                                     style={{
//                                         padding: "0",
//                                         paddingRight: "24px",
//                                         borderRight: "1px solid #CCC",
//                                     }}
//                                 >
//                                     <div
//                                         className="col-12"
//                                         style={{ padding: "0", marginBottom: "12px" }}
//                                     >
//                                         <InputElement
//                                             name={`descriptions.${index}.key`}
//                                             placeholder={t("adminRoot.projectPage.form.placeholders.key")}
//                                             imgSrc={az}
//                                             value={formik.values.descriptions[index].key}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             type={"text"}
//                                             error={
//                                                 formik.errors.descriptions?.[index]?.key
//                                             }
//                                             touched={
//                                                 formik.touched.descriptions?.[index]?.key
//                                             }
//                                         />
//                                     </div>
//                                     <div className="col-12" style={{ padding: "0" }}>
//                                         <TextareaElement
//                                             name={`descriptions.${index}.value`}
//                                             placeholder={t(
//                                                 "adminRoot.projectPage.form.placeholders.value"
//                                             )}
//                                             imgSrc={az}
//                                             value={formik.values.descriptions[index].value}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={
//                                                 formik.errors.descriptions?.[index]?.value
//                                             }
//                                             touched={
//                                                 formik.touched.descriptions?.[index]?.value
//                                             }
//                                         />
//                                     </div>
//                                 </div>

//                                 <div
//                                     className="col-6"
//                                     style={{ padding: "0", paddingLeft: "24px" }}
//                                 >
//                                     <div
//                                         className="col-12"
//                                         style={{ padding: "0", marginBottom: "12px" }}
//                                     >
//                                         <InputElement
//                                             name={`descriptions.${index}.keyEng`}
//                                             placeholder={t(
//                                                 "adminRoot.projectPage.form.placeholders.keyEng"
//                                             )}
//                                             imgSrc={en}
//                                             value={formik.values.descriptions[index].keyEng}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             type={"text"}
//                                             error={
//                                                 formik.errors.descriptions?.[index]?.keyEng
//                                             }
//                                             touched={
//                                                 formik.touched.descriptions?.[index]?.keyEng
//                                             }
//                                         />
//                                     </div>
//                                     <div className="col-12" style={{ padding: "0" }}>
//                                         <TextareaElement
//                                             name={`descriptions.${index}.valueEng`}
//                                             placeholder={t(
//                                                 "adminRoot.projectPage.form.placeholders.valueEng"
//                                             )}
//                                             imgSrc={en}
//                                             value={formik.values.descriptions[index].valueEng}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={
//                                                 formik.errors.descriptions?.[index]?.valueEng
//                                             }
//                                             touched={
//                                                 formik.touched.descriptions?.[index]?.valueEng
//                                             }
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                         <button
//                             type="button"
//                             className="addButton"
//                             onClick={() =>
//                                 formik.setFieldValue("descriptions", [
//                                     ...formik.values.descriptions,
//                                     {
//                                         key: "",
//                                         value: "",
//                                         keyEng: "",
//                                         valueEng: "",
//                                     },
//                                 ])
//                             }
//                             style={{
//                                 marginBottom: "20px",
//                                 background: "#E0E0E0",
//                                 border: "none",
//                                 padding: "8px 16px",
//                                 cursor: "pointer",
//                                 borderRadius: "6px",
//                             }}
//                         >
//                             + Əlavə et
//                         </button>
//                     </>
//                     <div className="col-12" style={{ padding: "0", marginBottom: "16px" }}>
//                         <EditButton editLoading={updateGuest} />
//                     </div>
//                 </div>
//             </form>
//         </Popup>
//     )
// }

// export default EditProject


// import React, { useState, useMemo } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import toast from "react-hot-toast";
// import { useTranslation } from "react-i18next";

// import az from "/src/assets/az.png";
// import en from "/src/assets/en.png";

// import Popup from "../../../../components/Admin/Popup";
// import InputElement from "../../../../components/Admin/FormElements/InputElement";
// import TextareaElement from "../../../../components/Admin/FormElements/TextareaElement";
// import SingleImageUpload from "../../../../components/Admin/FormElements/SingleElement";
// import MultiFileUpload from "../../../../components/Admin/FormElements/MultipleUploadElement";
// import EditButton from "../../../../components/Admin/FormElements/EditBtn";
// import { useUpdateProjectsMutation } from "../../../../services/apis/userApi";


// const FILE_SIZE = 5 * 1024 * 1024;
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

// const EditProject = ({ editPopupOpen, setEditPopupOpen, editGuest, setEditGuest }) => {
//     const { t } = useTranslation();
//     const [updateProject, { isLoading: updateLoading }] = useUpdateProjectsMutation();

//     const imgLocal = "https://api.buyontech.net/files/projects/cards/";

//     const [projectImages, setProjectImages] = useState([]); // yeni yüklənəcək qaleriya faylları
//     const [deleteServiceIds, setDeleteServiceIds] = useState([]);
//     const [deleteLinkIds, setDeleteLinkIds] = useState([]);
//     const [deleteFileIds, setDeleteFileIds] = useState([]);

//     // form üçün təhlükəsiz ilkin dəyərlər
//     const initialValues = useMemo(
//         () => ({
//             id: editGuest?.id || "",
//             cardImage: editGuest?.cardImage || "",
//             title: editGuest?.title || "",
//             titleEng: editGuest?.titleEng || "",
//             subTitle: editGuest?.subTitle || "",
//             subTitleEng: editGuest?.subTitleEng || "",
//             year: editGuest?.year || "",
//             projectType: editGuest?.projectType || "",
//             projectTypeEng: editGuest?.projectTypeEng || "",
//             // DAXİLDƏ ARRAY saxlayırıq
//             services: (editGuest?.services || []).map((s) => s.name),
//             profilName: editGuest?.profilName || "",
//             // links-i mətndə vergüllə verirsiniz, burda text kimi saxlayırıq
//             linksText: (editGuest?.links || []).map((l) => l.name).join(", "),
//             descriptions: editGuest?.descriptions?.length ? editGuest.descriptions : [],
//             categoryType: editGuest?.categoryType || "",
//             // mövcud obyekt siyahıları (əgər delete checkboxları əlavə etmək istəsəniz)
//             _existingServices: editGuest?.services || [],
//             _existingLinks: editGuest?.links || [],
//             _existingFiles: editGuest?.files || [],
//         }),
//         [editGuest]
//     );

//     const validationSchema = Yup.object({
//         title: Yup.string().required(t("adminRoot.projectPage.validation.title")),
//         titleEng: Yup.string().required(t("adminRoot.projectPage.validation.titleEng")),
//         subTitle: Yup.string().required(t("adminRoot.projectPage.validation.subTitle")),
//         subTitleEng: Yup.string().required(t("adminRoot.projectPage.validation.subTitleEng")),
//         year: Yup.string().required(t("adminRoot.projectPage.validation.year")),
//         projectType: Yup.string().required(t("adminRoot.projectPage.validation.projectType")),
//         projectTypeEng: Yup.string().required(t("adminRoot.projectPage.validation.projectTypeEng")),
//         services: Yup.array().required(t("adminRoot.projectPage.validation.services")),
//         profilName: Yup.string().required(t("adminRoot.projectPage.validation.profilName")),
//         linksText: Yup.string().required(t("adminRoot.projectPage.validation.links")),
//         categoryType: Yup.string().required(t("adminRoot.projectPage.validation.categoryType")),
//         files: Yup.array()
//             .min(4, t("adminRoot.projectPage.validation.files"))
//             .required(t("adminRoot.projectPage.validation.files")),
//         cardImage: Yup.mixed()
//             .test(
//                 "required-if-no-existing",
//                 t("adminRoot.projectPage.validation.cardImage"),
//                 function (value) {
//                     const hasExisting = !!this.options.context?.existingImage;
//                     if (hasExisting) return true;
//                     return value !== null && value !== undefined;
//                 }
//             )
//             .test("fileSize", t("adminRoot.projectPage.validation.fileSize"), (value) => {
//                 if (!value) return false;
//                 if (typeof value === "string") return true; // mövcud şəkil
//                 return value.size <= FILE_SIZE;
//             })
//             .test("fileFormat", t("adminRoot.projectPage.validation.fileFormat"), (value) => {
//                 if (!value) return false;
//                 if (typeof value === "string") return true;
//                 return SUPPORTED_FORMATS.includes(value.type);
//             }),
//     });

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues,
//         validationSchema,
//         validationContext: { existingImage: editGuest?.cardImage },
//         onSubmit: async (values, { resetForm }) => {
//             try {
//                 const fd = new FormData();

//                 // MÜTLƏQ: Id
//                 fd.append("Id", values.id);

//                 // primitive-lər
//                 fd.append("Title", values.title);
//                 fd.append("TitleEng", values.titleEng);
//                 fd.append("SubTitle", values.subTitle);
//                 fd.append("SubTitleEng", values.subTitleEng);
//                 fd.append("Year", values.year);
//                 fd.append("ProjectType", values.projectType);
//                 fd.append("ProjectTypeEng", values.projectTypeEng);
//                 fd.append("ProfilName", values.profilName);
//                 fd.append("CategoryType", values.categoryType);

//                 // kart şəkli (string və ya file)
//                 fd.append("CardImage", values.cardImage);

//                 // services (repeat key)
//                 (values.services || []).forEach((s) => fd.append("Services", s));

//                 // silinəcək service id-ləri
//                 (deleteServiceIds || []).forEach((id) => fd.append("DeleteServiceIds", id));

//                 // yeni yüklənəcək qaleriyadakı fayllar
//                 (projectImages || []).forEach((file) => fd.append("Files", file));

//                 // silinəcək file id-ləri
//                 (deleteFileIds || []).forEach((id) => fd.append("DeleteFileIds", id));

//                 // links: text → array
//                 (values.linksText || "")
//                     .split(/[,\n]/)
//                     .map((s) => s.trim())
//                     .filter(Boolean)
//                     .forEach((link) => fd.append("Links", link));

//                 // silinəcək link id-ləri
//                 (deleteLinkIds || []).forEach((id) => fd.append("DeleteLinkIds", id.id));

//                 // descriptions JSON
//                 fd.append("descriptionsJson", JSON.stringify(values.descriptions || []));

//                 await updateProject(fd).unwrap();

//                 toast.success(t("adminRoot.projectPage.edit.success"));
//                 resetForm();
//                 setProjectImages([]);
//                 setDeleteServiceIds([]);
//                 setDeleteLinkIds([]);
//                 setDeleteFileIds([]);
//                 setEditPopupOpen(false);
//                 setEditGuest(null);
//             } catch (err) {
//                 console.error("Project update error:", err);
//                 toast.error(t("adminRoot.projectPage.edit.error"));
//             }
//         },
//     });

//     return (
//         <Popup
//             isActive={editPopupOpen}
//             onClose={() => {
//                 setEditPopupOpen(false);
//                 setEditGuest(null);
//                 setProjectImages([]);
//                 setDeleteServiceIds([]);
//                 setDeleteLinkIds([]);
//                 setDeleteFileIds([]);
//                 formik.resetForm();
//             }}
//         >
//             <h2>{t("adminRoot.projectPage.edit.title")}</h2>

//             <form onSubmit={formik.handleSubmit}>
//                 <div className="row">
//                     {/* Card Image */}
//                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                         <SingleImageUpload
//                             file={formik.values.cardImage}
//                             name="cardImage"
//                             formikData={formik}
//                             existImageUrl={imgLocal}
//                             setFile={(file) => {
//                                 formik.setFieldValue("cardImage", file);
//                                 formik.setFieldTouched("cardImage", true, false);
//                                 formik.validateField("cardImage");
//                             }}
//                         />
//                     </div>

//                     {/* Yeni qaleriya faylları */}
//                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                         <MultiFileUpload
//                             type="image"
//                             files={projectImages}
//                             setFiles={(files) => {
//                                 setProjectImages(files);
//                                 // əgər files-u formik validasiyasına bağlamaq istəsən:
//                                 // formik.setFieldValue("files", files);
//                             }}
//                             formik={formik}
//                             name="files"
//                         />
//                     </div>

//                     {/* AZ/EN başlıqlar */}
//                     <div className="inputsBox" style={{ marginBottom: 24 }}>
//                         <div className="col-6" style={{ padding: 0, paddingRight: 24, borderRight: "1px solid #CCC" }}>
//                             <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                                 <InputElement
//                                     name="title"
//                                     placeholder={t("adminRoot.projectPage.form.placeholders.title")}
//                                     imgSrc={az}
//                                     value={formik.values.title}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     type="text"
//                                     error={formik.errors.title}
//                                     touched={formik.touched.title}
//                                 />
//                             </div>
//                             <div className="col-12" style={{ padding: 0 }}>
//                                 <InputElement
//                                     name="subTitle"
//                                     placeholder={t("adminRoot.projectPage.form.placeholders.subTitle")}
//                                     imgSrc={az}
//                                     value={formik.values.subTitle}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     type="text"
//                                     error={formik.errors.subTitle}
//                                     touched={formik.touched.subTitle}
//                                 />
//                             </div>
//                         </div>

//                         <div className="col-6" style={{ padding: 0, paddingLeft: 24 }}>
//                             <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                                 <InputElement
//                                     name="titleEng"
//                                     placeholder={t("adminRoot.projectPage.form.placeholders.titleEng")}
//                                     imgSrc={en}
//                                     value={formik.values.titleEng}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     type="text"
//                                     error={formik.errors.titleEng}
//                                     touched={formik.touched.titleEng}
//                                 />
//                             </div>
//                             <div className="col-12" style={{ padding: 0 }}>
//                                 <InputElement
//                                     name="subTitleEng"
//                                     placeholder={t("adminRoot.projectPage.form.placeholders.subTitleEng")}
//                                     imgSrc={en}
//                                     value={formik.values.subTitleEng}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     type="text"
//                                     error={formik.errors.subTitleEng}
//                                     touched={formik.touched.subTitleEng}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Meta */}
//                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                         <InputElement
//                             name="projectType"
//                             placeholder={t("adminRoot.projectPage.form.placeholders.projectType")}
//                             imgSrc={az}
//                             value={formik.values.projectType}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             type="text"
//                             error={formik.errors.projectType}
//                             touched={formik.touched.projectType}
//                         />
//                     </div>

//                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                         <InputElement
//                             name="projectTypeEng"
//                             placeholder={t("adminRoot.projectPage.form.placeholders.projectTypeEng")}
//                             imgSrc={en}
//                             value={formik.values.projectTypeEng}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             type="text"
//                             error={formik.errors.projectTypeEng}
//                             touched={formik.touched.projectTypeEng}
//                         />
//                     </div>

//                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                         <InputElement
//                             name="year"
//                             placeholder={t("adminRoot.projectPage.form.placeholders.year")}
//                             value={formik.values.year}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             type="text"
//                             error={formik.errors.year}
//                             touched={formik.touched.year}
//                         />
//                     </div>

//                     {/* SERVICES: daxildə array saxlayırıq, inputda join göstəririk */}
//                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                         <InputElement
//                             name="services"
//                             placeholder={t("adminRoot.projectPage.form.placeholders.services")}
//                             type="text"
//                             value={(formik.values.services || []).join(", ")}
//                             onChange={(e) => {
//                                 const arr = e.target.value
//                                     .split(",")
//                                     .map((s) => s.trim())
//                                     .filter(Boolean);
//                                 formik.setFieldValue("services", arr);
//                             }}
//                             onBlur={formik.handleBlur}
//                             error={formik.errors.services}
//                             touched={formik.touched.services}
//                         />
//                     </div>

//                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                         <InputElement
//                             name="categoryType"
//                             placeholder={t("adminRoot.projectPage.form.placeholders.categoryType")}
//                             value={formik.values.categoryType}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             type="text"
//                             error={formik.errors.categoryType}
//                             touched={formik.touched.categoryType}
//                         />
//                     </div>

//                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                         <InputElement
//                             name="profilName"
//                             placeholder={t("adminRoot.projectPage.form.placeholders.profilName")}
//                             value={formik.values.profilName}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             type="text"
//                             error={formik.errors.profilName}
//                             touched={formik.touched.profilName}
//                         />
//                     </div>

//                     {/* LINKS: textarea → split edib Links kimi göndərəcəyik */}
//                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                         <TextareaElement
//                             name="linksText"
//                             placeholder={t("adminRoot.projectPage.form.placeholders.links")}
//                             value={formik.values.linksText}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             error={formik.errors.linksText}
//                             touched={formik.touched.linksText}
//                         />
//                     </div>

//                     {/* DESCRIPTIONS */}
//                     <>
//                         {(formik.values.descriptions || []).map((_, index) => (
//                             <div key={index} className="inputsBox" style={{ marginBottom: 24, position: "relative" }}>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         const next = formik.values.descriptions.filter((_, i) => i !== index);
//                                         formik.setFieldValue("descriptions", next);
//                                     }}
//                                     style={{
//                                         position: "absolute",
//                                         top: 10,
//                                         right: -35,
//                                         background: "#ff4d4f",
//                                         color: "#fff",
//                                         border: "none",
//                                         borderRadius: "50%",
//                                         width: 24,
//                                         height: 24,
//                                         cursor: "pointer",
//                                         fontSize: 14,
//                                         lineHeight: "24px",
//                                         textAlign: "center",
//                                     }}
//                                 >
//                                     ×
//                                 </button>

//                                 <div className="col-6" style={{ padding: 0, paddingRight: 24, borderRight: "1px solid #CCC" }}>
//                                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                                         <InputElement
//                                             name={`descriptions.${index}.key`}
//                                             placeholder={t("adminRoot.projectPage.form.placeholders.key")}
//                                             imgSrc={az}
//                                             value={formik.values.descriptions[index].key}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             type="text"
//                                             error={formik.errors.descriptions?.[index]?.key}
//                                             touched={formik.touched.descriptions?.[index]?.key}
//                                         />
//                                     </div>
//                                     <div className="col-12" style={{ padding: 0 }}>
//                                         <TextareaElement
//                                             name={`descriptions.${index}.value`}
//                                             placeholder={t("adminRoot.projectPage.form.placeholders.value")}
//                                             imgSrc={az}
//                                             value={formik.values.descriptions[index].value}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.errors.descriptions?.[index]?.value}
//                                             touched={formik.touched.descriptions?.[index]?.value}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="col-6" style={{ padding: 0, paddingLeft: 24 }}>
//                                     <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
//                                         <InputElement
//                                             name={`descriptions.${index}.keyEng`}
//                                             placeholder={t("adminRoot.projectPage.form.placeholders.keyEng")}
//                                             imgSrc={en}
//                                             value={formik.values.descriptions[index].keyEng}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             type="text"
//                                             error={formik.errors.descriptions?.[index]?.keyEng}
//                                             touched={formik.touched.descriptions?.[index]?.keyEng}
//                                         />
//                                     </div>
//                                     <div className="col-12" style={{ padding: 0 }}>
//                                         <TextareaElement
//                                             name={`descriptions.${index}.valueEng`}
//                                             placeholder={t("adminRoot.projectPage.form.placeholders.valueEng")}
//                                             imgSrc={en}
//                                             value={formik.values.descriptions[index].valueEng}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.errors.descriptions?.[index]?.valueEng}
//                                             touched={formik.touched.descriptions?.[index]?.valueEng}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                         <button
//                             type="button"
//                             className="addButton"
//                             onClick={() =>
//                                 formik.setFieldValue("descriptions", [
//                                     ...(formik.values.descriptions || []),
//                                     { key: "", value: "", keyEng: "", valueEng: "" },
//                                 ])
//                             }
//                             style={{
//                                 marginBottom: 20,
//                                 background: "#E0E0E0",
//                                 border: "none",
//                                 padding: "8px 16px",
//                                 cursor: "pointer",
//                                 borderRadius: 6,
//                             }}
//                         >
//                             + {t("adminRoot.common.add")}
//                         </button>
//                     </>

//                     {/* Submit */}
//                     <div className="col-12" style={{ padding: 0, marginBottom: 16 }}>
//                         <EditButton editLoading={updateLoading} />
//                     </div>
//                 </div>
//             </form>
//         </Popup>
//     );
// };

// export default EditProject;




import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import az from "/src/assets/az.png";
import en from "/src/assets/en.png";

import Popup from "../../../../components/Admin/Popup";
import InputElement from "../../../../components/Admin/FormElements/InputElement";
import TextareaElement from "../../../../components/Admin/FormElements/TextareaElement";
import SingleImageUpload from "../../../../components/Admin/FormElements/SingleElement";
import MultiFileUpload from "../../../../components/Admin/FormElements/MultipleUploadElement";
import EditButton from "../../../../components/Admin/FormElements/EditBtn";

import { useUpdateProjectsMutation } from "../../../../services/apis/userApi";
import SelectElement from "../../../../components/Admin/FormElements/SelectBoxElement";

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

const EditProject = ({ editPopupOpen, setEditPopupOpen, editGuest, setEditGuest }) => {
    const { t } = useTranslation();
    const [updateProject, { isLoading: updateLoading }] = useUpdateProjectsMutation();

    const imgLocalCard = "https://api.buyontech.net/files/projects/cards/";
    const imgLocalFiles = "https://api.buyontech.net/files/projects/files/";

    // Yeni yüklənəcək qalereya faylları
    const [projectImages, setProjectImages] = useState([]);
    // Köhnə fayllar (id, name)
    const [existingFiles, setExistingFiles] = useState([]);
    // Silinənlərin id-ləri
    const [deleteServiceIds, setDeleteServiceIds] = useState([]);
    const [deleteLinkIds, setDeleteLinkIds] = useState([]);
    const [deleteFileIds, setDeleteFileIds] = useState([]);

    // Popup açılarkən köhnə faylları state-ə doldur
    useEffect(() => {
        const arr = (editGuest?.files || []).map(f => ({ id: String(f.id), name: f.name }));
        setExistingFiles(arr);
    }, [editGuest]);

    const initialValues = useMemo(
        () => ({
            id: editGuest?.id || "",
            cardImage: editGuest?.cardImage || "",
            title: editGuest?.title || "",
            titleEng: editGuest?.titleEng || "",
            subTitle: editGuest?.subTitle || "",
            subTitleEng: editGuest?.subTitleEng || "",
            year: editGuest?.year || "",
            projectType: editGuest?.projectType || "",
            projectTypeEng: editGuest?.projectTypeEng || "",
            // formdaxili array
            services: (editGuest?.services || []).map(s => s.name),
            profilName: editGuest?.profilName || "",
            linksText: (editGuest?.links || []).map(l => l.name).join(", "),
            descriptions: editGuest?.descriptions?.length ? editGuest.descriptions : [],
            categoryType: editGuest?.categoryType || "",
            // orijinalları diff üçün saxlayırıq
            _existingServices: editGuest?.services || [],
            _existingLinks: editGuest?.links || [],
        }),
        [editGuest]
    );

    const validationSchema = Yup.object({
        title: Yup.string().required(t("adminRoot.projectPage.validation.title")),
        titleEng: Yup.string().required(t("adminRoot.projectPage.validation.titleEng")),
        subTitle: Yup.string().required(t("adminRoot.projectPage.validation.subTitle")),
        subTitleEng: Yup.string().required(t("adminRoot.projectPage.validation.subTitleEng")),
        year: Yup.string().required(t("adminRoot.projectPage.validation.year")),
        projectType: Yup.string().required(t("adminRoot.projectPage.validation.projectType")),
        projectTypeEng: Yup.string().required(t("adminRoot.projectPage.validation.projectTypeEng")),
        services: Yup.array().required(t("adminRoot.projectPage.validation.services")),
        profilName: Yup.string().required(t("adminRoot.projectPage.validation.profilName")),
        linksText: Yup.string().required(t("adminRoot.projectPage.validation.links")),
        categoryType: Yup.string().required(t("adminRoot.projectPage.validation.categoryType")),
        // Edit üçün files məcburi deyil; əgər minimumu qorumaq istəsən,
        // custom testlə totalCount (existing+new) yoxlayıb əlavə etmək olar.
        cardImage: Yup.mixed()
            .test(
                "required-if-no-existing",
                t("adminRoot.projectPage.validation.cardImage"),
                function (value) {
                    const hasExisting = !!this.options.context?.existingImage;
                    if (hasExisting) return true;
                    return value !== null && value !== undefined;
                }
            )
            .test("fileSize", t("adminRoot.projectPage.validation.fileSize"), (value) => {
                if (!value) return false;
                if (typeof value === "string") return true;
                return value.size <= FILE_SIZE;
            })
            .test("fileFormat", t("adminRoot.projectPage.validation.fileFormat"), (value) => {
                if (!value) return false;
                if (typeof value === "string") return true;
                return SUPPORTED_FORMATS.includes(value.type);
            }),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        validationContext: { existingImage: editGuest?.cardImage },
        onSubmit: async (values, { resetForm }) => {
            try {
                // ----- SERVICES diff -----
                const originalServiceNames = (values._existingServices || []).map(s => s.name.trim());
                const originalServiceMap = new Map((values._existingServices || []).map(s => [s.name.trim(), String(s.id)]));
                const inputServiceNames = (values.services || []).map(s => s.trim());

                const servicesToAdd = inputServiceNames.filter(n => !originalServiceNames.includes(n));
                const servicesToDeleteIds = (values._existingServices || [])
                    .filter(s => !inputServiceNames.includes(s.name.trim()))
                    .map(s => String(s.id));

                // ----- LINKS diff -----
                const originalLinkNames = (values._existingLinks || []).map(l => l.name.trim());
                const originalLinkMap = new Map((values._existingLinks || []).map(l => [l.name.trim(), String(l.id)]));
                const inputLinkNames = (values.linksText || "")
                    .split(/[,\n]/)
                    .map(s => s.trim())
                    .filter(Boolean);

                const linksToAdd = inputLinkNames.filter(n => !originalLinkNames.includes(n));
                const linksToDeleteIds = (values._existingLinks || [])
                    .filter(l => !inputLinkNames.includes(l.name.trim()))
                    .map(l => String(l.id));

                // ----- FILES diff -----
                // existingFiles state-dən silinənlərin id-lərini tapırıq:
                // (deleteFileIds artıq MultiFileUpload-dan toplanır)
                const newFiles = projectImages; // yalnız yeni yüklənənlər

                const fd = new FormData();
                fd.append("Id", values.id);
                fd.append("Title", values.title);
                fd.append("TitleEng", values.titleEng);
                fd.append("SubTitle", values.subTitle);
                fd.append("SubTitleEng", values.subTitleEng);
                fd.append("Year", values.year);
                fd.append("ProjectType", values.projectType);
                fd.append("ProjectTypeEng", values.projectTypeEng);
                fd.append("ProfilName", values.profilName);
                fd.append("CategoryType", values.categoryType);
                fd.append("CardImage", values.cardImage);

                // add services
                servicesToAdd.forEach(s => fd.append("Services", s));
                // delete services
                servicesToDeleteIds.forEach(id => fd.append("DeleteServiceIds", id));

                // add links
                linksToAdd.forEach(l => fd.append("Links", l));
                // delete links
                linksToDeleteIds.forEach(id => fd.append("DeleteLinkIds", id));

                // add new files
                newFiles.forEach(f => fd.append("Files", f));
                // delete existing files
                deleteFileIds.forEach(id => fd.append("DeleteFileIds", id));

                // descriptions
                fd.append("descriptionsJson", JSON.stringify(values.descriptions || []));

                await updateProject(fd).unwrap();

                toast.success(t("adminRoot.projectPage.edit.success"));
                resetForm();
                setProjectImages([]);
                setExistingFiles((editGuest?.files || []).map(f => ({ id: String(f.id), name: f.name })));
                setDeleteServiceIds([]);
                setDeleteLinkIds([]);
                setDeleteFileIds([]);
                setEditPopupOpen(false);
                setEditGuest(null);
            } catch (err) {
                console.error("Project update error:", err);
                toast.error(t("adminRoot.projectPage.edit.error"));
            }
        },
    });

    return (
        <Popup
            isActive={editPopupOpen}
            onClose={() => {
                setEditPopupOpen(false);
                setEditGuest(null);
                setProjectImages([]);
                setExistingFiles((editGuest?.files || []).map(f => ({ id: String(f.id), name: f.name })));
                setDeleteServiceIds([]);
                setDeleteLinkIds([]);
                setDeleteFileIds([]);
                formik.resetForm();
            }}
        >
            <h2>{t("adminRoot.projectPage.edit.title")}</h2>

            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    {/* Card Image */}
                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                        <SingleImageUpload
                            file={formik.values.cardImage}
                            name="cardImage"
                            formikData={formik}
                            existImageUrl={imgLocalCard}
                            setFile={(file) => {
                                formik.setFieldValue("cardImage", file);
                                formik.setFieldTouched("cardImage", true, false);
                                formik.validateField("cardImage");
                            }}
                        />
                    </div>

                    {/* Gallery (old + new) */}
                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                        <MultiFileUpload
                            files={projectImages}
                            setFiles={setProjectImages}
                            existingFiles={existingFiles}             // <- köhnələri veririk
                            setExistingFiles={(list) => {
                                // Parent-də də saxlayırıq
                                setExistingFiles(list);
                            }}
                            onRemoveExisting={(fileObj) => {          // <- silinən köhnənin id-sini yığırıq
                                setDeleteFileIds((prev) => {
                                    if (prev.includes(fileObj.id)) return prev;
                                    return [...prev, fileObj.id];
                                });
                            }}
                            filePath={imgLocalFiles}                   // <- köhnə fayl display üçün prefix
                            formik={formik}
                            name="files"
                        />
                    </div>

                    {/* AZ / EN başlıqlar */}
                    <div className="inputsBox" style={{ marginBottom: 24 }}>
                        <div className="col-6" style={{ padding: 0, paddingRight: 24, borderRight: "1px solid #CCC" }}>
                            <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                                <InputElement
                                    name="title"
                                    placeholder={t("adminRoot.projectPage.form.placeholders.title")}
                                    imgSrc={az}
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    error={formik.errors.title}
                                    touched={formik.touched.title}
                                />
                            </div>
                            <div className="col-12" style={{ padding: 0 }}>
                                <InputElement
                                    name="subTitle"
                                    placeholder={t("adminRoot.projectPage.form.placeholders.subTitle")}
                                    imgSrc={az}
                                    value={formik.values.subTitle}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    error={formik.errors.subTitle}
                                    touched={formik.touched.subTitle}
                                />
                            </div>
                        </div>

                        <div className="col-6" style={{ padding: 0, paddingLeft: 24 }}>
                            <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                                <InputElement
                                    name="titleEng"
                                    placeholder={t("adminRoot.projectPage.form.placeholders.titleEng")}
                                    imgSrc={en}
                                    value={formik.values.titleEng}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    error={formik.errors.titleEng}
                                    touched={formik.touched.titleEng}
                                />
                            </div>
                            <div className="col-12" style={{ padding: 0 }}>
                                <InputElement
                                    name="subTitleEng"
                                    placeholder={t("adminRoot.projectPage.form.placeholders.subTitleEng")}
                                    imgSrc={en}
                                    value={formik.values.subTitleEng}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    error={formik.errors.subTitleEng}
                                    touched={formik.touched.subTitleEng}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                        <InputElement
                            name="projectType"
                            placeholder={t("adminRoot.projectPage.form.placeholders.projectType")}
                            imgSrc={az}
                            value={formik.values.projectType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            error={formik.errors.projectType}
                            touched={formik.touched.projectType}
                        />
                    </div>

                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                        <InputElement
                            name="projectTypeEng"
                            placeholder={t("adminRoot.projectPage.form.placeholders.projectTypeEng")}
                            imgSrc={en}
                            value={formik.values.projectTypeEng}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            error={formik.errors.projectTypeEng}
                            touched={formik.touched.projectTypeEng}
                        />
                    </div>

                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                        <InputElement
                            name="year"
                            placeholder={t("adminRoot.projectPage.form.placeholders.year")}
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            error={formik.errors.year}
                            touched={formik.touched.year}
                        />
                    </div>

                    {/* SERVICES: daxildə array, inputda join */}
                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                        <InputElement
                            name="services"
                            placeholder={t("adminRoot.projectPage.form.placeholders.services")}
                            type="text"
                            value={(formik.values.services || []).join(", ")}
                            onChange={(e) => {
                                const arr = e.target.value
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean);
                                formik.setFieldValue("services", arr);
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.errors.services}
                            touched={formik.touched.services}
                        />
                    </div>

                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>

                        <SelectElement
                            name="categoryType"
                            placeholder={t('adminRoot.logoPage.form.placeholders.name')}
                            value={formik.values.categoryType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.categoryType}
                            touched={formik.touched.categoryType}
                            options={[
                                { value: "marketing", label: "Marketing" },
                                { value: "development", label: "Development" },
                            ]}
                        />

                    </div>

                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                        <InputElement
                            name="profilName"
                            placeholder={t("adminRoot.projectPage.form.placeholders.profilName")}
                            value={formik.values.profilName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            error={formik.errors.profilName}
                            touched={formik.touched.profilName}
                        />
                    </div>

                    {/* LINKS */}
                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                        <TextareaElement
                            name="linksText"
                            placeholder={t("adminRoot.projectPage.form.placeholders.links")}
                            value={formik.values.linksText}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.linksText}
                            touched={formik.touched.linksText}
                        />
                    </div>

                    {/* DESCRIPTIONS */}
                    <>
                        {(formik.values.descriptions || []).map((_, index) => (
                            <div key={index} className="inputsBox" style={{ marginBottom: 24, position: "relative" }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = formik.values.descriptions.filter((__, i) => i !== index);
                                        formik.setFieldValue("descriptions", next);
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: 10,
                                        right: -35,
                                        background: "#ff4d4f",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: 24,
                                        height: 24,
                                        cursor: "pointer",
                                        fontSize: 14,
                                        lineHeight: "24px",
                                        textAlign: "center",
                                    }}
                                >
                                    ×
                                </button>

                                <div className="col-6" style={{ padding: 0, paddingRight: 24, borderRight: "1px solid #CCC" }}>
                                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                                        <InputElement
                                            name={`descriptions.${index}.key`}
                                            placeholder={t("adminRoot.projectPage.form.placeholders.key")}
                                            imgSrc={az}
                                            value={formik.values.descriptions[index].key}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            error={formik.errors.descriptions?.[index]?.key}
                                            touched={formik.touched.descriptions?.[index]?.key}
                                        />
                                    </div>
                                    <div className="col-12" style={{ padding: 0 }}>
                                        <TextareaElement
                                            name={`descriptions.${index}.value`}
                                            placeholder={t("adminRoot.projectPage.form.placeholders.value")}
                                            imgSrc={az}
                                            value={formik.values.descriptions[index].value}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.errors.descriptions?.[index]?.value}
                                            touched={formik.touched.descriptions?.[index]?.value}
                                        />
                                    </div>
                                </div>

                                <div className="col-6" style={{ padding: 0, paddingLeft: 24 }}>
                                    <div className="col-12" style={{ padding: 0, marginBottom: 12 }}>
                                        <InputElement
                                            name={`descriptions.${index}.keyEng`}
                                            placeholder={t("adminRoot.projectPage.form.placeholders.keyEng")}
                                            imgSrc={en}
                                            value={formik.values.descriptions[index].keyEng}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            error={formik.errors.descriptions?.[index]?.keyEng}
                                            touched={formik.touched.descriptions?.[index]?.keyEng}
                                        />
                                    </div>
                                    <div className="col-12" style={{ padding: 0 }}>
                                        <TextareaElement
                                            name={`descriptions.${index}.valueEng`}
                                            placeholder={t("adminRoot.projectPage.form.placeholders.valueEng")}
                                            imgSrc={en}
                                            value={formik.values.descriptions[index].valueEng}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.errors.descriptions?.[index]?.valueEng}
                                            touched={formik.touched.descriptions?.[index]?.valueEng}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="addButton"
                            onClick={() =>
                                formik.setFieldValue("descriptions", [
                                    ...(formik.values.descriptions || []),
                                    { key: "", value: "", keyEng: "", valueEng: "" },
                                ])
                            }
                            style={{
                                marginBottom: 20,
                                background: "#E0E0E0",
                                border: "none",
                                padding: "8px 16px",
                                cursor: "pointer",
                                borderRadius: 6,
                            }}
                        >
                            + {t("adminRoot.common.add")}
                        </button>
                    </>

                    <div className="col-12" style={{ padding: 0, marginBottom: 16 }}>
                        <EditButton editLoading={updateLoading} />
                    </div>
                </div>
            </form>
        </Popup>
    );
};

export default EditProject;
