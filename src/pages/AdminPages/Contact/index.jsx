import React, {  useState } from 'react'
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useGetAllContactsQuery } from '../../../services/apis/userApi';
import AdminTables from '../../../components/Admin/AdminTables';
import AdminTableBody from '../../../components/Admin/TableBody';
import DetailContact from './DetailGuest';

const AdminContact = () => {
  // Search Sort
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("all");
  const { i18n, t } = useTranslation();

  // Detail States
  const [detailPopupOpen, setDetailPopupOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);

  // Rtk
  const { data: guestData, isLoading: guestLoading, isError: guestError, isFetching, error: fetchError } = useGetAllContactsQuery();

  const load = guestLoading || isFetching;
  const error = guestError || fetchError;
  const myData = guestData?.data || [];
  // Search Filter
  let filteringData = [...myData].filter((x) => {
    const name = (x.name || "").toLowerCase();
    const surname = (x.surname || "").toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      surname.includes(searchTerm.toLowerCase())
    );
  });

  filteringData = filteringData.sort((a, b) => {
    if (sortType === "name-asc") {
      return (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase());
    }

    if (sortType === "name-desc") {
      return (b.name || "").toLowerCase().localeCompare((a.name || "").toLowerCase());
    }

    if (sortType === "surname-asc") {
      return (a.surname || "").toLowerCase().localeCompare((b.surname || "").toLowerCase());
    }

    if (sortType === "surname-desc") {
      return (b.surname || "").toLowerCase().localeCompare((a.surname || "").toLowerCase());
    }

    if (sortType === "email-asc") {
      return (a.email || "").toLowerCase().localeCompare((b.email || "").toLowerCase());
    }

    if (sortType === "email-desc") {
      return (b.email || "").toLowerCase().localeCompare((a.email || "").toLowerCase());
    }

    if (sortType === "number-asc") {
      return (a.phoneNumber || "").toLowerCase().localeCompare((b.phoneNumber || "").toLowerCase());
    }

    if (sortType === "number-desc") {
      return (b.phoneNumber || "").toLowerCase().localeCompare((a.phoneNumber || "").toLowerCase());
    }

    return 0;
  });






  const columns = [
    {
      header: t('adminRoot.contactPage.table.index'), accessor: "index",
      render: (row, rowIndex) => rowIndex + 1
    },
    {
      header: t("adminRoot.contactPage.table.fullName"),
      accessor: "fullName",
      render: (row) => {
        return <span>{`${row?.surname} ${row?.name}`}</span>

      },
    },
    {
      header: t('adminRoot.contactPage.table.email'),
      accessor: "email",
      render: (row) => {
        return <span>{`${row?.email}`}</span>


      },
    },

    {
      header: t('adminRoot.contactPage.table.number'),
      accessor: "number",
      render: (row) => {
        return <span>{`${row?.phoneNumber}`}</span>
      },
    },


    {
      header: t('adminRoot.contactPage.table.details'),
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


  ];




  const contactSortOptions = [
    { value: "all", label: t("adminRoot.contactPage.sort.default") },
    {
      label: t("adminRoot.contactPage.sort.byName"),
      options: [
        { value: "name-asc", label: t("adminRoot.contactPage.sort.nameAsc") },
        { value: "name-desc", label: t("adminRoot.contactPage.sort.nameDesc") },
      ],
    },
    {
      label: t("adminRoot.contactPage.sort.bySurname"),
      options: [
        { value: "surname-asc", label: t("adminRoot.contactPage.sort.surnameAsc") },
        { value: "surname-desc", label: t("adminRoot.contactPage.sort.surnameDesc") },
      ],
    },
    {
      label: t("adminRoot.contactPage.sort.byEmail"),
      options: [
        { value: "email-asc", label: t("adminRoot.contactPage.sort.emailAsc") },
        { value: "email-desc", label: t("adminRoot.contactPage.sort.emailDesc") },
      ],
    },
    {
      label: t("adminRoot.contactPage.sort.byNumber"),
      options: [
        { value: "number-asc", label: t("adminRoot.contactPage.sort.numberAsc") },
        { value: "number-desc", label: t("adminRoot.contactPage.sort.numberDesc") },
      ],
    },
  ];


  return (
    <>

      <main id='adminMain' style={{ position: "relative" }}>
        <Helmet><title>{t('adminRoot.contactPage.metaTitle')}</title></Helmet>



        <>
          <AdminTables myData={myData} placeholder={t('adminRoot.contactPage.search.placeholder')} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterType={sortType} setFilterType={setSortType} guestOptions={contactSortOptions} title={t('adminRoot.contactPage.title')} />
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
              }}>{t('adminRoot.contactPage.fallback.loadError')}</p>
            ) : (
              <AdminTableBody
                columns={columns}
                data={filteringData}
                searchTerm={searchTerm}
                searchNotFound={t('adminRoot.contactPage.search.notFound')}
                noData={t('adminRoot.contactPage.search.noData')}


              >

              </AdminTableBody>)
          }



          {
            detailPopupOpen ? <DetailContact onClose={() => {
              setDetailPopupOpen(false);
              setDetailId(null);
            }}
              isOpen={detailPopupOpen}
              guestId={detailId} /> : ""
          }

        </>

      </main>
    </>
  )
}

export default AdminContact
