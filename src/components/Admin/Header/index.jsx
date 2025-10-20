import React, { useEffect, useState } from 'react'
import headerLogo from '/src/assets/header-logo.webp'
import adminPlaceholder from '/src/assets/adminPlaceholder.webp'
import logoEng from "/src/assets/header-logo.webp";

import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSelect from '../../SwitcherComponents/LanguageSwitcher';
const AdminHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeDrop, setActiveDrop] = useState(false)
    const { t,i18n } = useTranslation()
    const navigate = useNavigate();
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const handleLogout = () => {
        if (Cookies.get('adminToken')) {
            Cookies.remove('adminToken');
        }
        else if (sessionStorage.getItem('adminToken')) {
            sessionStorage.removeItem('adminToken');
        }

        toast.success(t('adminRoot.adminHeader.logoutSuccess'));
        navigate('/');
    };
    return (
        <header id='adminHeader' className={`myHeader ${scrolled ? "scrolled" : ""}`}>
            <div className="adminHeaderInside">
                <div className="adminHeaderLeft">
                    <img
                        src={i18n.language === "az" ? headerLogo : logoEng}
                        alt="adminLogo"
                    />
                </div>
                <div className="adminHeaderRight">
                    <LanguageSelect />

                    <div className="adminImage">
                        <img src={adminPlaceholder} alt="adminPlaceholder" />
                    </div>
                    <div className="adminImageRight" onClick={() => { setActiveDrop((e) => !e) }}>

                        {t('adminRoot.adminHeader.role')}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M10.4997 2.5L1.49971 2.5C1.40859 2.50029 1.31928 2.52542 1.24138 2.57269C1.16348 2.61996 1.09994 2.68758 1.05762 2.76828C1.01529 2.84897 0.995771 2.93968 1.00116 3.03064C1.00655 3.1216 1.03665 3.20937 1.08821 3.2845L5.58821 9.7845C5.77471 10.054 6.22371 10.054 6.41071 9.7845L10.9107 3.2845C10.9628 3.20953 10.9933 3.12172 10.999 3.0306C11.0047 2.93949 10.9853 2.84856 10.943 2.7677C10.9006 2.68683 10.8369 2.61912 10.7587 2.57193C10.6806 2.52473 10.591 2.49986 10.4997 2.5Z" fill="black" />
                        </svg>
                        <div className={`adminImageRightDrop ${activeDrop ? "activeAdminDrop" : ""}`}>
                            <p onClick={handleLogout}>
                                {t('adminRoot.adminHeader.logout')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader
