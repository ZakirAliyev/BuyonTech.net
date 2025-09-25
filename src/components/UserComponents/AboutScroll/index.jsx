import {useEffect, useRef} from 'react';
import './index.scss';
import {FaArrowAltCircleRight} from "react-icons/fa";
import {BsArrowRight} from "react-icons/bs";

const AboutSection = () => {
    const text = "We create secure, scalable, and modern digital solutions designed to fit your business goals. Our focus is on turning ideas into powerful products that help you grow.";
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

    return (
        <section id="aboutSection" ref={sectionRef}>
            <div className={"aboutText"}>( {' '} About {' '} )</div>
            <div className="text-container">
                {words.map((word, index) => (
                    <span key={index} className="word">
                        {word}
                    </span>
                ))}
            </div>
            <button>
                Learn More
                <BsArrowRight/>
            </button>
        </section>
    );
};

export default AboutSection;