export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'super_admin' | 'admin' | 'manager' | 'employee';
  companyId: string;
  phone?: string;
  department?: string;
  managerId?: string; // ID of the manager this employee reports to
  managerName?: string; // Cached manager name for display
  createdAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'enterprise';
  subscription: 'free' | 'basic' | 'pro' | 'enterprise';
  createdAt: Date;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'prospect';
  source: 'website' | 'referral' | 'social' | 'cold_call' | 'email';
  tags: string[];
  assignedTo?: string;
  createdAt: Date;
  lastContactAt?: Date;
  totalValue: number;
  notes?: string;
}

export interface Lead {
  id: string;
  title: string;
  customerId?: string; // Optional - allows leads without customers (prospects)
  customerName?: string;
  value: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  assignedTo: string;
  assignedToName: string;
  assignedUser?: {
    id: string;
    name: string;
    role: 'super_admin' | 'admin' | 'manager' | 'employee';
    email: string;
    department?: string;
    avatar?: string;
  };
  source: string;
  createdAt: Date;
  updatedAt: Date;
  expectedCloseDate: Date;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'call' | 'email' | 'meeting' | 'follow_up' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo: string;
  assignedToName: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  relatedTo?: {
    type: 'customer' | 'lead';
    id: string;
    name: string;
  };
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task_created' | 'deal_updated';
  title: string;
  description?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  relatedTo?: {
    type: 'customer' | 'lead' | 'task';
    id: string;
    name: string;
  };
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  maxUsers: number;
  isPopular?: boolean;
}

export interface KPIMetric {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  format: 'number' | 'currency' | 'percentage';
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: unknown;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: string[];
  type: 'text' | 'image' | 'file' | 'system';
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isArchived: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  title?: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalLeads: number;
  totalRevenue: number;
  conversionRate: number;
  activeUsers: number;
  monthlyGrowth: number;
}

// Document Assignment Types
export type DocumentAccessType = 'READ_ONLY' | 'EDIT';

export interface DocumentAssignment {
  id: string;
  documentId: string;
  userId: string;
  accessType: DocumentAccessType;
  assignedBy: string;
  assignedAt: Date;
  isActive: boolean;
  removedAt?: Date;
  removedBy?: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: 'super_admin' | 'admin' | 'manager' | 'employee';
    department?: string;
  };
  assignedByUser: {
    id: string;
    name: string;
    email: string;
  };
  removedByUser?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface DocumentAssignmentStats {
  total: number;
  active: number;
  removed: number;
  readOnly: number;
  edit: number;
}

export interface AssignmentInput {
  userId: string;
  accessType?: DocumentAccessType;
}

// Document Activity Types
export interface DocumentActivity {
  id: string;
  action: string;
  actionLabel: string;
  actionIcon: string;
  actor: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  document?: {
    id: string;
    name: string;
    mimeType: string;
    url: string;
  };
  timestamp: string;
  details?: Record<string, any>;
}

export interface DocumentActivityStats {
  total: number;
  byAction: Record<string, number>;
  byDay: Record<string, number>;
  topUsers: Array<{
    userId: string;
    count: number;
  }>;
  dateRange: {
    start: string;
    end: string;
  };
}