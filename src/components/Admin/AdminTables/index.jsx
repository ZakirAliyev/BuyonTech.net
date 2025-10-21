import React from 'react'
import CustomSelect from '../CustumSelectBox'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'

const AdminTables = ({ myData, setPopupOpen, searchTerm, setSearchTerm, filterType, setFilterType, guestOptions, title, placeholder }) => {
    const location = useLocation()
    const { t } = useTranslation()
    return (
        <div className='adminTableTop'>
            <div className="adminTableTopInside">
                <div className="adminTableTopInsideLeft">
                    {
                        location.pathname == '/admin/program' ? "" : <>
                            <input disabled={myData?.length == 0} type="text" placeholder={placeholder} value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                            <div className="searchIcon">

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M14.0772 14.1L16.6438 16.6667M15.833 9.58333C15.833 11.2409 15.1745 12.8306 14.0024 14.0027C12.8303 15.1748 11.2406 15.8333 9.58301 15.8333C7.9254 15.8333 6.33569 15.1748 5.16359 14.0027C3.99149 12.8306 3.33301 11.2409 3.33301 9.58333C3.33301 7.92573 3.99149 6.33601 5.16359 5.16391C6.33569 3.99181 7.9254 3.33333 9.58301 3.33333C11.2406 3.33333 12.8303 3.99181 14.0024 5.16391C15.1745 6.33601 15.833 7.92573 15.833 9.58333Z" stroke="#DBDBDB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </>
                    }

                </div>
                <div className="adminTableTopInsideRight">
                    {
                        location.pathname == '/admin/program' ? "" : <CustomSelect
                            name="guestSort"
                            placeholder={t('adminRoot.adminTableTop.sortPlaceholder')}
                            value={filterType}
                            options={guestOptions}
                            disabled={myData?.length === 0}
                            onChange={(val) => setFilterType(val)}
                        />
                    }

                    <button
                        style={{
                            display: location.pathname == '/admin/contact' ? "none" : ""
                        }}
                        onClick={() => setPopupOpen(true)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M14.25 9.7485H9.75V14.2485H8.25V9.7485H3.75V8.2485H8.25V3.7485H9.75V8.2485H14.25V9.7485Z" fill="#4D4D4D" />
                        </svg>
                        {t('adminRoot.adminTableTop.createNew', { title })}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminTables
