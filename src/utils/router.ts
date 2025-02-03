import type { Translations } from "@/types";

export const createCrumbsContext = (crumbs: Translations) => () => ({ crumbs });
