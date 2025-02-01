import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <>
          <Sun />
          Light
        </>
      ) : (
        <>
          <Moon />
          Dark
        </>
      )}
    </DropdownMenuItem>
  );
}
