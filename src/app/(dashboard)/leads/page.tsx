'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewLeadModal, AddEditLeadModal } from '@/components/forms/lead-modals';
import { 
  Plus, 
  Filter, 
  DollarSign, 
  Calendar, 
  User,
  TrendingUp,
  Target,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { demoLeads, demoUsers } from '@/data/demo';
import { formatCurrency, formatDate, getInitials } from '@/lib/utils';
import { Lead } from '@/types';

const stages = [
  { id: 'prospect', name: 'Prospect', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'qualified', name: 'Qualified', color: 'bg-blue-100 text-blue-800' },
  { id: 'proposal', name: 'Proposal', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-purple-100 text-purple-800' },
  { id: 'closed_won', name: 'Closed Won', color: 'bg-green-100 text-green-800' },
  { id: 'closed_lost', name: 'Closed Lost', color: 'bg-red-100 text-red-800' },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState(demoLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const activeLeads = leads.filter(lead => !lead.stage.includes('closed')).length;
  const wonLeads = leads.filter(lead => lead.stage === 'closed_won');
  const wonValue = wonLeads.reduce((sum, lead) => sum + lead.value, 0);

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  const getAssignedUser = (userId: string) => {
    return demoUsers.find(user => user.id === userId);
  };

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

  const handleSaveLead = (leadData: Partial<Lead>) => {
    if (selectedLead) {
      // Edit existing lead
      setLeads(leads.map(l => 
        l.id === selectedLead.id 
          ? { ...l, ...leadData }
          : l
      ));
    } else {
      // Add new lead
      const newLead: Lead = {
        id: Date.now().toString(),
        title: leadData.title || '',
        customerId: '1', // Default customer ID
        customerName: leadData.customerName || '',
        value: leadData.value || 0,
        stage: leadData.stage || 'prospect',
        probability: leadData.probability || 10,
        source: leadData.source || 'website',
        assignedTo: '1',
        assignedToName: 'John Doe',
        expectedCloseDate: leadData.expectedCloseDate || new Date(),
        description: leadData.description || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setLeads([...leads, newLead]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedLead) {
      setLeads(leads.filter(l => l.id !== selectedLead.id));
      setSelectedLead(null);
    }
  };

  return (
    <DashboardLayout title="Leads" userRole="admin">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Total Leads
              </CardTitle>
              <Target className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {demoLeads.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Active Leads
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {activeLeads}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Pipeline Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#F59E0B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {formatCurrency(totalValue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Won Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {formatCurrency(wonValue)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Sales Pipeline</h2>
            <p className="text-sm text-[#6B7280]">Track and manage your leads through the sales process</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 overflow-x-auto">
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);

            return (
              <div key={stage.id} className="flex flex-col min-w-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge className={stage.color}>
                      {stage.name}
                    </Badge>
                    <span className="text-sm text-[#6B7280]">
                      ({stageLeads.length})
                    </span>
                  </div>
                  <span className="text-xs text-[#6B7280]">
                    {formatCurrency(stageValue)}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {stageLeads.map((lead) => {
                    const assignedUser = getAssignedUser(lead.assignedTo);
                    return (
                      <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-[#111827] line-clamp-2">
                                {lead.title}
                              </h4>
                              <p className="text-xs text-[#6B7280] mt-1">
                                {lead.customerName}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={assignedUser?.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {assignedUser ? getInitials(assignedUser.name) : 'U'}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-[#6B7280]">
                                  {lead.assignedToName}
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-[#111827]">
                                  {formatCurrency(lead.value)}
                                </p>
                                <p className="text-xs text-[#6B7280]">
                                  {lead.probability}% chance
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#6B7280]">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  Due {formatDate(lead.expectedCloseDate)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{lead.source}</span>
                              </div>
                            </div>

                            {lead.description && (
                              <p className="text-xs text-[#6B7280] line-clamp-2">
                                {lead.description}
                              </p>
                            )}

                            <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleViewLead(lead)}
                                title="View Lead"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleEditLead(lead)}
                                title="Edit Lead"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleDeleteLead(lead)}
                                title="Delete Lead"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  {stageLeads.length === 0 && (
                    <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-6 text-center">
                      <p className="text-sm text-[#6B7280]">No leads in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {selectedLead && (
        <>
          <ViewLeadModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            lead={selectedLead}
          />
          <AddEditLeadModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            lead={selectedLead}
            onSave={handleSaveLead}
          />
        </>
      )}

      <AddEditLeadModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveLead}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Lead"
        message={`Are you sure you want to delete "${selectedLead?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </DashboardLayout>
  );
}
