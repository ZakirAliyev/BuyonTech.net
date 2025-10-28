import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import adminLogin from '/src/assets/adminLogin.mp4'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'
import { useLoginAdminMutation } from '../../../services/apis/userApi'
import headerLogo from "/src/assets/sariLogo.png"

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // ✅ yeni state
    const navigate = useNavigate();
    const [createLogin, { isLoading }] = useLoginAdminMutation();
    const { t } = useTranslation();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const validationSchema = useMemo(
        () =>
            Yup.object({
                email: Yup.string()
                    .email(t("adminRoot.login.validation.emailInvalid"))
                    .required(t("adminRoot.login.validation.emailRequired")),
                password: Yup.string()
                    .required(t("adminRoot.login.validation.passwordRequired")),
            }),
        [t]
    );

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await createLogin(values).unwrap();
                if (res?.statusCode === 200 && res?.data?.role === 'Admin') {
                    toast.success(t("adminRoot.login.toast.success"));

                    if (rememberMe) {
                        Cookies.set('adminToken', res?.data?.token, { expires: 7 }); // 7 gün qalır
                    } else {
                        sessionStorage.setItem('adminToken', res?.data?.token); // sessiya bitənə qədər
                    }

                    navigate('/admin');
                    formik.resetForm();
                } else {
                    toast.error(t("adminRoot.login.toast.unauthorized"));
                }
            } catch (error) {
                console.error(error);
                toast.error(error?.data?.error || t("adminRoot.login.toast.error"));
            }
        },
    });

    return (
        <main className='login' id='adminLogin'>
            <Helmet>
                <title>{t("adminRoot.login.title")}</title>
            </Helmet>

            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <form className="LoginForm" onSubmit={formik.handleSubmit}>
                            <div className="LoginFormLogo">
                                <img src={headerLogo} alt="logo" />
                            </div>
                            <div className="LoginFormTitle">
                                <h1>{t("adminRoot.login.title")}</h1>
                            </div>
                            <div className="LoginFormForm">
                                <div className="emailInputBox">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={t("adminRoot.login.email")}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="passwordInputBox" style={{ position: "relative" }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder={t("adminRoot.login.password")}
                                        style={{ paddingRight: "35px" }}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />

                                    <span
                                        onClick={togglePassword}
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="20" height="20"
                                                viewBox="0 0 24 24" fill="none">
                                                <path d="M2 2L22 22"
                                                    stroke="#999999" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M12 5C7 5 3.5 9 2 12C3.5 15 7 19 12 19C15.2 19 18.1 17.5 20 15"
                                                    stroke="#999999" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="20" height="20"
                                                viewBox="0 0 20 20" fill="none">
                                                <path d="M2.5 10.8333C5.5 4.16665 14.5 4.16665 17.5 10.8333"
                                                    stroke="#999999" strokeWidth="1.5"
                                                    strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10 14.1666C9.67 14.1666 9.34 14.102 9.04 13.9763C8.74 13.8507 8.46 13.6665 8.23 13.4344C8.00 13.2022 7.81 12.9266 7.69 12.6233C7.56 12.32 7.5 11.9949 7.5 11.6666C7.5 11.3383 7.56 11.0132 7.69 10.7099C7.81 10.4066 8.00 10.131 8.23 9.89886C8.46 9.66671 8.74 9.48256 9.04 9.35693C9.34 9.23129 9.67 9.16663 10 9.16663C10.66 9.16663 11.29 9.43002 11.76 9.89886C12.23 10.3677 12.5 11.0036 12.5 11.6666C12.5 12.3297 12.23 12.9656 11.76 13.4344C11.29 13.9032 10.66 14.1666 10 14.1666Z"
                                                    fill="#999999" stroke="#999999"
                                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </span>
                                </div>

                                <div className="rememberMe">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        {t("adminRoot.login.rememberMe")}
                                    </label>
                                </div>

                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? t("adminRoot.login.button.loggingIn") : t("adminRoot.login.button.login")}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-6">
                        <div className="imgBox">
                            <video
                                src={adminLogin}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <div className="buyonTechTitles">
                                <p>
                                    BUYONTECH
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminLogin