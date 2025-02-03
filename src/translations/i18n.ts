import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import cs from "./cs.json";
import en from "./en.json";

export const defaultNS = "default";
export const resources = {
  en: {
    default: en,
  },
  cs: {
    default: cs,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["ns1", "ns2"],
  defaultNS,
  resources,
});
