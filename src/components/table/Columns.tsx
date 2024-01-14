"use client";
import { COLOR_EXTENSION_MAP } from "@/constants";
import {
  saveFileFromExternalURL,
  saveFileFromExternalURLAsBlob,
  saveFileUsingAxios,
} from "@/saveFile";
import { FileType } from "@/typings";
// For detailed info about shacdn ui data table columns definitions head over to
// https://ui.shadcn.com/docs/components/data-table

import { ColumnDef } from "@tanstack/react-table";
import { FileTypeIcon } from "lucide-react";
import Link from "next/link";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      // image/jpg; document/pdf; document/doc....
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension] || "#000000"}
            // @ts-ignore -->Suppresses @ts-check errors on the next line of a file.
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "File Name",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Links",
    // cell: ({ renderValue, ...props }) => {
    // Here, we'll use row so we have access to the fileName value.
    cell: ({ row }) => {
      const fileName = row.getValue("fileName") as string;
      const downloadURL = row.getValue("downloadURL") as string;
      return (
        <a //this could be also "a" but in this oportunity we'll use the Link tag
          href={downloadURL}
          target="_blank"
          className="underline text-blue-500 hover:text-blue-600"
          // download only works for same-origin URLs, or the blob: and data: schemes. If the Content-Disposition header has different information from the download attribute, resulting behavior may differ:
          // If the header specifies a filename, it takes priority over a filename specified in the download attribute.
          //   download={fileName}
          // These are attempts to change the default filename before download by calling specific functions
          // But they didn't work either because of the CORS policy. Therefore, to sort out this filename problem,
          // Instead of uploading to firebase storage the file named the same as to documentRef.id,
          // the file will be uploaded with the original file name inside it's own directory which will be
          // named the same as the unique documentRef ID. ---> See Dropzone.tsx.
          // onClick={() => saveFileFromExternalURL(downloadURL, fileName)}
          // onClick={() => saveFileFromExternalURLAsBlob(downloadURL, fileName)}
          // onClick={() => saveFileUsingAxios(downloadURL, fileName)}
          //   onCl
        >
          {"Download"}
        </a>
      );
    },
  },
];

// download only works for same-origin URLs, or the blob: and data: schemes. If the Content-Disposition header has different information from the download attribute, resulting behavior may differ:
// If the header specifies a filename, it takes priority over a filename specified in the download attribute.
// If the header specifies a disposition of inline, Chrome and Firefox prioritize the attribute and treat it as a download. Old Firefox versions (before 82) prioritize the header and will display the content inline.
