import './index.scss'
import { useState, useRef, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import question from "/src/assets/question.png";
import { useTranslation } from 'react-i18next';

function FaqMarketing() {
    const { t } = useTranslation()
    const faqs = [
        {
            title: t('siteRoot.homePageMarketing.marketingFag.q1.qu'),
            content: t('siteRoot.homePageMarketing.marketingFag.q1.a'),
        },
        {
            title: t('siteRoot.homePageMarketing.marketingFag.q2.qu'),
            content: t('siteRoot.homePageMarketing.marketingFag.q2.a'),
        },
        {
            title: t('siteRoot.homePageMarketing.marketingFag.q3.qu'),
            content: t('siteRoot.homePageMarketing.marketingFag.q3.a'),
        },
        {
            title: t('siteRoot.homePageMarketing.marketingFag.q4.qu'),
            content: t('siteRoot.homePageMarketing.marketingFag.q4.a'),
        },
        {
            title: t('siteRoot.homePageMarketing.marketingFag.q5.qu'),
            content: t('siteRoot.homePageMarketing.marketingFag.q5.a'),
        }

    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faqMarketing">
            <div className="faq-head">
                <h2 id="faq-heading" className="faq-title">FAQ</h2>
                <p className="faq-subtitle">( <span>Frequently asked questions</span> )</p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-5 col-md-5 col-sm-12 col-xs-12">
                        <img src={question} className="question" alt="FAQ Illustration" />
                    </div>
                    <div className="col-7 col-md-12 col-sm-12 col-xs-12">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                title={faq.title}
                                content={faq.content}
                                isOpen={activeIndex === index}
                                toggle={() => toggleAccordion(index)}
                                isLast={index === faqs.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const AccordionItem = ({ title, content, isOpen, toggle, isLast }) => {
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
                        <p>{content}</p>
                    </div>
                </div>
                {isOpen ? <FaMinus className="icon" /> : <FaPlus className="icon" />}
            </div>
        </>
    );
};

export default FaqMarketing;
