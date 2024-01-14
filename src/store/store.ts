import { create } from "zustand";
// RCCC: Here we'll configure the app's global state which can be accessed from anywere inside the app.

// First create the interface from which we'll base the app state:
interface AppState{
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean)=>void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open: boolean) =>void;

    fileId: string | null;
    setFileId: (fileId: string)=>void;

    fileName: string | null;
    setFileName: (fileName: string) => void;
}

// Now, create the store with which we'll access the data from all app.
export const useAppStore = create<AppState>()((set)=>({
    fileId: null,
    setFileId: (fileId: string)=>set((state)=>({fileId})),

    fileName:"",
    setFileName: (fileName: string)=>set((state)=>({fileName})),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open)=>set((state)=>({isDeleteModalOpen:open})),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open)=>set((state)=>({isRenameModalOpen:open}))
}))