"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

// RCCC: DeleteModal component. Original code copied and modified to fit this component requirements from
// the DialogCloseButton example at https://ui.shadcn.com/docs/components/dialog

export function DeleteModal() {
  const { user } = useUser();
  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    fileId,
    setFileId,
    fileName,
    setFileName,
  ] = useAppStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileId,
    state.setFileId,
    state.fileName,
    state.setFileName,
  ]);

  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    if (isDeleteModalOpen && !enabled) {
      setEnabled(true);
      console.log("Enabling the button");
    }

    console.log("Enabled>>>", enabled);
  }, [isDeleteModalOpen]);

  const deleteFile = async () => {
    if (!user || !fileId) return;
    setEnabled(false);

    const toastId = toast.loading("Deleting, please wait...");

    // In firebase deleting the only file in the directory will actually delete also the directory.
    // Since there are no directories in firebase, there are only a list of files whith their names
    // containing the symbol "/" that then are interpreted as directories.
    // As described here: https://stackoverflow.com/questions/69091800/delete-folder-inside-firebase-storage-with-cloud-functions
    // "Folders are not a real thing on Cloud Storage. In reality it is just one long list of files, and having
    // a / in the name/path of the file is interpreted as a folder (also referred to as a prefix, since it's
    // the start of the name/path).
    // What this means in practice is that in order to delete a folder, you need to delete all files inside
    // that folder. Once you do that, the folder will automatically disappear.
    // "
    const fileRef = ref(
      storage,
      `dropbox-react/users/${user.id}/files/${fileId}/${fileName}` //-->this is the bucket of the firebase storage
    );

    try {
      // deleteFile;
      await deleteObject(fileRef)
        .then(async () => {
          console.log("Deleted file");
          // Now delete the corresponding doc:
          await deleteDoc(
            doc(db, "dropbox-react-users", user.id, "files", fileId)
          ).then(() => {
            console.log("Document deleted");
            // Show the toast success message
            toast.success("Document deleted successfully!", { id: toastId });
          });
        })
        .finally(() => {
          // Wait for the deletion of the file and document is fulfilled to close the modal
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      console.error("An error ocurred>>>", error);
      alert(
        "An error occured. The file was not deleted. Try to delete again or call your administrator"
      );
      //   Close the modal
      setIsDeleteModalOpen(false);
      // Show toast error message
      toast.error("Error deleting the document", { id: toastId });
      // toast.dismiss();
    }
  };
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        // Whenever we modify the open status of the modal, we also modify the global store.
        setIsDeleteModalOpen(isOpen);
        // setEnabled(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete the selected file?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size={"sm"}
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            {/* sr-only --> TailwindCSS Screen readers only: Use sr-only to hide an element 
            visually without hiding it from screen readers: */}
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size={"sm"}
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={async () => await deleteFile()}
            disabled={!enabled}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
