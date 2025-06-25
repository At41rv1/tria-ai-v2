
import React, { useState, useEffect } from 'react';
import { MessageCircle, Plus, Trash2, Edit3, Clock } from 'lucide-react';
import { useAuth } from '../contexts/HybridAuthContext';
import { getUserConversations, createConversation, deleteConversation, updateConversation, Conversation } from '../lib/database';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface ConversationHistoryProps {
  chatType: 'triple' | 'study';
  onSelectConversation: (conversationId: string) => void;
  currentConversationId?: string;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  chatType,
  onSelectConversation,
  currentConversationId
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newConversationTitle, setNewConversationTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    loadConversations();
  }, [currentUser, chatType]);

  const loadConversations = async () => {
    if (!currentUser) return;
    
    try {
      setIsLoading(true);
      const userConversations = await getUserConversations(currentUser.id, chatType);
      setConversations(userConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateConversation = async () => {
    if (!currentUser || !newConversationTitle.trim()) return;

    try {
      const conversation = await createConversation(
        currentUser.id,
        newConversationTitle.trim(),
        chatType
      );
      
      setConversations(prev => [conversation, ...prev]);
      setNewConversationTitle('');
      onSelectConversation(conversation.id);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this conversation?')) return;

    try {
      await deleteConversation(conversationId);
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      
      if (currentConversationId === conversationId) {
        onSelectConversation('');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleEditConversation = async (conversationId: string) => {
    if (!editingTitle.trim()) return;

    try {
      const updatedConversation = await updateConversation(conversationId, {
        title: editingTitle.trim()
      });
      
      setConversations(prev => 
        prev.map(c => c.id === conversationId ? updatedConversation : c)
      );
      
      setEditingId(null);
      setEditingTitle('');
    } catch (error) {
      console.error('Error updating conversation:', error);
    }
  };

  const startEditing = (conversation: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(conversation.id);
    setEditingTitle(conversation.title);
  };

  if (!currentUser) {
    return (
      <div className="p-4 text-center text-gray-500">
        <MessageCircle className="mx-auto mb-2" size={24} />
        <p>Sign in to view conversation history</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Clock className="mr-2" size={18} />
          {chatType === 'triple' ? 'Triple Chat' : 'Study Chat'} History
        </h3>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center space-x-1">
              <Plus size={16} />
              <span className="hidden sm:inline">New</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Conversation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter conversation title..."
                value={newConversationTitle}
                onChange={(e) => setNewConversationTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateConversation()}
              />
              <Button onClick={handleCreateConversation} className="w-full">
                Create Conversation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      ) : conversations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle className="mx-auto mb-2" size={32} />
          <p>No conversations yet</p>
          <p className="text-sm">Create your first conversation to get started</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                currentConversationId === conversation.id
                  ? 'bg-blue-100 border-blue-200 border'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                {editingId === conversation.id ? (
                  <Input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleEditConversation(conversation.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    onBlur={() => handleEditConversation(conversation.id)}
                    className="text-sm"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 truncate">
                      {conversation.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {new Date(conversation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => startEditing(conversation, e)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={(e) => handleDeleteConversation(conversation.id, e)}
                    className="p-1 hover:bg-red-100 rounded text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationHistory;
