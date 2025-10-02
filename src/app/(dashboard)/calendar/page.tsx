'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewEventModal, AddEditEventModal } from '@/components/forms/event-modals';
import { 
  Calendar, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Users,
  MapPin,
  Video,
  Phone,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { demoUsers } from '@/data/demo';
import { getInitials, formatDate, formatDateTime } from '@/lib/utils';

export default function CalendarPage() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Sample events for the current month
  const events = [
    {
      id: '1',
      title: 'Acme Corp Demo Call',
      type: 'demo',
      start: new Date(2024, 11, 3, 14, 0), // Dec 3, 2024, 2:00 PM
      end: new Date(2024, 11, 3, 15, 0),
      attendees: [demoUsers[0], demoUsers[1]],
      location: 'Zoom Meeting',
      description: 'Demo call with Acme Corporation to showcase our enterprise features',
    },
    {
      id: '2',
      title: 'Team Standup',
      type: 'meeting',
      start: new Date(2024, 11, 4, 9, 0), // Dec 4, 2024, 9:00 AM
      end: new Date(2024, 11, 4, 9, 30),
      attendees: [demoUsers[0], demoUsers[1], demoUsers[2]],
      location: 'Conference Room A',
      description: 'Daily team standup meeting',
    },
    {
      id: '3',
      title: 'Follow-up Call with StartupIO',
      type: 'call',
      start: new Date(2024, 11, 5, 11, 0), // Dec 5, 2024, 11:00 AM
      end: new Date(2024, 11, 5, 11, 30),
      attendees: [demoUsers[2]],
      location: 'Phone Call',
      description: 'Follow-up call to discuss proposal details',
    },
    {
      id: '4',
      title: 'Sales Review Meeting',
      type: 'meeting',
      start: new Date(2024, 11, 6, 15, 0), // Dec 6, 2024, 3:00 PM
      end: new Date(2024, 11, 6, 16, 0),
      attendees: [demoUsers[0], demoUsers[1]],
      location: 'Conference Room B',
      description: 'Monthly sales review and planning session',
    },
  ];

  // Modal state
  const [eventsList, setEventsList] = useState(events);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewEvent = (event: any) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteEvent = (event: any) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveEvent = (eventData: any) => {
    if (selectedEvent) {
      // Edit existing event
      setEventsList(eventsList.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, ...eventData }
          : e
      ));
    } else {
      // Add new event
      const newEvent = {
        id: Date.now().toString(),
        ...eventData,
      };
      setEventsList([...eventsList, newEvent]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedEvent) {
      setEventsList(eventsList.filter(e => e.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'demo': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting': return 'bg-green-100 text-green-800 border-green-200';
      case 'call': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'demo': return Video;
      case 'meeting': return Users;
      case 'call': return Phone;
      default: return Calendar;
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    // const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <DashboardLayout title="Calendar" userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Calendar</h1>
            <p className="text-[#6B7280]">Manage your schedule and meetings</p>
          </div>
          <Button onClick={() => {
            setSelectedEvent(null);
            setAddModalOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">Today</Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-[#6B7280]">
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, index) => {
                  const isCurrentMonth = day.getMonth() === currentMonth;
                  const isToday = day.toDateString() === new Date().toDateString();
                  const dayEvents = eventsList.filter(event => 
                    event.start.toDateString() === day.toDateString()
                  );

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border border-[#E5E7EB] ${
                        isCurrentMonth ? 'bg-white' : 'bg-[#F9FAFB]'
                      } ${isToday ? 'bg-[#2563EB] bg-opacity-10' : ''}`}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        isCurrentMonth ? 'text-[#111827]' : 'text-[#9CA3AF]'
                      } ${isToday ? 'text-[#2563EB]' : ''}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => {
                          const EventIcon = getEventTypeIcon(event.type);
                          return (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded border ${getEventTypeColor(event.type)} truncate`}
                              title={event.title}
                            >
                              <div className="flex items-center space-x-1">
                                <EventIcon className="h-3 w-3" />
                                <span className="truncate">{event.title}</span>
                              </div>
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-[#6B7280]">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventsList.slice(0, 5).map((event) => {
                  const EventIcon = getEventTypeIcon(event.type);
                  return (
                    <div key={event.id} className="border border-[#E5E7EB] rounded-lg p-3">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                          <EventIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-[#111827] truncate">
                            {event.title}
                          </h4>
                          <div className="flex items-center space-x-1 text-xs text-[#6B7280] mt-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDateTime(event.start)}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-[#6B7280] mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-[#6B7280] mt-1">
                            <Users className="h-3 w-3" />
                            <span>{event.attendees.length} attendees</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleViewEvent(event)}
                            title="View Event"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleEditEvent(event)}
                            title="Edit Event"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleDeleteEvent(event)}
                            title="Delete Event"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Events Detail */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardDescription>
              {formatDate(new Date())} - {eventsList.filter(e => 
                e.start.toDateString() === new Date().toDateString()
              ).length} events scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events
                .filter(event => event.start.toDateString() === new Date().toDateString())
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .map((event) => {
                  const EventIcon = getEventTypeIcon(event.type);
                  return (
                    <div key={event.id} className="flex items-center space-x-4 p-4 border border-[#E5E7EB] rounded-lg">
                      <div className={`p-3 rounded-lg ${getEventTypeColor(event.type)}`}>
                        <EventIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-[#111827]">{event.title}</h3>
                          <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#6B7280] mt-1">{event.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-xs text-[#6B7280]">
                            <Clock className="h-3 w-3" />
                            <span>{formatDateTime(event.start)} - {formatDateTime(event.end)}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-[#6B7280]">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {event.attendees.slice(0, 3).map((attendee, index) => (
                            <Avatar key={index} className="h-8 w-8 border-2 border-white">
                              <AvatarImage src={attendee.avatar} />
                              <AvatarFallback className="text-xs">
                                {getInitials(attendee.name)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {event.attendees.length > 3 && (
                            <div className="h-8 w-8 bg-[#F3F4F6] border-2 border-white rounded-full flex items-center justify-center">
                              <span className="text-xs text-[#6B7280]">+{event.attendees.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              
              {eventsList.filter(e => e.start.toDateString() === new Date().toDateString()).length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-[#9CA3AF] mx-auto mb-4" />
                  <p className="text-[#6B7280]">No events scheduled for today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {selectedEvent && (
        <>
          <ViewEventModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            event={selectedEvent}
          />
          <AddEditEventModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            event={selectedEvent}
            onSave={handleSaveEvent}
          />
        </>
      )}

      <AddEditEventModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveEvent}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${selectedEvent?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </DashboardLayout>
  );
}
