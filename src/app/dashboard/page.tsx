import React from "react";
import { auth } from "@clerk/nextjs";
import Dropzone from "@/components/Dropzone";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/TableWrapper";

// RCCC: Since this is a server component we can declare with async. and use await inside it.
async function Dashboard() {
  const { userId } = auth();
  // Pre-load the files on the server render...
  const docsResults = await getDocs(
    collection(db, "dropbox-react-users", userId!, "files")
  );

  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    fileName: doc.data().fileName || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  console.log("The skeleton files>>>>", skeletonFiles);
  return (
    <div className="border-t">
      <Dropzone />
      {/* For more info about the container class: https://tailwindcss.com/docs/container */}
      <section className="container space-y-5">
        <h2 className="font-bold">All files</h2>
        <div>
          {/* Table wrapper */}
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
