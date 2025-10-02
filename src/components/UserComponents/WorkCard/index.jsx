// WorkCard.jsx
import './index.scss'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";

function WorkCard({desc, title, year, category, services, image}) {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <section id="workCard">
            <div className="container">
                <div
                    className="row box"
                    style={{
                        background: `url("${image}") no-repeat center center`,
                        backgroundSize: 'cover'
                    }}
                >
                    <div className="boxLeft col-4">
                    <h2>{title}</h2>
                        <p>{desc}</p>
                    </div>

                    <div className="col-4 midImageWrapper">
                        <div className="midImageBackdrop" aria-hidden="true" />
                        <img src={image} alt={title} className="midImage"/>
                    </div>

                    <div className="boxLeft1 col-4">
                       <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: '18px'
                       }}>
                            <div className="detailBlock detailBlock-year">
                                <p>Year</p>
                                <div className="pe">{year}</div>
                            </div>
                            <div className="detailBlock detailBlock-category">
                                <p>Category</p>
                                <div className="p">{category}</div>
                            </div>
                        </div>
                        <div className="detailBlock detailBlock-services">
                            <p>Services</p>
                            {services && services.map((service, i) => (
                                <div className="p" key={i}>{service}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WorkCard;
