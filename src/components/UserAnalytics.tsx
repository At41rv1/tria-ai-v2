import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  MessageCircle, 
  TrendingUp, 
  Award,
  Calendar,
  BarChart3,
  Clock,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/HybridAuthContext';
import { getUserAnalytics, getUserEngagementMetrics, type UserAnalytics } from '../lib/database';

const UserAnalyticsComponent = () => {
  const { currentUser } = useAuth();
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [engagement, setEngagement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!currentUser) return;
      
      try {
        const [analyticsData, engagementData] = await Promise.all([
          getUserAnalytics(currentUser.id),
          getUserEngagementMetrics(currentUser.id, 30)
        ]);
        
        setAnalytics(analyticsData);
        setEngagement(engagementData);
      } catch (error) {
        console.error('Error fetching user analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Sign in to view your analytics</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!analytics || !engagement) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6 text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Unable to load analytics data</p>
        </CardContent>
      </Card>
    );
  }

  const analyticsCards = [
    {
      title: "Total Conversations",
      value: analytics.totalConversations.toString(),
      description: `${engagement.conversationsInPeriod} this month`,
      icon: MessageCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      progress: Math.min((analytics.totalConversations / 100) * 100, 100)
    },
    {
      title: "Messages Sent",
      value: analytics.totalMessages.toString(),
      description: `${engagement.messagesInPeriod} this month`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      progress: Math.min((analytics.totalMessages / 1000) * 100, 100)
    },
    {
      title: "Avg Words/Message",
      value: analytics.averageWordsPerMessage.toFixed(1),
      description: "Writing complexity",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      progress: Math.min((analytics.averageWordsPerMessage / 50) * 100, 100)
    },
    {
      title: "Achievements",
      value: analytics.achievements.toString(),
      description: "Unlocked badges",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      progress: Math.min((analytics.achievements / 20) * 100, 100)
    },
    {
      title: "Streak Days",
      value: analytics.streakDays.toString(),
      description: "Consecutive active days",
      icon: Calendar,
      color: "text-red-600",
      bgColor: "bg-red-50",
      progress: Math.min((analytics.streakDays / 30) * 100, 100)
    },
    {
      title: "Engagement Score",
      value: analytics.engagementScore.toFixed(1),
      description: "Overall activity level",
      icon: Target,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      progress: analytics.engagementScore
    }
  ];

  return (
    <div className="space-y-6">
      {/* User Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsCards.map((stat, index) => (
          <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-gray-600 mb-3">
                {stat.description}
              </p>
              <Progress value={stat.progress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {stat.progress.toFixed(1)}% progress
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Activity Summary
            </CardTitle>
            <CardDescription>Your activity over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Daily Average Messages</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {engagement.averageMessagesPerDay.toFixed(1)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Daily Average Conversations</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {engagement.averageConversationsPerDay.toFixed(1)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Most Active Day</span>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Coming Soon
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Preferred Chat Type</span>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                Coming Soon
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Achievements & Goals
            </CardTitle>
            <CardDescription>Your progress and milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Conversation Master</span>
                  <span className="text-xs text-gray-500">{analytics.totalConversations}/50</span>
                </div>
                <Progress value={(analytics.totalConversations / 50) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Message Milestone</span>
                  <span className="text-xs text-gray-500">{analytics.totalMessages}/500</span>
                </div>
                <Progress value={(analytics.totalMessages / 500) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Consistency Champion</span>
                  <span className="text-xs text-gray-500">{analytics.streakDays}/30 days</span>
                </div>
                <Progress value={(analytics.streakDays / 30) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Favorite Topics */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
            Conversation Insights
          </CardTitle>
          <CardDescription>
            Analysis of your conversation patterns and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Most Used Words", value: "Coming Soon", color: "bg-blue-50 text-blue-700" },
              { label: "Favorite Topics", value: "Coming Soon", color: "bg-green-50 text-green-700" },
              { label: "Response Time", value: "Coming Soon", color: "bg-purple-50 text-purple-700" },
              { label: "Sentiment Analysis", value: "Coming Soon", color: "bg-orange-50 text-orange-700" }
            ].map((insight, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">{insight.label}</h4>
                <Badge variant="outline" className={`${insight.color} border-current`}>
                  {insight.value}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAnalyticsComponent;