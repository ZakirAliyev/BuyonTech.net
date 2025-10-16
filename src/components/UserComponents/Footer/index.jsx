import './index.scss'
import { useTranslation } from "react-i18next";
import mavisi from "/src/assets/mavisi.png"
import sarisi from "/src/assets/sarisi.png"
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router';

function Footer({ setFooterHeight }) {
    const { t } = useTranslation();
    const footerRef = useRef(null);

    useEffect(() => {
        if (footerRef.current) {
            let newHeight = footerRef.current.offsetHeight;

            if (window.innerWidth > 992) {
                newHeight += 200;
            }

            footerRef.current.style.height = newHeight + "px";
            setFooterHeight(newHeight);
        }
    }, [setFooterHeight]);
    const navigate = useNavigate()
    const handleClickLink = (navigator) => {
        navigate(navigator)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <section id="footer" ref={footerRef}>
            <div className="container">
                <div className="row">
                    <div className="col-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="title">Navigation</div>
                        <p onClick={() => {
                            handleClickLink('/')
                        }}>Development</p>
                        <p onClick={() => {
                            handleClickLink('/')
                        }}>Marketing</p>
                        <p onClick={() => {
                            handleClickLink('/about')
                        }}>About</p>
                        <p onClick={() => {
                            handleClickLink('/our-works')
                        }}>Portfolio</p>
                        <p>FAQ</p>
                    </div>
                    <div className="col-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="title">Social</div>
                        <p>Instagram</p>
                        <p>Tik-Tok</p>
                        <p>Facebook</p>
                        <p>Linkedin</p>
                        <p>Whatsapp</p>
                    </div>
                    <div className="col-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="title">Contact</div>
                        <p>+994 10 265 59 90</p>
                        <p>info@buyontech.net</p>
                    </div>
                </div>
                <div className="row row70">
                    <div className="portugal col-6 col-md-12 col-xs-12 col-sm-12">
                        © 2025 Agero. All rights reserved.
                    </div>
                    <div className="col-6 col-md-12 col-xs-12 col-sm-12 portugal" style={{ textAlign: "right" }}>
                        Created by Buyontech
                    </div>
                </div>
                <div className="bottomFooter">BUYONTECH</div>
                <img src={mavisi} alt="Image" className="mavisi" />
                <img src={sarisi} alt="Image" className="sarisi" />
                <div className="design"></div>
            </div>
        </section>
    );
}

export default Footer;
