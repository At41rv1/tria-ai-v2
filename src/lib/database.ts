
import { db } from '../config/neon';
import { users, chatMessages, userSessions, conversations } from './schema';
import { eq, desc, and } from 'drizzle-orm';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
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

// User operations
export const createUser = async (email: string, displayName?: string): Promise<User> => {
  const result = await db.insert(users).values({
    email,
    displayName,
  }).returning();
  
  return result[0] as User;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] as User || null;
};

export const updateUser = async (userId: string, updates: Partial<{ displayName: string }>): Promise<User> => {
  const result = await db.update(users)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();
  
  return result[0] as User;
};

// Conversation operations
export const createConversation = async (
  userId: string,
  title: string,
  chatType: string
): Promise<Conversation> => {
  const result = await db.insert(conversations).values({
    userId,
    title,
    chatType,
  }).returning();
  
  return result[0] as Conversation;
};

export const getUserConversations = async (
  userId: string,
  chatType?: string
): Promise<Conversation[]> => {
  const query = db.select()
    .from(conversations)
    .where(eq(conversations.userId, userId));
  
  if (chatType) {
    query.where(and(eq(conversations.userId, userId), eq(conversations.chatType, chatType)));
  }
  
  const result = await query.orderBy(desc(conversations.updatedAt));
  return result as Conversation[];
};

export const getConversationById = async (conversationId: string): Promise<Conversation | null> => {
  const result = await db.select()
    .from(conversations)
    .where(eq(conversations.id, conversationId))
    .limit(1);
  
  return result[0] as Conversation || null;
};

export const updateConversation = async (
  conversationId: string,
  updates: Partial<{ title: string }>
): Promise<Conversation> => {
  const result = await db.update(conversations)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(conversations.id, conversationId))
    .returning();
  
  return result[0] as Conversation;
};

export const deleteConversation = async (conversationId: string): Promise<void> => {
  // Delete all messages in the conversation first
  await db.delete(chatMessages).where(eq(chatMessages.conversationId, conversationId));
  // Then delete the conversation
  await db.delete(conversations).where(eq(conversations.id, conversationId));
};

// Chat message operations
export const saveChatMessage = async (
  conversationId: string,
  userId: string | undefined,
  sender: string,
  content: string
): Promise<ChatMessage> => {
  const result = await db.insert(chatMessages).values({
    conversationId,
    userId,
    sender,
    content,
  }).returning();
  
  return result[0] as ChatMessage;
};

export const getConversationMessages = async (
  conversationId: string,
  limit: number = 50
): Promise<ChatMessage[]> => {
  const result = await db.select()
    .from(chatMessages)
    .where(eq(chatMessages.conversationId, conversationId))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
  
  return result.reverse() as ChatMessage[];
};

// Legacy function for backward compatibility
export const getChatHistory = async (
  userId: string,
  chatType: string,
  limit: number = 50
): Promise<ChatMessage[]> => {
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
};

// Get all chat history for a user (across all conversations)
export const getAllUserChatHistory = async (
  userId: string,
  limit: number = 100
): Promise<ChatMessage[]> => {
  const result = await db.select()
    .from(chatMessages)
    .where(eq(chatMessages.userId, userId))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
  
  return result.reverse() as ChatMessage[];
};

// Session operations
export const createSession = async (userId: string): Promise<string> => {
  const sessionToken = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  
  await db.insert(userSessions).values({
    userId,
    sessionToken,
    expiresAt,
  });
  
  return sessionToken;
};

export const validateSession = async (sessionToken: string): Promise<User | null> => {
  const result = await db.select({
    user: users,
  })
  .from(userSessions)
  .innerJoin(users, eq(userSessions.userId, users.id))
  .where(eq(userSessions.sessionToken, sessionToken))
  .limit(1);
  
  if (!result[0]) return null;
  
  return result[0].user as User;
};

export const deleteSession = async (sessionToken: string): Promise<void> => {
  await db.delete(userSessions).where(eq(userSessions.sessionToken, sessionToken));
};
