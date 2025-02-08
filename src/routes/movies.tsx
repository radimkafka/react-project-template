import useMoviesQuery from "@/api/movies/queries/useMoviesQuery";
import { type RecordType, isRecordType } from "@/api/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { parseNumber } from "@/utils/number";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/movies")({
  component: RouteComponent,
});

function RouteComponent() {
  const [filter, setFilter] = useState({
    title: "batman",
    type: undefined as RecordType | undefined,
    year: undefined as string | undefined,
  });
  const { data } = useMoviesQuery(filter.title, parseNumber(filter.year), filter.type);
  console.log("data: ", data);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Input
          placeholder="Search by title"
          value={filter.title}
          onChange={(e) => setFilter((a) => ({ ...a, title: e.target.value }))}
        />
        <Select
          value={filter.type}
          onValueChange={(value) => setFilter((a) => ({ ...a, type: isRecordType(value) ? value : undefined }))}
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
          value={filter.year}
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
            <TableHead>IMDB ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data?.Search ?? []).map((movie) => (
            <TableRow key={movie.imdbID}>
              <TableCell>
                <img src={movie.Poster || "/placeholder.svg"} alt={movie.Title} className="h-24 w-16 object-cover" />
              </TableCell>
              <TableCell>{movie.Title}</TableCell>
              <TableCell>{movie.Type}</TableCell>
              <TableCell>{movie.Year}</TableCell>
              <TableCell>{movie.imdbID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
