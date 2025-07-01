import { db } from '../config/neon';
import { 
  users, 
  chatMessages, 
  userSessions, 
  conversations, 
  userPreferences,
  conversationAnalytics,
  messageReactions,
  userActivityLogs,
  aiModelMetrics,
  conversationTemplates,
  userAchievements,
  notifications
} from './schema';
import { eq, desc, and, count, sql, like, or, gte, lte, avg, sum, max, min } from 'drizzle-orm';

// Enhanced interfaces
export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  timezone?: string;
  language?: string;
  isVerified?: boolean;
  isPremium?: boolean;
  lastLoginAt?: Date;
  loginCount?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  description?: string;
  chatType: string;
  status?: string;
  isPublic?: boolean;
  isFavorite?: boolean;
  tags?: any;
  metadata?: any;
  messageCount?: number;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  userId?: string;
  parentMessageId?: string;
  sender: string;
  content: string;
  messageType?: string;
  metadata?: any;
  isEdited?: boolean;
  editedAt?: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
  reactionCount?: number;
  wordCount?: number;
  sentiment?: string;
  createdAt: Date;
}

export interface DatabaseStats {
  totalUsers: number;
  totalConversations: number;
  totalMessages: number;
  activeUsers: number;
  premiumUsers: number;
  averageMessagesPerConversation: number;
  totalReactions: number;
  averageSessionDuration: number;
}

export interface UserAnalytics {
  totalConversations: number;
  totalMessages: number;
  averageWordsPerMessage: number;
  favoriteTopics: string[];
  engagementScore: number;
  achievements: number;
  streakDays: number;
}

