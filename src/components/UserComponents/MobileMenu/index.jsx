import React, { useState } from "react";
import "./index.scss";
import { TfiWorld } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import logo from "/src/assets/sariLogo.png";
import { useNavigate } from "react-router";
import { FaBarsStaggered } from "react-icons/fa6";
import LanguageSelectForHome from "../../SwitcherComponents/LanguageSwitcherForSite";

const MobileMenu = ({ setOpen, open }) => {


    return (
        <div className="mobileNavbar"
         
        >
            <div className="topBar">
              <LanguageSelectForHome/>
                <div className="menuIcon" onClick={() => setOpen(!open)}>
                    {
                        open ? <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M10.6667 30.5133L9.48666 29.3333L18.82 20L9.48666 10.6667L10.6667 9.48667L20 18.82L29.3333 9.48667L30.5133 10.6667L21.18 20L30.5133 29.3333L29.3333 30.5133L20 21.18L10.6667 30.5133Z" fill="black" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 40 40" fill="none">
                            <path d="M6.66675 10H33.3334M11.6667 20H33.3334M16.6667 30H33.3334" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }

                </div>
            </div>

        </div>
    );
};

export default MobileMenu;
