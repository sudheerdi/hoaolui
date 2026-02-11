"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import React from "react";
import {
  useDeleteDocumentMutation,
  useLazyGetDocumenmtsQuery,
  useLazyGetUnitsQuery,
  useShareDocumentMutation,
  useUploadDocumentMutation,
} from "@/src/services";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { setNotification } from "@/src/reducer/hoa-notificatio.reducer";
import { useAppDispatch } from "@/src/lib/hooks";

interface Folder {
  id: string;
  name: string;
  icon: string;
  filePath: string;
  parentId: string | null;
  documents?: Document[];
  subfolders?: Folder[];
  isPrivate: boolean;
  createdBy: string;
  updatedBy: string;
  shareSettings?: {
    shareType: "everyone" | "specific";
    specificEmails?: string[];
  };
}

export default function DocumentationScreen() {
  const dispatch = useAppDispatch();
  const [getDocuments, { data: documentsData }] = useLazyGetDocumenmtsQuery();
  const [uploadDocument, { isLoading: isUploading }] =
    useUploadDocumentMutation();
  const [deleteHoaDocument, { isLoading: isDeleting }] =
    useDeleteDocumentMutation();
  const [shareHoaDocument, { isLoading: isSharing }] =
    useShareDocumentMutation();
  const [getUnits, { data: unitsData }] = useLazyGetUnitsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );
  const [selectedDocument, setSelectedDocument] = useState<HoaDocument | null>(
    null,
  );
  const [sharePopover, setSharePopover] = useState<{
    isOpen: boolean;
    type: "folder" | "document";
    item: any;
    position: { x: number; y: number };
  }>({ isOpen: false, type: "folder", item: null, position: { x: 0, y: 0 } });
  const [emailSearch, setEmailSearch] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [filteredEmailSuggestions, setFilteredEmailSuggestions] = useState<
    string[]
  >([]);
  const [shareWithEveryone, setShareWithEveryone] = useState(false);

  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "meeting-agenda",
      name: "Meeting Agenda",
      filePath: "meeting-agenda",
      icon: "ri-folder-fill",
      parentId: null,
      isPrivate: true,
      createdBy: "Admin",
      updatedBy: "Sarah Johnson",
      subfolders: [],
    },
    {
      id: "requests-violations",
      name: "Requests & Violations",
      filePath: "requests-violations",
      icon: "ri-folder-fill",
      parentId: null,
      isPrivate: true,
      createdBy: "Admin",
      updatedBy: "Michael Chen",
      subfolders: [
        {
          id: "requests",
          name: "Requests",
          filePath: "requests-violations/requests",
          icon: "ri-folder-fill",
          parentId: "requests-violations",
          isPrivate: true,
          createdBy: "Admin",
          updatedBy: "Michael Chen",
        },
        {
          id: "violations",
          name: "Violations",
          filePath: "requests-violations/violations",
          icon: "ri-folder-fill",
          parentId: "requests-violations",
          isPrivate: true,
          createdBy: "Admin",
          updatedBy: "Michael Chen",
        },
      ],
    },
    {
      id: "administrative",
      name: "Administrative",
      filePath: "administrative",
      icon: "ri-folder-fill",
      parentId: null,
      isPrivate: true,
      createdBy: "Sarah Johnson",
      updatedBy: "Lisa Anderson",
      subfolders: [
        {
          id: "ccr-bylaws",
          name: "CCR & ByLaws",
          filePath: "administrative/ccr-bylaws",
          icon: "ri-folder-fill",
          parentId: "administrative",
          isPrivate: true,
          createdBy: "Sarah Johnson",
          updatedBy: "Lisa Anderson",
        },
        {
          id: "amendments",
          name: "Amendments",
          filePath: "administrative/amendments",
          icon: "ri-folder-fill",
          parentId: "administrative",
          isPrivate: true,
          createdBy: "Sarah Johnson",
          updatedBy: "Lisa Anderson",
        },
        {
          id: "association-formation",
          name: "Association Formation Document",
          filePath: "administrative/association-formation",
          icon: "ri-folder-fill",
          parentId: "administrative",
          isPrivate: true,
          createdBy: "Sarah Johnson",
          updatedBy: "Lisa Anderson",
        },
        {
          id: "master-deed",
          name: "Master Deed",
          filePath: "administrative/master-deed",
          icon: "ri-folder-fill",
          parentId: "administrative",
          isPrivate: true,
          createdBy: "Sarah Johnson",
          updatedBy: "Lisa Anderson",
        },
        {
          id: "association-rules",
          name: "Association Rules and Regulations",
          filePath: "administrative/association-rules",
          icon: "ri-folder-fill",
          parentId: "administrative",
          isPrivate: true,
          createdBy: "Sarah Johnson",
          updatedBy: "Lisa Anderson",
        },
        {
          id: "resolutions",
          name: "Resolutions",
          filePath: "administrative/resolutions",
          icon: "ri-folder-fill",
          parentId: "administrative",
          isPrivate: true,
          createdBy: "Sarah Johnson",
          updatedBy: "Lisa Anderson",
        },
        {
          id: "policy",
          name: "Policy",
          filePath: "administrative/policy",
          icon: "ri-folder-fill",
          parentId: "administrative",
          isPrivate: true,
          createdBy: "Sarah Johnson",
          updatedBy: "Lisa Anderson",
        },
      ],
    },
    {
      id: "financial",
      name: "Financial",
      filePath: "financial",
      icon: "ri-folder-fill",
      parentId: null,
      isPrivate: true,
      createdBy: "Emily Davis",
      updatedBy: "Robert Wilson",
      subfolders: [
        {
          id: "audit-fiscal",
          name: "Audit/Fiscal Review",
          filePath: "financial/audit-fiscal",
          icon: "ri-folder-fill",
          parentId: "financial",
          isPrivate: true,
          createdBy: "Emily Davis",
          updatedBy: "Robert Wilson",
        },
        {
          id: "fiscal-budget",
          name: "Fiscal Budget",
          icon: "ri-folder-fill",
          filePath: "financial/fiscal-budget",
          parentId: "financial",
          isPrivate: true,
          createdBy: "Emily Davis",
          updatedBy: "Robert Wilson",
        },
        {
          id: "misc-checks",
          name: "Misc Checks",
          filePath: "financial/misc-checks",
          icon: "ri-folder-fill",
          parentId: "financial",
          isPrivate: true,
          createdBy: "Emily Davis",
          updatedBy: "Robert Wilson",
        },
        {
          id: "monthly-financial",
          name: "Monthly Financial",
          filePath: "financial/monthly-financial",
          icon: "ri-folder-fill",
          parentId: "financial",
          isPrivate: true,
          createdBy: "Emily Davis",
          updatedBy: "Robert Wilson",
        },
        {
          id: "reserve-funds",
          name: "Reserve Funds",
          filePath: "financial/reserve-funds",
          icon: "ri-folder-fill",
          parentId: "financial",
          isPrivate: true,
          createdBy: "Emily Davis",
          updatedBy: "Robert Wilson",
        },
      ],
    },
    {
      id: "forms",
      name: "Forms",
      filePath: "forms",
      icon: "ri-folder-fill",
      parentId: null,
      isPrivate: true,
      createdBy: "Admin",
      updatedBy: "Admin",
      subfolders: [
        {
          id: "arch-documents",
          name: "Arch Documents",
          filePath: "forms/arch-documents",
          icon: "ri-folder-fill",
          parentId: "forms",
          isPrivate: true,
          createdBy: "Admin",
          updatedBy: "Admin",
        },
        {
          id: "insurance",
          name: "Insurance",
          filePath: "forms/insurance",
          icon: "ri-folder-fill",
          parentId: "forms",
          isPrivate: true,
          createdBy: "Admin",
          updatedBy: "Admin",
        },
        {
          id: "lease",
          name: "Lease",
          filePath: "forms/lease",
          icon: "ri-folder-fill",
          parentId: "forms",
          isPrivate: true,
          createdBy: "Admin",
          updatedBy: "Admin",
        },
        {
          id: "profile",
          name: "Profile",
          filePath: "forms/profile",
          icon: "ri-folder-fill",
          parentId: "forms",
          isPrivate: true,
          createdBy: "Admin",
          updatedBy: "Admin",
        },
      ],
    },
  ]);

  const [documents, setDocuments] = useState<HoaDocument[]>([]);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedDocument(null);
  };

  const getDocumentsForFolder = (folderId: string): HoaDocument[] => {
    if (folderId === "all") {
      return documents;
    }
    return documents.filter((doc) => doc.filePath.includes(`/${folderId}`));
  };

  const getAllDocuments = (): HoaDocument[] => {
    return documents;
  };

  const getIcon = (type: "PDF" | "DOC" | "IMG" | "XLS") => {
    switch (type) {
      case "PDF":
        return { icon: "ri-file-pdf-2-fill", color: "text-red-500" };
      case "DOC":
        return { icon: "ri-file-word-2-fill", color: "text-blue-500" };
      case "IMG":
        return { icon: "ri-image-2-fill", color: "text-purple-500" };
      case "XLS":
        return { icon: "ri-file-excel-2-fill", color: "text-green-500" };
      default:
        return { icon: "ri-file-fill", color: "text-gray-500" };
    }
  };

  const getFolderName = (folderId: string): string => {
    if (folderId === "all") return "All Files";
    for (const folder of folders) {
      if (folder.id === folderId) return folder.name;
      if (folder.subfolders) {
        const subfolder = folder.subfolders.find((sf) =>
          folderId.includes(sf.filePath),
        );
        if (subfolder) return subfolder.name;
      }
    }
    return "";
  };

  const handleDocumentClick = (doc: HoaDocument) => {
    setSelectedDocument(doc);
  };

  const handlePrivacyChange = (
    type: "folder" | "document",
    id: string,
    isPrivate: boolean,
    event: React.MouseEvent,
  ) => {
    if (!isPrivate) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setSharePopover({
        isOpen: true,
        type,
        item:
          type === "folder"
            ? getAllFoldersFlat().find((f) => f.id === id)
            : documents.find((d) => d.id === id),
        position: { x: rect.left, y: rect.bottom + 5 },
      });
      setSelectedEmails([]);
      setEmailSearch("");
    } else {
      if (type === "folder") {
        setFolders((prev) =>
          prev.map((folder) => {
            if (folder.id === id) {
              return { ...folder, isPrivate, shareSettings: undefined };
            }
            if (folder.subfolders) {
              return {
                ...folder,
                subfolders: folder.subfolders.map((subfolder) =>
                  subfolder.id === id
                    ? { ...subfolder, isPrivate, shareSettings: undefined }
                    : subfolder,
                ),
              };
            }
            return folder;
          }),
        );
      } else {
        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === id
              ? { ...doc, isPrivate, shareSettings: undefined }
              : doc,
          ),
        );
      }
    }
  };

  const handleShareApi = async (shareType: "everyone" | "specific") => {
    if (!sharePopover.item || sharePopover.type === "folder") return;
    let allUsers: string[] = [];
    let selectedUsers: string[] = [];
    if (unitsData && unitsData.units) {
      allUsers = unitsData.units.map(
        (unit: any) => unit.owners[0].userId || "",
      );
      selectedUsers = unitsData.units
        .filter((unit: any) => selectedEmails.includes(unit.owners[0].emailId))
        .map((unit: any) => unit.owners[0].userId || "");
    }
    try {
      await shareHoaDocument({
        docId: sharePopover.item.id,
        memberIds: shareType === "specific" ? selectedUsers : allUsers,
      }).unwrap();
      dispatch(
        setNotification({
          type: "success",
          message: "Document shared successfully.",
        }),
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error.message || "Error sharing document.",
        }),
      );
    }
  };

  const handleShareSettingsChange = (shareType: "everyone" | "specific") => {
    setShareWithEveryone(shareType === "everyone");
    if (!sharePopover.item) return;

    const shareSettings = {
      shareType,
      specificEmails: shareType === "specific" ? selectedEmails : undefined,
    };

    if (sharePopover.type === "folder") {
      debugger;
      const allUsers =
        unitsData?.units.map((unit: any) => unit.owners[0].userId || "") || [];
      debugger;
      setFolders((prev) =>
        prev.map((folder) => {
          if (folder.id === sharePopover.item.id) {
            return { ...folder, isPrivate: false, shareSettings };
          }
          if (folder.subfolders) {
            return {
              ...folder,
              subfolders: folder.subfolders.map((subfolder) =>
                subfolder.id === sharePopover.item.id
                  ? { ...subfolder, isPrivate: false, shareSettings }
                  : subfolder,
              ),
            };
          }
          return folder;
        }),
      );
    } else {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === sharePopover.item.id
            ? { ...doc, isPrivate: false, shareSettings }
            : doc,
        ),
      );
    }

    setSharePopover({
      isOpen: false,
      type: "folder",
      item: null,
      position: { x: 0, y: 0 },
    });
    setSelectedDocument((prev) =>
      prev
        ? {
            ...prev,
            visibility: "SHARED",
          }
        : null,
    );
    handleShareApi(shareType);
  };

  const deleteFolder = (folderId: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
  };

  const deleteDocument = async (docId: string) => {
    try {
      await deleteHoaDocument(docId).unwrap();
      await handleGetDocuments();
      dispatch(
        setNotification({
          type: "success",
          message: "Document deleted successfully.",
        }),
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error.message || "Error deleting document.",
        }),
      );
    }
  };

  const filteredDocuments = useMemo(() => {
    const docs =
      selectedFolder === "all"
        ? getAllDocuments()
        : getDocumentsForFolder(selectedFolder);
    const sortedDocs = [...docs].reverse();
    return searchTerm === ""
      ? sortedDocs
      : sortedDocs.filter((doc) =>
          doc.title?.toLowerCase().includes(searchTerm.toLowerCase()),
        );
  }, [selectedFolder, searchTerm, documents, documentsData]);

  const getAllFoldersFlat = (): Folder[] => {
    const flatFolders: Folder[] = [];
    folders.forEach((folder) => {
      flatFolders.push(folder);
      if (folder.subfolders) {
        flatFolders.push(...folder.subfolders);
      }
    });
    return flatFolders;
  };

  useEffect(() => {
    const emailSuggestions =
      unitsData?.units.map((unit: any) => unit.owners[0].emailId || "") || [];
    const filtered = emailSuggestions.filter(
      (email: string) =>
        email.toLowerCase().includes(emailSearch.toLowerCase()) &&
        !selectedEmails.includes(email),
    );
    setFilteredEmailSuggestions(filtered);
  }, [unitsData, emailSearch, selectedEmails]);

  const addEmail = (email: string) => {
    if (selectedEmails.length < 10 && !selectedEmails.includes(email)) {
      setSelectedEmails([...selectedEmails, email]);
      setEmailSearch("");
    }
  };

  const removeEmail = (email: string) => {
    setSelectedEmails(selectedEmails.filter((e) => e !== email));
  };

  const handleGetDocuments = async () => {
    const data = await getDocuments(null).unwrap();
    setDocuments(data);
  };

  const handleUploadButtonDisabled = () => {
    const folder = folders.filter((f: Folder) => f.filePath === selectedFolder);
    return (
      selectedFolder === "all" ||
      (folder[0]?.subfolders?.length || 0) > 0 ||
      isUploading
    );
  };

  const handleUploadFiles = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const files = event.target.files;
      if (files && files.length > 0) {
        Array.from(files).forEach(async (file) => {
          const formData = new FormData();
          formData.append("title", file.name);
          formData.append("description", file.name);
          formData.append("docType", file.type);
          formData.append(
            "visibility",
            selectedDocument?.visibility || "PRIVATE",
          );
          formData.append("sharedMembershipIds", selectedEmails.join(","));
          formData.append("file", file);
          formData.append("filePath", selectedFolder);
          await uploadDocument(formData).unwrap();
          await handleGetDocuments();
          dispatch(
            setNotification({
              type: "success",
              message: `File "${file.name}" uploaded successfully.`,
            }),
          );
        });
      }
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error.message || "Error uploading file.",
        }),
      );
    }
  };

  useEffect(() => {
    handleGetDocuments();
    getUnits(null);
  }, []);

  return (
    <DashboardLayout>
      <div className="lg:ml-[260px] bg-white rounded-lg h-[calc(100vh-20px)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg flex-shrink-0">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <i className="ri-notification-3-line text-black text-xl"></i>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
              <div className="text-right">
                <div className="text-base font-semibold text-black">
                  Community Name
                </div>
                <div className="text-sm font-medium text-black">
                  Community Address
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-black"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden bg-[#F9FAFB]">
          {/* Folder Structure - 70% */}
          <div className="w-[70%] border-r border-gray-200 bg-white flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-black">Folders</h3>
                <div className="flex space-x-2">
                  <input
                    type="file"
                    onChange={handleUploadFiles}
                    className="hidden"
                    id="file-upload"
                    disabled={handleUploadButtonDisabled()}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`px-3 py-2 rounded-lg text-base font-semibold transition-colors whitespace-nowrap ${
                      selectedFolder === "all" || handleUploadButtonDisabled()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#1FA372] text-white hover:bg-[#188f5f] transition-colors cursor-pointer"
                    }`}
                  >
                    <i className="ri-upload-line mr-2"></i>
                    Upload Files
                  </label>
                </div>
              </div>

              {/* Table Headers */}
              <div
                className="grid grid-cols-12 gap-4 px-4 py-3 rounded-lg text-base font-bold border"
                style={{ backgroundColor: "#DCDCDC", color: "#000000" }}
              >
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Documents</div>
                <div className="col-span-2">Created By</div>
                <div className="col-span-3">Updated By</div>
                <div className="col-span-2">Privacy</div>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <div className="space-y-1">
                <div
                  onClick={() => setSelectedFolder("all")}
                  className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg cursor-pointer transition-colors border ${
                    selectedFolder === "all"
                      ? "bg-green-50 border-green-200"
                      : "hover:bg-gray-50 border-transparent"
                  }`}
                >
                  <div className="col-span-3 flex items-center space-x-3">
                    <i className="ri-folder-line text-black text-xl"></i>
                    <span className="font-semibold text-black text-base">
                      All Files
                    </span>
                  </div>
                  <div className="col-span-2 text-base font-medium text-black">
                    {documents?.length}
                  </div>
                  <div className="col-span-2 text-base font-medium text-black">
                    -
                  </div>
                  <div className="col-span-3 text-base font-medium text-black">
                    -
                  </div>
                  <div className="col-span-2">-</div>
                </div>

                {folders.map((folder) => (
                  <div key={folder.id}>
                    <div
                      className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg cursor-pointer transition-colors border ${
                        selectedFolder === folder.filePath
                          ? "bg-green-50 border-green-200"
                          : "hover:bg-gray-50 border-transparent"
                      }`}
                    >
                      <div
                        className="col-span-3 flex items-center space-x-3"
                        onClick={() => handleFolderClick(folder.filePath)}
                      >
                        {folder.subfolders && folder.subfolders.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFolder(folder.id);
                            }}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <i
                              className={`${
                                expandedFolders.has(folder.id)
                                  ? "ri-arrow-down-s-line"
                                  : "ri-arrow-right-s-line"
                              } text-black text-lg`}
                            ></i>
                          </button>
                        )}
                        <i className="ri-folder-line text-black text-xl"></i>
                        <span className="font-semibold text-black text-base">
                          {folder.name}
                        </span>
                      </div>
                      <div className="col-span-2 text-base font-medium text-black">
                        {getDocumentsForFolder(folder?.id)?.length}
                      </div>
                      <div className="col-span-2 text-base font-medium text-black">
                        {folder.createdBy}
                      </div>
                      <div className="col-span-3 text-base font-medium text-black">
                        {folder.updatedBy}
                      </div>
                      <div className="col-span-2">
                        <select
                          value={folder.isPrivate ? "private" : "public"}
                          onChange={(e) =>
                            handlePrivacyChange(
                              "folder",
                              folder.id,
                              e.target.value === "private",
                              e as any,
                            )
                          }
                          className="w-full text-sm font-medium text-black border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="private">Private</option>
                          <option value="public">Public</option>
                        </select>
                      </div>
                    </div>

                    {/* Subfolders */}
                    {expandedFolders.has(folder.id) &&
                      folder.subfolders &&
                      folder.subfolders.length > 0 && (
                        <div className="ml-8 space-y-1 mt-1">
                          {folder.subfolders.map((subfolder) => (
                            <div
                              key={subfolder.id}
                              className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg cursor-pointer transition-colors border ${
                                selectedFolder === subfolder.filePath
                                  ? "bg-green-50 border-green-200"
                                  : "hover:bg-gray-50 border-transparent"
                              }`}
                            >
                              <div
                                className="col-span-3 flex items-center space-x-3"
                                onClick={() =>
                                  handleFolderClick(subfolder.filePath)
                                }
                              >
                                <i className="ri-folder-line text-black text-lg"></i>
                                <span className="font-semibold text-black text-base">
                                  {subfolder.name}
                                </span>
                              </div>
                              <div className="col-span-2 text-base font-medium text-black">
                                {getDocumentsForFolder(subfolder.id).length}
                              </div>
                              <div className="col-span-2 text-base font-medium text-black">
                                {subfolder.createdBy}
                              </div>
                              <div className="col-span-3 text-base font-medium text-black">
                                {subfolder.updatedBy}
                              </div>
                              <div className="col-span-2">
                                <select
                                  value={
                                    subfolder.isPrivate ? "private" : "public"
                                  }
                                  onChange={(e) =>
                                    handlePrivacyChange(
                                      "folder",
                                      subfolder.id,
                                      e.target.value === "private",
                                      e as any,
                                    )
                                  }
                                  className="w-full text-sm font-medium text-black border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <option value="private">Private</option>
                                  <option value="public">Public</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Files Display - 30% */}
          <div className="w-[30%] bg-gray-50 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-black">
                    {getFolderName(selectedFolder)}
                  </h3>
                  <p className="text-base font-medium text-black">
                    {filteredDocuments?.length} files
                  </p>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-black"></i>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-folder-open-line text-black text-2xl"></i>
                  </div>
                  <p className="text-base font-medium text-black">
                    No files in this folder
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredDocuments.map((doc) => {
                    const iconData = getIcon(doc.docType as any);
                    const isSelected = selectedDocument?.id === doc.id;
                    return (
                      <div
                        key={doc.id}
                        className={`flex flex-col p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                          isSelected
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white border-gray-200"
                        }`}
                        onClick={() => handleDocumentClick(doc)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <i
                                className={`${iconData.icon} ${iconData.color} text-xl`}
                              ></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-semibold text-black truncate">
                                {doc.title}
                              </h4>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteDocument(doc.id);
                            }}
                            className="p-1 hover:bg-red-100 rounded text-red-400 hover:text-red-600 flex-shrink-0"
                          >
                            <i className="ri-delete-bin-line text-base"></i>
                          </button>
                        </div>

                        <div
                          className="text-sm font-medium text-black space-y-1 mb-2"
                          suppressHydrationWarning={true}
                        >
                          <div>
                            <span className="font-semibold">Created:</span>{" "}
                            {doc.uploadedBy.name}, {doc.uploadedAt}
                          </div>
                          <div>
                            <span className="font-semibold">Updated:</span>{" "}
                            {doc.lastModifiedBy.name}, {doc.lastModifiedAt}
                          </div>
                        </div>

                        <div className="mt-2">
                          <select
                            value={
                              doc.visibility === "SHARED" ? "public" : "private"
                            }
                            onChange={(e) =>
                              handlePrivacyChange(
                                "document",
                                doc.id,
                                e.target.value === "private",
                                e as any,
                              )
                            }
                            className="w-full text-sm font-medium text-black border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Popover */}
      {sharePopover.isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() =>
              setSharePopover({
                isOpen: false,
                type: "folder",
                item: null,
                position: { x: 0, y: 0 },
              })
            }
          ></div>
          <div
            className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80"
            style={{
              left: sharePopover.position.x,
              top: sharePopover.position.y,
            }}
          >
            <div className="mb-4">
              <h4 className="text-base font-bold text-black mb-3">
                Share {sharePopover.type === "folder" ? "Folder" : "Document"}
              </h4>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shareType"
                    value="everyone"
                    onChange={() => handleShareSettingsChange("everyone")}
                    className="mr-2"
                  />
                  <span className="text-base font-medium text-black">
                    Share with everyone
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shareType"
                    value="specific"
                    className="mr-2"
                    onChange={() => setShareWithEveryone(false)}
                  />
                  <span className="text-base font-medium text-black">
                    Share with specific people
                  </span>
                </label>

                <div className="mt-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search emails..."
                      disabled={shareWithEveryone}
                      value={emailSearch}
                      onChange={(e) => setEmailSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {emailSearch && filteredEmailSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-32 overflow-y-auto z-10">
                        {filteredEmailSuggestions
                          .slice(0, 5)
                          .map((email: string) => (
                            <button
                              key={email}
                              onClick={() => addEmail(email)}
                              className="w-full px-3 py-2 text-left text-base font-medium text-black hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            >
                              {email}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>

                  {selectedEmails.length > 0 && (
                    <div className="mt-2 space-y-1 max-h-24 overflow-y-auto">
                      {selectedEmails.map((email) => (
                        <div
                          key={email}
                          className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded text-sm font-medium text-black"
                        >
                          <span>{email}</span>
                          <button
                            onClick={() => removeEmail(email)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm font-medium text-black mt-1">
                    {selectedEmails.length}/10 emails selected
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() =>
                      setSharePopover({
                        isOpen: false,
                        type: "folder",
                        item: null,
                        position: { x: 0, y: 0 },
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 text-black font-semibold rounded-lg hover:bg-gray-50 text-base whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleShareSettingsChange("specific")}
                    className="flex-1 px-3 py-2 bg-[#1FA372] text-white font-semibold rounded-lg hover:bg-[#188f5f] transition-colors text-base whitespace-nowrap"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
