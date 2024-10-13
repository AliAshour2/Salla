import { useTranslation } from "react-i18next";

// Define the Direction enum
enum Direction {
  RTL = "rtl",
  LTR = "ltr",
}

const useTextDirection = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return {
    direction: isArabic ? Direction.RTL : Direction.LTR, 
    alignmentClass: isArabic ? "text-right" : "text-left",
  };
};

export default useTextDirection;