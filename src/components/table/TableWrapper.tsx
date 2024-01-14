"use client";
import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./Columns";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { Skeleton } from "@/components/ui/skeleton";

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  // This is how we define that the values allowed: asc and desc:
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  // useCollection hook from react-firebase-hooks external library. For more info about this
  // hook head over to npm install --save react-firebase-hooks
  //  Here, we append user && to say that if the user exists, then pass the query parameter
  // to the useCollection hook
  // We could only pass the collection function to the useCollection. However, we are wrapping inside
  // the query so that we can apply the sort order to the collection.
  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "dropbox-react-users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  // Everytime the component renders for the first time or when the docs value changes
  // Update the initial files with the new data.
  useEffect(() => {
    if (!docs) return;
    console.log("The docs>>", docs.docs.length);

    // When the data loads, we need to make a transformation before update the table's data source:
    const files = docs.docs.map((doc) => ({
      id: doc.id,
      fileName: doc.data().fileName || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
    }));

    setInitialFiles(files);
  }, [docs]);

  // If the docs have not been loaded yet, then show a loading message...
  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        {/* <p className="animate-pulse font-semibold text-2xl text-center">
          loading...
        </p> */}
        {/* An skeleton for the button */}
        <Button variant={"outline"} className="ml-auto w-36 mb-5">
          {/* <Skeleton className="w-[100px] h-[50px] rounded-full" /> */}
          <Skeleton className="h-5 w-full" />
        </Button>

        {/* The skeleton for the table based on the acutal documents data  skeletonFiles which were 
        obtained from backend  */}
        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
          {/* If the skeletonFiles length is 0 then render the following so the skeleton won't be empty */}
          {skeletonFiles.length === 0 && (
            <div className="flex items-center p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        variant={"outline"}
        onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
        className="ml-auto w-fit"
      >
        Sort By {sort === "asc" ? "Oldest" : "Newest"}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper;
