import './index.scss'
import buyontechAbout from "/src/assets/buyontechAbout.png"

function AboutPage() {
    return (
        <section id="aboutPage">
            <div className={"container"}>
                <div className={"formWrapper"}>
                    <div className={"row"}>
                        <div className={"col-4"}>
                            <img src={buyontechAbout} alt="buyontech logo" className={"buyontechAbout"}/>
                        </div>
                        <div className={"col-8"}>asd</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;