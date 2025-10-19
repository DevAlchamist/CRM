'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewLeadModal, AddEditLeadModal } from '@/components/forms/lead-modals';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/components/ui/toast';
import { 
  Plus, 
  Filter, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Target,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  GripVertical
} from 'lucide-react';
// Using HTML5 drag and drop API instead of external library
import api from '@/lib/api';
import { formatCurrency, formatDate, getInitials } from '@/lib/utils';
import { Lead, User, Task } from '@/types';

const stages = [
  { id: 'prospect', name: 'Prospect', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'qualified', name: 'Qualified', color: 'bg-blue-100 text-blue-800' },
  { id: 'proposal', name: 'Proposal', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-purple-100 text-purple-800' },
  { id: 'closed_won', name: 'Closed Won', color: 'bg-green-100 text-green-800' },
  { id: 'closed_lost', name: 'Closed Lost', color: 'bg-red-100 text-red-800' },
];


// Table Row Component
interface TableRowProps {
  lead: Lead;
  stages: { id: string; name: string; color: string }[];
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onAssign: (lead: Lead) => void;
}

function TableRow({ lead, stages, onView, onEdit, onDelete, onAssign }: TableRowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState<{ [key: string]: boolean }>({});

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify({ leadId: lead.id, lead }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
      <div className="grid grid-cols-7 gap-0">
        {/* Lead Info Column */}
        <div className="p-4 border-r border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {lead.title}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                {lead.customerName || 'No customer'}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs font-medium text-gray-900">
                  {formatCurrency(lead.value)}
                </span>
                <span className="text-xs text-gray-500">
                  {lead.probability}%
                </span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Calendar className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {formatDate(lead.expectedCloseDate)}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={lead.assignedUser?.avatar} />
                  <AvatarFallback className="text-xs">
                    {lead.assignedUser?.name ? getInitials(lead.assignedUser.name) : 
                     lead.assignedToName ? getInitials(lead.assignedToName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {lead.assignedUser?.name || lead.assignedToName || 'Unassigned'}
                  </p>
                  {lead.assignedUser?.role && (
                    <p className="text-xs text-gray-500 capitalize">
                      {lead.assignedUser.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Columns */}
        {stages.map((stage) => {
          const isCurrentStage = lead.stage === stage.id;

          const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            setIsOver(prev => ({ ...prev, [stage.id]: true }));
          };

          const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            setIsOver(prev => ({ ...prev, [stage.id]: false }));
          };

          const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            setIsOver(prev => ({ ...prev, [stage.id]: false }));
            
            try {
              const data = JSON.parse(e.dataTransfer.getData('application/json'));
              const { leadId } = data;
              
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('lead-dropped', {
                  detail: { leadId, lead, newStage: stage.id }
                }));
              }
            } catch (error) {
              console.error('Error handling drop:', error);
            }
          };

          return (
            <div
              key={stage.id}
              draggable={isCurrentStage}
              onDragStart={isCurrentStage ? handleDragStart : undefined}
              onDragEnd={isCurrentStage ? handleDragEnd : undefined}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-4 border-r border-gray-100 last:border-r-0 min-h-[120px] flex items-center justify-center transition-all duration-200 ${
                isCurrentStage 
                  ? 'bg-blue-50 border-l-4 border-l-blue-400 cursor-grab active:cursor-grabbing' 
                  : isOver[stage.id] 
                    ? 'bg-green-50 border-2 border-green-300 scale-105 shadow-md' 
                    : 'hover:bg-gray-50 hover:border-gray-300'
              } ${isCurrentStage && isDragging ? 'opacity-60 shadow-xl border-blue-400 scale-105' : ''}`}
            >
              {isCurrentStage ? (
                <div className="text-center">
                  <Badge className={`${stage.color} mb-2 shadow-sm`}>
                    {stage.name}
                  </Badge>
                  <div className="text-xs text-gray-600 font-medium mb-1">
                    ✓ Current Stage
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    Drag to move
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">
                    {isOver[stage.id] ? '🎯' : '📁'}
                  </div>
                  <div className={`text-xs font-medium transition-colors ${
                    isOver[stage.id] ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {isOver[stage.id] ? 'Drop to Move' : 'Drop here'}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              lead.stage === 'closed_won' ? 'bg-green-400' : 
              lead.stage === 'closed_lost' ? 'bg-red-400' : 
              'bg-blue-400'
            }`}></div>
            <span className="text-xs text-gray-600 font-medium capitalize">
              {lead.stage === 'closed_won' ? 'Won' : 
               lead.stage === 'closed_lost' ? 'Lost' : 
               'Active'} Lead
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Created {formatDate(lead.createdAt)}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 text-xs hover:bg-white hover:shadow-sm transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onView(lead);
            }}
            title="View Lead Details"
          >
            <Eye className="h-3 w-3 mr-1.5" />
            View
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 text-xs hover:bg-white hover:shadow-sm transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(lead);
            }}
            title="Edit Lead Information"
          >
            <Edit className="h-3 w-3 mr-1.5" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 text-xs hover:bg-white hover:shadow-sm transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onAssign(lead);
            }}
            title="Assign Lead to Team Member"
          >
            <UserPlus className="h-3 w-3 mr-1.5" />
            Assign
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(lead);
            }}
            title="Delete Lead"
          >
            <Trash2 className="h-3 w-3 mr-1.5" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  const { user } = useAuth();
  const { can } = usePermissions();
  const { addToast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search] = useState('');
  const [stageFilter] = useState<string | undefined>(undefined);
  const [page] = useState(1);
  const [limit] = useState(20);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  // Check permission once outside useEffect to avoid infinite loops
  const canViewAll = can('view_all_tasks'); 

  // Fetch users (employees and managers) for assignment
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { body } = await api.get('users?roles=employee,manager');
        const data = body as { result?: { data?: User[] }; data?: User[] };
        const list = (data?.result?.data || data?.data || []) as User[];
        setUsers(list);
      } catch (e) {
        console.error('Failed to fetch users', e);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const params = new URLSearchParams();
        params.append('page', String(page));
        params.append('limit', String(limit));
        if (search) params.append('search', search);
        if (stageFilter) params.append('stage', stageFilter);
        
        // If user doesn't have permission to view all leads, filter by assignedTo
        // Managers and above can see all leads (view_all_tasks permission covers this)
        if (!canViewAll && user?.id) {
          params.append('assignedTo', user.id);
        }
        
        const { body } = await api.get(`leads?${params.toString()}`);
        const data = body as { result?: { data?: Lead[] }; data?: Lead[] };
        const list = (data?.result?.data || data?.data || []) as Lead[];
        const normalized: Lead[] = list.map((l) => ({
          id: l.id,
          title: l.title,
          customerId: l.customerId || undefined, // Handle optional customerId
          customerName: l.customerName || undefined,
          value: l.value ?? 0,
          stage: l.stage,
          probability: l.probability ?? 0,
          assignedTo: l.assignedTo ?? '',
          assignedToName: l.assignedToName ?? l.assignedUser?.name ?? '',
          assignedUser: l.assignedUser ? {
            id: l.assignedUser.id,
            name: l.assignedUser.name,
            role: l.assignedUser.role,
            email: l.assignedUser.email,
            department: l.assignedUser.department,
            avatar: l.assignedUser.avatar
          } : undefined,
          source: l.source ?? '',
          createdAt: l.createdAt ? new Date(l.createdAt) : new Date(),
          updatedAt: l.updatedAt ? new Date(l.updatedAt) : new Date(),
          expectedCloseDate: l.expectedCloseDate ? new Date(l.expectedCloseDate) : new Date(),
          description: l.description ?? '',
        }));
        
        // Client-side filtering as backup (in case backend doesn't support filtering)
        let filteredLeads = normalized;
        if (!canViewAll && user?.id) {
          filteredLeads = normalized.filter(l => 
            l.assignedTo === user.id || l.assignedTo === '' || !l.assignedTo
          );
        }
        
        if (!cancelled) setLeads(filteredLeads);
      } catch (e: unknown) {
        if (!cancelled) setError((e as Error)?.message || 'Failed to load leads');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchLeads();
    return () => { cancelled = true; };
  }, [page, limit, search, stageFilter, user?.id, canViewAll]);

  const totalValue = useMemo(() => leads.reduce((sum, lead) => sum + (lead.value || 0), 0), [leads]);
  const activeLeads = useMemo(() => leads.filter(lead => !String(lead.stage).includes('closed')).length, [leads]);
  const wonLeads = useMemo(() => leads.filter(lead => lead.stage === 'closed_won'), [leads]);
  const wonValue = useMemo(() => wonLeads.reduce((sum, lead) => sum + (lead.value || 0), 0), [wonLeads]);

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  // Drag and Drop Handlers
  useEffect(() => {
    const handleLeadDropped = async (event: Event) => {
      const customEvent = event as CustomEvent;
      const { leadId, newStage } = customEvent.detail;
      
      // Find the lead being moved
      const leadToUpdate = leads.find(l => l.id === leadId);
      if (!leadToUpdate || leadToUpdate.stage === newStage) return;

      // Update the lead's stage optimistically
      const updatedLeads = leads.map(l => 
        l.id === leadId 
          ? { ...l, stage: newStage as Lead['stage'] }
          : l
      );
      setLeads(updatedLeads);

      try {
        // Update the lead stage on the server
        await api.patch(`leads/${leadId}`, {
          json: { stage: newStage }
        });
        
        addToast(`Lead moved to ${stages.find(s => s.id === newStage)?.name} stage`, 'success');
      } catch (error) {
        console.error('Failed to update lead stage:', error);
        // Revert the optimistic update
        setLeads(leads);
        addToast('Failed to update lead stage', 'error');
      }
    };

    window.addEventListener('lead-dropped', handleLeadDropped);
    return () => {
      window.removeEventListener('lead-dropped', handleLeadDropped);
    };
  }, [leads, addToast]);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setViewModalOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditModalOpen(true);
  };

  const handleDeleteLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDeleteModalOpen(true);
  };

  const handleAssignLead = (lead: Lead) => {
    setSelectedLead(lead);
    setSelectedUserId(lead.assignedTo || '');
    setAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setAssignModalOpen(false);
    setSelectedUserId('');
    // Don't clear selectedLead immediately to avoid UI flicker
    setTimeout(() => {
      if (!viewModalOpen && !editModalOpen && !deleteModalOpen) {
        setSelectedLead(null);
      }
    }, 300);
  };

  const handleConfirmAssign = async () => {
    if (selectedLead && selectedUserId) {
      try {
        const { body } = await api.post(`leads/${selectedLead.id}/assign`, {
          json: { assignedTo: selectedUserId }
        });
        const data = body as { result?: { lead?: Lead; data?: Lead[] }; data?: Lead[] };
        const updatedLead = (data?.result?.lead || data?.result || data) as Lead;

        // Get assigned user details
        const assignedUser = users.find(u => u.id === selectedUserId);
        const assignedUserName = assignedUser?.name || '';

        // Update the lead in the list
        setLeads(leads.map(l => 
          l.id === selectedLead.id 
            ? { 
                ...l, 
                assignedTo: updatedLead.assignedTo || selectedUserId,
                assignedToName: updatedLead.assignedToName || assignedUserName,
                assignedUser: assignedUser ? {
                  id: assignedUser.id,
                  name: assignedUser.name,
                  role: assignedUser.role,
                  email: assignedUser.email,
                  department: assignedUser.department,
                  avatar: assignedUser.avatar
                } : undefined
              }
            : l
        ));
        
        addToast(`Lead assigned to ${assignedUserName} successfully`, 'success');
        handleCloseAssignModal();
      } catch (e) {
        console.error('Failed to assign lead', e);
        addToast('Failed to assign lead', 'error');
      }
    }
  };

  const handleSaveLead = async (leadData: Partial<Lead>) => {
    try {
      if (selectedLead) {
        // Edit existing lead
        const payload = {
          title: leadData.title,
          customerId: leadData.customerId,
          value: leadData.value,
          stage: leadData.stage,
          probability: leadData.probability,
          source: leadData.source,
          expectedCloseDate: leadData.expectedCloseDate?.toISOString(),
          description: leadData.description,
          assignedTo: leadData.assignedTo,  // ⭐ Include assignment
        };

        const { body } = await api.patch(`leads/${selectedLead.id}`, { json: payload });
        const data = body as { result?: { lead?: Lead; data?: Lead[] }; data?: Lead[] };
        const updatedLead = (data?.result?.lead || data?.result || data) as Lead;

        const normalized: Lead = {
          id: updatedLead.id,
          title: updatedLead.title,
          customerId: updatedLead.customerId,
          customerName: updatedLead.customerName,
          value: updatedLead.value ?? 0,
          stage: updatedLead.stage,
          probability: updatedLead.probability ?? 0,
          assignedTo: updatedLead.assignedTo ?? '',
          assignedToName: updatedLead.assignedToName ?? updatedLead.assignedUser?.name ?? '',
          assignedUser: updatedLead.assignedUser ? {
            id: updatedLead.assignedUser.id,
            name: updatedLead.assignedUser.name,
            role: updatedLead.assignedUser.role,
            email: updatedLead.assignedUser.email,
            department: updatedLead.assignedUser.department,
            avatar: updatedLead.assignedUser.avatar
          } : undefined,
          source: updatedLead.source ?? '',
          createdAt: updatedLead.createdAt ? new Date(updatedLead.createdAt) : new Date(),
          updatedAt: updatedLead.updatedAt ? new Date(updatedLead.updatedAt) : new Date(),
          expectedCloseDate: updatedLead.expectedCloseDate ? new Date(updatedLead.expectedCloseDate) : new Date(),
          description: updatedLead.description ?? '',
        };

        setLeads(leads.map(l => l.id === selectedLead.id ? normalized : l));
        addToast('Lead updated successfully', 'success');
      } else {
        // Add new lead
        const payload = {
          title: leadData.title,
          customerId: leadData.customerId,
          value: leadData.value,
          stage: leadData.stage,
          probability: leadData.probability,
          source: leadData.source,
          expectedCloseDate: leadData.expectedCloseDate?.toISOString(),
          description: leadData.description,
          assignedTo: leadData.assignedTo,  // ⭐ Include assignment
        };

        const { body } = await api.post('leads', { json: payload });
        const data = body as { result?: { lead?: Lead; data?: Lead[] }; data?: Lead[] };
        const newLead = (data?.result?.lead || data?.result || data) as Lead;

        const normalized: Lead = {
          id: newLead.id,
          title: newLead.title,
          customerId: newLead.customerId,
          customerName: newLead.customerName,
          value: newLead.value ?? 0,
          stage: newLead.stage,
          probability: newLead.probability ?? 0,
          assignedTo: newLead.assignedTo ?? '',
          assignedToName: newLead.assignedToName ?? newLead.assignedUser?.name ?? '',
          assignedUser: newLead.assignedUser ? {
            id: newLead.assignedUser.id,
            name: newLead.assignedUser.name,
            role: newLead.assignedUser.role,
            email: newLead.assignedUser.email,
            department: newLead.assignedUser.department,
            avatar: newLead.assignedUser.avatar
          } : undefined,
          source: newLead.source ?? '',
          createdAt: newLead.createdAt ? new Date(newLead.createdAt) : new Date(),
          updatedAt: newLead.updatedAt ? new Date(newLead.updatedAt) : new Date(),
          expectedCloseDate: newLead.expectedCloseDate ? new Date(newLead.expectedCloseDate) : new Date(),
          description: newLead.description ?? '',
        };

        setLeads([...leads, normalized]);
        addToast('Lead created successfully', 'success');
      }
    } catch (e) {
      console.error('Failed to save lead', e);
      addToast('Failed to save lead', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedLead) {
      try {
        // Check for related tasks before deleting
        const { body: tasksResponse } = await api.get(`tasks?relatedToType=lead&relatedToId=${selectedLead.id}`);
        const tasksData = tasksResponse as { result?: { data?: Task[] }; data?: Task[] };
        const relatedTasks = (tasksData?.result?.data || tasksData?.data || []) as Task[];

        if (relatedTasks.length > 0) {
          const message = `This lead has ${relatedTasks.length} related tasks. Deleting will also remove these tasks. Are you sure?`;
          if (!confirm(message)) {
            return;
          }
        }

        await api.delete(`leads/${selectedLead.id}`);
        setLeads(leads.filter(l => l.id !== selectedLead.id));
        addToast('Lead and related tasks deleted successfully', 'success');
        setSelectedLead(null);
      } catch (e) {
        console.error('Failed to delete lead', e);
        addToast('Failed to delete lead', 'error');
      }
    }
  };

  return (
    <DashboardLayout title="Leads" userRole="admin">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Leads
              </CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {leads.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active Leads
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {activeLeads}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pipeline Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalValue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Won Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(wonValue)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Table Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Sales Pipeline</h2>
            <p className="text-sm text-gray-500">Drag and drop leads between stages to update their status</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => {
              setSelectedLead(null);
              setAddModalOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Pipeline Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="grid grid-cols-7 gap-0">
              {/* Lead Info Header */}
              <div className="p-4 border-r border-gray-200">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    📋 Lead Information
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {leads.length} total leads
                  </div>
                </div>
              </div>
              
              {/* Stage Headers */}
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);

            return (
                  <div key={stage.id} className="p-4 border-r border-gray-200 last:border-r-0">
                    <div className="text-center">
                      <Badge className={`${stage.color} mb-2`}>
                      {stage.name}
                    </Badge>
                      <div className="text-sm font-medium text-gray-900">
                        {stageLeads.length} leads
                  </div>
                      <div className="text-xs text-gray-500">
                    {formatCurrency(stageValue)}
                              </div>
                              </div>
                            </div>
                );
              })}
                              </div>
                            </div>

          {/* Table Body */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-sm text-gray-500">Loading leads...</div>
                            </div>
            ) : leads.length > 0 ? (
              <div className="space-y-2 p-4">
                {leads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    lead={lead}
                    stages={stages}
                    onView={handleViewLead}
                    onEdit={handleEditLead}
                    onDelete={handleDeleteLead}
                    onAssign={handleAssignLead}
                  />
                ))}
                          </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">No leads found</p>
                  <p className="text-xs text-gray-400">Create your first lead to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* View Modal */}
      {selectedLead && viewModalOpen && (
        <ViewLeadModal
          isOpen={viewModalOpen}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedLead(null);
          }}
          lead={selectedLead}
        />
      )}

      {/* Edit Modal */}
      {selectedLead && editModalOpen && (
        <AddEditLeadModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedLead(null);
          }}
          lead={selectedLead}
          onSave={handleSaveLead}
        />
      )}

      {/* Add Modal */}
      <AddEditLeadModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveLead}
      />

      {/* Delete Modal */}
      {selectedLead && deleteModalOpen && (
        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedLead(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Lead"
          message={`Are you sure you want to delete &quot;${selectedLead.title}&quot;? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
        />
      )}

      {/* Assign Lead Modal */}
      {selectedLead && assignModalOpen && (
        <ConfirmModal
          isOpen={assignModalOpen}
          onClose={handleCloseAssignModal}
          onConfirm={handleConfirmAssign}
          title="Assign Lead"
          message={
            <div className="space-y-4">
              <p>Assign &quot;{selectedLead.title}&quot; to a team member:</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Employee or Manager
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                >
                  <option value="">Select a user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.role} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }
          confirmText="Assign"
          cancelText="Cancel"
          variant="default"
        />
      )}
    </DashboardLayout>
  );
}
