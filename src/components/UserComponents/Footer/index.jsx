import './index.scss'
import {useTranslation} from "react-i18next";
import mavisi from "/src/assets/mavisi.png"
import sarisi from "/src/assets/sarisi.png"

function Footer() {

    const {t} = useTranslation();

    return (
        <section id={"footer"}>
            <div className={"container"}>
                <div className={"bottomFooter"}>BUYONTECH</div>
                <img src={mavisi} alt={"Image"} className={"mavisi"}/>
                <img src={sarisi} alt={"Image"} className={"sarisi"}/>
                <div className={"design"}></div>
            </div>
        </section>
    );
}

export default Footer;