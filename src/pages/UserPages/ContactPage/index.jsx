import './index.scss'
import buyontechAbout from "../../../assets/buyontechAbout.png";
import {useEffect, useState} from "react";
import Footer from "../../../components/UserComponents/Footer/index.jsx";
import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import oglan1 from "/src/assets/oglan1.svg"
import oglan2 from "/src/assets/oglan2.svg"

function ContactPage() {
    const [footerHeight, setFooterHeight] = useState(0);
    const [showFooter, setShowFooter] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const timer = setTimeout(() => setShowFooter(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section id="contactPage" style={{overflow: "hidden", position: "relative", background: "#fff"}}>
            <div style={{
                position: "relative",
                zIndex: 100,
                background: "var(--bg-color)",
            }}>
                <Navbar/>
                <div className={"container"}>
                    <div className={"basliq"}>
                        <div className={"text12"}><div>Let’s Build</div> <img src={oglan1} alt={"Image"} className={"oglan1"}/> <span className={"span"}>Something</span></div>
                        <div className={"text12 text123"}><span style={{
                            color: '#fb0'
                        }}>Great</span> <img src={oglan2} alt={"Image"} className={"oglan1"}/> Together</div>
                    </div>
                    <div className={"formWrapper"}>
                        <div className={"row"}>
                            <div className={"colsifirla1 col-5 col-md-5 col-sm-12 col-xs-12"}>
                                <img src={buyontechAbout} alt="buyontech logo" className={"buyontechAbout"}/>
                            </div>
                            <div className={"colsifirla1 col-7 col-md-7 col-sm-12 col-xs-12"}>
                                <form>
                                    <div className={"contact"}>Contact</div>
                                    <div className={"row"}>
                                        <div className={"colsifirla col-6 col-md-6 col-sm-6 col-xs-6"}>
                                            <input placeholder={"Name"}/>
                                        </div>
                                        <div className={"colsifirla col-6 col-md-6 col-sm-6 col-xs-6"}>
                                            <input placeholder={"Surname"}/>
                                        </div>
                                    </div>
                                    <input placeholder={"Email"}/>
                                    <input placeholder={"Phone"}/>
                                    <textarea rows={7} placeholder={"Message"}/>
                                    <button>Send</button>
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
                        <Footer setFooterHeight={setFooterHeight}/>
                    </>
                ) : (
                    <Footer setFooterHeight={setFooterHeight}/>
                )
            )}
        </section>
    );
}

export default ContactPage;


