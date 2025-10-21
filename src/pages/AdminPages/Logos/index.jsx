import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import az from '/src/assets/az.png'
import en from '/src/assets/en.png'
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import AdminTables from '../../../components/Admin/AdminTables';
import AdminTableBody from '../../../components/Admin/TableBody';
import Popup from '../../../components/Admin/Popup';
import DeletePopup from '../../../components/Admin/DeletePopup';
import InputElement from '../../../components/Admin/FormElements/InputElement';
import CreateButton from '../../../components/Admin/FormElements/AddBtn';
import SingleImageUpload from '../../../components/Admin/FormElements/SingleElement';
import { Image } from 'antd';
import DetailGuest from './DetailGuest';
import { useCreateLogosMutation, useDeleteLogosMutation, useGetAllLogosQuery } from '../../../services/apis/userApi';

const AdminLogos
  = () => {
    const imgLocal = 'https://api.buyontech.net/files/logos/'
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
    const [createGuest, { isLoading: createLoading, error: createError }] = useCreateLogosMutation();
    const { data: guestData, isLoading: guestLoading, isError: guestError, isFetching, error: fetchError } = useGetAllLogosQuery();
    const [deleteGuest, { isLoading: deleteLoading, error: deleteError }] = useDeleteLogosMutation();

    const load = guestLoading || isFetching;
    const error = guestError || createError || deleteError || fetchError;
    const myData = guestData?.data || [];
    // Search Filter


    let filteringData = [...myData].filter((x) => {
      const category = (x.categoryType || "").trim().toLowerCase();
      return category.includes(searchTerm.toLowerCase().trim());
    })

    filteringData = filteringData.filter((x) => {
      if (sortType === "name-asc") {
        return x.categoryType === "marketing";
      }

      if (sortType === "name-desc") {
        return x.categoryType === "development"
      }

      return true;
    });

    const handleDelete = async () => {
      try {
        await deleteGuest(deleteId).unwrap();
        toast.success(t('adminRoot.logoPage.delete.success'));
        setDeletePopupOpen(false);
        setDeleteId(null);
      } catch (err) {
        toast.error(t('adminRoot.logoPage.delete.error'));
        console.error(err);
      }
    };




    const columns = [
      {
        header: t('adminRoot.logoPage.table.index'), accessor: "index",
        render: (row, rowIndex) => rowIndex + 1
      },
      {
        header: t("adminRoot.logoPage.table.image"),
        accessor: "Image",
        render: (row) => {
          return <div className='tableImageBox'>
            <Image
              src={imgLocal + row?.logoImage}
              alt={row.fullName || t("adminRoot.programPage.fallback.imagePreview")}
              preview={true}
            />
          </div>

        },
      },
      {
        header: t('adminRoot.logoPage.table.category'),
        accessor: "name",
        render: (row) => {
          return <span>{row?.categoryType}</span>

        },
      },

      {
        header: t('adminRoot.logoPage.table.delete'),
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
    const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    const formik = useFormik({
      initialValues: {
        categoryType: "",
        logoImage: null
      },
      validationSchema: Yup.object({
        categoryType: Yup.string().required(t('adminRoot.logoPage.validation.name')),
        logoImage: Yup.mixed()
          .required(t("adminRoot.logoPage.validation.img"))
          .test("fileSize", t("adminRoot.logoPage.validation.fileSize"),
            (value) => !value || (value && value.size <= FILE_SIZE)
          )
          .test("fileFormat", t("adminRoot.logoPage.validation.fileFormat"),
            (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
          ),
      }),
      onSubmit: async (values, { resetForm }) => {
        try {
          const fd = new FormData();
          fd.append("LogoImage", values.logoImage);
          fd.append("CategoryType", values.categoryType?.trim().toLocaleLowerCase());
          const res = await createGuest(fd).unwrap();
          console.log(res)
          resetForm();
          toast.success(t('adminRoot.logoPage.create.success'));

          setPopupOpen(false);
        } catch (err) {
          toast.error(t('adminRoot.logoPage.create.error'));

          console.error("Team create error:", err);
        }
      },
    });



    const logoOptions = [
      { value: "all", label: t('adminRoot.logoPage.sort.default') },
      {
        label: t('adminRoot.logoPage.sort.byName'),
        options: [
          { value: "name-asc", label: t('adminRoot.logoPage.sort.nameAsc') },
          { value: "name-desc", label: t('adminRoot.logoPage.sort.nameDesc') },
        ],
      },
    ];


    return (
      <>

        <main id='adminMain' style={{ position: "relative" }}>
          <Helmet><title>{t('adminRoot.logoPage.metaTitle')}</title></Helmet>



          <>
            <AdminTables myData={myData} placeholder={t('adminRoot.logoPage.search.placeholder')} setPopupOpen={setPopupOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterType={sortType} setFilterType={setSortType} guestOptions={logoOptions} title={t('adminRoot.logoPage.title')} />
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
                }}>{t('adminRoot.logoPage.fallback.loadError')}</p>
              ) : (
                <AdminTableBody
                  columns={columns}
                  data={filteringData}
                  searchTerm={searchTerm}
                  searchNotFound={t('adminRoot.logoPage.search.notFound')}
                  noData={t('adminRoot.logoPage.search.noData')}


                >
                </AdminTableBody>)
            }



            <Popup isActive={popupOpen} onClose={() => {
              setPopupOpen(false)
              formik.resetForm()
            }}>
              <h2>{t('adminRoot.logoPage.create.title')}</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="row">

                  <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                    <InputElement
                      name="categoryType"
                      placeholder={t('adminRoot.logoPage.form.placeholders.name')}
                      value={formik.values.categoryType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type={'text'}
                      error={formik.errors.categoryType}
                      touched={formik.touched.categoryType}
                    />
                  </div>



                  <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>

                    <SingleImageUpload
                      file={formik.values.logoImage}
                      name="logoImage"
                      formikData={formik}
                      setFile={(file) => {
                        formik.setFieldValue("logoImage", file);
                        formik.setFieldTouched("logoImage", true, false);
                        formik.validateField("logoImage");
                      }}

                    />
                  </div>

                  <div className="col-12" style={{ padding: "0", marginBottom: "16px" }}>
                    <CreateButton createLoading={createLoading} />
                  </div>
                </div>
              </form>
            </Popup>
            {
              detailPopupOpen ? <DetailGuest onClose={() => {
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
              title={{ az: "Loqo", en: "Logo" }}

              onDelete={handleDelete} />
          </>

        </main>
      </>
    )
  }

export default AdminLogos

