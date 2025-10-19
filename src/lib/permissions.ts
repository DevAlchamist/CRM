// Role hierarchy and permissions system
export type UserRole = 'super_admin' | 'admin' | 'manager' | 'employee';

// Feature/Resource types
export type Feature =
  // Dashboard Features
  | 'view_dashboard'
  | 'view_analytics'
  | 'view_reports'
  
  // Customer Management
  | 'view_customers'
  | 'create_customer'
  | 'edit_customer'
  | 'delete_customer'
  | 'export_customers'
  
  // Lead Management
  | 'view_leads'
  | 'create_lead'
  | 'edit_lead'
  | 'delete_lead'
  | 'assign_lead'
  | 'convert_lead'
  
  // Task Management
  | 'view_tasks'
  | 'create_task'
  | 'edit_task'
  | 'delete_task'
  | 'assign_task'
  | 'view_all_tasks'
  
  // Employee Management
  | 'view_employees'
  | 'create_employee'
  | 'edit_employee'
  | 'delete_employee'
  | 'manage_roles'
  
  // Calendar & Events
  | 'view_calendar'
  | 'create_event'
  | 'edit_event'
  | 'delete_event'
  | 'view_all_events'
  
  // Documents
  | 'view_documents'
  | 'upload_document'
  | 'edit_document'
  | 'delete_document'
  | 'share_document'
  
  // Messages
  | 'view_messages'
  | 'send_message'
  | 'delete_message'
  
  // Settings
  | 'view_settings'
  | 'edit_profile'
  | 'change_password'
  | 'edit_company_settings'
  | 'manage_integrations'
  | 'manage_billing'
  
  // Reports
  | 'view_reports'
  | 'create_report'
  | 'export_report'
  | 'view_financial_reports'
  
  // Admin Features
  | 'view_admin_panel'
  | 'manage_users'
  | 'manage_companies'
  | 'view_system_logs'
  | 'manage_permissions';

// Permission matrix: Define what each role can do
export const ROLE_PERMISSIONS: Record<UserRole, Feature[]> = {
  // Employee: Basic access
  employee: [
    'view_dashboard',
    'view_customers',
    'view_leads',
    'create_lead',
    'edit_lead',
    'view_tasks',
    'create_task',
    'edit_task',
    'view_calendar',
    'create_event',
    'edit_event',
    'view_documents',
    'upload_document',
    'view_messages',
    'send_message',
    'view_settings',
    'edit_profile',
    'change_password',
  ],
  
  // Manager: Employee + team management
  manager: [
    // All employee permissions
    'view_dashboard',
    'view_analytics',
    'view_customers',
    'create_customer',
    'edit_customer',
    'view_leads',
    'create_lead',
    'edit_lead',
    'delete_lead',
    'assign_lead',
    'convert_lead',
    'view_tasks',
    'create_task',
    'edit_task',
    'delete_task',
    'assign_task',
    'view_all_tasks',
    'view_employees',
    'view_calendar',
    'create_event',
    'edit_event',
    'delete_event',
    'view_all_events',
    'view_documents',
    'upload_document',
    'edit_document',
    'delete_document',
    'share_document',
    'view_messages',
    'send_message',
    'delete_message',
    'view_settings',
    'edit_profile',
    'change_password',
    'view_reports',
    'create_report',
    'export_report',
  ],
  
  // Admin: Manager + company management
  admin: [
    // All manager permissions
    'view_dashboard',
    'view_analytics',
    'view_reports',
    'view_customers',
    'create_customer',
    'edit_customer',
    'delete_customer',
    'export_customers',
    'view_leads',
    'create_lead',
    'edit_lead',
    'delete_lead',
    'assign_lead',
    'convert_lead',
    'view_tasks',
    'create_task',
    'edit_task',
    'delete_task',
    'assign_task',
    'view_all_tasks',
    'view_employees',
    'create_employee',
    'edit_employee',
    'delete_employee',
    'manage_roles',
    'view_calendar',
    'create_event',
    'edit_event',
    'delete_event',
    'view_all_events',
    'view_documents',
    'upload_document',
    'edit_document',
    'delete_document',
    'share_document',
    'view_messages',
    'send_message',
    'delete_message',
    'view_settings',
    'edit_profile',
    'change_password',
    'edit_company_settings',
    'manage_integrations',
    'manage_billing',
    'view_reports',
    'create_report',
    'export_report',
    'view_financial_reports',
  ],
  
  // Super Admin: Full access
  super_admin: [
    // All admin permissions
    'view_dashboard',
    'view_analytics',
    'view_reports',
    'view_customers',
    'create_customer',
    'edit_customer',
    'delete_customer',
    'export_customers',
    'view_leads',
    'create_lead',
    'edit_lead',
    'delete_lead',
    'assign_lead',
    'convert_lead',
    'view_tasks',
    'create_task',
    'edit_task',
    'delete_task',
    'assign_task',
    'view_all_tasks',
    'view_employees',
    'create_employee',
    'edit_employee',
    'delete_employee',
    'manage_roles',
    'view_calendar',
    'create_event',
    'edit_event',
    'delete_event',
    'view_all_events',
    'view_documents',
    'upload_document',
    'edit_document',
    'delete_document',
    'share_document',
    'view_messages',
    'send_message',
    'delete_message',
    'view_settings',
    'edit_profile',
    'change_password',
    'edit_company_settings',
    'manage_integrations',
    'manage_billing',
    'view_reports',
    'create_report',
    'export_report',
    'view_financial_reports',
    // Super admin only
    'view_admin_panel',
    'manage_users',
    'manage_companies',
    'view_system_logs',
    'manage_permissions',
  ],
};

// Role hierarchy for comparison
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  employee: 0,
  manager: 1,
  admin: 2,
  super_admin: 3,
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, feature: Feature): boolean {
  return ROLE_PERMISSIONS[role]?.includes(feature) ?? false;
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole, features: Feature[]): boolean {
  return features.every(feature => hasPermission(role, feature));
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, features: Feature[]): boolean {
  return features.some(feature => hasPermission(role, feature));
}

/**
 * Check if a role is equal to or higher than another role
 */
export function hasRoleLevel(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Get all permissions for a role
 */
export function getPermissionsForRole(role: UserRole): Feature[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    employee: 'Employee',
    manager: 'Manager',
    admin: 'Admin',
    super_admin: 'Super Admin',
  };
  return roleNames[role] || role;
}

/**
 * Get feature display name
 */
export function getFeatureDisplayName(feature: Feature): string {
  return feature
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}






