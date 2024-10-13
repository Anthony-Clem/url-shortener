"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, MoreHorizontal } from "lucide-react"; // Import the three dots icon (MoreHorizontal)
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { GeneratedUrlProps } from "@/app/lib/types";
import { CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { deleteUrl } from "@/app/lib/action";

const AnalyticsTable = ({ urls }: { urls: GeneratedUrlProps[] }) => {
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  }

  const columns: ColumnDef<GeneratedUrlProps>[] = [
    {
      accessorKey: "index",
      header: "#",
    },
    {
      accessorKey: "originalLink",
      header: "Original Link",
      cell: ({ getValue }) => (
        <div
          style={{
            width: "300px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "newUrl",
      header: "New Url",
    },
    {
      accessorKey: "views",
      header: "Views",
      cell: ({ getValue }) => (
        <div
          style={{ textAlign: "center", fontWeight: "700", fontSize: "20px" }}
        >
          {getValue<number>()}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition"
              aria-label="Options"
            >
              <MoreHorizontal />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={row.original.newUrl} target="_blank">
                Visit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                className="w-full text-left"
                onClick={() => {
                  navigator.clipboard.writeText(row.original.newUrl);
                }}
              >
                Copy Link
              </button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                className="w-full text-left"
                onClick={async () => {
                  await deleteUrl(row.original.id);
                }}
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  function DataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  const [searchValue, setSearchValue] = useState("");

  const filteredData = urls
    .filter((url) =>
      url.originalLink.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((url, index) => ({
      ...url,
      index: index + 1, // Add index field
    }));

  return (
    <CardContent className="mx-1 rounded-lg py-3 px-2">
      <div className="max-w-[300px] w-full ml-auto flex items-center relative">
        <button className="absolute mt-auto mb-auto ml-2 cursor-pointer">
          <Search className="size-5" />
        </button>
        <Input
          type="search"
          className="w-full pl-8"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <DataTable columns={columns} data={filteredData} />
    </CardContent>
  );
};

export default AnalyticsTable;
