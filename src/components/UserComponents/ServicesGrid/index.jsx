

import './index.scss'
import mobileApp from "/src/assets/mobileApp.png"
import macbook from "/src/assets/macbook.png"
import tablet from "/src/assets/tablet.png"
import design from "/src/assets/design.png"
import adminPanel from "/src/assets/adminPanel.png"
import seo from "/src/assets/seo.png"
import technic from "/src/assets/technic.png"
import dnsImage from '/src/assets/dnsImage.png'
import payments from '/src/assets/payments.png'
function ServicesGrid() {
    return (
        <section id={"servicesGrid"}>
            <div className={"container"}>
                <div className={"servicesText"}>SERVICES</div>
                <div className="parent">
                    <div className="div firstDiv div1">
                        <h2>Mobil App Development</h2>
                        <p>We design and build user-friendly mobile applications for iOS and Android, tailored to your
                            business needs.</p>
                        <img src={mobileApp} alt={"Image"} className={"mobileApp"} />
                    </div>
                    <div className="secondDiv div2">
                        <div>
                            <h2>Frontend Development</h2>
                            <p>The website is optimized for both mobile and desktop with a fast and aesthetic interface..</p>
                        </div>
                        <img src={macbook} alt={"Image"} className={"macbook"} />
                    </div>
                    <div className="div div3 thirdDiv div100" style={{
                        color: "black"
                    }}>
                        <div>
                            <h2>Backend Development</h2>
                            <p>A powerful management system is built for handling products, orders, and users.</p>
                        </div>
                        <img src={tablet} alt={"Image"} className={"tablet"} />
                    </div>
                    <div className="div fourthDiv div4">
                        <div>
                            <h2>Domain & Hosting Setup</h2>
                            <p>
                                Your website’s domain name is registered and hosted on a reliable server.
                            </p>
                        </div>
                        <img src={dnsImage} alt={"Image"} className={"dnsImage"} />
                    </div>
                    <div className="divdivdiv div5">
                        <h2>Design & UI/UX</h2>
                        <p style={{
                            maxWidth: '280px',
                            width: '100%'
                        }}>A modern design is created, ensuring a smooth and user-friendly experience.</p>
                        <img src={design} alt={"Image"} className={"design"} />
                    </div>
                    <div className="divdivdiv div6" style={{
                        color: "black"
                    }}>
                        <h2>Admin Panel</h2>
                        <p style={{
                            maxWidth: '280px',
                            width: '100%'
                        }}>A simple and easy-to-use management panel is provided for business owners.</p>
                        <img src={adminPanel} alt={"Image"} className={"adminPanel"} />
                    </div>
                    <div className="div div3 div100 div7">
                        <div>
                            <h2>Payment System Integration</h2>
                            <p>Customers can pay via card, cash, or bank transfer.</p>
                        </div>
                        <img src={payments} alt={"Image"} className={"payments"} />
                    </div>
                    <div className="div div3 div100 div8" style={{
                        color: "black"
                    }}>
                        <div>
                            <h2>SEO Support</h2>
                            <p>Optimization is applied so your website ranks better on Google and other search
                                engines.</p>
                        </div>
                        <img src={seo} alt={"Image"} className={"seo"} />
                    </div>
                    <div className="div div3 div100 div9">
                        <div>
                            <h2>Technical Support & Updates</h2>
                            <p>Continuous technical support and regular updates are provided after launch.</p>
                        </div>
                        <img src={technic} alt={"Image"} className={"seo"} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicesGrid;