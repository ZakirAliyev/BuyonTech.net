import React, { useCallback, useRef, useState } from 'react'
import AdminTables from '../../../components/Admin/AdminTables'
import AdminTableBody from '../../../components/Admin/TableBody'
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import Popup from '../../../components/Admin/Popup';
import InputElement from '../../../components/Admin/FormElements/InputElement';
import az from '/public/admins/az.png'
import en from '/public/admins/en.png'
import TextareaElement from '../../../components/Admin/FormElements/TextareaElement';
import CreateButton from '../../../components/Admin/FormElements/AddBtn';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreateGuestsMutation, useDeleteGuestsMutation, useGetAllGuestsQuery, useUpdateGuestsWithReorderMutation } from "../../../services/userApi";
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import DeletePopup from '../../../components/Admin/DeletePopup';
import EditGuest from './EditGuest';
import Loading from '../../../components/OurComponents/Loading';
import DetailGuest from './DetailGuest';
import ReorderPopup from '../../../components/Admin/ReorderPopup';

const AdminGuests = () => {
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
  // Reorder
  const reorderPopup = useRef(null);
  const [targetIndex, setTargetIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Rtk
  const [createGuest, { isLoading: createLoading, error: createError }] = useCreateGuestsMutation();
  const { data: guestData, isLoading: guestLoading, isError: guestError, isFetching, error: fetchError } = useGetAllGuestsQuery();
  const [deleteGuest, { isLoading: deleteLoading, error: deleteError }] = useDeleteGuestsMutation();
  const [updateGuestWithReorder, { isLoading: reorderLoading }] = useUpdateGuestsWithReorderMutation();

  const load = guestLoading || isFetching;
  const error = guestError || createError || deleteError || fetchError;
  const myData = guestData?.data || [];
  // Search Filter

  const getLocalizedName = (item, lang) => {
    switch (lang?.split("-")[0]) {
      case "az":
        return `${item?.name || ""} ${item?.surname || ""}`.trim();
      case "en":
        return `${item?.nameEng || ""} ${item?.surnameEng || ""}`.trim();
      default:
        return `${item?.name || ""} ${item?.surname || ""}`.trim();
    }
  };
  const getLocalizedCountry = (item, lang) => {
    switch (lang?.split("-")[0]) {
      case "az":
        return item?.country || "";
      case "en":
        return item?.countryEng || "";
      default:
        return item?.country || "";
    }
  };
  let filteringData = [...myData].filter((x) => {
    const name = getLocalizedName(x, i18n.language).toLowerCase();
    const country = getLocalizedCountry(x, i18n.language).toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      country.includes(searchTerm.toLowerCase())
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
    if (sortType === "country-asc") {
      return getLocalizedCountry(a, i18n.language)
        .toLowerCase()
        .localeCompare(getLocalizedCountry(b, i18n.language).toLowerCase());
    }
    if (sortType === "country-desc") {
      return getLocalizedCountry(b, i18n.language)
        .toLowerCase()
        .localeCompare(getLocalizedCountry(a, i18n.language).toLowerCase());
    }
    return 0;
  });
  const handleDelete = async () => {
    try {
      await deleteGuest(deleteId).unwrap();
      toast.success(t('adminRoot.guestPage.delete.success'));
      setDeletePopupOpen(false);
      setDeleteId(null);
    } catch (err) {
      toast.error(t('adminRoot.guestPage.delete.error'));
      console.error(err);
    }
  };

  //Reorder

  const handleReorder = async (val) => {
    if (!Array.isArray(myData) || myData.length === 0) return;

    const targetIdx = Number(val) - 1;     // 1 → 0
    const draggedIdx = Number(currentIndex);

    if (
      Number.isNaN(targetIdx) ||
      targetIdx < 0 ||
      targetIdx >= myData.length ||
      targetIdx === draggedIdx
    ) {
      return;
    }

    const draggedItem = myData[draggedIdx];
    const targetItem = myData[targetIdx];
    if (!draggedItem || !targetItem) return;

    const payload = [
      { id: draggedItem.id, reorderId: targetItem.reorderId },
      { id: targetItem.id, reorderId: draggedItem.reorderId }
    ];

    try {
      await updateGuestWithReorder(payload).unwrap();
      toast.success(t('adminRoot.guestPage.reorder.success'));
    } catch (err) {
      console.error('Failed to swap:', err);
      toast.error(t('adminRoot.guestPage.reorder.error'));
    }
  };

  const handleOpenReorderRef = useCallback(() => {
    reorderPopup.current?.classList?.add('activeReorder');
  }, [currentIndex]);

  const columns = [
    {
      header: t('adminRoot.guestPage.table.index'), accessor: "index",
      render: (row, rowIndex) => rowIndex + 1
    },

    {
      header: t('adminRoot.guestPage.table.fullName'),
      accessor: "name",
      render: (row) => {
        return <span>{getLocalizedName(row, i18n.language)}</span>

      },
    },

    {
      header: t('adminRoot.guestPage.table.country'),
      accessor: "country",
      render: (row) => {
        return <span>{getLocalizedCountry(row, i18n.language)}</span>
      },
    },


    {
      header: t('adminRoot.guestPage.table.details'),
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
      header: t('adminRoot.guestPage.table.edit'),
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
      header: t('adminRoot.guestPage.table.delete'),
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

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      nameEng: "",
      surnameEng: "",
      country: "",
      countryEng: "",
      description: "",
      descriptionEng: "",
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
        fd.append("Name", values.name);
        fd.append("Surname", values.surname);
        fd.append("NameEng", values.nameEng);
        fd.append("SurnameEng", values.surnameEng);
        fd.append("Country", values.country);
        fd.append("CountryEng", values.countryEng);
        fd.append("Description", values.description);
        fd.append("DescriptionEng", values.descriptionEng);

        const res = await createGuest(fd).unwrap();
        resetForm();
        toast.success(t('adminRoot.guestPage.create.success'));

        setPopupOpen(false);
      } catch (err) {
        toast.success(t('adminRoot.guestPage.create.error'));

        console.error("Guest create error:", err);
      }
    },
  });



  const guestOptions = [
    { value: "all", label: t('adminRoot.guestPage.sort.default') },
    {
      label: t('adminRoot.guestPage.sort.byName'),
      options: [
        { value: "name-asc", label: t('adminRoot.guestPage.sort.nameAsc') },
        { value: "name-desc", label: t('adminRoot.guestPage.sort.nameDesc') },
      ],
    },
    {
      label: t('adminRoot.guestPage.sort.byCountry'),
      options: [
        { value: "country-asc", label: t('adminRoot.guestPage.sort.countryAsc') },
        { value: "country-desc", label: t('adminRoot.guestPage.sort.countryDesc') },
      ],
    },
  ];

  return (
    <>

      <main id='adminMain' style={{ position: "relative" }}>
        <Helmet><title>{t('adminRoot.guestPage.metaTitle')}</title></Helmet>



        <>
          <AdminTables myData={myData} placeholder={t('adminRoot.guestPage.search.placeholder')} setPopupOpen={setPopupOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterType={sortType} setFilterType={setSortType} guestOptions={guestOptions} title={t('adminRoot.guestPage.title')} />
          {
            load ? (
              <div className="loadingWrapper">
                <Loading />
              </div>
            ) : error ? (
              <p>{t('adminRoot.guestPage.loadError')}</p>
            ) : (
              <AdminTableBody
                columns={columns}
                data={filteringData}
                searchTerm={searchTerm}
                searchNotFound={t('adminRoot.guestPage.search.notFound')}
                noData={t('adminRoot.guestPage.search.noData')}
                setTargetIndex={setTargetIndex}
                setCurrentIndex={setCurrentIndex}
                handleOpenReorderRef={handleOpenReorderRef}
              >
                <EditGuest
                  editPopupOpen={editPopupOpen}
                  setEditPopupOpen={setEditPopupOpen}
                  editGuest={editGuest}
                  setEditGuest={setEditGuest}
                />
              </AdminTableBody>)
          }



          <Popup isActive={popupOpen} onClose={() => {
            setPopupOpen(false)
            formik.resetForm()
          }}>
            <h2>{t('adminRoot.guestPage.create.title')}</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="row">


                <div className="inputsBox" style={{ marginBottom: "24px" }}>
                  <div className="col-6" style={{ padding: "0", paddingRight: "24px", borderRight: "1px solid #CCC" }}>
                    <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                      <InputElement
                        name="name"
                        placeholder={t('adminRoot.guestPage.form.placeholders.name')}
                        imgSrc={az}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type={'text'}
                        error={formik.errors.name}
                        touched={formik.touched.name}
                      />
                    </div>
                    <div className="col-12" style={{ padding: "0" }}>

                      <InputElement
                        name="surname"
                        placeholder={t('adminRoot.guestPage.form.placeholders.surname')}
                        imgSrc={az}
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.surname}
                        type={'text'}

                        touched={formik.touched.surname}
                      />
                    </div>

                  </div>
                  <div className="col-6" style={{ padding: "0", paddingLeft: "24px" }}>
                    <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                      <InputElement
                        name="nameEng"
                        placeholder={t('adminRoot.guestPage.form.placeholders.nameEng')}
                        imgSrc={en}
                        value={formik.values.nameEng}
                        onChange={formik.handleChange}
                        type={'text'}

                        onBlur={formik.handleBlur}
                        error={formik.errors.nameEng}
                        touched={formik.touched.nameEng}
                      />
                    </div>
                    <div className="col-12" style={{ padding: "0" }}>

                      <InputElement
                        name="surnameEng"
                        placeholder={t('adminRoot.guestPage.form.placeholders.surnameEng')}
                        type={'text'}

                        imgSrc={en}
                        value={formik.values.surnameEng}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.surnameEng}
                        touched={formik.touched.surnameEng}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                  <InputElement
                    name="country"
                    placeholder={t('adminRoot.guestPage.form.placeholders.country')}
                    imgSrc={az}
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    type={'text'}

                    onBlur={formik.handleBlur}
                    error={formik.errors.country}
                    touched={formik.touched.country} />

                </div>
                <div className="col-12" style={{ padding: "0", marginBottom: "24px" }}>
                  <InputElement
                    name="countryEng"
                    placeholder={t('adminRoot.guestPage.form.placeholders.countryEng')}
                    imgSrc={en}
                    value={formik.values.countryEng}
                    type={'text'}

                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.countryEng}
                    touched={formik.touched.countryEng}
                  />

                </div>

                <div className="col-12" style={{ padding: "0", marginBottom: "12px" }}>
                  <TextareaElement
                    name="description"
                    placeholder={t('adminRoot.guestPage.form.placeholders.description')}
                    imgSrc={az}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.description}
                    type={'text'}

                    touched={formik.touched.description}
                  />

                </div>
                <div className="col-12" style={{ padding: "0", marginBottom: "16px" }}>
                  <TextareaElement
                    name="descriptionEng"
                    placeholder={t('adminRoot.guestPage.form.placeholders.descriptionEng')}
                    imgSrc={en}
                    value={formik.values.descriptionEng}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={'text'}

                    error={formik.errors.descriptionEng}
                    touched={formik.touched.descriptionEng}
                  />

                </div>

                <div className="col-12" style={{ padding: "0", marginBottom: "16px" }}>
                  <CreateButton createLoading={createLoading} />
                </div>
              </div>
            </form>
          </Popup>
          <DetailGuest onClose={() => {
            setDetailPopupOpen(false);
            setDetailId(null);
          }}
            isOpen={detailPopupOpen}
            guestId={detailId} />
          <ReorderPopup
            handleReorder={handleReorder}
            connectionRef={reorderPopup}
            myData={myData}
            targetIndex={targetIndex}
            setTargetIndex={setTargetIndex}
          />
          <DeletePopup isActive={deletePopupOpen}
            onClose={() => {
              setDeletePopupOpen(false);
              setDeleteId(null);
            }}
            title={{ az: "Qonaq", en: "Guest" }}

            onDelete={handleDelete} />
        </>

      </main>
    </>
  )
}

export default AdminGuests
