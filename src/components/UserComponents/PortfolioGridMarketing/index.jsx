import './index.scss'
import WorkCard from "../WorkCard/index.jsx";
import mid from "../../../assets/mid.png";
import nas from "../../../assets/nas.png";
import {IoIosArrowForward} from "react-icons/io";

function PortfolioGridMarketing() {

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
        }
    ];

    return (
        <section id={"portfolioGridMarketing"}>
            <div className={"container"}>
                <div className={"portfolioText"}>PORTFOLIO</div>
                <div className='marketingCard'>
                    {worksData.map((work) => (
                        <WorkCard key={work.id} {...work} />
                    ))}
                </div>
                <div className="workCardViewAll">
                    <div className="whiteBox">
                        <div className="arrowWrapper">
                            <div className="arrowTrack">
                                {Array(20).fill().map((_, i) => (
                                    <IoIosArrowForward key={i} className="icon"/>
                                ))}
                                {Array(20).fill().map((_, i) => (
                                    <IoIosArrowForward key={`dup-${i}`} className="icon"/>
                                ))}
                            </div>
                        </div>

                        <div className="span">VIEW ALL</div>

                        <div className="arrowWrapper">
                            <div className="arrowTrack">
                                {Array(20).fill().map((_, i) => (
                                    <IoIosArrowForward key={i} className="icon"/>
                                ))}
                                {Array(20).fill().map((_, i) => (
                                    <IoIosArrowForward key={`dup-${i}`} className="icon"/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PortfolioGridMarketing;