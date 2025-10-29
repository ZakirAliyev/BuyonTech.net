// import { useEffect, useState } from "react";
// import "./index.scss";
// import "aos/dist/aos.css";
// import AOS from "aos";


// function LogoScroll({ developmentLogos = [], marketingLogos = [] }) {
//     const [brands, setBrands] = useState([]);

//     const imgLocal = 'https://api.buyontech.net/files/logos/'
//     useEffect(() => {
//         if (developmentLogos?.length === 0) return;

//         const repeatedBrands = [];
//         for (let i = 0; i < 5; i++) {
//             repeatedBrands.push(...developmentLogos);
//         }

//         setBrands(repeatedBrands);

//         // AOS animasiyası
//         AOS.init({
//             duration: 1000,
//             once: true,
//         });
//     }, [developmentLogos]); 
//     return (
//         // data-aos="fade-up"
//         <section id="logoScroll">
//             <div className="wrapper left">
//                 {brands?.map((brand, index) => (
//                     <div className="box" key={index}>
//                         <img src={imgLocal + brand?.logoImage} alt="Logo" />
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }

// export default LogoScroll;

import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.scss";

function LogoScroll({ developmentLogos = [], marketingLogos = [] }) {
    const location = useLocation();
    const imgBase = "https://api.buyontech.net/files/logos/";

    // URL-dən category paramını oxu
    const category = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get("category") || "development";
    }, [location.search]);

    // Seçilən logolar
    const logos = useMemo(() => {
        const selected = category === "marketing" ? marketingLogos : developmentLogos;
        return Array(5).fill(selected).flat(); 
    }, [category, marketingLogos, developmentLogos]);

    useEffect(() => {
        AOS.init({ duration: 200, once: true })
    }, []);

    return (
        <section id="logoScroll">
            <div className="wrapper left" >
                {logos.map((brand, i) => (
                    <div className="box" key={i}>
                        <img src={imgBase + brand.logoImage} alt={brand.name || "Logo"} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LogoScroll;
