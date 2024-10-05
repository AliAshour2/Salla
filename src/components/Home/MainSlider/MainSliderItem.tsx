import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface MainSliderItemProps {
  image: string;
  badgeText: string;
  title: string;
  description: string;
  link: string;
  ActionButtonText: string;
}

const MainSliderItem: React.FC<MainSliderItemProps> = React.memo(
  ({ image, badgeText, title, description, link, ActionButtonText }) => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const LangAlignmentClass = isArabic ? "text-right" : "text-left";
    return (
      <div className={`p-2 ${LangAlignmentClass}}`}>
        <div
          className={`overflow-hidden bg-cover bg-center w-full rounded-md bg-no-repeat`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className={`w-full md:w-1/2 grid gap-2 p-5 lg:px-12 lg:py-16 ${LangAlignmentClass}
          }`}
          >
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded w-fit mb-4 bg-yellow-400 text-yellow-800">
              {t(badgeText)}
            </span>
            <h2 className="mt-2 text-5xl font-bold text-gray-900 ">
              {t(title)}
            </h2>
            <p className="text-lg font-thin leading-relaxed">
              {" "}
              {t(description)}
            </p>
            <Link
              to={link}
              className="py-2 px-4 mt-3 bg-gray-800 text-white rounded-lg w-fit hover:bg-gray-700 focus:bg-gray-700"
            >
              {t(ActionButtonText)}
              {isArabic ? (
                <i className="fa fa-angle-left mr-2"></i>
              ) : (
                <i className="fa fa-angle-right ml-2"></i>
              )}
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

export default MainSliderItem;
