
import { db } from '../config/neon';
import { users, chatMessages, userSessions } from './schema';
import { eq, desc, and } from 'drizzle-orm';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  userId?: string;
  sender: string;
  content: string;
  chatType: string;
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

// Chat message operations
export const saveChatMessage = async (
  userId: string | undefined,
  sender: string,
  content: string,
  chatType: string
): Promise<ChatMessage> => {
  const result = await db.insert(chatMessages).values({
    userId,
    sender,
    content,
    chatType,
  }).returning();
  
  return result[0] as ChatMessage;
};

export const getChatHistory = async (
  userId: string,
  chatType: string,
  limit: number = 50
): Promise<ChatMessage[]> => {
  const result = await db.select()
    .from(chatMessages)
    .where(and(
      eq(chatMessages.userId, userId),
      eq(chatMessages.chatType, chatType)
    ))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
  
  return result.reverse() as ChatMessage[];
};

// Get all chat history for a user (across all chat types)
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
