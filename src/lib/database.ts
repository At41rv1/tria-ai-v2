import { db } from '../config/neon';
import { users, chatMessages, userSessions, conversations } from './schema';
import { eq, desc, and, count, sql } from 'drizzle-orm';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  chatType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  userId?: string;
  sender: string;
  content: string;
  createdAt: Date;
}

export interface DatabaseStats {
  totalUsers: number;
  totalConversations: number;
  totalMessages: number;
  activeUsers: number;
}

// Enhanced User operations with better error handling
export const createUser = async (email: string, displayName?: string): Promise<User> => {
  try {
    const result = await db.insert(users).values({
      email,
      displayName,
    }).returning();
    
    return result[0] as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] as User || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

export const updateUser = async (userId: string, updates: Partial<{ displayName: string }>): Promise<User> => {
  try {
    const result = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    
    return result[0] as User;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

// Enhanced Conversation operations with pagination and search
export const createConversation = async (
  userId: string,
  title: string,
  chatType: string
): Promise<Conversation> => {
  try {
    const result = await db.insert(conversations).values({
      userId,
      title,
      chatType,
    }).returning();
    
    return result[0] as Conversation;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw new Error('Failed to create conversation');
  }
};

export const getUserConversations = async (
  userId: string,
  chatType?: string,
  limit: number = 50,
  offset: number = 0
): Promise<Conversation[]> => {
  try {
    let query = db.select().from(conversations).where(eq(conversations.userId, userId));
    
    if (chatType) {
      query = db.select()
        .from(conversations)
        .where(and(eq(conversations.userId, userId), eq(conversations.chatType, chatType)));
    }
    
    const result = await query
      .orderBy(desc(conversations.updatedAt))
      .limit(limit)
      .offset(offset);
    
    return result as Conversation[];
  } catch (error) {
    console.error('Error fetching user conversations:', error);
    return [];
  }
};

export const getConversationById = async (conversationId: string): Promise<Conversation | null> => {
  try {
    const result = await db.select()
      .from(conversations)
      .where(eq(conversations.id, conversationId))
      .limit(1);
    
    return result[0] as Conversation || null;
  } catch (error) {
    console.error('Error fetching conversation by ID:', error);
    return null;
  }
};

export const updateConversation = async (
  conversationId: string,
  updates: Partial<{ title: string }>
): Promise<Conversation> => {
  try {
    const result = await db.update(conversations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(conversations.id, conversationId))
      .returning();
    
    return result[0] as Conversation;
  } catch (error) {
    console.error('Error updating conversation:', error);
    throw new Error('Failed to update conversation');
  }
};

export const deleteConversation = async (conversationId: string): Promise<void> => {
  try {
    // Delete messages first (foreign key constraint)
    await db.delete(chatMessages).where(eq(chatMessages.conversationId, conversationId));
    // Then delete conversation
    await db.delete(conversations).where(eq(conversations.id, conversationId));
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw new Error('Failed to delete conversation');
  }
};

// Enhanced Chat message operations with better performance
export const saveChatMessage = async (
  conversationId: string,
  userId: string | undefined,
  sender: string,
  content: string
): Promise<ChatMessage> => {
  try {
    const result = await db.insert(chatMessages).values({
      conversationId,
      userId,
      sender,
      content,
    }).returning();
    
    // Update conversation timestamp
    await db.update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, conversationId));
    
    return result[0] as ChatMessage;
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw new Error('Failed to save message');
  }
};

export const getConversationMessages = async (
  conversationId: string,
  limit: number = 50,
  offset: number = 0
): Promise<ChatMessage[]> => {
  try {
    const result = await db.select()
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit)
      .offset(offset);
    
    return result.reverse() as ChatMessage[];
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    return [];
  }
};

