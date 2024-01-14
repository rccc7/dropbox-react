"use client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
// RCCC: Dropzone wrapper component based on the example described in https://www.npmjs.com/package/react-dropzone
// Here, we are importing Dropzone, which is the original name of the component,
// and renaming it as DropzoneComponent
// because the comflict with this component's name. Since we are calling our component "Dropzone", then
// we need to rename the import component. The original import should be:
// import Dropzone from "react-dropzone";

import DropzoneComponent from "react-dropzone";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function Dropzone() {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const maxSize = 20971520; //Maximum Upload size is 20Mb.

  //   Handle the DropZoneComponent onDrop event.
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("File reading was aborted.");
      reader.onerror = () => console.log("File reading has failed.");

      //   Once the reader has read the file upload it to firebase...
      reader.onload = async () => {
        await uploadPost(file);
      };

      //   This call will eventually trigger the reader.onload event.
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    // This way we prevent loading (or uploading) the file more than once.
    if (loading) return;
    // If there is no user return
    if (!user) return;

    setLoading(true);

    const toastId = toast.loading("Uploading...");

    // Do what needs to be done...
    // Register the file reference in the database:
    // The path of the file to be saved will be as follows /users/user12345/files/
    const docRef = await addDoc(
      collection(db, "dropbox-react-users", user.id, "files"),
      {
        userId: user.id,
        fileName: selectedFile.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        timestamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      }
    );
    // alert("The docRef" + docRef.id);

    // Now save the file into firebase storage
    const documentRef = ref(
      storage,
      // `dropbox-react/users/${user.id}/files/${docRef.id}`
      // here, we'll create a directory for each new file. The directory will be
      // named the same as the docRef.id. This way we can download the files
      // with their original file name.
      `dropbox-react/users/${user.id}/files/${docRef.id}/${selectedFile.name}`
    );

    uploadBytes(documentRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(documentRef);
      //   Now update the original document with the downloadURL:
      await updateDoc(
        doc(db, "dropbox-react-users", user.id, "files", docRef.id),
        {
          downloadURL: downloadURL,
        }
      );
    });

    // Being optimistic, the file will be uploaded successfuly:
    toast.success("Uploaded successfully", { id: toastId });

    setLoading(false);
  };

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      //   onDrop={(acceptedFiles) => console.log(acceptedFiles)}
      //   onDrop={onDrop}
      //   we can also call this way:
      onDropAccepted={(acceptedFiles) => onDrop(acceptedFiles)}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        fileRejections,
        // Based on these last 3 params we can change the look'nd feel of our component.
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            {/* Thanks to the lib/utils file from the shacdn installation we can merge multiple class names: */}
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center cursor-pointer",
                isDragActive
                  ? "bg-[#035FFE]"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isFileTooLarge && (
                <div className="text-red-700 mt-2">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
