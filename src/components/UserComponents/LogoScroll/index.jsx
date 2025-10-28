import { useEffect, useState } from "react";
import "./index.scss";
import "aos/dist/aos.css";
import AOS from "aos";


function LogoScroll({ developmentLogos = [], marketingLogos = [] }) {
    const [brands, setBrands] = useState([]);

    const imgLocal = 'https://api.buyontech.net/files/logos/'
    useEffect(() => {
        if (developmentLogos?.length === 0) return;

        const repeatedBrands = [];
        for (let i = 0; i < 5; i++) {
            repeatedBrands.push(...developmentLogos);
        }

        setBrands(repeatedBrands);

        // AOS animasiyası
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, [developmentLogos]); // boş dependency array → yalnız bir dəfə işləyəcək
    return (
        // data-aos="fade-up"
        <section id="logoScroll">
            <div className="wrapper left">
                {brands?.map((brand, index) => (
                    <div className="box" key={index}>
                        <img src={imgLocal + brand?.logoImage} alt="Logo" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LogoScroll;
