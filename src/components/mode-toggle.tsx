import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

export function ModeToggle() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <>
          <Sun />
          {t("LightTheme")}
        </>
      ) : (
        <>
          <Moon />
          {t("DarkTheme")}
        </>
      )}
    </DropdownMenuItem>
  );
}
