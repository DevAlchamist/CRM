'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Mail, 
  Building,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import api from '@/lib/api';
import { formatCurrency, formatDate, getStatusColor, getInitials } from '@/lib/utils';
import { Customer, Lead, Task } from '@/types';

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
          company: c.company || '',
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
          company: c.company || '',
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

            {/* Customers Table */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-sm text-[#6B7280]">Loading customers...</div>
              ) : customers.length === 0 ? (
                <div className="text-sm text-[#6B7280]">No customers found.</div>
              ) : customers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center space-x-4 p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={customer.avatar} />
                    <AvatarFallback>
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-semibold text-[#111827] truncate">
                        {customer.name}
                      </h3>
                      <Badge className={`text-xs ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6B7280] truncate">
                      {customer.company || customer.email}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      {customer.phone && (
                        <div className="flex items-center space-x-1 text-xs text-[#6B7280]">
                          <Phone className="h-3 w-3" />
                          <span>{customer.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-xs text-[#6B7280]">
                        <Mail className="h-3 w-3" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-[#6B7280]">
                        <Calendar className="h-3 w-3" />
                        <span>Added {formatDate(customer.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#111827]">
                        {formatCurrency(customer.totalValue)}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        Total Value
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {customer.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewCustomer(customer)}
                        title="View Customer"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditCustomer(customer)}
                        title="Edit Customer"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteCustomer(customer)}
                        title="Delete Customer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
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
