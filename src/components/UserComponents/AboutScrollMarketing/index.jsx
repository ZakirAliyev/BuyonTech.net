import { useEffect, useRef } from 'react';
import './index.scss';
import { BsArrowRight } from "react-icons/bs";
import rocket from "/src/assets/rocket.png"
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const AboutScrollMarketing = () => {
    const { t } = useTranslation()
    const text = t("siteRoot.homePageMarketing.secondSection.paragraph")
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
        <section id="aboutScrollMarketing" ref={sectionRef}>
            <div className={"aboutText"}>{t("siteRoot.homePageMarketing.secondSection.about")}</div>
            <div className={"discover"}>  {t("siteRoot.homePageMarketing.secondSection.discover")}
                <div className={"discoverColor"}> {t("siteRoot.homePageMarketing.secondSection.who")}</div>
               {t("siteRoot.homePageMarketing.secondSection.weAre")}
                <img src={rocket} alt={"Image"} className={"rocket"} />
            </div>
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
                  {t("siteRoot.homePageMarketing.secondSection.button")}
                <BsArrowRight className='icon' />
            </button>
        </section>
    );
};

export default AboutScrollMarketing;