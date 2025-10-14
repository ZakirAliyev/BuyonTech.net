import React from 'react'
import './index.scss'
import professor from '/src/assets/professor.png'
const AboutPageFirst = () => {
    return (
        <section id='aboutPageFirst'>
            <div className="container">
                <div className="aboutPageFirstBox">
                    <div className="row">
                        <div className="col-8 col-md-12 col-sm-12 col-xs-12">
                            <div className="textBox">
                                <h1>We Bring Ideas To Life With Design, Code, And Marketing.</h1>
                                <p>We don’t just create websites and apps, we enhance them with strategies. Design, development, and marketing boost your project’s value.</p>
                            </div>
                        </div>
                        <div className="col-4 col-md-12 col-sm-12 col-xs-12">
                                <img src={professor} alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default AboutPageFirst
