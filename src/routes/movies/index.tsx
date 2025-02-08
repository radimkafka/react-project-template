import useMoviesQuery from "@/api/movies/queries/useMoviesQuery";
import { type RecordType, isRecordType } from "@/api/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "underscore";
import { z } from "zod";

const searchSchema = z.object({
  title: z.string().optional(),
  year: z.coerce.number().min(1900).optional(),
  type: z.enum(["movie", "series", "episode", "game"]).optional(),
});

export const Route = createFileRoute("/movies/")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/movies/" });
  const { title, type, year } = Route.useSearch();
  const [filter, setFilter] = useState({ title, type, year: year?.toString() });
  const { data } = useMoviesQuery(title, year, type);

  const setParams = useCallback(
    debounce((data: typeof filter) => {
      console.log("data: ", data);
      const parsed = searchSchema.safeParse(data);
      console.log("parsed: ", parsed);
      if (!parsed.success) return;

      navigate({
        search: parsed.data,
      });
    }, 1000),
    [],
  );

  useEffect(() => {
    setParams(filter);
  }, [setParams, filter]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Input
          placeholder="Search by title"
          value={filter.title ?? ""}
          onChange={(e) => setFilter((a) => ({ ...a, title: e.target.value }))}
        />
        <Select
          value={filter.type ?? ""}
          onValueChange={(value) =>
            setFilter((a) => ({
              ...a,
              type: isRecordType(value) ? value : undefined,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value={"movie" as RecordType}>Movie</SelectItem>
            <SelectItem value={"series" as RecordType}>Series</SelectItem>
            <SelectItem value={"episode" as RecordType}>Episode</SelectItem>
            <SelectItem value={"game" as RecordType}>Game</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Year from"
          value={filter.year ?? ""}
          onChange={(e) => setFilter((a) => ({ ...a, year: e.target.value }))}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Poster</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data?.Search ?? []).map((movie) => (
            <TableRow
              key={movie.imdbID}
              onClick={() => navigate({ to: "$id", params: { id: movie.imdbID } })}
              className="cursor-pointer"
            >
              <TableCell>
                <img src={movie.Poster || "/placeholder.svg"} alt={movie.Title} className="h-24 w-16 object-cover" />
              </TableCell>
              <TableCell>{movie.Title}</TableCell>
              <TableCell>{movie.Type}</TableCell>
              <TableCell>{movie.Year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
