import type { Translations } from "@/types";

export const createCrumbLoaderData = (crumb: Translations) => () => ({ crumb });
