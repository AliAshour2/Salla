import { useTranslation } from "react-i18next";

const useTextDirection = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return {
    direction: isArabic ? "rtl" : "ltr",
    alignmentClass: isArabic ? "text-right" : "text-left",
  };
};

export default useTextDirection;
