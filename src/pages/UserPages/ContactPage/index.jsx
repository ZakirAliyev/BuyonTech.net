import './index.scss'
import buyontechAbout from "../../../assets/buyontechAbout.png";
import { useEffect, useState } from "react";
import Footer from "../../../components/UserComponents/Footer/index.jsx";
import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import oglan1 from "/src/assets/oglan1.svg"
import oglan2 from "/src/assets/oglan2.svg"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateContactsMutation } from '../../../services/apis/userApi.jsx';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
function ContactPage() {
    const { t } = useTranslation()
    const [footerHeight, setFooterHeight] = useState(0);
    const [showFooter, setShowFooter] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [createContact, { isLoading }] = useCreateContactsMutation()
    const [dots, setDots] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => setShowFooter(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        let interval;
        if (isLoading) {
            interval = setInterval(() => {
                setDots(prev => (prev.length < 4 ? prev + '.' : ''));
            }, 400);
        } else {
            setDots('');
        }
        return () => clearInterval(interval);
    }, [isLoading]);
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, t("siteRoot.contactPage.form.validation.nameMin")),
            surname: Yup.string()
                .min(2, t("siteRoot.contactPage.form.validation.surnameMin")),
            email: Yup.string()
                .email(t("siteRoot.contactPage.form.validation.emailInvalid")),
            phoneNumber: Yup.string()
                .matches(/^[0-9+\s()-]+$/, t("siteRoot.contactPage.form.validation.phoneInvalid")),
            description: Yup.string()
                .min(5, t("siteRoot.contactPage.form.validation.messageMin")),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await createContact(values).unwrap();
                toast.success(t("siteRoot.contactPage.form.success"));
                resetForm();
            } catch (error) {
                toast.error(t("siteRoot.contactPage.form.success"));
                console.error(error);
            }
        },
    });
    return (
        <section id="contactPage" style={{ overflow: "hidden", position: "relative", background: "#fff" }}>
            <Helmet>
                <title>
                    {t("siteRoot.contactPage.form.heading")}

                </title>
            </Helmet>
            <div style={{
                position: "relative",
                zIndex: 100,
                background: "var(--bg-color)",
            }}>
                <Navbar />
                <div className={"container"}>
                    <div className={"basliq"}>
                        <div className={"text12"}><div>
                            {t("siteRoot.contactPage.titlePart1")}

                        </div> <img src={oglan1} alt={"Image"} className={"oglan1"} /> <span className={"span"}> {t("siteRoot.contactPage.titlePart2")}</span></div>
                        <div className={"text12 text123"}><span style={{
                            color: '#fb0'
                        }}> {t("siteRoot.contactPage.subtitlePart1")}</span> <img src={oglan2} alt={"Image"} className={"oglan1"} />  {t("siteRoot.contactPage.subtitlePart2")}</div>
                    </div>
                    <div className={"formWrapper"}>
                        <div className={"row"}>
                            <div className={"colsifirla1 col-5 col-md-6 col-sm-12 col-xs-12"}>
                                <img src={buyontechAbout} alt="buyontech logo" className={"buyontechAbout"} />
                            </div>
                            <div className={"colsifirla1 col-7 col-md-6 col-sm-12 col-xs-12"}>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="contact">
                                        {t("siteRoot.contactPage.form.heading")}
                                    </div>

                                    <div className="row">
                                        <div className="colsifirla col-6 col-md-6 col-sm-6 col-xs-6">
                                            <input
                                                name="name"
                                                placeholder={t("siteRoot.contactPage.form.placeholders.name")}
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.name && formik.errors.name && (
                                                <p className="error">{formik.errors.name}</p>
                                            )}
                                        </div>

                                        <div className="colsifirla col-6 col-md-6 col-sm-6 col-xs-6">
                                            <input
                                                name="surname"
                                                placeholder={t("siteRoot.contactPage.form.placeholders.surname")}
                                                value={formik.values.surname}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.surname && formik.errors.surname && (
                                                <p className="error">{formik.errors.surname}</p>
                                            )}
                                        </div>
                                    </div>

                                    <input
                                        name="email"
                                        placeholder={t("siteRoot.contactPage.form.placeholders.email")}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="error">{formik.errors.email}</p>
                                    )}

                                    <input
                                        name="phoneNumber"
                                        placeholder={t("siteRoot.contactPage.form.placeholders.phone")}
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                        <p className="error">{formik.errors.phoneNumber}</p>
                                    )}

                                    <textarea
                                        name="description"
                                        rows={7}
                                        placeholder={t("siteRoot.contactPage.form.placeholders.message")}
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <p className="error">{formik.errors.description}</p>
                                    )}
                                    <button
                                        type="submit"
                                        className="contactButton"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? `${t("siteRoot.contactPage.form.buttonSending")}${dots}` : t("siteRoot.contactPage.form.buttonSend")}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.73587326813!2d49.85662227679556!3d40.41470167143994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403087fef0e167f9%3A0x2d47dbedc1eea9e7!2sChinar%20Park!5e0!3m2!1sen!2saz!4v1760434163278!5m2!1sen!2saz"
                        style={{
                            border: 0,
                            outline: 0,
                        }} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>
            {showFooter && (
                windowWidth >= 992 ? (
                    <>
                        <div style={{
                            height: `${footerHeight}px`,
                            position: "relative",
                            zIndex: -90,
                        }}></div>
                        <Footer setFooterHeight={setFooterHeight} />
                    </>
                ) : (
                    <Footer setFooterHeight={setFooterHeight} />
                )
            )}
        </section>
    );
}

export default ContactPage;


