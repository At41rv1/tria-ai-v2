import { pgTable, text, timestamp, uuid, index, varchar } from 'drizzle-orm/pg-core';

// Enhanced users table with better indexing
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  createdAtIdx: index('users_created_at_idx').on(table.createdAt),
  updatedAtIdx: index('users_updated_at_idx').on(table.updatedAt),
}));

// Enhanced conversations table with better performance
export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  chatType: varchar('chat_type', { length: 20 }).notNull(), // 'triple', 'study'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('conversations_user_id_idx').on(table.userId),
  chatTypeIdx: index('conversations_chat_type_idx').on(table.chatType),
  updatedAtIdx: index('conversations_updated_at_idx').on(table.updatedAt),
  userChatTypeIdx: index('conversations_user_chat_type_idx').on(table.userId, table.chatType),
}));

// Enhanced chat messages table with optimized indexing
export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  sender: varchar('sender', { length: 20 }).notNull(), // 'user', 'leo', 'max', 'tutor1', 'tutor2'
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  conversationIdIdx: index('chat_messages_conversation_id_idx').on(table.conversationId),
  userIdIdx: index('chat_messages_user_id_idx').on(table.userId),
  createdAtIdx: index('chat_messages_created_at_idx').on(table.createdAt),
  senderIdx: index('chat_messages_sender_idx').on(table.sender),
  // Composite index for common queries
  conversationCreatedAtIdx: index('chat_messages_conversation_created_at_idx').on(table.conversationId, table.createdAt),
}));

// Enhanced user sessions table with automatic cleanup
export const userSessions = pgTable('user_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  sessionTokenIdx: index('user_sessions_session_token_idx').on(table.sessionToken),
  userIdIdx: index('user_sessions_user_id_idx').on(table.userId),
  expiresAtIdx: index('user_sessions_expires_at_idx').on(table.expiresAt),
}));

// Additional tables for enhanced functionality

// User preferences table
export const userPreferences = pgTable('user_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  theme: varchar('theme', { length: 20 }).default('light'), // 'light', 'dark'
  language: varchar('language', { length: 10 }).default('en'), // 'en', 'es', etc.
  emailNotifications: varchar('email_notifications', { length: 20 }).default('enabled'), // 'enabled', 'disabled'
  autoSave: varchar('auto_save', { length: 20 }).default('enabled'), // 'enabled', 'disabled'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_preferences_user_id_idx').on(table.userId),
}));

// Conversation analytics table
export const conversationAnalytics = pgTable('conversation_analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
  messageCount: varchar('message_count', { length: 10 }).default('0'),
  duration: varchar('duration', { length: 20 }), // in minutes
  lastActivity: timestamp('last_activity').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  conversationIdIdx: index('conversation_analytics_conversation_id_idx').on(table.conversationId),
  lastActivityIdx: index('conversation_analytics_last_activity_idx').on(table.lastActivity),
}));

// Message reactions table (for future features)
export const messageReactions = pgTable('message_reactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  messageId: uuid('message_id').references(() => chatMessages.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  reaction: varchar('reaction', { length: 20 }).notNull(), // 'like', 'love', 'helpful', etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  messageIdIdx: index('message_reactions_message_id_idx').on(table.messageId),
  userIdIdx: index('message_reactions_user_id_idx').on(table.userId),
  // Unique constraint to prevent duplicate reactions
  userMessageIdx: index('message_reactions_user_message_idx').on(table.userId, table.messageId),
}));