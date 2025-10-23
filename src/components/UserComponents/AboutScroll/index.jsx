import { useEffect, useRef } from 'react';
import './index.scss';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
    const { t } = useTranslation()
    const text = t("siteRoot.homePage.aboutSection.text")

    const words = text.split(' ');

    // useRef kullanarak elemente daha performanslı erişim sağlıyoruz
    const sectionRef = useRef(null);

    useEffect(() => {
        let animationFrameId = null;

        const updateAnimation = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const containerTop = rect.top;
            const viewportHeight = window.innerHeight;

            const scrollDistance = viewportHeight;
            const startPosition = viewportHeight;
            const currentPosition = startPosition - containerTop;
            const overallProgress = Math.max(0, Math.min(1, currentPosition / scrollDistance));

            const spans = sectionRef.current.querySelectorAll('.word');
            const totalWords = spans.length;
            const totalProgress = overallProgress * totalWords;

            spans.forEach((span, index) => {
                let wordProgress = Math.max(0, Math.min(1, totalProgress - index));
                span.style.setProperty('--word-progress', wordProgress);
            });

            // Bir sonraki kare için tekrar çalışmayı planla
            animationFrameId = requestAnimationFrame(updateAnimation);
        };

        // Scroll olayını dinlemek yerine, kaydırma olduğunda animasyon güncelleme döngüsünü başlatıyoruz
        const handleScroll = () => {
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateAnimation);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
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
        <section id="aboutSection" ref={sectionRef}>
            <div className={"aboutText"}>( {' '} {t("siteRoot.homePage.aboutSection.title")} {' '} )</div>
            <div className="text-container">
                {words.map((word, index) => (
                    <span key={index} className="word">
                        {word}
                    </span>
                ))}
            </div>
            <button onClick={() => {
                handleClickLink('/about')
            }}>
                {t("siteRoot.homePage.aboutSection.button")}
                <BsArrowRight />
            </button>
        </section>
    );
};

export default AboutSection;