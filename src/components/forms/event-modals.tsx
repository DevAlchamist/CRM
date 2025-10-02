'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, MapPin, Users, Video, Phone } from 'lucide-react';
import { getInitials } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'call' | 'task' | 'reminder';
  attendees: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }>;
  location?: string;
  isOnline?: boolean;
  isAllDay?: boolean;
}

interface ViewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export function ViewEventModal({ isOpen, onClose, event }: ViewEventModalProps) {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'call': return 'bg-green-100 text-green-800';
      case 'task': return 'bg-yellow-100 text-yellow-800';
      case 'reminder': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'task': return <Clock className="h-4 w-4" />;
      case 'reminder': return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDateRange = (start: Date, end: Date, isAllDay: boolean) => {
    if (isAllDay) {
      return start.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    
    const startTime = formatTime(start);
    const endTime = formatTime(end);
    
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })} at ${startTime} - ${endTime}`;
    }
    
    return `${start.toLocaleDateString()} ${startTime} - ${end.toLocaleDateString()} ${endTime}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Event Details" size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-blue-100">
            {getEventTypeIcon(event.type)}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                {event.type}
              </Badge>
              {event.isOnline && (
                <Badge variant="secondary" className="text-xs">
                  <Video className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDateRange(event.start, event.end, event.isAllDay || false)}</span>
        </div>

        {/* Location */}
        {event.location && (
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        )}

        {/* Description */}
        {event.description && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              {event.description}
            </p>
          </div>
        )}

        {/* Attendees */}
        {event.attendees.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Attendees ({event.attendees.length})</h4>
            <div className="space-y-2">
              {event.attendees.map((attendee) => (
                <div key={attendee.id} className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={attendee.avatar} />
                    <AvatarFallback className="text-xs">
                      {getInitials(attendee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{attendee.name}</p>
                    <p className="text-xs text-gray-500">{attendee.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Edit Event
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface AddEditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event;
  onSave: (event: Partial<Event>) => void;
}

export function AddEditEventModal({ isOpen, onClose, event, onSave }: AddEditEventModalProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    type: event?.type || 'meeting',
    startDate: event?.start ? event.start.toISOString().split('T')[0] : '',
    startTime: event?.start ? event.start.toTimeString().slice(0, 5) : '',
    endDate: event?.end ? event.end.toISOString().split('T')[0] : '',
    endTime: event?.end ? event.end.toTimeString().slice(0, 5) : '',
    location: event?.location || '',
    isAllDay: event?.isAllDay || false,
    isOnline: event?.isOnline || false,
  });

  const eventTypes = [
    { value: 'meeting', label: 'Meeting' },
    { value: 'call', label: 'Phone Call' },
    { value: 'task', label: 'Task' },
    { value: 'reminder', label: 'Reminder' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    onSave({
      ...formData,
      start: startDateTime,
      end: endDateTime,
      attendees: event?.attendees || [],
    });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={event ? 'Edit Event' : 'Create New Event'} 
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            >
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Meeting room, address, or online"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time *
            </label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date *
            </label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time *
            </label>
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isAllDay}
              onChange={(e) => setFormData({ ...formData, isAllDay: e.target.checked })}
              className="mr-2"
            />
            All Day Event
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isOnline}
              onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
              className="mr-2"
            />
            Online Event
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {event ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
