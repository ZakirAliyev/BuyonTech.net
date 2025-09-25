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
                        <p>{desc}</p>
                        <h2>{title}</h2>
                    </div>

                    <img src={image} alt={title} className="col-4 midImage"/>

                    <div className="boxLeft1 col-4">
                        <div>
                            <p>Year</p>
                            <div className="pe">{year}</div>
                        </div>
                        <div>
                            <p>Category</p>
                            <div className="p">{category}</div>
                        </div>
                        <div>
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
