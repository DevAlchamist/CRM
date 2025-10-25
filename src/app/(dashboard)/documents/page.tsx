'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewDocumentModal, EditDocumentModal, UploadDocumentModal, ManageAssignmentsModal } from '@/components/forms/document-modals';
import { 
  Search, 
  Filter, 
  Grid, 
  List,
  FileText,
  Image,
  File,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  Folder,
  Star,
  Share2,
  Plus,
  Users,
  Shield
} from 'lucide-react';
import { demoUsers } from '@/data/demo';
import { getInitials, formatDate } from '@/lib/utils';
import { documentApi, documentAssignmentApi, documentActivityApi } from '@/lib/api';

export default function DocumentsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [documentsList, setDocumentsList] = useState<any[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);
  const [documentsError, setDocumentsError] = useState<string | null>(null);
  const [documentAssignments, setDocumentAssignments] = useState<Record<string, number>>({});
  const [assignedToMeDocs, setAssignedToMeDocs] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('All Files');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  // Modal state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewDocumentModal, setViewDocumentModal] = useState(false);
  const [editDocumentModal, setEditDocumentModal] = useState(false);
  const [uploadDocumentModal, setUploadDocumentModal] = useState(false);
  const [manageAccessModal, setManageAccessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch documents from API
  const fetchDocuments = async () => {
    try {
      setIsLoadingDocuments(true);
      setDocumentsError(null);
      
      console.log('📥 Fetching documents from API...');
      const response = await documentApi.getAll();
      
      console.log('✅ Documents fetched:', response);
      
      // Handle nested response structure: result.data
      const docs = response?.result?.data || [];
      const pagination = response?.result?.pagination;
      
      console.log(`📊 Found ${docs.length} documents (Total: ${pagination?.total || docs.length})`);
      
      // Map API response to component format
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedDocs = docs.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        type: getFileExtension(doc.mimeType || doc.name),
        size: formatFileSize(doc.size),
        uploadDate: new Date(doc.createdAt),
        uploadedBy: doc.uploader || {
          id: doc.uploadedBy || 'unknown',
          name: doc.uploader?.name || 'Unknown User',
          avatar: doc.uploader?.avatar,
        },
        folder: doc.folder || 'Documents',
        tags: doc.tags || [],
        isStarred: doc.isStarred || false,
        description: doc.description,
        url: doc.externalUrl || doc.url,
      }));
      
      setDocumentsList(mappedDocs);
      console.log(`✅ Loaded ${mappedDocs.length} documents successfully`);
      
      if (pagination) {
        console.log(`📄 Page ${pagination.page} of ${pagination.pages} (${pagination.total} total)`);
      }
      
      // Fetch assignments for all documents
      if (mappedDocs.length > 0) {
        console.log('📥 Fetching assignments for all documents...');
        await fetchAllAssignments(mappedDocs);
      }
      
    } catch (error) {
      console.error('❌ Error fetching documents:', error);
      setDocumentsError('Failed to load documents. Please try again.');
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  // Helper functions
  const formatFileSize = (bytes: number): string => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileExtension = (mimeTypeOrFilename: string): string => {
    if (!mimeTypeOrFilename) return 'file';
    
    // If it's a filename with extension
    if (mimeTypeOrFilename.includes('.')) {
      const parts = mimeTypeOrFilename.split('.');
      return parts[parts.length - 1].toLowerCase();
    }
    
    // If it's a mime type
    const mimeMap: Record<string, string> = {
      'application/pdf': 'pdf',
      'application/msword': 'docx',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'text/plain': 'txt',
    };
    
    return mimeMap[mimeTypeOrFilename] || 'file';
  };

  // Fetch document assignments count
  const fetchDocumentAssignments = async (documentId: string) => {
    try {
      const response = await documentAssignmentApi.getAssignments(documentId, false);
      return response.data?.length || 0;
    } catch (error) {
      console.error(`❌ Error fetching assignments for document ${documentId}:`, error);
      return 0;
    }
  };

  // Fetch all assignments for all documents
  const fetchAllAssignments = async (docs: any[]) => {
    const assignmentsMap: Record<string, number> = {};
    
    // Fetch assignments for each document in parallel
    const assignmentPromises = docs.map(async (doc) => {
      const count = await fetchDocumentAssignments(doc.id);
      assignmentsMap[doc.id] = count;
    });
    
    await Promise.all(assignmentPromises);
    setDocumentAssignments(assignmentsMap);
  };

  // Fetch documents assigned to current user
  const fetchAssignedToMe = async () => {
    try {
      console.log('📥 Fetching documents assigned to me...');
      const response = await documentAssignmentApi.getMyAssignedDocuments(false);
      
      console.log('✅ Assigned documents:', response);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedDocs = (response.data || []).map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        type: getFileExtension(doc.mimeType || doc.name),
        size: formatFileSize(doc.size),
        uploadDate: new Date(doc.createdAt),
        uploadedBy: doc.uploader || {
          id: doc.uploadedBy || 'unknown',
          name: doc.uploader?.name || 'Unknown User',
          avatar: doc.uploader?.avatar,
        },
        folder: doc.folder || 'Documents',
        tags: doc.tags || [],
        isStarred: doc.isStarred || false,
        description: doc.description,
        url: doc.externalUrl || doc.url,
        assignment: doc.assignment, // Include assignment info
      }));
      
      setAssignedToMeDocs(mappedDocs);
      console.log(`✅ Loaded ${mappedDocs.length} assigned documents`);
    } catch (error) {
      console.error('❌ Error fetching assigned documents:', error);
    }
  };

  // Fetch recent document activities
  const fetchRecentActivities = async () => {
    try {
      setIsLoadingActivities(true);
      console.log('📥 Fetching recent document activities...');
      
      const response = await documentActivityApi.getRecent(10);
      console.log('✅ Recent activities:', response);
      
      setRecentActivities(response.data || []);
      console.log(`✅ Loaded ${response.data?.length || 0} recent activities`);
    } catch (error) {
      console.error('❌ Error fetching recent activities:', error);
      // Don't show error to user, just use empty array
      setRecentActivities([]);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  // Load documents on mount
  useEffect(() => {
    fetchDocuments();
    fetchAssignedToMe(); // Initial load for folder count
    fetchRecentActivities();
  }, []);

  // Refresh assigned documents when "Assigned to Me" folder is selected
  useEffect(() => {
    if (selectedFolder === 'Assigned to Me') {
      console.log('📂 "Assigned to Me" folder selected - fetching assigned documents...');
      fetchAssignedToMe();
    }
  }, [selectedFolder]);

  // Event handlers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteDocument = (document: any) => {
    setSelectedDocument(document);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedDocument) {
      try {
        console.log('🗑️ Deleting document:', selectedDocument.id);
        await documentApi.delete(selectedDocument.id);
        console.log('✅ Document deleted successfully');
        
        // Refresh the documents list and activities
        await fetchDocuments();
        setTimeout(() => {
          fetchRecentActivities();
        }, 500);
        
        setSelectedDocument(null);
        setDeleteModalOpen(false);
        
        alert('Document deleted successfully!');
      } catch (error) {
        console.error('❌ Error deleting document:', error);
        alert('Failed to delete document. Please try again.');
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveDocument = (documentData: any) => {
    console.log('Saving document:', documentData);
    // In a real app, this would make an API call
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadDocument = async (fileData: any) => {
    try {
      console.log('Uploading document:', fileData);
      
      // Call the API to upload the document
      const response = await documentApi.upload(fileData);
      
      console.log('Upload successful:', response);
      
      // Handle different response structures (data or result)
      const uploadedDoc = response?.body?.data || response?.body?.result;
      const documentName = uploadedDoc?.name || 'Document';
      
      // Show success message (you can add a toast notification here)
      alert(`Document "${documentName}" uploaded successfully!`);
      
      // Reload the documents list to show the new document
      await fetchDocuments();
      
      // Refresh recent activities
      setTimeout(() => {
        fetchRecentActivities();
      }, 500);
      
      return response; // Return response for assignment handling
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload document. Please try again.');
      throw error; // Re-throw to let the modal handle it
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleManageAccess = (document: any) => {
    setSelectedDocument(document);
    setManageAccessModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewDocument = async (document: any) => {
    console.log('👁️ Viewing document:', document);
    
    // Track view activity (don't wait for it, run in background)
    documentActivityApi.trackView(document.id).catch(error => {
      console.error('Failed to track document view:', error);
      // Silent fail - tracking shouldn't break UX
    });
    
    // If document has a URL, open it in a new tab
    if (document.url) {
      window.open(document.url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback: open in modal (if ViewDocumentModal supports URL)
      setSelectedDocument(document);
      setViewDocumentModal(true);
    }
    
    // Refresh recent activities after view
    setTimeout(() => {
      fetchRecentActivities();
    }, 500);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDownloadDocument = async (document: any) => {
    try {
      console.log('⬇️ Downloading document:', document);
      
      // Track download activity (run in background, don't wait)
      documentActivityApi.trackDownload(document.id).catch(error => {
        console.error('Failed to track document download:', error);
        // Silent fail - tracking shouldn't break UX
      });
      
      // Get download URL from API
      const response = await documentApi.getDownloadUrl(document.id);
      
      if (response.data?.downloadUrl) {
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = response.data.downloadUrl;
        link.download = response.data.name || document.name;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Download initiated');
        
        // Refresh recent activities after download
        setTimeout(() => {
          fetchRecentActivities();
        }, 500);
      } else {
        // Fallback: use document URL directly
        window.open(document.url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('❌ Error downloading document:', error);
      // Fallback: open URL directly
      if (document.url) {
        window.open(document.url, '_blank', 'noopener,noreferrer');
      } else {
        alert('Failed to download document. Please try again.');
      }
    }
  };

  // Get documents to display based on selected folder
  const getDocumentsForFolder = () => {
    if (selectedFolder === 'All Files') {
      return documentsList;
    } else if (selectedFolder === 'Assigned to Me') {
      return assignedToMeDocs;
    } else {
      return documentsList.filter(d => d.folder === selectedFolder);
    }
  };

  // Filter documents based on search term and selected folder
  const documentsToFilter = getDocumentsForFolder();
  const filteredDocuments = documentsToFilter.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Dynamic folder counts based on fetched documents
  const folders = [
    { name: 'All Files', count: documentsList.length, icon: Folder },
    { name: 'Assigned to Me', count: assignedToMeDocs.length, icon: Users, special: true },
    { name: 'Proposals', count: documentsList.filter(d => d.folder === 'Proposals').length, icon: FileText },
    { name: 'Marketing', count: documentsList.filter(d => d.folder === 'Marketing').length, icon: FileText },
    { name: 'Reports', count: documentsList.filter(d => d.folder === 'Reports').length, icon: FileText },
    { name: 'Templates', count: documentsList.filter(d => d.folder === 'Templates').length, icon: FileText },
    { name: 'Assets', count: documentsList.filter(d => d.folder === 'Assets').length, icon: Image },
    { name: 'Meetings', count: documentsList.filter(d => d.folder === 'Meetings').length, icon: FileText },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'docx': return FileText;
      case 'xlsx': return FileText;
      case 'png': return Image;
      case 'jpg': return Image;
      case 'jpeg': return Image;
      default: return File;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600';
      case 'docx': return 'text-blue-600';
      case 'xlsx': return 'text-green-600';
      case 'png': case 'jpg': case 'jpeg': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  // Helper to format timestamp as "X time ago"
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMs = now.getTime() - activityTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    return formatDate(activityTime);
  };

  return (
    <DashboardLayout title="Documents" userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Documents</h1>
            <p className="text-[#6B7280]">Manage and organize your files</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => setUploadDocumentModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          </div>
        </div>

        {/* Assignment Feature Info */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Document Access Management
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Control who can access your documents with READ_ONLY or EDIT permissions. 
                  Click the "Access" button on any document to manage user assignments.
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Fully audited
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    View history
                  </span>
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    Multi-user support
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Folders */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Folder className="h-5 w-5" />
                <span>Folders</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {folders.map((folder, index) => {
                  const FolderIcon = folder.icon || Folder;
                  const isSpecial = folder.special;
                  const isActive = selectedFolder === folder.name;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedFolder(folder.name)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-[#F9FAFB] transition-colors ${
                        isActive 
                          ? 'bg-[#F9FAFB] text-[#2563EB]' 
                          : isSpecial 
                            ? 'text-[#7C3AED] hover:bg-purple-50' 
                            : 'text-[#6B7280]'
                      }`}
                    >
                      <span className="text-sm font-medium flex items-center space-x-2">
                        <FolderIcon className="h-4 w-4" />
                        <span>{folder.name}</span>
                      </span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          isSpecial ? 'bg-purple-100 text-purple-800' : ''
                        }`}
                      >
                        {folder.count}
                      </Badge>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and View Options */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                    <Input
                      placeholder="Search documents..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Message */}
            {documentsError && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-red-600">⚠️</div>
                    <div>
                      <p className="text-sm font-medium text-red-900">{documentsError}</p>
                      <button 
                        onClick={fetchDocuments}
                        className="text-sm text-red-600 hover:text-red-800 underline mt-1"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loading State */}
            {isLoadingDocuments && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-gray-200 rounded w-16"></div>
                          <div className="h-6 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-8 bg-gray-200 rounded"></div>
                          <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoadingDocuments && !documentsError && filteredDocuments.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm 
                      ? `No documents match "${searchTerm}"`
                      : 'Upload your first document to get started'
                    }
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setUploadDocumentModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Documents Grid */}
            {!isLoadingDocuments && !documentsError && filteredDocuments.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => {
                const FileIcon = getFileIcon(doc.type);
                return (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-[#F3F4F6]`}>
                          <FileIcon className={`h-5 w-5 ${getFileTypeColor(doc.type)}`} />
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            {doc.isStarred ? (
                              <Star className="h-4 w-4 text-[#F59E0B] fill-current" />
                            ) : (
                              <Star className="h-4 w-4 text-[#9CA3AF]" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-[#111827] mb-1 truncate" title={doc.name}>
                        {doc.name}
                      </h3>
                      
                      <p className="text-sm text-[#6B7280] mb-3">
                        {doc.size} • {formatDate(doc.uploadDate)}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={doc.uploadedBy.avatar} />
                            <AvatarFallback className="text-xs">
                              {getInitials(doc.uploadedBy.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-[#6B7280]">
                            {doc.uploadedBy.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Badge variant="secondary" className="text-xs">
                            {doc.folder}
                          </Badge>
                          {documentAssignments[doc.id] !== undefined && documentAssignments[doc.id] > 0 && (
                            <Badge 
                              variant="outline" 
                              className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                              title="Users with access"
                            >
                              <Users className="h-3 w-3 mr-1" />
                              {documentAssignments[doc.id]}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {doc.tags.slice(0, 2).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {doc.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{doc.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDocument(doc)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleManageAccess(doc)}
                          className="col-span-1"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Access
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteDocument(doc)}
                          title="Delete Document"
                          className="col-span-1"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest document activities and changes</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingActivities ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 animate-pulse">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-[#F9FAFB] rounded-lg transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.actor?.avatar} />
                      <AvatarFallback className="text-xs">
                        {getInitials(activity.actor?.name || 'Unknown')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#111827]">
                        <span className="font-medium">{activity.actor?.name || 'Unknown User'}</span>{' '}
                        {activity.actionLabel?.toLowerCase() || activity.action}{' '}
                        {activity.document && (
                          <span className="font-medium">{activity.document.name}</span>
                        )}
                      </p>
                      <p className="text-xs text-[#6B7280]">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                    {activity.document?.url && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(activity.document.url, '_blank', 'noopener,noreferrer')}
                        title="View document"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No recent activity yet</p>
                <p className="text-xs mt-1">Document activities will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Document"
        message={`Are you sure you want to delete "${selectedDocument?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* Document Modals */}
      <ViewDocumentModal
        isOpen={viewDocumentModal}
        onClose={() => setViewDocumentModal(false)}
        document={selectedDocument}
      />

      <EditDocumentModal
        isOpen={editDocumentModal}
        onClose={() => setEditDocumentModal(false)}
        document={selectedDocument}
        onSave={handleSaveDocument}
      />

      <UploadDocumentModal
        isOpen={uploadDocumentModal}
        onClose={() => setUploadDocumentModal(false)}
        onUpload={handleUploadDocument}
        availableUsers={demoUsers.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }))}
      />

      <ManageAssignmentsModal
        isOpen={manageAccessModal}
        onClose={() => {
          setManageAccessModal(false);
          setSelectedDocument(null);
        }}
        document={selectedDocument}
        availableUsers={demoUsers.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          department: user.department || 'N/A'
        }))}
      />
    </DashboardLayout>
  );
}