// Enhanced User operations
export const createUser = async (email: string, displayName?: string, additionalData?: Partial<User>): Promise<User> => {
  try {
    const userData = {
      email,
      displayName,
      loginCount: 1,
      lastLoginAt: new Date(),
      ...additionalData
    };

    const result = await db.insert(users).values(userData).returning();
    
    // Create default preferences
    await createUserPreferences(result[0].id);
    
    // Log activity
    await logUserActivity(result[0].id, 'user_registered', 'user', result[0].id);
    
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

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
  try {
    const result = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    
    await logUserActivity(userId, 'user_updated', 'user', userId);
    
    return result[0] as User;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

export const updateUserLoginInfo = async (userId: string): Promise<void> => {
  try {
    await db.update(users)
      .set({ 
        lastLoginAt: new Date(),
        loginCount: sql`${users.loginCount} + 1`
      })
      .where(eq(users.id, userId));
    
    await logUserActivity(userId, 'user_login', 'user', userId);
  } catch (error) {
    console.error('Error updating user login info:', error);
  }
};

// Enhanced Conversation operations
export const createConversation = async (
  userId: string,
  title: string,
  chatType: string,
  additionalData?: Partial<Conversation>
): Promise<Conversation> => {
  try {
    const conversationData = {
      userId,
      title,
      chatType,
      lastMessageAt: new Date(),
      ...additionalData
    };

    const result = await db.insert(conversations).values(conversationData).returning();
    
    // Create analytics record
    await createConversationAnalytics(result[0].id, userId);
    
    // Log activity
    await logUserActivity(userId, 'conversation_created', 'conversation', result[0].id);
    
    return result[0] as Conversation;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw new Error('Failed to create conversation');
  }
};

export const getUserConversations = async (
  userId: string,
  options: {
    chatType?: string;
    status?: string;
    isFavorite?: boolean;
    limit?: number;
    offset?: number;
    search?: string;
  } = {}
): Promise<Conversation[]> => {
  try {
    const { chatType, status = 'active', isFavorite, limit = 50, offset = 0, search } = options;
    
    let query = db.select().from(conversations).where(eq(conversations.userId, userId));
    
    const conditions = [eq(conversations.userId, userId)];
    
    if (chatType) conditions.push(eq(conversations.chatType, chatType));
    if (status) conditions.push(eq(conversations.status, status));
    if (isFavorite !== undefined) conditions.push(eq(conversations.isFavorite, isFavorite));
    if (search) conditions.push(like(conversations.title, `%${search}%`));
    
    query = db.select().from(conversations).where(and(...conditions));
    
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

export const updateConversation = async (
  conversationId: string,
  updates: Partial<Conversation>
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

export const deleteConversation = async (conversationId: string, userId: string): Promise<void> => {
  try {
    // Soft delete by updating status
    await db.update(conversations)
      .set({ status: 'deleted', updatedAt: new Date() })
      .where(eq(conversations.id, conversationId));
    
    await logUserActivity(userId, 'conversation_deleted', 'conversation', conversationId);
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw new Error('Failed to delete conversation');
  }
};

// Enhanced Chat message operations
export const saveChatMessage = async (
  conversationId: string,
  userId: string | undefined,
  sender: string,
  content: string,
  additionalData?: Partial<ChatMessage>
): Promise<ChatMessage> => {
  try {
    const wordCount = content.split(/\s+/).length;
    
    const messageData = {
      conversationId,
      userId,
      sender,
      content,
      wordCount,
      ...additionalData
    };

    const result = await db.insert(chatMessages).values(messageData).returning();
    
    // Update conversation
    await db.update(conversations)
      .set({ 
        updatedAt: new Date(),
        lastMessageAt: new Date(),
        messageCount: sql`${conversations.messageCount} + 1`
      })
      .where(eq(conversations.id, conversationId));
    
    // Update analytics
    await updateConversationAnalytics(conversationId, userId);
    
    // Log activity
    if (userId) {
      await logUserActivity(userId, 'message_sent', 'message', result[0].id);
    }
    
    return result[0] as ChatMessage;
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw new Error('Failed to save message');
  }
};

export const getConversationMessages = async (
  conversationId: string,
  options: {
    limit?: number;
    offset?: number;
    includeDeleted?: boolean;
  } = {}
): Promise<ChatMessage[]> => {
  try {
    const { limit = 50, offset = 0, includeDeleted = false } = options;
    
    let query = db.select().from(chatMessages).where(eq(chatMessages.conversationId, conversationId));
    
    if (!includeDeleted) {
      query = db.select()
        .from(chatMessages)
        .where(and(
          eq(chatMessages.conversationId, conversationId),
          eq(chatMessages.isDeleted, false)
        ));
    }
    
    const result = await query
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit)
      .offset(offset);
    
    return result.reverse() as ChatMessage[];
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    return [];
  }
};

// User preferences operations
export const createUserPreferences = async (userId: string): Promise<void> => {
  try {
    await db.insert(userPreferences).values({ userId });
  } catch (error) {
    console.error('Error creating user preferences:', error);
  }
};

export const getUserPreferences = async (userId: string): Promise<any> => {
  try {
    const result = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
};

export const updateUserPreferences = async (userId: string, updates: any): Promise<void> => {
  try {
    await db.update(userPreferences)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userPreferences.userId, userId));
  } catch (error) {
    console.error('Error updating user preferences:', error);
  }
};

// Analytics operations
export const createConversationAnalytics = async (conversationId: string, userId: string): Promise<void> => {
  try {
    await db.insert(conversationAnalytics).values({
      conversationId,
      userId,
      sessionCount: 1
    });
  } catch (error) {
    console.error('Error creating conversation analytics:', error);
  }
};

export const updateConversationAnalytics = async (conversationId: string, userId?: string): Promise<void> => {
  try {
    await db.update(conversationAnalytics)
      .set({
        messageCount: sql`${conversationAnalytics.messageCount} + 1`,
        lastActivity: new Date(),
        updatedAt: new Date()
      })
      .where(eq(conversationAnalytics.conversationId, conversationId));
  } catch (error) {
    console.error('Error updating conversation analytics:', error);
  }
};

export const getUserAnalytics = async (userId: string): Promise<UserAnalytics> => {
  try {
    const [conversationCount] = await db.select({ count: count() })
      .from(conversations)
      .where(and(eq(conversations.userId, userId), eq(conversations.status, 'active')));
    
    const [messageCount] = await db.select({ count: count() })
      .from(chatMessages)
      .where(eq(chatMessages.userId, userId));
    
    const [avgWords] = await db.select({ avg: avg(chatMessages.wordCount) })
      .from(chatMessages)
      .where(eq(chatMessages.userId, userId));
    
    const [achievementCount] = await db.select({ count: count() })
      .from(userAchievements)
      .where(and(eq(userAchievements.userId, userId), eq(userAchievements.isUnlocked, true)));
    
    return {
      totalConversations: conversationCount.count,
      totalMessages: messageCount.count,
      averageWordsPerMessage: Number(avgWords.avg) || 0,
      favoriteTopics: [], // TODO: Implement topic analysis
      engagementScore: 0, // TODO: Calculate engagement score
      achievements: achievementCount.count,
      streakDays: 0 // TODO: Calculate streak
    };
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    return {
      totalConversations: 0,
      totalMessages: 0,
      averageWordsPerMessage: 0,
      favoriteTopics: [],
      engagementScore: 0,
      achievements: 0,
      streakDays: 0
    };
  }
};

// Activity logging
export const logUserActivity = async (
  userId: string,
  action: string,
  resource?: string,
  resourceId?: string,
  details?: any
): Promise<void> => {
  try {
    await db.insert(userActivityLogs).values({
      userId,
      action,
      resource,
      resourceId,
      details
    });
  } catch (error) {
    console.error('Error logging user activity:', error);
  }
};

// Message reactions
export const addMessageReaction = async (
  messageId: string,
  userId: string,
  reaction: string,
  intensity: number = 1,
  feedback?: string
): Promise<void> => {
  try {
    // Check if reaction already exists
    const existing = await db.select()
      .from(messageReactions)
      .where(and(
        eq(messageReactions.messageId, messageId),
        eq(messageReactions.userId, userId),
        eq(messageReactions.reaction, reaction)
      ))
      .limit(1);
    
    if (existing.length > 0) {
      // Update existing reaction
      await db.update(messageReactions)
        .set({ intensity, feedback })
        .where(eq(messageReactions.id, existing[0].id));
    } else {
      // Create new reaction
      await db.insert(messageReactions).values({
        messageId,
        userId,
        reaction,
        intensity,
        feedback
      });
      
      // Update message reaction count
      await db.update(chatMessages)
        .set({ reactionCount: sql`${chatMessages.reactionCount} + 1` })
        .where(eq(chatMessages.id, messageId));
    }
  } catch (error) {
    console.error('Error adding message reaction:', error);
  }
};

// Enhanced database statistics
export const getDatabaseStats = async (): Promise<DatabaseStats> => {
  try {
    const [userCount] = await db.select({ count: count() }).from(users);
    const [conversationCount] = await db.select({ count: count() }).from(conversations);
    const [messageCount] = await db.select({ count: count() }).from(chatMessages);
    const [reactionCount] = await db.select({ count: count() }).from(messageReactions);
    
    // Active users in last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [activeUserCount] = await db.select({ count: count() })
      .from(users)
      .where(gte(users.lastLoginAt, thirtyDaysAgo));
    
    // Premium users
    const [premiumUserCount] = await db.select({ count: count() })
      .from(users)
      .where(eq(users.isPremium, true));
    
    // Average messages per conversation
    const [avgMessages] = await db.select({ avg: avg(conversations.messageCount) })
      .from(conversations);
    
    return {
      totalUsers: userCount.count,
      totalConversations: conversationCount.count,
      totalMessages: messageCount.count,
      activeUsers: activeUserCount.count,
      premiumUsers: premiumUserCount.count,
      averageMessagesPerConversation: Number(avgMessages.avg) || 0,
      totalReactions: reactionCount.count,
      averageSessionDuration: 0 // TODO: Calculate from session data
    };
  } catch (error) {
    console.error('Error fetching database stats:', error);
    return {
      totalUsers: 0,
      totalConversations: 0,
      totalMessages: 0,
      activeUsers: 0,
      premiumUsers: 0,
      averageMessagesPerConversation: 0,
      totalReactions: 0,
      averageSessionDuration: 0
    };
  }
};

// Search functionality
export const searchConversations = async (
  userId: string,
  searchTerm: string,
  options: {
    chatType?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<Conversation[]> => {
  try {
    const { chatType, limit = 20, offset = 0 } = options;
    
    const conditions = [
      eq(conversations.userId, userId),
      eq(conversations.status, 'active'),
      or(
        like(conversations.title, `%${searchTerm}%`),
        like(conversations.description, `%${searchTerm}%`)
      )
    ];
    
    if (chatType) conditions.push(eq(conversations.chatType, chatType));
    
    const result = await db.select()
      .from(conversations)
      .where(and(...conditions))
      .orderBy(desc(conversations.updatedAt))
      .limit(limit)
      .offset(offset);
    
    return result as Conversation[];
  } catch (error) {
    console.error('Error searching conversations:', error);
    return [];
  }
};

export const searchMessages = async (
  userId: string,
  searchTerm: string,
  options: {
    conversationId?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<ChatMessage[]> => {
  try {
    const { conversationId, limit = 50, offset = 0 } = options;
    
    const conditions = [
      like(chatMessages.content, `%${searchTerm}%`),
      eq(chatMessages.isDeleted, false)
    ];
    
    if (conversationId) {
      conditions.push(eq(chatMessages.conversationId, conversationId));
    } else {
      // Search in user's conversations only
      conditions.push(
        sql`${chatMessages.conversationId} IN (
          SELECT id FROM ${conversations} 
          WHERE ${conversations.userId} = ${userId} 
          AND ${conversations.status} = 'active'
        )`
      );
    }
    
    const result = await db.select()
      .from(chatMessages)
      .where(and(...conditions))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit)
      .offset(offset);
    
    return result as ChatMessage[];
  } catch (error) {
    console.error('Error searching messages:', error);
    return [];
  }
};

// Conversation templates
export const getConversationTemplates = async (
  category?: string,
  chatType?: string,
  limit: number = 20
): Promise<any[]> => {
  try {
    const conditions = [eq(conversationTemplates.isPublic, true)];
    
    if (category) conditions.push(eq(conversationTemplates.category, category));
    if (chatType) conditions.push(eq(conversationTemplates.chatType, chatType));
    
    const result = await db.select()
      .from(conversationTemplates)
      .where(and(...conditions))
      .orderBy(desc(conversationTemplates.rating), desc(conversationTemplates.usageCount))
      .limit(limit);
    
    return result;
  } catch (error) {
    console.error('Error fetching conversation templates:', error);
    return [];
  }
};

// Notifications
export const createNotification = async (
  userId: string,
  type: string,
  title: string,
  message: string,
  options: {
    actionUrl?: string;
    priority?: string;
    expiresAt?: Date;
    metadata?: any;
  } = {}
): Promise<void> => {
  try {
    await db.insert(notifications).values({
      userId,
      type,
      title,
      message,
      ...options
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export const getUserNotifications = async (
  userId: string,
  options: {
    isRead?: boolean;
    limit?: number;
    offset?: number;
  } = {}
): Promise<any[]> => {
  try {
    const { isRead, limit = 50, offset = 0 } = options;
    
    const conditions = [
      eq(notifications.userId, userId),
      or(
        sql`${notifications.expiresAt} IS NULL`,
        gte(notifications.expiresAt, new Date())
      )
    ];
    
    if (isRead !== undefined) conditions.push(eq(notifications.isRead, isRead));
    
    const result = await db.select()
      .from(notifications)
      .where(and(...conditions))
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset(offset);
    
    return result;
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    await db.update(notifications)
      .set({ isRead: true, readAt: new Date() })
      .where(eq(notifications.id, notificationId));
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

// Cleanup operations
export const cleanupExpiredSessions = async (): Promise<void> => {
  try {
    await db.delete(userSessions).where(lte(userSessions.expiresAt, new Date()));
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error);
  }
};

export const cleanupExpiredNotifications = async (): Promise<void> => {
  try {
    await db.delete(notifications).where(lte(notifications.expiresAt, new Date()));
  } catch (error) {
    console.error('Error cleaning up expired notifications:', error);
  }
};

// Bulk operations for performance
export const bulkSaveMessages = async (messages: Omit<ChatMessage, 'id' | 'createdAt'>[]): Promise<ChatMessage[]> => {
  try {
    const result = await db.insert(chatMessages).values(messages).returning();
    return result as ChatMessage[];
  } catch (error) {
    console.error('Error bulk saving messages:', error);
    throw new Error('Failed to bulk save messages');
  }
};

export const bulkUpdateMessageReactions = async (updates: any[]): Promise<void> => {
  try {
    for (const update of updates) {
      await db.update(chatMessages)
        .set({ reactionCount: update.reactionCount })
        .where(eq(chatMessages.id, update.messageId));
    }
  } catch (error) {
    console.error('Error bulk updating message reactions:', error);
  }
};

// Advanced analytics queries
export const getTopConversationTopics = async (userId?: string, limit: number = 10): Promise<any[]> => {
  try {
    // This would require implementing topic analysis
    // For now, return empty array
    return [];
  } catch (error) {
    console.error('Error fetching top conversation topics:', error);
    return [];
  }
};

export const getUserEngagementMetrics = async (userId: string, days: number = 30): Promise<any> => {
  try {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const [messageCount] = await db.select({ count: count() })
      .from(chatMessages)
      .where(and(
        eq(chatMessages.userId, userId),
        gte(chatMessages.createdAt, startDate)
      ));
    
    const [conversationCount] = await db.select({ count: count() })
      .from(conversations)
      .where(and(
        eq(conversations.userId, userId),
        gte(conversations.createdAt, startDate)
      ));
    
    return {
      messagesInPeriod: messageCount.count,
      conversationsInPeriod: conversationCount.count,
      averageMessagesPerDay: messageCount.count / days,
      averageConversationsPerDay: conversationCount.count / days
    };
  } catch (error) {
    console.error('Error fetching user engagement metrics:', error);
    return {
      messagesInPeriod: 0,
      conversationsInPeriod: 0,
      averageMessagesPerDay: 0,
      averageConversationsPerDay: 0
    };
  }
};