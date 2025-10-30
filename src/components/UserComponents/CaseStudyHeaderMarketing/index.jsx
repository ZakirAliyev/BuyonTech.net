import { useEffect, useRef, useState } from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';

const stories = [
    { type: 'video', src: '/src/assets/story.mp4' },
    { type: 'video', src: '/src/assets/story1.mp4' },
    { type: 'video', src: '/src/assets/story2.mp4' },
    { type: 'image', src: '/src/assets/buyontechFrame.png' },
];

function CaseStudyHeaderMarketing({ oneProje }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState(0); // 0 və ya 1 — hansı video göstərilir
    const videoRefs = [useRef(null), useRef(null)];
    const timerRef = useRef(null);

    const { t, i18n } = useTranslation()
    const currentStory = stories[currentIndex];
    const storyRef = useRef(null)
    useEffect(() => {
        clearTimeout(timerRef.current);

        if (currentStory.type === 'video') {
            const inactiveVideoIndex = activeVideo === 0 ? 1 : 0;
            const newVideo = videoRefs[inactiveVideoIndex].current;

            // Yeni videonu hazırla, görünmədən yüklə
            newVideo.src = currentStory.src;
            newVideo.load();

            const handleLoaded = () => {
                newVideo.currentTime = 0;
                newVideo.play();
                startProgress(newVideo.duration * 1000);

                // Yüklənəndən sonra aktiv videonu dəyiş
                setActiveVideo(inactiveVideoIndex);
            };

            newVideo.addEventListener('loadeddata', handleLoaded, { once: true });
        } else if (currentStory.type === 'image') {
            const duration = 10000;
            startProgress(duration);
            timerRef.current = setTimeout(() => {
                goNext();
            }, duration);
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [currentIndex]);
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < 50) {
                     storyRef.current.style.cursor = `url("/src/assets/leftArrow.svg") 16 16, auto`;

        } else if (x > rect.width - 50) {
            storyRef.current.style.cursor = `url("/src/assets/rightArrow.svg") 16 16, auto`;

        } else {
            storyRef.current.style.cursor = "default";
        }
    };


    const startProgress = (duration) => {
        const fills = document.querySelectorAll('.progressFill');
        fills.forEach((fill, idx) => {
            fill.style.animation = 'none';
            fill.offsetHeight;
            if (idx === currentIndex) {
                fill.style.animation = `storyProgress ${duration}ms linear forwards`;
            } else if (idx < currentIndex) {
                fill.style.width = '100%';
            } else {
                fill.style.width = '0%';
            }
        });
    };

    const handleEnded = () => {
        goNext();
    };

    const goNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        } else {
            setCurrentIndex(stories.length - 1);
        }
    };

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;

        if (clickX < 50) {
            goPrev();

        } else if (clickX > width - 50) {
            goNext();
        }
    };
    const getLocalizedName = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az":
                return item?.title || "";
            case "en":
                return item?.titleEng || "";
            default:
                return item?.title || "";
        }
    };
    const getLocalizedSubName = (item, lang) => {
        switch (lang?.split("-")[0]) {
            case "az":
                return item?.subTitle || "";
            case "en":
                return item?.subTitleEng || "";
            default:
                return item?.subTitle || "";
        }
    };
    return (
        <section id="caseStudyHeaderMarketing">
            <div className="container">
                <div className="row">
                    <div className="col-8 col-md-8 col-sm-12 col-xs-12">
                        <div className="title">{
                            getLocalizedName(oneProje, i18n.language)
                        }</div>
                        <div className="description">
                            {/* We provide full-scale marketing services for Leon Group Studio. This includes creative post
                            designs, SMM content planning and management. We also deliver professional graphic design
                            and videography to strengthen the company’s visual identity. As a result, the brand gains
                            more visibility and builds stronger connections with its audience. */}
                            {
                                getLocalizedSubName(oneProje, i18n.language)

                            }
                        </div>
                        <div className="serviceWrapper">
                            <div className="name">
                                {
                                    t('siteRoot.portfolioPage.workCard.services')
                                }
                            </div>
                            {
                                oneProje?.services?.map((item, index) => {
                                    return <div key={index} className="des">{item.name}</div>

                                })
                            }
                            <div className="des">Post Design</div>
                        </div>
                    </div>
                    <div className="col-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="storyWrapper">
                            <div className="story" ref={storyRef} onMouseMove={handleMouseMove} onClick={handleClick}>
                                <div className="storyContentWrapper">

                                    <div className="storyHeader">
                                        <div className="progressBars">
                                            {stories.map((_, idx) => (
                                                <div key={idx} className="progress">
                                                    <div
                                                        className={`progressFill ${idx < currentIndex
                                                            ? 'filled'
                                                            : idx === currentIndex
                                                                ? 'active'
                                                                : ''
                                                            }`}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="profile">
                                            <img
                                                src="/src/assets/profileImage.png"
                                                alt="profile"
                                                className="profileImg"
                                            />
                                            <span className="username">
                                                {
                                                    oneProje?.profilName
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    {/* İki video elementi ilə crossfade */}
                                    <video
                                        ref={videoRefs[0]}
                                        className={`storyVideo ${currentStory.type === 'video' && activeVideo === 0 ? 'visible' : 'hidden'
                                            }`}
                                        autoPlay
                                        muted
                                        playsInline
                                        onEnded={handleEnded}
                                        type="video/mp4"
                                    ></video>

                                    <video
                                        ref={videoRefs[1]}
                                        className={`storyVideo ${currentStory.type === 'video' && activeVideo === 1 ? 'visible' : 'hidden'
                                            }`}
                                        autoPlay
                                        muted
                                        playsInline
                                        onEnded={handleEnded}
                                        type="video/mp4"
                                    ></video>

                                    <img
                                        src={currentStory.type === 'image' ? currentStory.src : ''}
                                        alt=""
                                        className={`storyImage ${currentStory.type === 'image' ? 'visible' : 'hidden'
                                            }`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CaseStudyHeaderMarketing;
