import React from 'react'
import './index.scss'
import aboutThird1 from '/src/assets/aboutThird1.svg'
import aboutThird2 from '/src/assets/aboutThird2.svg'
import aboutThird3 from '/src/assets/aboutThird3.svg'
import aboutThird4 from '/src/assets/aboutThird4.svg'
import aboutThird5 from '/src/assets/aboutThird5.svg'
import aboutThird6 from '/src/assets/aboutThird6.svg'
const AboutPageThird = () => {
    return (
        <section id='aboutPageThird'>
            <div className="container">
                <div className="aboutThirdBox">
                    <div className="aboutThirdCard aboutThirdCard1">
                        <div className="thirdTextBox">
                            <div className="svg">
                                <img src={aboutThird1} alt="about-svg1" />
                            </div>
                            <h2 >Our Vision</h2>
                            <p >
                                Our vision is to become the most trusted creative and technological partner in the regional market. By building the digital ecosystem of the future, Buyontech aims to create a global bridge of success for businesses, standing out through innovation in both marketing and web development.
                            </p>
                        </div>
                        <div className="thirdImageBox">
                            <img src={aboutThird3} className='thirdImage1' alt="svgLeft" />
                            <img src={aboutThird5} className='thirdImage2' alt="svgLeft" />
                        </div>
                    </div>
                    <div className="aboutThirdCard aboutThirdCard2">
                        <div className="thirdImageBox">
                            <img src={aboutThird4} className='thirdImage1' alt="svgRight" />
                            <img src={aboutThird6} className='thirdImage2' alt="svgRight" />
                        </div>
                        <div className="thirdTextBox">
                            <div className="svg">
                                <img src={aboutThird2} alt="about-svg2" />

                            </div>
                            <h2 >Our Mission</h2>
                            <p >
                                Our mission is to accelerate business growth – by combining innovative marketing solutions with modern web technologies, we provide entrepreneurs with both a strong brand presence and a solid digital infrastructure. At Buyontech, our goal is to transform every client’s idea into tangible results.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutPageThird
