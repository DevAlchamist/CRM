'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewTaskModal, AddEditTaskModal } from '@/components/forms/task-modals';
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
  Trash2
} from 'lucide-react';
import { demoTasks, demoUsers } from '@/data/demo';
import { formatDate, getPriorityColor, getRelativeTime, getInitials, isOverdue, calculateDaysUntil } from '@/lib/utils';
import { Task } from '@/types';

export default function TasksPage() {
  const [tasks, setTasks] = useState(demoTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

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

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (selectedTask) {
      // Edit existing task
      setTasks(tasks.map(t => 
        t.id === selectedTask.id 
          ? { ...t, ...taskData }
          : t
      ));
    } else {
      // Add new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title || '',
        description: taskData.description || '',
        type: taskData.type || 'other',
        priority: taskData.priority || 'medium',
        status: taskData.status || 'pending',
        assignedTo: '1',
        assignedToName: taskData.assignedToName || 'John Doe',
        dueDate: taskData.dueDate || new Date(),
        relatedTo: taskData.relatedTo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      setTasks(tasks.filter(t => t.id !== selectedTask.id));
      setSelectedTask(null);
    }
  };
  const overdueTasks = tasks.filter(task => task.status !== 'completed' && isOverdue(task.dueDate)).length;

  const getAssignedUser = (userId: string) => {
    return demoUsers.find(user => user.id === userId);
  };

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

  return (
    <DashboardLayout title="Tasks" userRole="admin">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Total Tasks
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {totalTasks}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Completed
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {completedTasks}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-[#F59E0B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {pendingTasks}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Overdue
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-[#DC2626]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {overdueTasks}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle>All Tasks</CardTitle>
                <CardDescription>
                  Track and manage your team&apos;s tasks and activities
                </CardDescription>
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
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => {
                const assignedUser = getAssignedUser(task.assignedTo);
                const TaskIcon = getTaskIcon(task.type);
                const StatusIcon = getTaskStatusIcon(task.status);
                const daysUntil = calculateDaysUntil(task.dueDate);
                const isTaskOverdue = isOverdue(task.dueDate);

                return (
                  <div
                    key={task.id}
                    className="flex items-center space-x-4 p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <TaskIcon className="h-5 w-5 text-[#6B7280]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-semibold text-[#111827] truncate">
                          {task.title}
                        </h3>
                        <Badge 
                          className={`text-xs ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </Badge>
                        <Badge 
                          variant={task.status === 'completed' ? 'success' : 'secondary'}
                          className="text-xs"
                        >
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      {task.description && (
                        <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      {task.relatedTo && (
                        <p className="text-xs text-[#6B7280] mt-1">
                          Related to: {task.relatedTo.type} - {task.relatedTo.name}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={assignedUser?.avatar} />
                          <AvatarFallback className="text-xs">
                            {assignedUser ? getInitials(assignedUser.name) : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#111827]">
                            {task.assignedToName}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-[#6B7280]" />
                          <span className={`text-sm ${
                            isTaskOverdue ? 'text-[#DC2626] font-semibold' : 
                            daysUntil <= 1 ? 'text-[#F59E0B]' : 
                            'text-[#6B7280]'
                          }`}>
                            {isTaskOverdue ? 'Overdue' : getRelativeTime(task.dueDate)}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280]">
                          Due {formatDate(task.dueDate)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-[#6B7280] hover:text-[#111827]"
                        >
                          <StatusIcon className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleViewTask(task)}
                            title="View Task"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleEditTask(task)}
                            title="Edit Task"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleDeleteTask(task)}
                            title="Delete Task"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
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
