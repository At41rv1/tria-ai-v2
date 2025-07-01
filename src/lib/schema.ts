import { pgTable, text, timestamp, uuid, index, varchar, integer, boolean, jsonb, decimal } from 'drizzle-orm/pg-core';

// Enhanced users table with comprehensive user management
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }),
  avatar: text('avatar'), // URL to avatar image
  bio: text('bio'), // User biography
  location: varchar('location', { length: 100 }),
  timezone: varchar('timezone', { length: 50 }).default('UTC'),
  language: varchar('language', { length: 10 }).default('en'),
  isVerified: boolean('is_verified').default(false),
  isPremium: boolean('is_premium').default(false),
  lastLoginAt: timestamp('last_login_at'),
  loginCount: integer('login_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  createdAtIdx: index('users_created_at_idx').on(table.createdAt),
  updatedAtIdx: index('users_updated_at_idx').on(table.updatedAt),
  lastLoginIdx: index('users_last_login_idx').on(table.lastLoginAt),
  premiumIdx: index('users_premium_idx').on(table.isPremium),
  verifiedIdx: index('users_verified_idx').on(table.isVerified),
}));

// Enhanced conversations table with advanced features
export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  chatType: varchar('chat_type', { length: 20 }).notNull(), // 'triple', 'study', 'creative', 'business'
  status: varchar('status', { length: 20 }).default('active'), // 'active', 'archived', 'deleted'
  isPublic: boolean('is_public').default(false),
  isFavorite: boolean('is_favorite').default(false),
  tags: jsonb('tags'), // Array of tags
  metadata: jsonb('metadata'), // Additional conversation metadata
  messageCount: integer('message_count').default(0),
  lastMessageAt: timestamp('last_message_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('conversations_user_id_idx').on(table.userId),
  chatTypeIdx: index('conversations_chat_type_idx').on(table.chatType),
  statusIdx: index('conversations_status_idx').on(table.status),
  updatedAtIdx: index('conversations_updated_at_idx').on(table.updatedAt),
  lastMessageIdx: index('conversations_last_message_idx').on(table.lastMessageAt),
  favoriteIdx: index('conversations_favorite_idx').on(table.isFavorite),
  publicIdx: index('conversations_public_idx').on(table.isPublic),
  userChatTypeIdx: index('conversations_user_chat_type_idx').on(table.userId, table.chatType),
  userStatusIdx: index('conversations_user_status_idx').on(table.userId, table.status),
}));

// Enhanced chat messages table with rich features
export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  parentMessageId: uuid('parent_message_id').references(() => chatMessages.id), // For threaded conversations
  sender: varchar('sender', { length: 20 }).notNull(), // 'user', 'leo', 'max', 'tutor1', 'tutor2'
  content: text('content').notNull(),
  messageType: varchar('message_type', { length: 20 }).default('text'), // 'text', 'image', 'file', 'code'
  metadata: jsonb('metadata'), // Rich message metadata
  isEdited: boolean('is_edited').default(false),
  editedAt: timestamp('edited_at'),
  isDeleted: boolean('is_deleted').default(false),
  deletedAt: timestamp('deleted_at'),
  reactionCount: integer('reaction_count').default(0),
  wordCount: integer('word_count').default(0),
  sentiment: varchar('sentiment', { length: 20 }), // 'positive', 'negative', 'neutral'
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  conversationIdIdx: index('chat_messages_conversation_id_idx').on(table.conversationId),
  userIdIdx: index('chat_messages_user_id_idx').on(table.userId),
  createdAtIdx: index('chat_messages_created_at_idx').on(table.createdAt),
  senderIdx: index('chat_messages_sender_idx').on(table.sender),
  messageTypeIdx: index('chat_messages_type_idx').on(table.messageType),
  parentMessageIdx: index('chat_messages_parent_idx').on(table.parentMessageId),
  deletedIdx: index('chat_messages_deleted_idx').on(table.isDeleted),
  sentimentIdx: index('chat_messages_sentiment_idx').on(table.sentiment),
  conversationCreatedAtIdx: index('chat_messages_conversation_created_at_idx').on(table.conversationId, table.createdAt),
}));

