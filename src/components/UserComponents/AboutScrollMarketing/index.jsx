import { useEffect, useRef } from 'react';
import './index.scss';
import { BsArrowRight } from "react-icons/bs";
import rocket from "/src/assets/rocket.png"
import { useNavigate } from 'react-router';

const AboutScrollMarketing = () => {
    const text = "Our story is built on creativity and strategy that make every campaign stand out. We combine data-driven insights with fresh ideas to craft marketing that works. From small startups to established brands, we adapt our approach to fit every need. Discover how we help businesses grow and why so many trust us."
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
            <div className={"aboutText"}>( {' '} About {' '} )</div>
            <div className={"discover"}>Discover
                <div className={"discoverColor"}>Who</div>
                We Are
                <img src={rocket} alt={"Image"} className={"rocket"} />
            </div>
            <div className="text-container">
                {words.map((word, index) => (
                    <span key={index} className="word">
                        {word}
                    </span>
                ))}
            </div>
            <button onClick={()=>{
                handleClickLink('/about')
            }}>
                Learn More
                <BsArrowRight />
            </button>
        </section>
    );
};

export default AboutScrollMarketing;