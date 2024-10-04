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

const MainSliderItem: React.FC<MainSliderItemProps> = ({
  image,
  badgeText,
  title,
  description,
  link,
  ActionButtonText,
}) => {
  const { t } = useTranslation();
  return (
    <div className="p-2">
      <div
        className="overflow-hidden "
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover",
          overflow: "hidden",
          borderRadius: "0.5rem",
          backgroundPosition: "center center",
        }}
      >
        <div className="lg:px-12 lg:py-16 p-5  grid xl:grid-cols-5 md:grid-cols-7 text-center text-xs w-fit mb-4  ">
          <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-yellow-400 text-yellow-800">
            {t(badgeText)}
          </span>
          <h2 className="mt-5 text-5xl font-bold text-gray-900 ">{t(title)}</h2>
          <p className="text-lg"> {t(description)}</p>
          <Link to={link} className="btn btn-dark mt-3">
            {t(ActionButtonText)} Shop Now{" "}
            <i className="feather-icon icon-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainSliderItem;
