'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewCustomerModal, AddEditCustomerModal } from '@/components/forms/customer-modals';
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
import { demoCustomers } from '@/data/demo';
import { formatCurrency, formatDate, getStatusColor, getInitials } from '@/lib/utils';
import { Customer } from '@/types';

export default function CustomersPage() {
  const [customers, setCustomers] = useState(demoCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const totalValue = customers.reduce((sum, customer) => sum + customer.totalValue, 0);
  const activeCustomers = customers.filter(c => c.status === 'active').length;

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

  const handleSaveCustomer = (customerData: Partial<Customer>) => {
    if (selectedCustomer) {
      // Edit existing customer
      setCustomers(customers.map(c => 
        c.id === selectedCustomer.id 
          ? { ...c, ...customerData }
          : c
      ));
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Date.now().toString(),
        name: customerData.name || '',
        email: customerData.email || '',
        phone: customerData.phone || '',
        company: customerData.company || '',
        status: 'active',
        source: 'website',
        tags: customerData.tags || [],
        totalValue: 0,
        createdAt: new Date(),
        lastContactAt: new Date(),
        notes: customerData.notes || '',
      };
      setCustomers([...customers, newCustomer]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
      setSelectedCustomer(null);
    }
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
                {demoCustomers.length}
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
            {/* Search */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Customers Table */}
            <div className="space-y-4">
              {customers.map((customer) => (
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
