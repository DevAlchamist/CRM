'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Send, 
  Paperclip, 
  Smile,
  MoreVertical,
  Phone,
  Video,
  Mail,
  Pin
} from 'lucide-react';
import { demoConversations, demoMessages } from '@/data/demo';
import { getInitials, getRelativeTime } from '@/lib/utils';
import { Conversation, Message } from '@/types';

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>(demoConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const currentConversation = selectedConversation || conversations[0];
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conversation =>
    conversation.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.participants.some(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get messages for current conversation
  const currentMessages = messages.filter(msg => 
    msg.conversationId === currentConversation?.id
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && currentConversation) {
      const message: Message = {
        id: Date.now().toString(),
        conversationId: currentConversation.id,
        senderId: '1', // Current user
        senderName: 'John Doe',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        content: newMessage,
        timestamp: new Date(),
        isRead: false,
        type: 'text',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout title="Messages" userRole="admin">
      <div className="flex h-[calc(100vh-8rem)] space-x-6">
        {/* Conversations List */}
        <Card className="w-80 flex-shrink-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Messages</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center space-x-3 p-4 hover:bg-[#F9FAFB] cursor-pointer border-l-4 ${
                    conversation.id === currentConversation?.id 
                      ? 'bg-[#F9FAFB] border-l-[#2563EB]' 
                      : 'border-l-transparent'
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.participants[1]?.avatar} />
                      <AvatarFallback>
                        {getInitials(conversation.participants[1]?.name || 'U')}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.isPinned && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#F59E0B] rounded-full flex items-center justify-center">
                        <Pin className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#111827] truncate">
                        {conversation.title || conversation.participants[1]?.name}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {conversation.lastMessage ? getRelativeTime(conversation.lastMessage.timestamp) : ''}
                      </p>
                    </div>
                    <p className="text-xs text-[#6B7280] truncate">
                      {conversation.lastMessage?.content || 'No messages yet'}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentConversation.participants[1]?.avatar} />
                    <AvatarFallback>
                      {getInitials(currentConversation.participants[1]?.name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827]">
                    {currentConversation.title || currentConversation.participants[1]?.name}
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    {currentConversation.participants.length} participants
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((message) => {
              const isCurrentUser = message.senderId === '1';
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex space-x-2 max-w-xs lg:max-w-md ${
                      isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={message.senderAvatar} />
                      <AvatarFallback className="text-xs">
                        {getInitials(message.senderName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className={`px-3 py-2 rounded-lg ${
                          isCurrentUser
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-[#F3F4F6] text-[#111827]'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className={`text-xs text-[#6B7280] mt-1 ${
                        isCurrentUser ? 'text-right' : 'text-left'
                      }`}>
                        {getRelativeTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>

          {/* Message Input */}
          <div className="border-t border-[#E5E7EB] p-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button variant="ghost" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
