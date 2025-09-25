import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import HomeBanner from "../../../components/UserComponents/HomeBanner/index.jsx";
import Faq from "../../../components/UserComponents/Faq/index.jsx";
import LogoScroll from "../../../components/UserComponents/LogoScroll/index.jsx";
import AboutScroll from "../../../components/UserComponents/AboutScroll/index.jsx";
import ServicesGrid from "../../../components/UserComponents/ServicesGrid/index.jsx";
import PortfolioGrid from "../../../components/UserComponents/PortfolioGrid/index.jsx";
import WhyChoose from "../../../components/UserComponents/WhyChoose/index.jsx";
import Footer from "../../../components/UserComponents/Footer/index.jsx";

function HomePage() {

    return (
        <section id={"homePage"}>
            <Navbar/>
            <HomeBanner/>
            <LogoScroll/>
            <AboutScroll/>
            <ServicesGrid/>
            <PortfolioGrid/>
            <WhyChoose/>
            <Faq/>
            <div style={{
                height: "50dvh",
            }}></div>
            <Footer/>
        </section>
    );
}

export default HomePage;