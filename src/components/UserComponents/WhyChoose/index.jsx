import { useEffect, useRef, useState } from "react";
import './index.scss';
import { TbUserCheck } from "react-icons/tb";
import { useNavigate } from "react-router";

function WhyChoose() {

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

    const cardCount = 6;

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
                        <h2>Why Choose BuyonTech for Your Next Big Idea?</h2>
                        <button onClick={() => {
                            handleClickLink('/contact')
                        }}>Contact Us</button>
                    </div>

                    <div className="cards">
                        {[...Array(cardCount)].map((_, i) => (
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
                        ))}
                    </div>
                    <div className="choseBtn">
                        <button onClick={() => {
                            handleClickLink('/contact')
                        }}>
                            Contact Us
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default WhyChoose;
