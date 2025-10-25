"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileText,
  Download,
  Edit,
  Star,
  Upload,
  Users,
  X,
  UserPlus,
  Shield,
  Eye,
  Trash2,
  Clock,
  TrendingUp,
  Image as ImageIcon,
  File as FileIcon,
} from "lucide-react";
import { documentAssignmentApi, usersApi } from "@/lib/api";
import type {
  DocumentAssignment,
  DocumentAccessType,
  DocumentAssignmentStats,
} from "@/types";
import { getInitials } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: Date;
  uploadedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  folder: string;
  tags: string[];
  isStarred: boolean;
  description?: string;
}

interface ViewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
}

export function ViewDocumentModal({
  isOpen,
  onClose,
  document,
}: ViewDocumentModalProps) {
  if (!document) return null;

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "docx":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "xlsx":
        return <FileText className="h-8 w-8 text-green-500" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <FileText className="h-8 w-8 text-purple-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Document Details" size="lg">
      <div className="space-y-6">
        {/* Document Header */}
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
            {getFileIcon(document.type)}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[#111827]">
              {document.name}
            </h3>
            <p className="text-[#6B7280]">
              {document.type.toUpperCase()} • {document.size}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline">{document.folder}</Badge>
              {document.isStarred && (
                <Badge
                  variant="default"
                  className="bg-yellow-100 text-yellow-800"
                >
                  <Star className="h-3 w-3 mr-1" />
                  Starred
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Document Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[#111827] mb-3">
              Document Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Name:</span>
                <span className="text-sm font-medium text-[#111827]">
                  {document.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Type:</span>
                <span className="text-sm font-medium text-[#111827]">
                  {document.type.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Size:</span>
                <span className="text-sm font-medium text-[#111827]">
                  {document.size}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Folder:</span>
                <span className="text-sm font-medium text-[#111827]">
                  {document.folder}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-[#111827] mb-3">Upload Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Uploaded:</span>
                <span className="text-sm font-medium text-[#111827]">
                  {document.uploadDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">By:</span>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={document.uploadedBy.avatar} />
                    <AvatarFallback className="text-xs">
                      {document.uploadedBy.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-[#111827]">
                    {document.uploadedBy.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {document.tags.length > 0 && (
          <div>
            <h4 className="font-medium text-[#111827] mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {document.description && (
          <div>
            <h4 className="font-medium text-[#111827] mb-3">Description</h4>
            <p className="text-sm text-[#6B7280]">{document.description}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface EditDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
  onSave: (documentData: Partial<Document>) => void;
}

export function EditDocumentModal({
  isOpen,
  onClose,
  document,
  onSave,
}: EditDocumentModalProps) {
  const [formData, setFormData] = useState({
    name: document?.name || "",
    folder: document?.folder || "",
    tags: document?.tags.join(", ") || "",
    description: document?.description || "",
    isStarred: document?.isStarred || false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave({
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Document" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Document name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Folder
          </label>
          <Select
            value={formData.folder}
            onChange={(e) =>
              setFormData({ ...formData, folder: e.target.value })
            }
          >
            <option value="Documents">Documents</option>
            <option value="Proposals">Proposals</option>
            <option value="Contracts">Contracts</option>
            <option value="Templates">Templates</option>
            <option value="Images">Images</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <Input
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="tag1, tag2, tag3"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate tags with commas
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Document description..."
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isStarred"
            checked={formData.isStarred}
            onChange={(e) =>
              setFormData({ ...formData, isStarred: e.target.checked })
            }
            className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB] border-[#D1D5DB] rounded"
          />
          <label htmlFor="isStarred" className="text-sm text-gray-700">
            Star this document
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpload: (fileData: any) => Promise<any>;
  availableUsers?: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }>;
}

export function UploadDocumentModal({
  isOpen,
  onClose,
  onUpload,
  availableUsers = [],
}: UploadDocumentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    folder: "Documents",
    tags: "",
    description: "",
    isStarred: false,
  });
  
  // Fetch users from API
  const [users, setUsers] = useState(availableUsers);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [assignUsers, setAssignUsers] = useState<
    Array<{ userId: string; accessType: DocumentAccessType }>
  >([]);
  const [showAssignSection, setShowAssignSection] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedAccessType, setSelectedAccessType] =
    useState<DocumentAccessType>("READ_ONLY");
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const ALLOWED_TYPES = {
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "application/vnd.ms-excel": ".xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      ".xlsx",
    "application/vnd.ms-powerpoint": ".ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      ".pptx",
    "text/plain": ".txt",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds ${formatFileSize(
        MAX_FILE_SIZE
      )} limit. Your file is ${formatFileSize(file.size)}.`;
    }

    // Check file type
    if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
      return "File type not supported. Please upload PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, or image files.";
    }

    return null;
  };

  const generatePreview = (file: File) => {
    // Generate preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For non-images, show file icon based on type
      setFilePreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setError(null);

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

      setSelectedFile(file);
    setFormData({ ...formData, name: file.name });
    generatePreview(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAddAssignment = () => {
    if (!selectedUserId) return;

    // Check if user already assigned
    if (assignUsers.some((a) => a.userId === selectedUserId)) {
      setError("User already assigned to this document");
      return;
    }

    setAssignUsers([
      ...assignUsers,
      { userId: selectedUserId, accessType: selectedAccessType },
    ]);
    setSelectedUserId("");
    setSelectedAccessType("READ_ONLY");
  };

  const handleRemoveAssignment = (userId: string) => {
    setAssignUsers(assignUsers.filter((a) => a.userId !== userId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    let progressInterval: NodeJS.Timeout | null = null;

    try {
      // Simulate upload progress
      progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            if (progressInterval) clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Prepare FormData for upload (matching API spec)
      const uploadData = new FormData();
      uploadData.append("document", selectedFile); // API expects 'document' not 'file'

      // Add description if provided
      if (formData.description) {
        uploadData.append("description", formData.description);
      }

      // Optional: Add relatedType and relatedId if needed
      // uploadData.append('relatedType', 'deal');
      // uploadData.append('relatedId', 'deal_123');

      // Call the upload callback
      console.log("📤 Starting document upload...");
      setUploadStatus("Uploading document...");
      const response = await onUpload(uploadData);

      console.log("✅ Full response received:", response);

      // Handle different response structures
      const uploadedDoc = response?.body?.data || response?.body?.result;
      const documentId = uploadedDoc?.id;

      console.log("✅ Document uploaded successfully:", uploadedDoc);
      setUploadStatus("Document uploaded successfully!");

      // After successful upload, assign users if any
      if (assignUsers.length > 0) {
        console.log(
          `👥 Assigning ${assignUsers.length} user(s) to document...`,
          assignUsers
        );
        setUploadStatus(`Assigning ${assignUsers.length} user(s)...`);

        if (documentId) {
          try {
            console.log(
              "📤 Calling assignment API with document ID:",
              documentId
            );
            const assignResponse = await documentAssignmentApi.assignUsers(
              documentId,
              assignUsers
            );
            console.log("✅ Users assigned successfully:", assignResponse);
            setUploadStatus(
              `✅ Document uploaded and ${assignUsers.length} user(s) assigned!`
            );
            setError(null); // Clear any previous errors
          } catch (assignError: any) {
            console.error("❌ Failed to assign users:", assignError);
            setUploadStatus("Document uploaded (assignment failed)");
            setError(
              `Document uploaded but failed to assign users: ${
                assignError.message || "Unknown error"
              }`
            );
            // Don't fail the whole upload, continue to show success for document upload
          }
        } else {
          console.error("❌ No document ID in response:", response);
          setUploadStatus("Document uploaded (no ID returned)");
          setError("Document uploaded but ID not found. Cannot assign users.");
        }
      } else {
        setUploadStatus("✅ Document uploaded successfully!");
      }

      setUploadProgress(100);

      // Clear interval and show success message before closing
      if (progressInterval) clearInterval(progressInterval);

      // Only close if no errors
      setTimeout(() => {
        if (!error || assignUsers.length === 0) {
      setIsLoading(false);
      onClose();
          resetForm();
        } else {
          setIsLoading(false);
          // Keep modal open so user can see the error
        }
      }, 1000);
    } catch (err: any) {
      if (progressInterval) clearInterval(progressInterval);
      const errorMessage = err?.message || "Upload failed. Please try again.";
      console.error("❌ Upload error:", err);
      setError(errorMessage);
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
      setFormData({
      name: "",
      folder: "Documents",
      tags: "",
      description: "",
      isStarred: false,
      });
      setSelectedFile(null);
    setFilePreview(null);
    setUploadProgress(0);
    setAssignUsers([]);
    setShowAssignSection(false);
    setSelectedUserId("");
    setError(null);
    setUploadStatus("");
  };

  const getFileIcon = () => {
    if (!selectedFile) return <Upload className="h-12 w-12 text-gray-400" />;

    const type = selectedFile.type;
    if (type.includes("pdf"))
      return <FileText className="h-12 w-12 text-red-500" />;
    if (type.includes("word"))
      return <FileText className="h-12 w-12 text-blue-500" />;
    if (type.includes("sheet") || type.includes("excel"))
      return <FileText className="h-12 w-12 text-green-500" />;
    if (type.includes("image"))
      return <ImageIcon className="h-12 w-12 text-purple-500" />;
    return <FileIcon className="h-12 w-12 text-gray-500" />;
  };

  const assignedUserIds = new Set(assignUsers.map((a) => a.userId));
  const availableToAssign = users.filter(
    (u) => !assignedUserIds.has(u.id)
  );

  // Fetch users from API when modal opens
  useEffect(() => {
    if (isOpen && users.length === 0) {
      const fetchUsers = async () => {
        try {
          setIsLoadingUsers(true);
          console.log('📥 Fetching assignable users...');
          const response = await usersApi.getAssignableUsers(100);
          console.log('✅ Users fetched:', response);
          
          // Handle nested response structure: result.data
          const usersData = response?.result || [];
          console.log(`✅ Loaded ${usersData.length} users`);
          setUsers(usersData);
        } catch (error) {
          console.error('❌ Error fetching users:', error);
          // Fallback to availableUsers prop if API fails
          setUsers(availableUsers);
        } finally {
          setIsLoadingUsers(false);
        }
      };
      fetchUsers();
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Document" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* File Upload Area with Drag & Drop */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File *{" "}
            <span className="text-xs text-gray-500">
              (Max: {formatFileSize(MAX_FILE_SIZE)})
            </span>
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-3">
                {/* File Preview/Icon */}
                <div className="flex items-center justify-center">
                  {filePreview ? (
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="max-h-32 max-w-full rounded-lg object-contain"
                    />
                  ) : (
                    getFileIcon()
                  )}
                </div>

                {/* File Info */}
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate px-4">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(selectedFile.size)} •{" "}
                    {selectedFile.type.split("/")[1].toUpperCase()}
                  </p>
                </div>

                {/* Change File Button */}
                <div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload-change"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.webp"
                  />
                  <label htmlFor="file-upload-change">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("file-upload-change")?.click()
                      }
                    >
                      Change File
                    </Button>
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.webp"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-sm text-gray-600">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </div>
            </label>
                <p className="text-xs text-gray-500 mt-2">
                  PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, Images
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Maximum file size: {formatFileSize(MAX_FILE_SIZE)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {isLoading && uploadProgress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {uploadStatus || "Uploading..."}
              </span>
              <span className="text-blue-600 font-medium">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Success Status Message */}
        {!isLoading && uploadStatus && uploadStatus.includes("✅") && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <p className="text-sm font-medium">{uploadStatus}</p>
          </div>
        )}

        {/* Document Name - Auto-filled from filename */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Name{" "}
            <span className="text-xs text-gray-500">(from filename)</span>
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Will be set from uploaded file"
            disabled
            className="bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* Description - Supported by API */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description{" "}
            <span className="text-xs text-green-600">(Supported)</span>
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Add a description for this document..."
            rows={3}
          />
        </div>

        {/* Note about future features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <span className="font-medium">📌 Note:</span> Folder organization,
            tags, and starring features will be available in a future update.
          </p>
        </div>

        {/* Assign Users Section */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Assign Users (Optional)
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Grant access to specific users upon upload
              </p>
            </div>
            {!showAssignSection && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAssignSection(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Users
              </Button>
            )}
          </div>

          {showAssignSection && (
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              {/* Add Assignment Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
          <Select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    disabled={availableToAssign.length === 0}
                  >
                    <option value="">Select user...</option>
                    {availableToAssign.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
          </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    value={selectedAccessType}
                    onChange={(e) =>
                      setSelectedAccessType(
                        e.target.value as DocumentAccessType
                      )
                    }
                    className="flex-1"
                  >
                    <option value="READ_ONLY">Read Only</option>
                    <option value="EDIT">Edit</option>
                  </Select>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddAssignment}
                    disabled={!selectedUserId}
                  >
                    Add
                  </Button>
                </div>
        </div>

              {/* Assigned Users List */}
              {assignUsers.length > 0 && (
                <div className="space-y-2 mt-3">
                  <p className="text-xs font-medium text-gray-700">
                    Assigned Users ({assignUsers.length}):
                  </p>
                  {assignUsers.map((assignment) => {
                    const user = users.find(
                      (u) => u.id === assignment.userId
                    );
                    if (!user) return null;

                    return (
                      <div
                        key={assignment.userId}
                        className="flex items-center justify-between bg-white rounded-lg p-2 border border-gray-200"
                      >
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
        <div>
                            <p className="text-xs font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`text-xs ${
                              assignment.accessType === "EDIT"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {assignment.accessType === "EDIT" ? (
                              <>
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </>
                            ) : (
                              <>
                                <Eye className="h-3 w-3 mr-1" />
                                Read Only
                              </>
                            )}
                          </Badge>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveAssignment(assignment.userId)
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAssignSection(false)}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Close Assignment Section
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-xs text-gray-500">
            {selectedFile && (
              <span>
                Ready to upload •{" "}
                {assignUsers.length > 0 &&
                  `${assignUsers.length} user(s) assigned`}
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !selectedFile}>
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

interface ManageAssignmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: { id: string; name: string } | null;
  availableUsers?: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    department?: string;
  }>;
}

export function ManageAssignmentsModal({
  isOpen,
  onClose,
  document,
  availableUsers = [],
}: ManageAssignmentsModalProps) {
  const [assignments, setAssignments] = useState<DocumentAssignment[]>([]);
  const [stats, setStats] = useState<DocumentAssignmentStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedAccessType, setSelectedAccessType] =
    useState<DocumentAccessType>("READ_ONLY");
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  
  // Fetch users from API
  const [users, setUsers] = useState(availableUsers);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Fetch users from API when modal opens
  useEffect(() => {
    if (isOpen && users.length === 0) {
      const fetchUsers = async () => {
        try {
          setIsLoadingUsers(true);
          console.log('📥 Fetching assignable users for assignments...');
          const response = await usersApi.getAssignableUsers(100);
          console.log('✅ Users fetched:', response);
          
          // Handle nested response structure: result.data
          const usersData = response?.result?.data || [];
          console.log(`✅ Loaded ${usersData.length} users for assignments`);
          setUsers(usersData);
        } catch (error) {
          console.error('❌ Error fetching users:', error);
          // Fallback to availableUsers prop if API fails
          setUsers(availableUsers);
        } finally {
          setIsLoadingUsers(false);
        }
      };
      fetchUsers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && document) {
      loadAssignments();
      loadStats();
    }
  }, [isOpen, document, showHistory]);

  const loadAssignments = async () => {
    if (!document) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await documentAssignmentApi.getAssignments(
        document.id,
        showHistory
      );
      setAssignments(response.data);
    } catch (err) {
      setError("Failed to load assignments. Please try again.");
      console.error("Error loading assignments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    if (!document) return;

    try {
      const response = await documentAssignmentApi.getStats(document.id);
      setStats(response.data);
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const handleAssignUser = async () => {
    if (!document || !selectedUserId) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await documentAssignmentApi.assignUsers(document.id, [
        { userId: selectedUserId, accessType: selectedAccessType },
      ]);
      setSuccessMessage("User assigned successfully!");
      setShowAddUser(false);
      setSelectedUserId("");
      setSelectedAccessType("READ_ONLY");
      await loadAssignments();
      await loadStats();
    } catch (err) {
      setError("Failed to assign user. Please try again.");
      console.error("Error assigning user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAssignment = async (userId: string) => {
    if (!document) return;

    if (!confirm("Are you sure you want to remove this user's access?")) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await documentAssignmentApi.removeAssignment(document.id, userId);
      setSuccessMessage("User access removed successfully!");
      await loadAssignments();
      await loadStats();
    } catch (err) {
      setError("Failed to remove assignment. Please try again.");
      console.error("Error removing assignment:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAccess = async (
    userId: string,
    newAccessType: DocumentAccessType
  ) => {
    if (!document) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await documentAssignmentApi.updateAccessType(
        document.id,
        userId,
        newAccessType
      );
      setSuccessMessage("Access type updated successfully!");
      await loadAssignments();
      await loadStats();
    } catch (err) {
      setError("Failed to update access. Please try again.");
      console.error("Error updating access:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAccessBadgeColor = (accessType: DocumentAccessType) => {
    return accessType === "EDIT"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";
  };

  // Filter users who are not already assigned (or are inactive)
  const activeUserIds =
    assignments?.length > 0
      ? new Set(assignments.filter((a) => a.isActive).map((a) => a.userId))
      : new Set();
  const availableUsersToAssign = users.filter(
    (user) => !activeUserIds.has(user.id)
  );

  // Filter assignments based on search
  const filteredAssignments = assignments?.filter(
    (assignment) =>
      assignment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!document) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Access - ${document.name}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center justify-between">
            <span className="text-sm">{successMessage}</span>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-600 hover:text-green-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-blue-600">Total</span>
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-green-600">Active</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-900">
                {stats.active}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Removed</span>
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.removed}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Read Only</span>
                <Eye className="h-4 w-4 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.readOnly}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-blue-600">Edit</span>
                <Edit className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-900">{stats.edit}</p>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 gap-3">
          <div className="flex items-center space-x-2">
            {!showAddUser && (
              <Button
                onClick={() => setShowAddUser(true)}
                size="sm"
                disabled={availableUsersToAssign.length === 0}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Assign User
              </Button>
            )}
            <Button
              onClick={() => setShowHistory(!showHistory)}
              variant="outline"
              size="sm"
            >
              <Clock className="h-4 w-4 mr-2" />
              {showHistory ? "Hide History" : "Show History"}
            </Button>
          </div>
          <div className="relative flex-1 sm:max-w-xs">
          <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Add User Form */}
        {showAddUser && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-900">Assign New User</h4>
              <button
                onClick={() => {
                  setShowAddUser(false);
                  setSelectedUserId("");
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select User
          </label>
                <Select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  required
                >
                  <option value="">Select a user...</option>
                  {availableUsersToAssign.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </Select>
        </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Type
                </label>
                <Select
                  value={selectedAccessType}
                  onChange={(e) =>
                    setSelectedAccessType(e.target.value as DocumentAccessType)
                  }
                >
                  <option value="READ_ONLY">Read Only</option>
                  <option value="EDIT">Edit</option>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleAssignUser}
                size="sm"
                disabled={!selectedUserId || isLoading}
              >
                {isLoading ? "Assigning..." : "Assign User"}
              </Button>
            </div>
          </div>
        )}

        {/* Assignments List */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">
            {showHistory ? "Assignment History" : "Current Assignments"} (
            {filteredAssignments?.length})
          </h4>

          {isLoading && assignments?.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">
                Loading assignments...
              </p>
            </div>
          ) : filteredAssignments?.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {searchTerm
                  ? "No users found matching your search"
                  : "No assignments yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredAssignments?.map((assignment) => (
                <div
                  key={assignment.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    assignment.isActive
                      ? "bg-white border-gray-200"
                      : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={assignment.user.avatar} />
                      <AvatarFallback>
                        {getInitials(assignment.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
        <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">
                          {assignment.user.name}
                        </p>
                        {!assignment.isActive && (
                          <Badge variant="secondary" className="text-xs">
                            Removed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {assignment.user.email}
                      </p>
                      {assignment.user.department && (
                        <p className="text-xs text-gray-500">
                          {assignment.user.department}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-gray-500">
                          Assigned by {assignment.assignedByUser.name}
                        </p>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-gray-500">
                          {new Date(assignment.assignedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {!assignment.isActive && assignment.removedAt && (
                        <p className="text-xs text-red-600 mt-1">
                          Removed by{" "}
                          {assignment.removedByUser?.name || "Unknown"} on{" "}
                          {new Date(assignment.removedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {assignment.isActive ? (
                      <>
                        <Select
                          value={assignment.accessType}
                          onChange={(e) =>
                            handleUpdateAccess(
                              assignment.userId,
                              e.target.value as DocumentAccessType
                            )
                          }
                          className="text-sm"
                          disabled={isLoading}
                        >
                          <option value="READ_ONLY">Read Only</option>
                          <option value="EDIT">Edit</option>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleRemoveAssignment(assignment.userId)
                          }
                          disabled={isLoading}
                          title="Remove access"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </>
                    ) : (
                      <Badge
                        className={getAccessBadgeColor(assignment.accessType)}
                      >
                        {assignment.accessType === "EDIT" ? (
                          <>
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3 mr-1" />
                            Read Only
                          </>
                        )}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            <Shield className="h-4 w-4 inline mr-1" />
            Access is logged and audited
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
