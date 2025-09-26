import "./index.scss";

function SwitchProduct({active, setActive}) {
    return (
        <section id="switchProduct">
            <div className="zakirinki">
                <div className="switch-container">
                    <div
                        className={`switch-option ${active === "development" ? "active" : ""}`}
                        onClick={() => setActive("development")}
                    >
                        DEVELOPMENT
                    </div>
                    <div
                        className={`switch-option ${active === "marketing" ? "active" : ""}`}
                        onClick={() => setActive("marketing")}
                    >
                        MARKETING
                    </div>
                    <div className={`slider ${active}`}></div>
                </div>
            </div>
        </section>
    );
}

export default SwitchProduct;
