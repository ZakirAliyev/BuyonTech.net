import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import './index.scss'
const OurWorksPageDetailFirst = ({ imageBox }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationRef = useRef(null);

    return (
        <section id='ourWorksPageDetailFirst'>
            <div className={"container"}>
                <div className={"ourWorks"}>
                    <div className={"textWrapperDetailFirst"}>
                        <h2>Legno Project  </h2>
                        <div className={"buttonBox"}>
                            <button ref={prevRef} className="prev">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                                    <path d="M9.13935 14.3233L7.90152 15.56L1.15935 8.82018C1.05067 8.71218 0.964419 8.58376 0.905563 8.4423C0.846707 8.30084 0.816407 8.14914 0.816407 7.99593C0.816407 7.84271 0.846707 7.69101 0.905563 7.54956C0.964419 7.4081 1.05067 7.27967 1.15935 7.17168L7.90151 0.428344L9.13818 1.66501L2.81018 7.99418L9.13935 14.3233Z" fill="black" />
                                </svg>
                            </button>

                            <button ref={nextRef} className="next">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                                    <path d="M0.860652 1.67665L2.09849 0.439988L8.84065 7.17982C8.94933 7.28782 9.03558 7.41624 9.09444 7.5577C9.15329 7.69916 9.18359 7.85086 9.18359 8.00407C9.18359 8.15729 9.15329 8.30899 9.09444 8.45044C9.03558 8.5919 8.94933 8.72033 8.84065 8.82832L2.09849 15.5717L0.861818 14.335L7.18982 8.00582L0.860652 1.67665Z" fill="black" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mySwiperBoxDetailSwip">
                        <Swiper
                            modules={[Navigation, Pagination]}

                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            pagination={{
                                el: paginationRef.current,
                                clickable: true,
                                renderBullet: (index, className) => {
                                    return `<span class="${className}"></span>`;
                                },
                            }}
                            onInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.params.pagination.el = paginationRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                                swiper.pagination.init();
                                swiper.pagination.update();
                            }}
                            className="works-swiper"
                        >
                            {imageBox?.map((work) => (
                                <SwiperSlide key={work.id} className='imageSlider'>
                                    <img src={work.image} alt="" className='imageBox' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div ref={paginationRef} className="custom-pagination"></div>

                </div>
                <div className="ourWorkBoxAbout">
                    <div className="ourWorksDetailBottom">
                        <div className="ourWorksDetailBottomLeft">
                            <p>
                                Category
                            </p>
                            <h4>
                                Portfolio website
                            </h4>
                        </div>
                        <div className="ourWorksDetailBottomMiddle">
                            <a>
                                <span>
                                    Visit Website
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M0.258214 12.4004L11.0858 1.57282L1.80501 1.57282L1.72546 0.326542L13.2159 0.326541L13.2159 11.817L11.9697 11.7375L11.9697 2.4567L1.1421 13.2843L0.258214 12.4004Z" fill="black" />
                                </svg>
                            </a>
                        </div>
                        <div className="ourWorksDetailBottomBottom">
                            <p>
                                Year
                            </p>
                            <h4>
                                2025
                            </h4>
                        </div>

                    </div>


                    <div className="ourWebsiteLink">
                        <a>
                            <span>
                                Visit Website
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M0.258214 12.4004L11.0858 1.57282L1.80501 1.57282L1.72546 0.326542L13.2159 0.326541L13.2159 11.817L11.9697 11.7375L11.9697 2.4567L1.1421 13.2843L0.258214 12.4004Z" fill="black" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurWorksPageDetailFirst

