import { useEffect, useRef, useState } from "react";
import './index.scss';
import { TbUserCheck } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function WhyChoose() {
    const { t } = useTranslation();

    const arr = [
        {
            text: 'Strong Expertise',
            description: 'Our team brings years of experience to deliver reliable and innovative solutions.',
            icon: <></>
        },
        {
            text: 'Creative Vision',
            description: 'We design with imagination and strategy to make your brand stand out.',
            icon: <></>
        },
    ]
    const cards = t("siteRoot.homePage.whyChooseSection.cards", { returnObjects: true }) || [];
    const title = t("siteRoot.homePage.whyChooseSection.title");
    const buttonText = t("siteRoot.homePage.whyChooseSection.button");

    const cardCount = cards.length;

    const [sectionHeight, setSectionHeight] = useState(window.innerHeight);

    useEffect(() => {
        const cardHeight = 440;
        setSectionHeight(window.innerHeight + cardCount * cardHeight + 200);

        const cards = document.querySelectorAll(".card");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal");
                    }
                });
            },
            { threshold: 0.2 }
        );

        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [cardCount]);

    const centerContentRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const sectionNode = sectionRef.current;
        const centerNode = centerContentRef.current;

        if (!sectionNode || !centerNode) {
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    centerNode.classList.add("in-view");
                });
            } else {
                centerNode.classList.remove("in-view");
            }
        });

        observer.observe(sectionNode);

        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const section = sectionRef.current;
        const center = centerContentRef.current;
        if (!section || !center) return;

        const sentinel = document.createElement("div");
        sentinel.style.position = "absolute";
        sentinel.style.bottom = "0";
        sentinel.style.width = "100%";
        sentinel.style.height = "1px";
        section.appendChild(sentinel);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const isMobile = window.innerWidth <= 992; // ✅ responsive yoxlama
                    if (entry.isIntersecting) {
                        if (isMobile) {
                            // 📱 mobil — section bitəndə tam gizlət
                            center.classList.add("hideOnMobile");
                            center.classList.remove("addClassCard");
                        } else {
                            // 💻 desktop — normal effekt
                            center.classList.add("addClassCard");
                            center.classList.remove("hideOnMobile");
                        }
                    } else {
                        // görünmürsə hər iki class silinsin
                        center.classList.remove("addClassCard");
                        center.classList.remove("hideOnMobile");
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
            sentinel.remove();
        };
    }, []);



    const navigate = useNavigate()
    const handleClickLink = (navigator) => {
        navigate(navigator)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <div style={{ background: 'var(--bg-color)', width: '100%', position: 'relative', zIndex: '10' }}>
            <div className="container" style={{ maxWidth: "1200px" }}>
                <section id="whyChoose" ref={sectionRef} style={{ minHeight: sectionHeight }}>
                    <div className="centerContent" ref={centerContentRef}>
                        <h2>{title}</h2>
                        <button onClick={() => {
                            handleClickLink('/contact')
                        }}>      {buttonText}</button>
                    </div>

                    <div className="cards">
                        {/* {[...Array(cardCount)].map((_, i) => (
                            <div
                                key={i}
                                className={`card card-${i + 1} ${i % 2 === 0 ? "left" : "right"}`}
                            >
                                <div className="icon">
                                    <TbUserCheck />
                                </div>
                                <h3>Strong Expertise</h3>
                                <p>
                                    Our team brings years of experience to deliver
                                    reliable and innovative solutions.
                                </p>
                            </div>
                        ))} */}

                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className={`card card-${i + 1} ${i % 2 === 0 ? "left" : "right"}`}
                            >
                                <div className="icon"><TbUserCheck /></div>
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="choseBtn">
                        <button onClick={() => {
                            handleClickLink('/contact')
                        }}>
                             {buttonText}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default WhyChoose;