// Enhanced user sessions with device tracking
export const userSessions = pgTable('user_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  deviceInfo: jsonb('device_info'), // Browser, OS, device type
  ipAddress: varchar('ip_address', { length: 45 }),
  location: jsonb('location'), // Country, city, etc.
  isActive: boolean('is_active').default(true),
  lastActivity: timestamp('last_activity').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  sessionTokenIdx: index('user_sessions_session_token_idx').on(table.sessionToken),
  userIdIdx: index('user_sessions_user_id_idx').on(table.userId),
  expiresAtIdx: index('user_sessions_expires_at_idx').on(table.expiresAt),
  activeIdx: index('user_sessions_active_idx').on(table.isActive),
  lastActivityIdx: index('user_sessions_last_activity_idx').on(table.lastActivity),
}));

// User preferences with comprehensive settings
export const userPreferences = pgTable('user_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  theme: varchar('theme', { length: 20 }).default('light'), // 'light', 'dark', 'auto'
  language: varchar('language', { length: 10 }).default('en'),
  timezone: varchar('timezone', { length: 50 }).default('UTC'),
  emailNotifications: boolean('email_notifications').default(true),
  pushNotifications: boolean('push_notifications').default(true),
  autoSave: boolean('auto_save').default(true),
  soundEnabled: boolean('sound_enabled').default(true),
  animationsEnabled: boolean('animations_enabled').default(true),
  compactMode: boolean('compact_mode').default(false),
  showTypingIndicator: boolean('show_typing_indicator').default(true),
  messagePreview: boolean('message_preview').default(true),
  aiPersonality: varchar('ai_personality', { length: 20 }).default('balanced'), // 'formal', 'casual', 'balanced'
  responseSpeed: varchar('response_speed', { length: 20 }).default('normal'), // 'fast', 'normal', 'thoughtful'
  privacySettings: jsonb('privacy_settings'),
  customSettings: jsonb('custom_settings'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_preferences_user_id_idx').on(table.userId),
}));

// Conversation analytics with detailed metrics
export const conversationAnalytics = pgTable('conversation_analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  messageCount: integer('message_count').default(0),
  userMessageCount: integer('user_message_count').default(0),
  aiMessageCount: integer('ai_message_count').default(0),
  totalWordCount: integer('total_word_count').default(0),
  averageWordsPerMessage: decimal('average_words_per_message', { precision: 10, scale: 2 }),
  duration: integer('duration').default(0), // in seconds
  sessionCount: integer('session_count').default(1),
  lastActivity: timestamp('last_activity').defaultNow().notNull(),
  engagementScore: decimal('engagement_score', { precision: 5, scale: 2 }),
  sentimentAnalysis: jsonb('sentiment_analysis'),
  topicAnalysis: jsonb('topic_analysis'),
  performanceMetrics: jsonb('performance_metrics'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  conversationIdIdx: index('conversation_analytics_conversation_id_idx').on(table.conversationId),
  userIdIdx: index('conversation_analytics_user_id_idx').on(table.userId),
  lastActivityIdx: index('conversation_analytics_last_activity_idx').on(table.lastActivity),
  engagementIdx: index('conversation_analytics_engagement_idx').on(table.engagementScore),
}));

// Message reactions and feedback
export const messageReactions = pgTable('message_reactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  messageId: uuid('message_id').references(() => chatMessages.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  reaction: varchar('reaction', { length: 20 }).notNull(), // 'like', 'love', 'helpful', 'funny', 'insightful'
  intensity: integer('intensity').default(1), // 1-5 scale
  feedback: text('feedback'), // Optional text feedback
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  messageIdIdx: index('message_reactions_message_id_idx').on(table.messageId),
  userIdIdx: index('message_reactions_user_id_idx').on(table.userId),
  reactionIdx: index('message_reactions_reaction_idx').on(table.reaction),
  userMessageIdx: index('message_reactions_user_message_idx').on(table.userId, table.messageId),
}));

