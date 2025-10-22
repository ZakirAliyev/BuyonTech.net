import React, { useState } from "react";
import "./index.scss";
import TeamCard from "../../TeamCard";
import { useTranslation } from "react-i18next";

const AboutFourthSection = ({ data = [] }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation()
  const handleSeeMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 1000);
  };

  const visibleData = data.slice(0, visibleCount);

  return (
    <section id="aboutFourthSection">
      <div className="container">
        <div className="aboutFourthBox">
          <h1 className="aboutFourthTitle">{t("siteRoot.aboutPage.fourthSection.title")}</h1>

          <div className="row">
            {visibleData.map((item, index) => (
              <div className="col-3 col-md-4 col-sm-6 col-xs-12" key={index}>

                <TeamCard item={item} />
              </div>
            ))}
          </div>

          {data.length > visibleCount && (
            <div className="loadMoreBtn">
              <button onClick={handleSeeMore} disabled={loading}>
                {loading
                  ? t("siteRoot.aboutPage.fourthSection.loading")
                  : t("siteRoot.aboutPage.fourthSection.seeMore")}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutFourthSection;
