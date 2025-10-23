import './index.scss'
import marketingVoice from "/src/assets/marketing-voice.svg"
import brandSvg from "/src/assets/brandSvg.svg"
import marketingCamara from "/src/assets/marketingCamara.svg"
import socialSvg from "/src/assets/socialSvg.svg"
import contentSvg from "/src/assets/contentSvg.svg"
import analytkSvg from "/src/assets/analytkSvg.svg"
import strategySvg from "/src/assets/strategySvg.svg"
import seoSvg from "/src/assets/seoSvg.svg"

function MarketingServices() {
    return (
        <section id={"marketingServices"}>
            <div className={"container"}>
                <div className={"servicesText"}>SERVICES</div>
                <div className="cardBoxs">
                    <div className="cardBox1 cardBox2">
                        <div className="firstCard cubCard allCards">
                            <img src={marketingVoice} alt="marketingVoice" />
                            <div className="textBox">
                                <h2>
                                    Digital Advertising Campaign
                                </h2>
                                <p>
                                    Daily management of Instagram, Facebook, TikTok, and LinkedIn pages.
                                </p>
                            </div>
                        </div>
                        <div className="secondCard cubCard allCards">
                            <img src={brandSvg} alt="marketingVoice" />
                            <div className="textBox">
                                <h2>
                                    Branding & Identity
                                </h2>
                                <p>
                                    Developing logos, color palettes, and overall brand strategy.                            </p>
                            </div>
                        </div>
                        <div className="thirdCard duzCard2 cubCard allCards">
                            <img src={marketingCamara} alt="marketingVoice" />
                            <div className="textBox">
                                <h2>
                                    Video & Photo Production
                                </h2>
                                <p>
                                    High-quality promotional materials for products and services.                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="cardBox1">

                        <div className="fourthCard duzCard allCards">
                            <div className="textBox">
                                <h2>
                                    Social Media Management
                                </h2>
                                <p>
                                    Daily management of Instagram, Facebook, TikTok, and LinkedIn pages.
                                </p>
                            </div>
                            <img src={socialSvg} alt="socialSvg" />
                        </div>
                        <div className="fifthCard duzCard allCards">
                            <div className="textBox">
                                <h2>
                                    Content Creation
                                </h2>
                                <p>
                                    Creative production of photos, videos, and graphic design materials.
                                </p>
                            </div>
                            <img src={contentSvg} alt="contentSvg" />
                        </div>

                    </div>
                    <div className="cardBox1">
                        <div className="sixthCard cubCard allCards">
                            <img src={analytkSvg} alt="analytkSvg" />
                            <div className="textBox">
                                <h2>
                                    Analytics & Reporting
                                </h2>
                                <p>
                                    Tracking ad campaign performance and delivering monthly reports.
                                </p>
                            </div>
                        </div>
                        <div className="seventhCard cubCard allCards">
                            <img src={strategySvg} alt="strategySvg" />
                            <div className="textBox">
                                <h2>
                                    Marketing Strategy Development
                                </h2>
                                <p>
                                    Building a long-term marketing roadmap tailored to business goals.                          </p>
                            </div>
                        </div>
                        <div className="eightCard duzCard2 cubCard allCards">
                            <img src={seoSvg} alt="seoSvg" />
                            <div className="textBox">
                                <h2>
                                    SEO-SAM Support
                                </h2>
                                <p>
                                    We enhance your online visibility with effective SEO solutions tailored to your business.                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MarketingServices;
