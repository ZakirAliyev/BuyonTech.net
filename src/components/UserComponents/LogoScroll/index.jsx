import { useEffect, useState } from "react";
import "./index.scss";
import "aos/dist/aos.css";
import AOS from "aos";
import logo from "/src/assets/zaraLogo.webp";
import logo1 from "/src/assets/allbirdsLogo.png";

const arr = new Array(10).fill(0);

function LogoScroll() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        // ilkin brendlərin xsiyahısı
        const initialBrands = arr.map((_, index) => ({
            imageName: index % 2 === 0 ? logo : logo1,
        }));

        // siyahını çoxaltmaq üçün təkrar et
        const repeatedBrands = [];
        for (let i = 0; i < 5; i++) {
            repeatedBrands.push(...initialBrands);
        }

        setBrands(repeatedBrands);

        // AOS animasiya init
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []); // boş dependency array → yalnız bir dəfə işləyəcək

    return (
        // data-aos="fade-up"
        <section id="logoScroll">
            <div className="wrapper left">
                {brands.map((brand, index) => (
                    <div className="box" key={index}>
                        <img src={brand.imageName} alt="Logo" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LogoScroll;
