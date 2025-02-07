import type { RecordType } from "../types";

export const movieKeys = {
  all: ["movies"],
  detail: (id?: string) => [...movieKeys.all, id],
  list: (searchText?: string, year?: number, type?: RecordType, page?: number) => [
    ...movieKeys.all,
    "list",
    { searchText, year, type, page },
  ],
} as const;
