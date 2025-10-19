// Core UI Components
export { Button } from './button';
export { Input } from './input';
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
export { Badge } from './badge';
export { Avatar, AvatarFallback, AvatarImage } from './avatar';
export { Modal, ConfirmModal } from './modal';

// Form Components
export { Select } from './select';
export { Textarea } from './textarea';
export { Checkbox } from './checkbox';
export { Switch } from './switch';

// Data Display Components
export { DataTable } from './data-table';
export { DashboardWidget, MetricCard, StatCard } from './dashboard-widget';
export { Progress, CircularProgress } from './progress';
export { Tooltip } from './tooltip';
export { Tabs } from './tabs';
export { Breadcrumb } from './breadcrumb';

// Feedback Components
export { Notification, NotificationProvider, useNotifications } from './notification';
export { Spinner, LoadingSpinner } from './spinner';
export { ToastProvider, useToast } from './toast';
export type { Toast, ToastType } from './toast';
export { PermissionMessage, InlinePermissionMessage } from './permission-message';

// Layout Components
export { DashboardLayout } from '../layout/dashboard-layout';
export { Header } from '../layout/header';
export { Sidebar } from '../layout/sidebar';

// Form Modals
export { ViewCustomerModal, AddEditCustomerModal } from '../forms/customer-modals';
export { ViewLeadModal, AddEditLeadModal } from '../forms/lead-modals';
export { ViewTaskModal, AddEditTaskModal } from '../forms/task-modals';
export { ViewEmployeeModal, AddEditEmployeeModal } from '../forms/employee-modals';
export { ViewEventModal, AddEditEventModal } from '../forms/event-modals';
export { EditProfileModal, ChangePasswordModal, DeleteAccountModal } from '../forms/settings-modals';
export { ChangePlanModal, PaymentMethodModal, BillingHistoryModal } from '../forms/billing-modals';
export { NotificationSettingsModal } from '../forms/notification-modals';
export { QuickAddCustomerModal, QuickAddLeadModal, QuickAddTaskModal, QuickAddEventModal } from '../forms/quick-action-modals';
export { ViewCompanyModal, EditCompanyModal, ViewUserModal, EditUserModal } from '../forms/admin-modals';
export { ViewDocumentModal, EditDocumentModal, UploadDocumentModal } from '../forms/document-modals';
