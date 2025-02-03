import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  return (
    <DropdownMenuItem onClick={() => i18n.changeLanguage(i18n.language === "en" ? "cs" : "en")}>
      <Languages />
      {t("ToggleLanguageText")}
    </DropdownMenuItem>
  );
}
