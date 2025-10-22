import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import az from '/src/assets/az.png'
import en from '/src/assets/en.png'
import * as Yup from "yup";
import { FieldArray, useFormik } from "formik";
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import AdminTables from '../../../components/Admin/AdminTables';
import AdminTableBody from '../../../components/Admin/TableBody';
import EditGuest from './EditProject';
import Popup from '../../../components/Admin/Popup';
import DeletePopup from '../../../components/Admin/DeletePopup';
import InputElement from '../../../components/Admin/FormElements/InputElement';
import CreateButton from '../../../components/Admin/FormElements/AddBtn';
import SingleImageUpload from '../../../components/Admin/FormElements/SingleElement';
import { Image } from 'antd';
import { useCreateProjectsMutation, useDeleteProjectsMutation, useGetAllProjectsQuery } from '../../../services/apis/userApi';
import DetailProject from './DetailProject';
import TextareaElement from '../../../components/Admin/FormElements/TextareaElement';
import MultiFileUpload from '../../../components/Admin/FormElements/MultipleUploadElement';
import EditProject from './EditProject';

const AdminProjects = () => {
  const imgLocal = 'https://api.buyontech.net/files/projects/cards/'
  const imgLocal2 = 'https://api.buyontech.net/files/projects/files/'
  const [popupOpen, setPopupOpen] = useState(false)
  // Edit
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [editGuest, setEditGuest] = useState(null);
  // Search Sort
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("all");
  const { i18n, t } = useTranslation();
  // Delete States
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Detail States
  const [detailPopupOpen, setDetailPopupOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);

  // Rtk
  const [createGuest, { isLoading: createLoading, error: createError }] = useCreateProjectsMutation();
  const { data: guestData, isLoading: guestLoading, isError: guestError, isFetching, error: fetchError } = useGetAllProjectsQuery();
  const [deleteGuest, { isLoading: deleteLoading, error: deleteError }] = useDeleteProjectsMutation();

  const load = guestLoading || isFetching;
  const error = guestError || createError || deleteError || fetchError;
  const myData = guestData?.data || [];
  // Search Filter
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
  let filteringData = [...myData].filter((x) => {
    const name = getLocalizedName(x, i18n.language).toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase())
    );
  })


  filteringData = filteringData.sort((a, b) => {
    if (sortType === "name-asc") {
      return getLocalizedName(a, i18n.language)
        .toLowerCase()
        .localeCompare(getLocalizedName(b, i18n.language).toLowerCase());
    }
    if (sortType === "name-desc") {
      return getLocalizedName(b, i18n.language)
        .toLowerCase()
        .localeCompare(getLocalizedName(a, i18n.language).toLowerCase());
    }
    if (sortType === "year-asc") {
      const ay = (() => {
        const m = String(a?.year ?? "").match(/\d+/);
        return m ? Number(m[0]) : Number.POSITIVE_INFINITY; // olmayanlar sonda
      })();
      const by = (() => {
        const m = String(b?.year ?? "").match(/\d+/);
        return m ? Number(m[0]) : Number.POSITIVE_INFINITY;
      })();
      return ay - by;
    }
    if (sortType === "year-desc") {
      const ay = (() => {
        const m = String(a?.year ?? "").match(/\d+/);
        return m ? Number(m[0]) : Number.NEGATIVE_INFINITY; // olmayanlar sonda
      })();
      const by = (() => {
        const m = String(b?.year ?? "").match(/\d+/);
        return m ? Number(m[0]) : Number.NEGATIVE_INFINITY;
      })();
      return by - ay;
    }
    // --- YEAR hissəsinin düzəlişi bitdi ---

    return 0;
  });
  const handleDelete = async () => {
    try {
      await deleteGuest(deleteId).unwrap();
      toast.success(t('adminRoot.projectPage.delete.success'));
      setDeletePopupOpen(false);
      setDeleteId(null);
    } catch (err) {
      toast.error(t('adminRoot.projectPage.delete.error'));
      console.error(err);
    }
  };




  const columns = [
    {
      header: t('adminRoot.projectPage.table.index'), accessor: "index",
      render: (row, rowIndex) => rowIndex + 1
    },
    {
      header: t("adminRoot.projectPage.table.image"),
      accessor: "Image",
      render: (row) => {
        return <div className='tableImageBox'>
          {
            row?.cardImage ? <Image
              src={imgLocal + row?.cardImage}
              alt={row.fullName || t("adminRoot.programPage.fallback.imagePreview")}
              preview={true}
            /> : ""
          }
        </div>

      },
    },
    {
      header: t('adminRoot.projectPage.table.title'),
      accessor: "name",
      render: (row) => {
        return <span>{getLocalizedName(row, i18n.language)}</span>

      },
    },

    {
      header: t('adminRoot.projectPage.table.projectType'),
      accessor: "country",
      render: (row) => {
        return <span>{getLocalizedCountry(row, i18n.language)}</span>
      },
    },
    {
      header: t('adminRoot.projectPage.table.year'),
      accessor: "country",
      render: (row) => {
        return <span>{row?.year}</span>
      },
    },


    {
      header: t('adminRoot.projectPage.table.details'),
      render: (row) => (
        <Link
          onClick={(e) => {
            e.preventDefault()
            setDetailId(row?.id);
            setDetailPopupOpen(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5ZM3.18 12C3.98825 13.6503 5.24331 15.0407 6.80248 16.0133C8.36165 16.9858 10.1624 17.5013 12 17.5013C13.8376 17.5013 15.6383 16.9858 17.1975 16.0133C18.7567 15.0407 20.0117 13.6503 20.82 12C20.0117 10.3497 18.7567 8.95925 17.1975 7.98675C15.6383 7.01424 13.8376 6.49868 12 6.49868C10.1624 6.49868 8.36165 7.01424 6.80248 7.98675C5.24331 8.95925 3.98825 10.3497 3.18 12Z" fill="#004EF8" />
          </svg>
        </Link>
      ),
      align: "center",
      isAction: true,
    },
    {
      header: t('adminRoot.projectPage.table.edit'),
      render: (row) => (
        <Link onClick={(e) => {
          e.preventDefault()
          setEditGuest(row);
          setEditPopupOpen(true);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" stroke="#F5BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z" stroke="#F5BC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ),
      align: "center",
      isAction: true,
    },
    {
      header: t('adminRoot.projectPage.table.delete'),
      render: (row) => (
        <button
          onClick={() => {
            setDeleteId(row.id);
            setDeletePopupOpen(true);
          }}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#EB0000" />
          </svg>
        </button>
      ),
      align: "center",
      isAction: true,
    },
  ];

  const [projectImages, setProjectImages] = useState([]);
  const FILE_SIZE = 5 * 1024 * 1024;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
  const handleSplit = (val) => {
    const arr = val.split(",")
      .map((s) => s.trim())
    return arr;
  }
  const formik = useFormik({
    initialValues: {
      title: "",
      titleEng: "",
      subTitle: "",
      subTitleEng: "",
      year: "",
      projectType: "",
      projectTypeEng: "",
      services: [],
      files: [],
      profilName: "",
      cardImage: null,
      links: '',
      descriptions: [],
      categoryType: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required(t("adminRoot.projectPage.validation.title")),
      titleEng: Yup.string().required(t("adminRoot.projectPage.validation.titleEng")),

      subTitle: Yup.string().required(t("adminRoot.projectPage.validation.subTitle")),
      subTitleEng: Yup.string().required(t("adminRoot.projectPage.validation.subTitleEng")),

      year: Yup.string().required(t("adminRoot.projectPage.validation.year")),

      projectType: Yup.string().required(t("adminRoot.projectPage.validation.projectType")),
      projectTypeEng: Yup.string().required(t("adminRoot.projectPage.validation.projectTypeEng")),

      services: Yup.array()
        .required(t("adminRoot.projectPage.validation.services")),

      files: Yup.array()
        .min(4, t("adminRoot.projectPage.validation.files"))
        .required(t("adminRoot.projectPage.validation.files")),

      profilName: Yup.string().required(t("adminRoot.projectPage.validation.profilName")),

      cardImage: Yup.mixed()
        .required(t("adminRoot.projectPage.validation.cardImage"))
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

      links: Yup.string()
        .required(t("adminRoot.projectPage.validation.links")),

      categoryType: Yup.string().required(t("adminRoot.projectPage.validation.categoryType")),
      // cardImage: Yup.mixed()
      //   .required(t("adminRoot.projectPage.validation.img"))
      //   .test("fileSize", t("adminRoot.projectPage.validation.fileSize"),
      //     (value) => !value || (value && value.size <= FILE_SIZE)
      //   )
      //   .test("fileFormat", t("adminRoot.projectPage.validation.fileFormat"),
      //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
      //   ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const fd = new FormData();
        fd.append("Title", values.title);
        fd.append("TitleEng", values.titleEng);
        fd.append("SubTitle", values.subTitle);
        fd.append("SubTitleEng", values.subTitleEng);
        fd.append("Year", values.year);
        fd.append("ProjectType", values.projectType);
        fd.append("ProjectTypeEng", values.projectTypeEng);
        fd.append("ProfilName", values.profilName);
        fd.append("CardImage", values.cardImage);
        fd.append("CategoryType", values.categoryType);
        fd.append("descriptionsJson", JSON.stringify(values.descriptions));
        values.services.forEach((item, i) => fd.append(`Services`, item));
        // values.files.forEach((item, i) => fd.append(`Files[${i}].Name`, item.name));
        if (projectImages?.length) {
          projectImages.forEach((file) => fd.append("Files", file));
        }
        const allLinks = handleSplit(values.links);
        allLinks.forEach((item, i) => fd.append(`Links`, item));
        const res = await createGuest(fd).unwrap();
        resetForm();
        setProjectImages([])
        toast.success(t('adminRoot.projectPage.create.success'));

        setPopupOpen(false);
      } catch (err) {
        toast.error(t('adminRoot.projectPage.create.error'));

        console.error("Team create error:", err);
      }
    },
  });



  const projectOptions = [
    { value: "all", label: t("adminRoot.projectPage.sort.default") },
    {
      label: t("adminRoot.projectPage.sort.byName"),
      options: [
        { value: "name-asc", label: t("adminRoot.projectPage.sort.nameAsc") },
        { value: "name-desc", label: t("adminRoot.projectPage.sort.nameDesc") },
      ],
    },
    {
      label: t("adminRoot.projectPage.sort.byYear"),
      options: [
        { value: "year-asc", label: t("adminRoot.projectPage.sort.yearAsc") },
        { value: "year-desc", label: t("adminRoot.projectPage.sort.yearDesc") },
      ],
    },
  ];

  return (
    <>

      <main id='adminMain' style={{ position: "relative" }}>
        <Helmet><title>{t('adminRoot.projectPage.metaTitle')}</title></Helmet>



        <>
          <AdminTables myData={myData} placeholder={t('adminRoot.projectPage.search.placeholder')} setPopupOpen={setPopupOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterType={sortType} setFilterType={setSortType} guestOptions={projectOptions} title={t('adminRoot.projectPage.title')} />
          {
            load ? (
              <div className="loadingWrapper">
                {/* <Loading /> */}
              </div>
            ) : error ? (
              <p style={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
              }}>{t('adminRoot.projectPage.fallback.loadError')}</p>
            ) : (
              <AdminTableBody
                columns={columns}
                data={filteringData}
                searchTerm={searchTerm}
                searchNotFound={t('adminRoot.projectPage.search.notFound')}
                noData={t('adminRoot.projectPage.search.noData')}


              >
                {editPopupOpen && (
                  <EditProject
                    editPopupOpen={editPopupOpen}
                    setEditPopupOpen={setEditPopupOpen}
                    editGuest={editGuest}
                    setEditGuest={setEditGuest}
                  />
                )}
              </AdminTableBody>)
          }



          <Popup isActive={popupOpen} onClose={() => {
            setPopupOpen(false)
            setProjectImages([])
            formik.resetForm()
          }}>
            <h2>{t('adminRoot.projectPage.create.title')}</h2>
            <form onSubmit={formik.handleSubmit}  >
              <div className="row">

                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                  <SingleImageUpload
                    file={formik.values.cardImage}
                    name="cardImage"
                    formikData={formik}
                    setFile={(file) => {
                      formik.setFieldValue("cardImage", file);
                      formik.setFieldTouched("cardImage", true, false);
                      formik.validateField("cardImage");
                    }}

                  />
                </div>
                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                  <MultiFileUpload
                    type={'image'}
                    files={projectImages}
                    setFiles={setProjectImages}
                    formik={formik} name={'files'}

                  />
                </div>
                <div className="inputsBox" style={{ marginBottom: "24px" }}>
                  <div className="col-6" style={{ padding: "0", paddingRight: "24px", borderRight: "1px solid #CCC" }}>
                    <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                      <InputElement
                        name="title"
                        placeholder={t('adminRoot.projectPage.form.placeholders.title')}
                        imgSrc={az}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type={'text'}
                        error={formik.errors.title}
                        touched={formik.touched.title}
                      />
                    </div>
                    <div className="col-12" style={{ padding: "0" }}>

                      <InputElement
                        name="subTitle"
                        placeholder={t('adminRoot.projectPage.form.placeholders.subTitle')}
                        imgSrc={az}
                        value={formik.values.subTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.subTitle}
                        type={'text'}

                        touched={formik.touched.subTitle}
                      />
                    </div>

                  </div>
                  <div className="col-6" style={{ padding: "0", paddingLeft: "24px" }}>
                    <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                      <InputElement
                        name="titleEng"
                        placeholder={t('adminRoot.projectPage.form.placeholders.titleEng')}
                        imgSrc={en}
                        value={formik.values.titleEng}
                        onChange={formik.handleChange}
                        type={'text'}

                        onBlur={formik.handleBlur}
                        error={formik.errors.titleEng}
                        touched={formik.touched.titleEng}
                      />
                    </div>
                    <div className="col-12" style={{ padding: "0" }}>

                      <InputElement
                        name="subTitleEng"
                        placeholder={t('adminRoot.projectPage.form.placeholders.subTitleEng')}
                        type={'text'}

                        imgSrc={en}
                        value={formik.values.subTitleEng}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.subTitleEng}
                        touched={formik.touched.subTitleEng}
                      />
                    </div>
                  </div>
                </div>



                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                  <InputElement
                    name="projectType"
                    placeholder={t('adminRoot.projectPage.form.placeholders.projectType')}
                    imgSrc={az}
                    value={formik.values.projectType}
                    onChange={formik.handleChange}
                    type={'text'}

                    onBlur={formik.handleBlur}
                    error={formik.errors.projectType}
                    touched={formik.touched.projectType}
                  />
                </div>


                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                  <InputElement
                    name="projectTypeEng"
                    placeholder={t('adminRoot.projectPage.form.placeholders.projectTypeEng')}
                    imgSrc={en}
                    value={formik.values.projectTypeEng}
                    onChange={formik.handleChange}
                    type={'text'}

                    onBlur={formik.handleBlur}
                    error={formik.errors.projectTypeEng}
                    touched={formik.touched.projectTypeEng}
                  />
                </div>
                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                  <InputElement
                    name="year"
                    placeholder={t('adminRoot.projectPage.form.placeholders.year')}
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    type={'text'}

                    onBlur={formik.handleBlur}
                    error={formik.errors.year}
                    touched={formik.touched.year}
                  />
                </div>
                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                  <InputElement
                    name="services"
                    placeholder={t('adminRoot.projectPage.form.placeholders.services')}
                    type={'text'}

                    value={formik.values.services}
                    onChange={(e) => {
                      const arr = e.target.value.split(",")
                        .map((s) => s.trim())
                      formik.setFieldValue("services", arr);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.errors.services}
                    touched={formik.touched.services}
                  />
                </div>
                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                  <InputElement
                    name="categoryType"
                    placeholder={t('adminRoot.projectPage.form.placeholders.categoryType')}
                    value={formik.values.categoryType}
                    onChange={formik.handleChange}
                    type={'text'}

                    onBlur={formik.handleBlur}
                    error={formik.errors.categoryType}
                    touched={formik.touched.categoryType}
                  />
                </div>
                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                  <InputElement
                    name="profilName"
                    placeholder={t('adminRoot.projectPage.form.placeholders.profilName')}
                    value={formik.values.profilName}
                    onChange={formik.handleChange}
                    type={'text'}

                    onBlur={formik.handleBlur}
                    error={formik.errors.profilName}
                    touched={formik.touched.profilName}
                  />
                </div>
                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                  <TextareaElement
                    name="links"
                    placeholder={t('adminRoot.projectPage.form.placeholders.links')}
                    type={'text'}
                    value={formik.values.links}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.links}
                    touched={formik.touched.links}
                  />
                </div>


                <>
                  {formik.values.descriptions.map((desc, index) => (
                    <div key={index} className="inputsBox" style={{ marginBottom: "24px", position: 'relative' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const newDescriptions = formik.values.descriptions.filter((_, i) => i !== index)
                          formik.setFieldValue("descriptions", newDescriptions)
                        }}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "-35px",
                          background: "#ff4d4f",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          cursor: "pointer",
                          fontSize: "14px",
                          lineHeight: "24px",
                          textAlign: "center",
                        }}
                      >
                        ×
                      </button>

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
                            name={`descriptions.${index}.key`}
                            placeholder={t("adminRoot.projectPage.form.placeholders.key")}
                            imgSrc={az}
                            value={formik.values.descriptions[index].key}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={"text"}
                            error={
                              formik.errors.descriptions?.[index]?.key
                            }
                            touched={
                              formik.touched.descriptions?.[index]?.key
                            }
                          />
                        </div>
                        <div className="col-12" style={{ padding: "0" }}>
                          <TextareaElement
                            name={`descriptions.${index}.value`}
                            placeholder={t(
                              "adminRoot.projectPage.form.placeholders.value"
                            )}
                            imgSrc={az}
                            value={formik.values.descriptions[index].value}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.errors.descriptions?.[index]?.value
                            }
                            touched={
                              formik.touched.descriptions?.[index]?.value
                            }
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
                            name={`descriptions.${index}.keyEng`}
                            placeholder={t(
                              "adminRoot.projectPage.form.placeholders.keyEng"
                            )}
                            imgSrc={en}
                            value={formik.values.descriptions[index].keyEng}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={"text"}
                            error={
                              formik.errors.descriptions?.[index]?.keyEng
                            }
                            touched={
                              formik.touched.descriptions?.[index]?.keyEng
                            }
                          />
                        </div>
                        <div className="col-12" style={{ padding: "0" }}>
                          <TextareaElement
                            name={`descriptions.${index}.valueEng`}
                            placeholder={t(
                              "adminRoot.projectPage.form.placeholders.valueEng"
                            )}
                            imgSrc={en}
                            value={formik.values.descriptions[index].valueEng}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.errors.descriptions?.[index]?.valueEng
                            }
                            touched={
                              formik.touched.descriptions?.[index]?.valueEng
                            }
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
                        ...formik.values.descriptions,
                        {
                          key: "",
                          value: "",
                          keyEng: "",
                          valueEng: "",
                        },
                      ])
                    }
                    style={{
                      marginBottom: "20px",
                      background: "#E0E0E0",
                      border: "none",
                      padding: "8px 16px",
                      cursor: "pointer",
                      borderRadius: "6px",
                    }}
                  >
                    + Əlavə et
                  </button>
                </>
                <div className="col-12" style={{ padding: "0", marginBottom: "16px" }}>
                  <CreateButton createLoading={createLoading} />
                </div>
              </div>
            </form>
          </Popup>
          {
            detailPopupOpen ? <DetailProject onClose={() => {
              setDetailPopupOpen(false);
              setDetailId(null);
            }}
              isOpen={detailPopupOpen}
              guestId={detailId} /> : ""
          }

          <DeletePopup isActive={deletePopupOpen}
            onClose={() => {
              setDeletePopupOpen(false);
              setDeleteId(null);
            }}
            title={{ az: "Layihələr", en: "Projects" }}

            onDelete={handleDelete} />
        </>

      </main>
    </>
  )
}

export default AdminProjects
