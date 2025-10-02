'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Download, Eye, Edit, Trash2, Share2, Star, Folder, Upload, X } from 'lucide-react';

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

export function ViewDocumentModal({ isOpen, onClose, document }: ViewDocumentModalProps) {
  if (!document) return null;

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
      case 'docx': return <FileText className="h-8 w-8 text-blue-500" />;
      case 'xlsx': return <FileText className="h-8 w-8 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <FileText className="h-8 w-8 text-purple-500" />;
      default: return <FileText className="h-8 w-8 text-gray-500" />;
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
            <h3 className="text-xl font-semibold text-[#111827]">{document.name}</h3>
            <p className="text-[#6B7280]">{document.type.toUpperCase()} • {document.size}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline">{document.folder}</Badge>
              {document.isStarred && (
                <Badge variant="default" className="bg-yellow-100 text-yellow-800">
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
            <h4 className="font-medium text-[#111827] mb-3">Document Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Name:</span>
                <span className="text-sm font-medium text-[#111827]">{document.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Type:</span>
                <span className="text-sm font-medium text-[#111827]">{document.type.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Size:</span>
                <span className="text-sm font-medium text-[#111827]">{document.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Folder:</span>
                <span className="text-sm font-medium text-[#111827]">{document.folder}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-[#111827] mb-3">Upload Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Uploaded:</span>
                <span className="text-sm font-medium text-[#111827]">{document.uploadDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">By:</span>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={document.uploadedBy.avatar} />
                    <AvatarFallback className="text-xs">
                      {document.uploadedBy.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-[#111827]">{document.uploadedBy.name}</span>
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

export function EditDocumentModal({ isOpen, onClose, document, onSave }: EditDocumentModalProps) {
  const [formData, setFormData] = useState({
    name: document?.name || '',
    folder: document?.folder || '',
    tags: document?.tags.join(', ') || '',
    description: document?.description || '',
    isStarred: document?.isStarred || false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
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
            onChange={(e) => setFormData({...formData, name: e.target.value})}
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
            onChange={(e) => setFormData({...formData, folder: e.target.value})}
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
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            placeholder="tag1, tag2, tag3"
          />
          <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Document description..."
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isStarred"
            checked={formData.isStarred}
            onChange={(e) => setFormData({...formData, isStarred: e.target.checked})}
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
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (fileData: any) => void;
}

export function UploadDocumentModal({ isOpen, onClose, onUpload }: UploadDocumentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    folder: 'Documents',
    tags: '',
    description: '',
    isStarred: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData({...formData, name: file.name});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onUpload({
        ...formData,
        file: selectedFile,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      });
      setIsLoading(false);
      onClose();
      // Reset form
      setFormData({
        name: '',
        folder: 'Documents',
        tags: '',
        description: '',
        isStarred: false
      });
      setSelectedFile(null);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Document" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-sm text-gray-600">
                {selectedFile ? selectedFile.name : 'Click to select a file'}
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, JPG, PNG
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
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
            onChange={(e) => setFormData({...formData, folder: e.target.value})}
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
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            placeholder="tag1, tag2, tag3"
          />
          <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Document description..."
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isStarred"
            checked={formData.isStarred}
            onChange={(e) => setFormData({...formData, isStarred: e.target.checked})}
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
          <Button type="submit" disabled={isLoading || !selectedFile}>
            {isLoading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
