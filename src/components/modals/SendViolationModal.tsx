"use client";

import { useEffect, useState } from "react";
import {
  useLazyGetViolationDefaultsQuery,
  useLazyGetUsersQuery,
  useCreateViolationMutation,
} from "@/src/services";
import { violationIcons } from "@/src/helpers";
import ViolationPDFPreviewModal from "./ViolationPDFPreviewModal";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setNotification } from "@/src/reducer/hoa-notificatio.reducer";

interface SendViolationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SendViolationModal({
  isOpen,
  onClose,
}: SendViolationModalProps) {
  const dispatch = useAppDispatch();
  const { user: hoaUser } = useAppSelector((state) => state.hoaUser);
  const [
    getViolationDefaults,
    { data: defaultViolationsData, isLoading: isLoadingViolationsDefaults },
  ] = useLazyGetViolationDefaultsQuery();
  const [getUsers, { data: usersData, isLoading: isLoadingUsers }] =
    useLazyGetUsersQuery();
  const [createViolation, { isSuccess: createViolationSuccess }] =
    useCreateViolationMutation();

  const [selectedViolation, setSelectedViolation] =
    useState<ViolationType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [violationContent, setViolationContent] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [timeObserved, setTimeObserved] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [description, setDescription] = useState(
    "Date Observed: mm/dd/yyyy\nDescription: "
  );
  const [vehicleDescription, setVehicleDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [dateObserved, setDateObserved] = useState("");

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user);
    setUserSearchTerm(`${user.firstName} ${user.lastName} - ${user.address1}`);
    setShowUserDropdown(false);
  };

  const handleSendViolation = async () => {
    if (!selectedUser || !selectedViolation) {
      return;
    }

    const requestData: any = {
      unitId: selectedUser.unitId,
      membershipId: selectedUser.membershipId,
      type: selectedViolation?.violationType || "",
      dynamicValues: {
        date: dateObserved,
        description: violationContent,
        violationPicture:
          uploadedImages.map((img) => URL.createObjectURL(img))[0] || "",
        vehicleDescription: vehicleDescription,
        licensePlate: licensePlate,
      },
    };

    try {
      await createViolation(requestData);

      dispatch(
        setNotification({
          type: "success",
          message: `Violation notice sent to ${selectedUser.firstName} ${selectedUser.lastName} (${selectedUser.address1}) for ${selectedViolation?.violationType}`,
        })
      );

      handleResetForm();
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: "Failed to create violation: Membership not found",
        })
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReviewClick = () => {
    setShowPDFPreview(true);
  };

  const handleConfirmPDF = () => {
    setIsConfirmed(true);
    setShowPDFPreview(false);
  };

  const getPDFFormData = () => {
    let dateObs = "";
    const dateMatch = description.match(
      /Date Observed:\s*(\d{2}\/\d{2}\/\d{4})/
    );
    if (dateMatch) {
      dateObs = dateMatch[1];
    }

    const descMatch = description.match(/Description:\s*(.+)/);
    const descText = descMatch ? descMatch[1].trim() : "";

    return {
      communityName: hoaUser.memberships[0]?.communityName || "",
      date: new Date().toLocaleDateString(),
      propertyAddress:
        selectedUser?.address1 + " " + selectedUser?.address2 || "",
      homeownerName:
        selectedUser?.firstName + " " + selectedUser?.lastName || "",
      violationType: selectedViolation?.violationType || "",
      description: descText,
      ccrsSection: "",
      dateObserved: dateObs,
      timeObserved: timeObserved,
      reportedBy: "",
      evidence: uploadedImages,
    };
  };

  const handleGetViolationDefaults = async () => {
    try {
      await getViolationDefaults(null);
    } catch (error: any) {
      setNotification({
        type: "error",
        message: error.data?.message || error.message,
      });
    }
  };

  const handleGetUsers = async (searchTerm: string) => {
    await getUsers(searchTerm);
  };

  const handleResetForm = () => {
    onClose();
    setSelectedUser(null);
    setSelectedViolation(null);
    setViolationContent("");
    setUserSearchTerm("");
    setShowUserDropdown(false);
    setUploadedImages([]);
    setTimeObserved("");
    setDescription("Date Observed: mm/dd/yyyy\nDescription: ");
    setDateObserved("");
    setVehicleDescription("");
    setLicensePlate("");
  };

  useEffect(() => {
    if (isOpen) handleGetViolationDefaults();
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 2) {
      handleGetUsers(searchTerm);
    }
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Send Violation Notice
            </h3>
            <button
              onClick={() => handleResetForm()}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            <div className="w-[30%] border-r border-gray-200 p-6 bg-gray-50 overflow-auto">
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    value={userSearchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setUserSearchTerm(e.target.value);
                      setShowUserDropdown(true);
                      if (!e.target.value) {
                        setSelectedUser(null);
                      }
                    }}
                    onFocus={() => setShowUserDropdown(true)}
                    placeholder="Owner name and address"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent"
                  />

                  {showUserDropdown &&
                    userSearchTerm &&
                    usersData?.results?.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {usersData.results.map((user: UserType) => (
                          <button
                            key={user.userId}
                            onClick={() => handleUserSelect(user)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                          >
                            <div className="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-600">
                              {user.address1} {user.address2}• {user.emailId}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Select violation type
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {defaultViolationsData &&
                    defaultViolationsData.violationDefaults.map((violation) => (
                      <button
                        key={violation.id}
                        onClick={() => setSelectedViolation(violation)}
                        disabled={!selectedUser}
                        className={`p-2 rounded-lg border-2 transition-all text-left flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                          !selectedUser
                            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                            : selectedViolation?.violationType === violation.id
                            ? "border-[#1FA372] bg-[#1FA372]/10"
                            : "border-gray-200 bg-white hover:border-[#1FA372] hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-xl">
                          {
                            violationIcons[
                              violation.violationType.toLowerCase()
                            ]
                          }
                        </div>
                        <div
                          className={`text-xs font-medium text-center break-all ${
                            !selectedUser ? "text-gray-400" : "text-gray-900"
                          }`}
                        >
                          {violation.violationType}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="w-[70%] p-6 overflow-y-auto">
              {selectedViolation ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Violation Details
                    </h4>
                    <div className="text-sm">
                      <span className="text-gray-500">Type of violation: </span>
                      <span className="font-medium text-black">
                        {selectedViolation.violationType}
                      </span>
                    </div>
                  </div>

                  <div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA372] resize-none"
                      style={{ height: "400px" }}
                    />
                  </div>

                  {selectedViolation.id ===
                    "b3f9b679-fe07-4534-83e9-1a50b14085fb" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vehicle Description (Make/Model/Color)
                        </label>
                        <input
                          type="text"
                          value={vehicleDescription}
                          onChange={(e) =>
                            setVehicleDescription(e.target.value)
                          }
                          placeholder="e.g., Red Honda Civic 2020"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA372]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          License Plate Number
                        </label>
                        <input
                          type="text"
                          value={licensePlate}
                          onChange={(e) => setLicensePlate(e.target.value)}
                          placeholder="e.g., ABC-1234"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA372]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments / Evidence Photos{" "}
                      <label
                        htmlFor="image-upload"
                        className="text-[#1FA372] cursor-pointer hover:underline"
                      >
                        Upload Attachment
                      </label>
                    </label>

                    <input
                      type="file"
                      id="image-upload"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {uploadedImages.length > 0 && (
                      <div className="mt-3 grid grid-cols-4 gap-3">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <i className="ri-close-line text-sm"></i>
                            </button>
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {image.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => {
                        alert("Saved for later");
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Save for later
                    </button>
                    <button
                      onClick={handleReviewClick}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Review
                    </button>
                    <button
                      onClick={handleSendViolation}
                      disabled={!isConfirmed}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        isConfirmed
                          ? "bg-[#1FA372] text-white hover:bg-[#188f5f] cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <i className="ri-file-list-3-line text-5xl mb-3"></i>
                    <p className="text-sm">
                      Select an address and violation type to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ViolationPDFPreviewModal
        isOpen={showPDFPreview}
        onClose={() => setShowPDFPreview(false)}
        onConfirm={handleConfirmPDF}
        formData={getPDFFormData()}
      />
    </>
  );
}
