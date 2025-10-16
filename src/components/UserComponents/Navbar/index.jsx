import './index.scss'
import { useTranslation } from "react-i18next";
import { TfiWorld } from "react-icons/tfi";
import logo from "/src/assets/sariLogo.webp"
import { useNavigate } from "react-router";
import { FaBarsStaggered } from "react-icons/fa6";

function Navbar() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleClickLink = (navigator) => {
        navigate(navigator)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <section id={"navbar"}>
            <div className={"container"}>
                <nav>
                    <div className={"links"}>
                        <div onClick={() => {
                            handleClickLink('/')
                        }} className={"link"}>Home</div>
                        <div onClick={() => {
                            handleClickLink('/about')
                        }} className={"link"}>About</div>
                        <div onClick={() => {
                            handleClickLink('/our-works')
                        }} className={"link"}>Portfolio</div>
                        <div onClick={() => {
                            handleClickLink('/')
                        }} className={"link"}>FAQ</div>
                    </div>
                    <img src={`${logo}`} alt={"Logo"} onClick={() => navigate("/")} />
                    <div className={"buttonWrapper"}>
                        <button onClick={() => {
                            handleClickLink('/contact')
                        }}>Contact us</button>
                        <TfiWorld className={"icon"} style={{ fontSize: "20px" }} />
                    </div>
                    <FaBarsStaggered className={"menuBar"} />
                </nav>
            </div>
        </section>
    );
}

export default Navbar;