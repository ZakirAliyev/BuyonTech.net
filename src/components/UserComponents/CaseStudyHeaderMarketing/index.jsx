import { useEffect, useRef, useState } from 'react';
import './index.scss';

const stories = [
    { type: 'video', src: '/src/assets/story.mp4' },
    { type: 'video', src: '/src/assets/story1.mp4' },
    { type: 'video', src: '/src/assets/story2.mp4' },
    { type: 'image', src: '/src/assets/buyontechFrame.png' },
];

function CaseStudyHeaderMarketing() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);
    const timerRef = useRef(null);

    const currentStory = stories[currentIndex];

    // Story dəyişəndə hadisələri idarə et
    useEffect(() => {
        clearTimeout(timerRef.current);

        if (currentStory.type === 'video') {
            const video = videoRef.current;
            if (video) {
                video.onloadedmetadata = () => {
                    video.currentTime = 0;
                    video.play();
                    startProgress(video.duration * 1000);
                };
            }
        } else if (currentStory.type === 'image') {
            const duration = 10000; // şəkil üçün 10 saniyə
            startProgress(duration);
            timerRef.current = setTimeout(() => {
                goNext();
            }, duration);
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [currentIndex]);

    const startProgress = (duration) => {
        const fills = document.querySelectorAll('.progressFill');
        fills.forEach((fill, idx) => {
            fill.style.animation = 'none';
            fill.offsetHeight; // force reflow
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
            // ✅ Ən son story-dən sonra birinciyə qayıdır
            setCurrentIndex(0);
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        } else {
            // ✅ Əvvələ klikləyəndə sonuncuya qayıtmaq opsiyası (insta kimi)
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

    return (
        <section id="caseStudyHeaderMarketing">
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div className="title">Leon Study Group</div>
                        <div className="description">
                            We provide full-scale marketing services for Leon Group Studio. This includes creative post
                            designs, SMM content planning and management. We also deliver professional graphic design
                            and videography to strengthen the company’s visual identity. As a result, the brand gains
                            more visibility and builds stronger connections with its audience.
                        </div>
                        <div className="serviceWrapper">
                            <div className="name">Services</div>
                            <div className="des">Post Design</div>
                            <div className="des">Content Strategy</div>
                            <div className="des">Videography</div>
                            <div className="des">Social Media Management</div>
                        </div>
                    </div>
                    <div className="col-4">
                       <div className={"storyWrapper"}>
                           <div className="story" onClick={handleClick}>
                               {/* Overlay və header */}
                               <div className="storyHeader">
                                   <div className="progressBars">
                                       {stories.map((_, idx) => (
                                           <div key={idx} className="progress">
                                               <div
                                                   className={`progressFill ${
                                                       idx < currentIndex ? 'filled' : idx === currentIndex ? 'active' : ''
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
                                       <span className="username">leonstudygroup</span>
                                   </div>
                               </div>

                               {/* Video + şəkil hissəsi — ağarma olmaması üçün eyni yerdə overlay ilə opacity */}
                               <div className="storyContentWrapper">
                                   <video
                                       ref={videoRef}
                                       className={`storyVideo ${currentStory.type === 'video' ? 'visible' : 'hidden'}`}
                                       autoPlay
                                       muted
                                       playsInline
                                       onEnded={handleEnded}
                                       src={currentStory.type === 'video' ? currentStory.src : ''}
                                       type="video/mp4"
                                   ></video>

                                   <img
                                       src={currentStory.type === 'image' ? currentStory.src : ''}
                                       alt=""
                                       className={`storyImage ${currentStory.type === 'image' ? 'visible' : 'hidden'}`}
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