export const getChatHistory = async (
  userId: string,
  chatType: string,
  limit: number = 50
): Promise<ChatMessage[]> => {
  try {
    const result = await db.select({
      id: chatMessages.id,
      conversationId: chatMessages.conversationId,
      userId: chatMessages.userId,
      sender: chatMessages.sender,
      content: chatMessages.content,
      createdAt: chatMessages.createdAt,
    })
    .from(chatMessages)
    .innerJoin(conversations, eq(chatMessages.conversationId, conversations.id))
    .where(and(
      eq(conversations.userId, userId),
      eq(conversations.chatType, chatType)
    ))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
    
    return result.reverse() as ChatMessage[];
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

export const getAllUserChatHistory = async (
  userId: string,
  limit: number = 100
): Promise<ChatMessage[]> => {
  try {
    const result = await db.select()
      .from(chatMessages)
      .where(eq(chatMessages.userId, userId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);
    
    return result.reverse() as ChatMessage[];
  } catch (error) {
    console.error('Error fetching all user chat history:', error);
    return [];
  }
};

// Enhanced Session operations with cleanup
export const createSession = async (userId: string): Promise<string> => {
  try {
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    await db.insert(userSessions).values({
      userId,
      sessionToken,
      expiresAt,
    });
    
    return sessionToken;
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }
};

export const validateSession = async (sessionToken: string): Promise<User | null> => {
  try {
    const result = await db.select({
      user: users,
    })
    .from(userSessions)
    .innerJoin(users, eq(userSessions.userId, users.id))
    .where(and(
      eq(userSessions.sessionToken, sessionToken),
      sql`${userSessions.expiresAt} > NOW()`
    ))
    .limit(1);
    
    if (!result[0]) return null;
    
    return result[0].user as User;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
};

export const deleteSession = async (sessionToken: string): Promise<void> => {
  try {
    await db.delete(userSessions).where(eq(userSessions.sessionToken, sessionToken));
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};

export const cleanupExpiredSessions = async (): Promise<void> => {
  try {
    await db.delete(userSessions).where(sql`${userSessions.expiresAt} < NOW()`);
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error);
  }
};

// Database analytics and statistics
export const getDatabaseStats = async (): Promise<DatabaseStats> => {
  try {
    const [userCount] = await db.select({ count: count() }).from(users);
    const [conversationCount] = await db.select({ count: count() }).from(conversations);
    const [messageCount] = await db.select({ count: count() }).from(chatMessages);
    
    // Active users in last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [activeUserCount] = await db.select({ count: count() })
      .from(users)
      .where(sql`${users.updatedAt} > ${thirtyDaysAgo}`);
    
    return {
      totalUsers: userCount.count,
      totalConversations: conversationCount.count,
      totalMessages: messageCount.count,
      activeUsers: activeUserCount.count,
    };
  } catch (error) {
    console.error('Error fetching database stats:', error);
    return {
      totalUsers: 0,
      totalConversations: 0,
      totalMessages: 0,
      activeUsers: 0,
    };
  }
};

// Bulk operations for better performance
export const bulkSaveMessages = async (messages: Omit<ChatMessage, 'id' | 'createdAt'>[]): Promise<ChatMessage[]> => {
  try {
    const result = await db.insert(chatMessages).values(messages).returning();
    return result as ChatMessage[];
  } catch (error) {
    console.error('Error bulk saving messages:', error);
    throw new Error('Failed to bulk save messages');
  }
};

// Search functionality
export const searchConversations = async (
  userId: string,
  searchTerm: string,
  limit: number = 20
): Promise<Conversation[]> => {
  try {
    const result = await db.select()
      .from(conversations)
      .where(and(
        eq(conversations.userId, userId),
        sql`${conversations.title} ILIKE ${`%${searchTerm}%`}`
      ))
      .orderBy(desc(conversations.updatedAt))
      .limit(limit);
    
    return result as Conversation[];
  } catch (error) {
    console.error('Error searching conversations:', error);
    return [];
  }
};

export const searchMessages = async (
  userId: string,
  searchTerm: string,
  limit: number = 50
): Promise<ChatMessage[]> => {
  try {
    const result = await db.select({
      id: chatMessages.id,
      conversationId: chatMessages.conversationId,
      userId: chatMessages.userId,
      sender: chatMessages.sender,
      content: chatMessages.content,
      createdAt: chatMessages.createdAt,
    })
    .from(chatMessages)
    .innerJoin(conversations, eq(chatMessages.conversationId, conversations.id))
    .where(and(
      eq(conversations.userId, userId),
      sql`${chatMessages.content} ILIKE ${`%${searchTerm}%`}`
    ))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
    
    return result as ChatMessage[];
  } catch (error) {
    console.error('Error searching messages:', error);
    return [];
  }
};