'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewCustomerModal, AddEditCustomerModal } from '@/components/forms/customer-modals';
import { useToast } from '@/components/ui/toast';
import { 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Building,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  GripVertical,
  User
} from 'lucide-react';
import api from '@/lib/api';
import { formatCurrency, formatDate, getInitials } from '@/lib/utils';
import { Customer, Lead, Task } from '@/types';

// Customer statuses configuration
const customerStatuses = [
  { id: 'prospect', name: 'Prospect', color: 'bg-blue-100 text-blue-800', icon: '👁️' },
  { id: 'active', name: 'Active', color: 'bg-green-100 text-green-800', icon: '✅' },
  { id: 'inactive', name: 'Inactive', color: 'bg-gray-100 text-gray-800', icon: '⏸️' },
];

export default function CustomersPage() {
  const { addToast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    let cancelled = false;
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const params = new URLSearchParams();
        params.append('page', String(page));
        params.append('limit', String(limit));
        if (search) params.append('search', search);
        const { body } = await api.get(`customers?${params.toString()}`);
        const data = body as { result?: { data?: Customer[] }; data?: Customer[] };
        const list = (data?.result?.data || data?.data || []) as Customer[];
        const normalized: Customer[] = list.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone ?? '',
          company: typeof c.company === 'string' ? c.company : (c.company as unknown as { name?: string })?.name || '',
          status: c.status ?? 'active',
          source: c.source ?? 'website',
          tags: c.tags ?? [],
          totalValue: c.totalValue ?? 0,
          createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
          lastContactAt: c.lastContactAt ? new Date(c.lastContactAt) : new Date(),
          notes: c.notes ?? '',
          avatar: c.avatar,
        }));
        if (!cancelled) setCustomers(normalized);
      } catch (e: unknown) {
        if (!cancelled) setError((e as Error)?.message || 'Failed to load customers');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchCustomers();
    return () => {
      cancelled = true;
    };
  }, [page, limit, search]);

  const totalValue = useMemo(() => customers.reduce((sum, customer) => sum + (customer.totalValue || 0), 0), [customers]);
  const activeCustomers = useMemo(() => customers.filter(c => c.status === 'active').length, [customers]);

  // Drag and drop functionality
  useEffect(() => {
    const handleCustomerDropped = async (event: Event) => {
      const customEvent = event as CustomEvent;
      const { customerId, newStatus } = customEvent.detail;
      
      
      try {
        const customer = customers.find(c => c.id === customerId);
        if (!customer) return;

        // Optimistic UI update
        setCustomers(customers.map(c => 
          c.id === customerId 
            ? { ...c, status: newStatus as 'active' | 'inactive' | 'prospect' }
            : c
        ));

        // Update customer status via API
        await api.patch(`customers/${customerId}`, {
          json: { status: newStatus }
        });

        addToast(`Customer moved to ${customerStatuses.find(s => s.id === newStatus)?.name} status`, 'success');
      } catch (error) {
        // Revert optimistic update on error
        const originalCustomer = customers.find(c => c.id === customerId);
        if (originalCustomer) {
          setCustomers(customers.map(c => 
            c.id === customerId 
              ? { ...c, status: originalCustomer.status }
              : c
          ));
        }
        console.error('Failed to update customer status:', error);
        addToast('Failed to update customer status', 'error');
      }
    };

    window.addEventListener('customer-dropped', handleCustomerDropped as EventListener);
    return () => {
      window.removeEventListener('customer-dropped', handleCustomerDropped as EventListener);
    };
  }, [customers, addToast]);

  // Customer Table Row Component
  const CustomerTableRow = ({ customer }: { customer: Customer }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState<{ [key: string]: boolean }>({});

    const handleDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('customerId', customer.id);
      e.dataTransfer.setData('customer', JSON.stringify(customer));
      setIsDragging(true);
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent, status: string) => {
      e.preventDefault();
      setIsOver(prev => ({ ...prev, [status]: true }));
    };

    const handleDragLeave = (e: React.DragEvent, status: string) => {
      e.preventDefault();
      setIsOver(prev => ({ ...prev, [status]: false }));
    };

    const handleDrop = (e: React.DragEvent, newStatus: string) => {
      e.preventDefault();
      setIsOver(prev => ({ ...prev, [newStatus]: false }));
      
      const customerId = e.dataTransfer.getData('customerId');
      
      if (customerId && newStatus !== customer.status) {
        window.dispatchEvent(new CustomEvent('customer-dropped', {
          detail: { customerId, newStatus }
        }));
      }
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-grab active:cursor-grabbing group hover:ring-2 hover:ring-blue-100">
        {/* Customer Info Row */}
        <div className="grid grid-cols-4 gap-4 p-4">
          {/* Customer Details Column */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback>
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {customer.name}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {customer.email}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {typeof customer.company === 'string' ? customer.company : (customer.company as unknown as { name?: string })?.name || 'N/A'}
              </p>
            </div>
          </div>

          {/* Status Columns */}
          {customerStatuses.map((status) => {
            const isCurrentStatus = customer.status === status.id;
            const isHovered = isOver[status.id];
            
            return (
              <div
                key={status.id}
                className={`relative min-h-[80px] border-2 border-dashed border-gray-200 rounded-lg p-2 transition-all duration-200 ${
                  isCurrentStatus 
                    ? 'bg-blue-50 border-l-4 border-l-blue-400' 
                    : 'bg-gray-50 hover:bg-green-50'
                } ${
                  isHovered ? 'border-2 border-green-300 scale-105 shadow-md' : ''
                }`}
                draggable={isCurrentStatus}
                onDragStart={isCurrentStatus ? handleDragStart : undefined}
                onDragEnd={isCurrentStatus ? handleDragEnd : undefined}
                onDragOver={(e) => handleDragOver(e, status.id)}
                onDragLeave={(e) => handleDragLeave(e, status.id)}
                onDrop={(e) => handleDrop(e, status.id)}
              >
                {isCurrentStatus ? (
                  <div className={`${isDragging ? 'opacity-60 scale-105 shadow-xl border-blue-400 z-50' : ''} transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{status.icon}</span>
                      <GripVertical className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs text-gray-600 mb-1">Drag to move</div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.name}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <span className="text-2xl mb-1">{isHovered ? '🎯' : '📁'}</span>
                    <div className="text-xs text-gray-500">
                      {isHovered ? 'Drop to Move' : 'Drop here'}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${customer.status === 'active' ? 'bg-green-500' : customer.status === 'prospect' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
              <span className="text-xs text-gray-500">
                Added {formatDate(customer.createdAt)}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <DollarSign className="h-3 w-3" />
              <span>{formatCurrency(customer.totalValue)}</span>
            </div>
            {customer.phone && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Phone className="h-3 w-3" />
                <span>{customer.phone}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs hover:bg-white hover:shadow-sm transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleViewCustomer(customer);
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs hover:bg-white hover:shadow-sm transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleEditCustomer(customer);
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs hover:bg-white hover:shadow-sm transition-all duration-200 text-red-600 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCustomer(customer);
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setViewModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditModalOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDeleteModalOpen(true);
  };

  const handleSaveCustomer = async (customerData: Partial<Customer>) => {
    if (selectedCustomer) {
      // Edit existing customer
      setCustomers(customers.map(c => 
        c.id === selectedCustomer.id 
          ? { ...c, ...customerData }
          : c
      ));
    } else {
      // Add new customer
      try {
        const payload = {
          name: customerData.name || '',
          email: customerData.email || '',
          phone: customerData.phone || '',
          status: customerData.status || 'active',
          source: customerData.source || 'website',
          tags: customerData.tags || [],
          ownerId: (customerData as { ownerId?: string }).ownerId,
        };

        const { body } = await api.post('customers', { json: payload });
        const data = body as { result?: { customer?: Customer; data?: Customer[] }; customer?: Customer; data?: Customer[] };
        const c = (data?.result?.customer || data?.customer || data?.result || data) as Customer;

        const created: Customer = {
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone ?? '',
          company: typeof c.company === 'string' ? c.company : (c.company as unknown as { name?: string })?.name || '',
          status: c.status ?? 'active',
          source: c.source ?? 'website',
          tags: c.tags ?? [],
          totalValue: c.totalValue ?? 0,
          createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
          lastContactAt: c.lastContactAt ? new Date(c.lastContactAt) : new Date(),
          notes: c.notes ?? '',
          avatar: c.avatar,
        };

        setCustomers([...customers, created]);
      } catch (e) {
        console.error('Failed to create customer', e);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedCustomer) {
      try {
        // Check for related leads and tasks before deleting
        const { body: leadsResponse } = await api.get(`leads?customerId=${selectedCustomer.id}`);
        const leadsData = leadsResponse as { result?: { data?: Lead[] }; data?: Lead[] };
        const relatedLeads = (leadsData?.result?.data || leadsData?.data || []) as Lead[];
        
        const { body: tasksResponse } = await api.get(`tasks?relatedToType=customer&relatedToId=${selectedCustomer.id}`);
        const tasksData = tasksResponse as { result?: { data?: Task[] }; data?: Task[] };
        const relatedTasks = (tasksData?.result?.data || tasksData?.data || []) as Task[];

        if (relatedLeads.length > 0 || relatedTasks.length > 0) {
          const message = `This customer has ${relatedLeads.length} leads and ${relatedTasks.length} tasks. Deleting will also remove these related records. Are you sure?`;
          if (!confirm(message)) {
            return;
          }
        }

        await api.delete(`customers/${selectedCustomer.id}`);
        setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
        addToast('Customer and related records deleted successfully', 'success');
      } catch (error: unknown) {
        console.error('Failed to delete customer:', error);
        addToast('Failed to delete customer', 'error');
      }
    }
    setDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <DashboardLayout title="Customers" userRole="admin">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Total Customers
              </CardTitle>
              <Building className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {customers.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Active Customers
              </CardTitle>
              <Building className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {activeCustomers}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Total Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#F59E0B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {formatCurrency(totalValue)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle>All Customers</CardTitle>
                <CardDescription>
                  Manage your customer relationships and track their value
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button onClick={() => {
                  setSelectedCustomer(null);
                  setAddModalOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
            )}
            {/* Search */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">Customer Info</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {customers.length} total customers
                </div>
              </div>
              
              {customerStatuses.map((status) => {
                const statusCustomers = customers.filter(c => c.status === status.id);
                const statusValue = statusCustomers.reduce((sum, c) => sum + (c.totalValue || 0), 0);
                
                return (
                  <div key={status.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{status.icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{status.name}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {statusCustomers.length} customers • {formatCurrency(statusValue)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Customers Table */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-sm text-[#6B7280]">Loading customers...</div>
              ) : customers.length === 0 ? (
                <div className="text-sm text-[#6B7280]">No customers found.</div>
              ) : customers.map((customer) => (
                <CustomerTableRow key={customer.id} customer={customer} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {selectedCustomer && (
        <>
          <ViewCustomerModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            customer={selectedCustomer}
          />
          <AddEditCustomerModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            customer={selectedCustomer}
            onSave={handleSaveCustomer}
          />
        </>
      )}

      <AddEditCustomerModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveCustomer}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${selectedCustomer?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </DashboardLayout>
  );
}