// User activity logs for detailed tracking
export const userActivityLogs = pgTable('user_activity_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  sessionId: uuid('session_id').references(() => userSessions.id, { onDelete: 'cascade' }),
  action: varchar('action', { length: 50 }).notNull(), // 'login', 'logout', 'message_sent', 'conversation_created'
  resource: varchar('resource', { length: 50 }), // 'conversation', 'message', 'user'
  resourceId: uuid('resource_id'),
  details: jsonb('details'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_activity_logs_user_id_idx').on(table.userId),
  sessionIdIdx: index('user_activity_logs_session_id_idx').on(table.sessionId),
  actionIdx: index('user_activity_logs_action_idx').on(table.action),
  resourceIdx: index('user_activity_logs_resource_idx').on(table.resource),
  createdAtIdx: index('user_activity_logs_created_at_idx').on(table.createdAt),
}));

// AI model performance tracking
export const aiModelMetrics = pgTable('ai_model_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  modelName: varchar('model_name', { length: 100 }).notNull(),
  messageId: uuid('message_id').references(() => chatMessages.id, { onDelete: 'cascade' }),
  responseTime: integer('response_time'), // in milliseconds
  tokenCount: integer('token_count'),
  cost: decimal('cost', { precision: 10, scale: 6 }),
  quality: decimal('quality', { precision: 5, scale: 2 }), // 1-5 rating
  accuracy: decimal('accuracy', { precision: 5, scale: 2 }),
  relevance: decimal('relevance', { precision: 5, scale: 2 }),
  creativity: decimal('creativity', { precision: 5, scale: 2 }),
  errorCount: integer('error_count').default(0),
  retryCount: integer('retry_count').default(0),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  modelNameIdx: index('ai_model_metrics_model_name_idx').on(table.modelName),
  messageIdIdx: index('ai_model_metrics_message_id_idx').on(table.messageId),
  responseTimeIdx: index('ai_model_metrics_response_time_idx').on(table.responseTime),
  qualityIdx: index('ai_model_metrics_quality_idx').on(table.quality),
  createdAtIdx: index('ai_model_metrics_created_at_idx').on(table.createdAt),
}));

// Conversation templates for quick starts
export const conversationTemplates = pgTable('conversation_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 50 }).notNull(), // 'education', 'business', 'creative', 'personal'
  chatType: varchar('chat_type', { length: 20 }).notNull(),
  initialPrompt: text('initial_prompt'),
  suggestedQuestions: jsonb('suggested_questions'),
  tags: jsonb('tags'),
  isPublic: boolean('is_public').default(true),
  usageCount: integer('usage_count').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  categoryIdx: index('conversation_templates_category_idx').on(table.category),
  chatTypeIdx: index('conversation_templates_chat_type_idx').on(table.chatType),
  publicIdx: index('conversation_templates_public_idx').on(table.isPublic),
  usageIdx: index('conversation_templates_usage_idx').on(table.usageCount),
  ratingIdx: index('conversation_templates_rating_idx').on(table.rating),
}));

// User achievements and gamification
export const userAchievements = pgTable('user_achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  achievementType: varchar('achievement_type', { length: 50 }).notNull(), // 'first_chat', 'power_user', 'helpful_feedback'
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  points: integer('points').default(0),
  level: integer('level').default(1),
  progress: decimal('progress', { precision: 5, scale: 2 }).default(0),
  isUnlocked: boolean('is_unlocked').default(false),
  unlockedAt: timestamp('unlocked_at'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_achievements_user_id_idx').on(table.userId),
  typeIdx: index('user_achievements_type_idx').on(table.achievementType),
  unlockedIdx: index('user_achievements_unlocked_idx').on(table.isUnlocked),
  pointsIdx: index('user_achievements_points_idx').on(table.points),
}));

// System notifications
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'system', 'achievement', 'conversation', 'update'
  title: varchar('title', { length: 200 }).notNull(),
  message: text('message'),
  actionUrl: text('action_url'),
  priority: varchar('priority', { length: 20 }).default('normal'), // 'low', 'normal', 'high', 'urgent'
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  expiresAt: timestamp('expires_at'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('notifications_user_id_idx').on(table.userId),
  typeIdx: index('notifications_type_idx').on(table.type),
  readIdx: index('notifications_read_idx').on(table.isRead),
  priorityIdx: index('notifications_priority_idx').on(table.priority),
  createdAtIdx: index('notifications_created_at_idx').on(table.createdAt),
  expiresAtIdx: index('notifications_expires_at_idx').on(table.expiresAt),
}));