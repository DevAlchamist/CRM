'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewTaskModal, AddEditTaskModal } from '@/components/forms/task-modals';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/components/ui/toast';
import { 
  Plus, 
  Filter, 
  CheckSquare, 
  Clock, 
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  GripVertical,
  MoreHorizontal,
  User,
  Flag,
  MessageSquare
} from 'lucide-react';
import api from '@/lib/api';
import { formatDate, getPriorityColor, getRelativeTime, getInitials, isOverdue, calculateDaysUntil } from '@/lib/utils';
import { Task } from '@/types';

// Task Status Configuration
const taskStatuses = [
  { id: 'pending', name: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  { id: 'in_progress', name: 'In Progress', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  { id: 'completed', name: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { id: 'cancelled', name: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
];

// Draggable Task Card Component
interface TaskCardProps {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

// Helper functions for task icons
const getTaskIcon = (type: string) => {
  switch (type) {
    case 'call': return Phone;
    case 'email': return Mail;
    case 'meeting': return Users;
    case 'follow_up': return CheckSquare;
    default: return CheckSquare;
  }
};

const getTaskStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return CheckCircle;
    case 'cancelled': return XCircle;
    case 'in_progress': return Clock;
    default: return AlertCircle;
  }
};

function TaskCard({ task, onView, onEdit, onDelete }: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const TaskIcon = getTaskIcon(task.type);
  const StatusIcon = getTaskStatusIcon(task.status);
  const daysUntil = calculateDaysUntil(task.dueDate);
  const isTaskOverdue = isOverdue(task.dueDate);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify({ taskId: task.id, task }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-60 shadow-xl border-blue-400 scale-105' : ''
      }`}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0 mt-0.5">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {task.title}
            </h4>
            <div className="flex items-center space-x-2 mt-1">
              <TaskIcon className="h-3 w-3 text-gray-400" />
              <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </div>

      {/* Task Description */}
      {task.description && (
        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {/* Task Metadata */}
      <div className="space-y-2">
        {/* Due Date */}
        <div className="flex items-center space-x-2">
          <Calendar className="h-3 w-3 text-gray-400" />
          <span className={`text-xs font-medium ${
            isTaskOverdue ? 'text-red-600' : 
            daysUntil <= 1 ? 'text-yellow-600' : 
            'text-gray-600'
          }`}>
            {isTaskOverdue ? 'Overdue' : getRelativeTime(task.dueDate)}
          </span>
        </div>

        {/* Assigned User */}
        <div className="flex items-center space-x-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src={undefined} />
            <AvatarFallback className="text-xs">
              {task.assignedToName ? getInitials(task.assignedToName) : 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600 truncate">
            {task.assignedToName || 'Unassigned'}
          </span>
        </div>

        {/* Related To */}
        {task.relatedTo && (
          <div className="flex items-center space-x-2">
            <Flag className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-600 truncate">
              {task.relatedTo.type} - {task.relatedTo.name}
            </span>
          </div>
        )}
      </div>

      {/* Task Actions */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onView(task);
            }}
            title="View Task"
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            title="Edit Task"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            title="Delete Task"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
        <StatusIcon className={`h-4 w-4 ${
          task.status === 'completed' ? 'text-green-500' :
          task.status === 'cancelled' ? 'text-red-500' :
          task.status === 'in_progress' ? 'text-blue-500' :
          'text-yellow-500'
        }`} />
      </div>
    </div>
  );
}

// Task Table Row Component
interface TaskTableRowProps {
  task: Task;
  statuses: { id: string; name: string; color: string; icon: any }[];
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

function TaskTableRow({ task, statuses, onView, onEdit, onDelete }: TaskTableRowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const TaskIcon = getTaskIcon(task.type);
  const StatusIcon = getTaskStatusIcon(task.status);
  const daysUntil = calculateDaysUntil(task.dueDate);
  const isTaskOverdue = isOverdue(task.dueDate);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify({ taskId: task.id, task }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
      <div className="grid grid-cols-5 gap-0">
        {/* Task Info Column */}
        <div className="p-4 border-r border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {task.title}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <TaskIcon className="h-3 w-3 text-gray-400" />
                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
              </div>
              {task.description && (
                <p className="text-xs text-gray-600 line-clamp-1 mt-1">
                  {task.description}
                </p>
              )}
              <div className="flex items-center space-x-2 mt-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={undefined} />
                  <AvatarFallback className="text-xs">
                    {task.assignedToName ? getInitials(task.assignedToName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {task.assignedToName || 'Unassigned'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Calendar className="h-3 w-3 text-gray-400" />
                <span className={`text-xs font-medium ${
                  isTaskOverdue ? 'text-red-600' : 
                  daysUntil <= 1 ? 'text-yellow-600' : 
                  'text-gray-600'
                }`}>
                  {isTaskOverdue ? 'Overdue' : getRelativeTime(task.dueDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Columns */}
        {statuses.map((status) => {
          const isCurrentStatus = task.status === status.id;
          const [isOver, setIsOver] = useState(false);

          const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            setIsOver(true);
          };

          const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            setIsOver(false);
          };

          const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            setIsOver(false);
            
            try {
              const data = JSON.parse(e.dataTransfer.getData('application/json'));
              const { taskId } = data;
              
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('task-dropped', {
                  detail: { taskId, task, newStatus: status.id }
                }));
              }
            } catch (error) {
              console.error('Error handling drop:', error);
            }
          };

          return (
            <div
              key={status.id}
              draggable={isCurrentStatus}
              onDragStart={isCurrentStatus ? handleDragStart : undefined}
              onDragEnd={isCurrentStatus ? handleDragEnd : undefined}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-4 border-r border-gray-100 last:border-r-0 min-h-[120px] flex items-center justify-center transition-all duration-200 ${
                isCurrentStatus 
                  ? 'bg-blue-50 border-l-4 border-l-blue-400 cursor-grab active:cursor-grabbing' 
                  : isOver 
                    ? 'bg-green-50 border-2 border-green-300 scale-105 shadow-md' 
                    : 'hover:bg-gray-50 hover:border-gray-300'
              } ${isCurrentStatus && isDragging ? 'opacity-60 shadow-xl border-blue-400 scale-105' : ''}`}
            >
              {isCurrentStatus ? (
                <div className="text-center">
                  <Badge className={`${status.color} mb-2 shadow-sm`}>
                    {status.name}
                  </Badge>
                  <div className="text-xs text-gray-600 font-medium mb-1">
                    ✓ Current Status
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    Drag to move
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">
                    {isOver ? '🎯' : '📁'}
                  </div>
                  <div className={`text-xs font-medium transition-colors ${
                    isOver ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {isOver ? 'Drop to Move' : 'Drop here'}
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
              task.status === 'completed' ? 'bg-green-400' : 
              task.status === 'cancelled' ? 'bg-red-400' : 
              'bg-blue-400'
            }`}></div>
            <span className="text-xs text-gray-600 font-medium capitalize">
              {task.status === 'completed' ? 'Completed' : 
               task.status === 'cancelled' ? 'Cancelled' : 
               task.status === 'in_progress' ? 'In Progress' :
               'Pending'} Task
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Created {formatDate(task.createdAt)}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 text-xs hover:bg-white hover:shadow-sm transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onView(task);
            }}
            title="View Task Details"
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
              onEdit(task);
            }}
            title="Edit Task Information"
          >
            <Edit className="h-3 w-3 mr-1.5" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            title="Delete Task"
          >
            <Trash2 className="h-3 w-3 mr-1.5" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const { user } = useAuth();
  const { can } = usePermissions();
  const { addToast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [assigneeId, setAssigneeId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  // Check permission once outside useEffect to avoid infinite loops
  const canViewAll = can('view_all_tasks');

  useEffect(() => {
    let cancelled = false;
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const params = new URLSearchParams();
        params.append('page', String(page));
        params.append('limit', String(limit));
        if (statusFilter) params.append('status', statusFilter);
        if (assigneeId) params.append('assigneeId', assigneeId);
        
        // If user doesn't have permission to view all tasks, filter by assignedTo
        if (!canViewAll && user?.id) {
          params.append('assignedTo', user.id);
        }
        
        const { body } = await api.get(`tasks?${params.toString()}`);
        const data = body as any;
        const list = (data?.result?.data || data?.data || []) as any[];
        const normalized: Task[] = list.map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description ?? '',
          type: t.type ?? 'other',
          priority: t.priority ?? 'medium',
          status: t.status ?? 'pending',
          assignedTo: t.assignedTo ?? '',
          assignedToName: t.assignedToName ?? '',
          dueDate: t.dueDate ? new Date(t.dueDate) : new Date(),
          relatedTo: t.relatedType && t.relatedId ? { type: t.relatedType, id: t.relatedId, name: t.relatedName ?? '' } : undefined,
          createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
          updatedAt: t.updatedAt ? new Date(t.updatedAt) : new Date(),
        }));
        
        // Client-side filtering as backup (in case backend doesn't support filtering)
        let filteredTasks = normalized;
        if (!canViewAll && user?.id) {
          filteredTasks = normalized.filter(t => 
            t.assignedTo === user.id || t.assignedTo === '' || !t.assignedTo
          );
        }
        
        if (!cancelled) setTasks(filteredTasks);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load tasks');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchTasks();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, statusFilter, assigneeId, user?.id, canViewAll]);

  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const completedTasks = useMemo(() => tasks.filter(task => task.status === 'completed').length, [tasks]);
  const pendingTasks = useMemo(() => tasks.filter(task => task.status === 'pending').length, [tasks]);

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setViewModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (selectedTask) {
        // Edit existing task
        const payload = {
          title: taskData.title,
          description: taskData.description,
          type: taskData.type,
          priority: taskData.priority,
          status: taskData.status,
          assignedTo: taskData.assignedTo,
          dueDate: taskData.dueDate?.toISOString(),
          relatedType: taskData.relatedTo?.type,
          relatedId: taskData.relatedTo?.id,
        };

        const { body } = await api.patch(`tasks/${selectedTask.id}`, { json: payload });
        const data = body as any;
        const updatedTask = (data?.result?.task || data?.result || data) as any;

        const normalized: Task = {
          id: updatedTask.id,
          title: updatedTask.title,
          description: updatedTask.description ?? '',
          type: updatedTask.type,
          priority: updatedTask.priority,
          status: updatedTask.status,
          assignedTo: updatedTask.assignedTo ?? '',
          assignedToName: updatedTask.assignedToName ?? '',
          dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate) : new Date(),
          relatedTo: updatedTask.relatedTo,
          createdAt: updatedTask.createdAt ? new Date(updatedTask.createdAt) : new Date(),
          updatedAt: updatedTask.updatedAt ? new Date(updatedTask.updatedAt) : new Date(),
        };

        setTasks(tasks.map(t => t.id === selectedTask.id ? normalized : t));
        addToast('Task updated successfully', 'success');
      } else {
        // Add new task
        const payload = {
          title: taskData.title,
          description: taskData.description,
          type: taskData.type,
          priority: taskData.priority,
          status: taskData.status,
          assignedTo: taskData.assignedTo,
          dueDate: taskData.dueDate?.toISOString(),
          relatedType: taskData.relatedTo?.type,
          relatedId: taskData.relatedTo?.id,
        };

        const { body } = await api.post('tasks', { json: payload });
        const data = body as any;
        const newTask = (data?.result?.task || data?.result || data) as any;

        const normalized: Task = {
          id: newTask.id,
          title: newTask.title,
          description: newTask.description ?? '',
          type: newTask.type,
          priority: newTask.priority,
          status: newTask.status,
          assignedTo: newTask.assignedTo ?? '',
          assignedToName: newTask.assignedToName ?? '',
          dueDate: newTask.dueDate ? new Date(newTask.dueDate) : new Date(),
          relatedTo: newTask.relatedTo,
          createdAt: newTask.createdAt ? new Date(newTask.createdAt) : new Date(),
          updatedAt: newTask.updatedAt ? new Date(newTask.updatedAt) : new Date(),
        };

        setTasks([...tasks, normalized]);
        addToast('Task created successfully', 'success');
      }
    } catch (e) {
      console.error('Failed to save task', e);
      addToast('Failed to save task', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedTask) {
      try {
        await api.delete(`tasks/${selectedTask.id}`);
        setTasks(tasks.filter(t => t.id !== selectedTask.id));
        setSelectedTask(null);
        addToast('Task deleted successfully', 'success');
      } catch (e) {
        console.error('Failed to delete task', e);
        addToast('Failed to delete task', 'error');
      }
    }
  };
  const overdueTasks = tasks.filter(task => task.status !== 'completed' && isOverdue(task.dueDate)).length;

  // Drag and Drop Handlers
  useEffect(() => {
    const handleTaskDropped = async (event: Event) => {
      const customEvent = event as CustomEvent;
      const { taskId, task, newStatus } = customEvent.detail;
      
      // Find the task being moved
      const taskToUpdate = tasks.find(t => t.id === taskId);
      if (!taskToUpdate || taskToUpdate.status === newStatus) return;

      // Update the task's status optimistically
      const updatedTasks = tasks.map(t => 
        t.id === taskId 
          ? { ...t, status: newStatus as any }
          : t
      );
      setTasks(updatedTasks);

      try {
        // Update the task status on the server
        await api.patch(`tasks/${taskId}`, {
          json: { status: newStatus }
        });
        
        addToast(`Task moved to ${taskStatuses.find(s => s.id === newStatus)?.name} status`, 'success');
      } catch (error) {
        console.error('Failed to update task status:', error);
        // Revert the optimistic update
        setTasks(tasks);
        addToast('Failed to update task status', 'error');
      }
    };

    window.addEventListener('task-dropped', handleTaskDropped);
    return () => {
      window.removeEventListener('task-dropped', handleTaskDropped);
    };
  }, [tasks, addToast]);

  const getTasksByStatus = (statusId: string) => {
    return tasks.filter(task => task.status === statusId);
  };


  return (
    <DashboardLayout title="Tasks" userRole="admin">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Tasks
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {totalTasks}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Completed
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {completedTasks}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {pendingTasks}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Overdue
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {overdueTasks}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Table Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Task Management</h2>
            <p className="text-sm text-gray-500">Drag and drop tasks between status columns to update their progress</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => {
              setSelectedTask(null);
              setAddModalOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-0">
              {/* Task Info Header */}
              <div className="p-4 border-r border-gray-200">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    📋 Task Information
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {tasks.length} total tasks
                  </div>
                </div>
              </div>
              
              {/* Status Headers */}
              {taskStatuses.map((status) => {
                const statusTasks = getTasksByStatus(status.id);
                
                return (
                  <div key={status.id} className="p-4 border-r border-gray-200 last:border-r-0">
                    <div className="text-center">
                      <Badge className={`${status.color} mb-2`}>
                        {status.name}
                      </Badge>
                      <div className="text-sm font-medium text-gray-900">
                        {statusTasks.length} tasks
                      </div>
                      <div className="text-xs text-gray-500">
                        {status.name} Status
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
                <div className="text-sm text-gray-500">Loading tasks...</div>
              </div>
            ) : tasks.length > 0 ? (
              <div className="space-y-2 p-4">
                {tasks.map((task, index) => (
                  <TaskTableRow
                    key={task.id}
                    task={task}
                    statuses={taskStatuses}
                    onView={handleViewTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">No tasks found</p>
                  <p className="text-xs text-gray-400">Create your first task to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedTask && (
        <>
          <ViewTaskModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            task={selectedTask}
          />
          <AddEditTaskModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            task={selectedTask}
            onSave={handleSaveTask}
          />
        </>
      )}

      <AddEditTaskModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveTask}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${selectedTask?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </DashboardLayout>
  );
}
