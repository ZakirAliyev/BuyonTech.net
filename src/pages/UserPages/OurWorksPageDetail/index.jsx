import './index.scss'
import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import mid from "/src/assets/mid.png";
import nas from "/src/assets/nas.png";
import OurWorksPageDetailThird from '../../../components/UserComponents/OurWorksPageDetail/ThirdSection/index.jsx';
import OurWorksPageDetailSecond from '../../../components/UserComponents/OurWorksPageDetail/SecondSection/index.jsx';

function OurWorksPageDetail() {

    const worksData = [
        {
            id: 1,
            desc: "We created a sleek and user-friendly website for LEGNO to showcase their interior design expertise and portfolio.",
            title: "Legno",
            year: "2025",
            category: "Portfolio website",
            services: ["Website design", "Branding", "Development"],
            image: mid
        },
        {
            id: 2,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 3,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 4,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 5,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 6,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 7,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        },
        {
            id: 8,
            desc: "We designed a vibrant and dynamic website for Nasimi Festival to celebrate art, culture, and creativity in a modern digital space.",
            title: "Nəsimi Fest",
            year: "2025",
            category: "Festival website",
            services: ["Website design", "Branding", "Development"],
            image: nas
        }
    ];
    return (
        <main id={"ourWorksPageDetail"}>
            <Navbar />
            <OurWorksPageDetailSecond/>
            <OurWorksPageDetailThird  worksData={worksData}/>
        </main>
    );
}

export default OurWorksPageDetail;