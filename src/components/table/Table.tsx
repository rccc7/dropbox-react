"use client";

// This Table component is based on the <DataTable /> component example at
// https://ui.shadcn.com/docs/components/data-table
// The code was pasted here and adapted to this project requirements.
// Notice: Here, we are naming the component Table whereas in the original example was named DataTable.

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/store";
import { DeleteModal } from "../DeleteModal";
import RenameModal from "../RenameModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
// Here columns and data come as props
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Access the global store
  const [setFileId, setIsDeleteModalOpen, setFileName, setIsRenameModalOpen] =
    useAppStore((state) => [
      state.setFileId,
      state.setIsDeleteModalOpen,
      state.setFileName,
      state.setIsRenameModalOpen,
    ]);

  const openDeleteModal = (fileId: string, fileName: string) => {
    setFileId(fileId);
    setFileName(fileName);
    setIsDeleteModalOpen(true);
  };
  const openRenameModal = (fileId: string, fileName: string) => {
    setFileId(fileId);
    setFileName(fileName);
    setIsRenameModalOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {/* If the column corresponds to the timestamp, then format its value to a more readable format.
                    Note: This could also be mad directly in the TableWrapper.tsx before passing the data to this component*/}
                    {cell.column.id === "timestamp" ? (
                      <div className="flex flex-col">
                        <div className="text-sm">
                          {(cell.getValue() as Date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(cell.getValue() as Date).toLocaleTimeString()}
                        </div>
                      </div>
                    ) : // Otherwhise, if the column of the cell corresponds to the fileName, then add an edit icon and specific format.
                    cell.column.id === "fileName" ? (
                      <p
                        onClick={() =>
                          openRenameModal(
                            (row.original as FileType).id,
                            (row.original as FileType).fileName
                          )
                        }
                        className="underline, flex items-center text-blue-500 hover:cursor-pointer"
                      >
                        {cell.getValue() as string}{" "}
                        <PencilIcon size={15} className="mt-2s ml-2" />
                      </p>
                    ) : (
                      // Finally, by default proceed with the normal flow of the cell rendering as it is
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
                {/* Additionally add this extra cell to delete de associated file 
                row.original is actually the row content, in this case the File itself.
                For more info head over to the transtack table documentation:
                https://tanstack.com/table/v8/docs/api/core/row#original*/}
                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      // alert(
                      //   "hello there. Are you sure to delete the selected file?"
                      // );
                      openDeleteModal(
                        (row.original as FileType).id,
                        (row.original as FileType).fileName
                      );
                    }}
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have no files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* Here, we place the necessary code to render the DeleteModal and REnameModal dialogs when needed */}
        <DeleteModal />
        <RenameModal />
      </Table>
    </div>
  );
}
