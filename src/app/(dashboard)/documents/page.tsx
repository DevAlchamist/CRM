'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewDocumentModal, EditDocumentModal, UploadDocumentModal } from '@/components/forms/document-modals';
import { 
  Search, 
  Upload, 
  Filter, 
  Grid, 
  List,
  FileText,
  Image,
  File,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Folder,
  Star,
  Share2,
  Plus
} from 'lucide-react';
import { demoUsers } from '@/data/demo';
import { getInitials, formatDate } from '@/lib/utils';

export default function DocumentsPage() {
  const [documentsList, setDocumentsList] = useState([
    {
      id: '1',
      name: 'Acme Corp Proposal.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: new Date('2024-11-28'),
      uploadedBy: demoUsers[1],
      folder: 'Proposals',
      tags: ['proposal', 'acme', 'enterprise'],
      isStarred: true,
    },
    {
      id: '2',
      name: 'Product Demo Script.docx',
      type: 'docx',
      size: '856 KB',
      uploadDate: new Date('2024-11-27'),
      uploadedBy: demoUsers[0],
      folder: 'Marketing',
      tags: ['demo', 'script', 'product'],
      isStarred: false,
    },
    {
      id: '3',
      name: 'Company Logo.png',
      type: 'png',
      size: '1.2 MB',
      uploadDate: new Date('2024-11-25'),
      uploadedBy: demoUsers[2],
      folder: 'Assets',
      tags: ['logo', 'branding'],
      isStarred: true,
    },
    {
      id: '4',
      name: 'Sales Report Q4.xlsx',
      type: 'xlsx',
      size: '3.1 MB',
      uploadDate: new Date('2024-11-24'),
      uploadedBy: demoUsers[1],
      folder: 'Reports',
      tags: ['report', 'sales', 'q4'],
      isStarred: false,
    },
    {
      id: '5',
      name: 'Customer Contract Template.docx',
      type: 'docx',
      size: '1.8 MB',
      uploadDate: new Date('2024-11-23'),
      uploadedBy: demoUsers[0],
      folder: 'Templates',
      tags: ['contract', 'template', 'legal'],
      isStarred: true,
    },
    {
      id: '6',
      name: 'Team Meeting Notes.pdf',
      type: 'pdf',
      size: '645 KB',
      uploadDate: new Date('2024-11-22'),
      uploadedBy: demoUsers[2],
      folder: 'Meetings',
      tags: ['meeting', 'notes', 'team'],
      isStarred: false,
    },
  ]);

  // Modal state
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewDocumentModal, setViewDocumentModal] = useState(false);
  const [editDocumentModal, setEditDocumentModal] = useState(false);
  const [uploadDocumentModal, setUploadDocumentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Event handlers
  const handleDeleteDocument = (document: any) => {
    setSelectedDocument(document);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDocument) {
      setDocumentsList(documentsList.filter(d => d.id !== selectedDocument.id));
      setSelectedDocument(null);
    }
  };

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setViewDocumentModal(true);
  };

  const handleEditDocument = (document: any) => {
    setSelectedDocument(document);
    setEditDocumentModal(true);
  };

  const handleSaveDocument = (documentData: any) => {
    console.log('Saving document:', documentData);
    // In a real app, this would make an API call
  };

  const handleUploadDocument = (fileData: any) => {
    console.log('Uploading document:', fileData);
    // In a real app, this would make an API call
  };

  // Filter documents based on search term
  const filteredDocuments = documentsList.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const folders = [
    { name: 'All Files', count: documentsList.length },
    { name: 'Proposals', count: 3 },
    { name: 'Marketing', count: 8 },
    { name: 'Reports', count: 12 },
    { name: 'Templates', count: 5 },
    { name: 'Assets', count: 15 },
    { name: 'Meetings', count: 7 },
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
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          </div>
        </div>

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
                {folders.map((folder, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-[#F9FAFB] transition-colors ${
                      index === 0 ? 'bg-[#F9FAFB] text-[#2563EB]' : 'text-[#6B7280]'
                    }`}
                  >
                    <span className="text-sm font-medium">{folder.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {folder.count}
                    </Badge>
                  </button>
                ))}
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

            {/* Documents Grid */}
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
                        <Badge variant="secondary" className="text-xs">
                          {doc.folder}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {doc.tags.slice(0, 2).map((tag) => (
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
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteDocument(doc)}
                          title="Delete Document"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest document activities and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  user: demoUsers[1],
                  action: 'uploaded',
                  document: 'Acme Corp Proposal.pdf',
                  time: '2 hours ago',
                },
                {
                  user: demoUsers[0],
                  action: 'viewed',
                  document: 'Product Demo Script.docx',
                  time: '4 hours ago',
                },
                {
                  user: demoUsers[2],
                  action: 'downloaded',
                  document: 'Company Logo.png',
                  time: '1 day ago',
                },
                {
                  user: demoUsers[1],
                  action: 'shared',
                  document: 'Sales Report Q4.xlsx',
                  time: '2 days ago',
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-[#F9FAFB] rounded-lg transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback className="text-xs">
                      {getInitials(activity.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111827]">
                      <span className="font-medium">{activity.user.name}</span>{' '}
                      {activity.action}{' '}
                      <span className="font-medium">{activity.document}</span>
                    </p>
                    <p className="text-xs text-[#6B7280]">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
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

      {/* Add Document Modal - Simple version for now */}
      {addModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setAddModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Document</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter document name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button>
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Document Modals */}
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
      />
    </DashboardLayout>
  );
}
