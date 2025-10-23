import './index.scss'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";

function Faq() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const title = t("siteRoot.homePage.faqSection.title");
    // const faqs = [
    //     "What technologies do you use for web development?",
    //     "How long does it take to build a custom website?",
    //     "Do you provide post-launch support and maintenance?",
    //     "Can you integrate third-party tools and APIs?",
    //     "How much does a development project usually cost?"
    // ];

    const faqsData = t("siteRoot.homePage.faqSection.faqs", { returnObjects: true });

    const faqs = Array.isArray(faqsData) ? faqsData : [];
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq">
            <div className="container">
                <div className="row">
                    {/* Sol tərəf - Sticky */}
                    <div className="col-5 col-md-6 col-sm-12 col-xs-12 leftSticky">
                        <h2>{title}</h2>
                    </div>

                    {/* Sağ tərəf - Scroll content */}
                    <div className="col-7 col-md-6 col-sm-12 col-xs-12">
                        {faqs?.map((faq, index) => (
                            <div key={index}>
                                <AccordionItem
                                    title={faq.question}
                                    answer={faq.answer}

                                    isOpen={activeIndex === index}
                                    toggle={() => toggleAccordion(index)}
                                    isLast={index === faqs.length - 1}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const AccordionItem = ({ title, answer, isOpen, toggle, isLast }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
                contentRef.current.style.opacity = "1";
                contentRef.current.style.margin = "16px 0 0";
            } else {
                contentRef.current.style.maxHeight = "0px";
                contentRef.current.style.opacity = "0";
                contentRef.current.style.margin = "0";
            }
        }
    }, [isOpen]);

    return (
        <>
            <div className={`accordion-item ${isOpen ? "open" : ""}`} onClick={toggle}>
                <div className="textWrapper">
                    <h3>{title}</h3>
                    <div ref={contentRef} className="accordion-content">
                        <p>{answer}</p>
                    </div>
                </div>
                {isOpen ? <FaMinus className="icon" /> : <FaPlus className="icon" />}
            </div>
            {!isLast && <div className="line"></div>}
        </>
    );
};

export default Faq;
