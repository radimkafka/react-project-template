import type { MovieInfo } from "./Api";

export function isRecordType(value?: unknown): value is RecordType {
  return value === "movie" || value === "series" || value === "episode" || value === "game";
}

export type RecordType = "movie" | "series" | "episode" | "game";
