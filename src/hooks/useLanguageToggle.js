import { useTranslation } from "react-i18next";

function useLanguageToggle() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "cn" : "en");
  };

  return {
    currentLanguage: i18n.language,
    toggleLanguage,
    translate: t,
  };
}

export default useLanguageToggle;
