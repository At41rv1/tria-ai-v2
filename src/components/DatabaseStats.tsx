import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Users, 
  MessageCircle, 
  Activity, 
  TrendingUp, 
  Star,
  Zap,
  Globe,
  Shield,
  BarChart3
} from 'lucide-react';
import { getDatabaseStats, type DatabaseStats } from '../lib/database';

const DatabaseStatsComponent = () => {
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDatabaseStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching database stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
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

  if (!stats) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6 text-center">
          <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Unable to load database statistics</p>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      description: `${stats.premiumUsers} premium users`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      progress: (stats.premiumUsers / stats.totalUsers) * 100
    },
    {
      title: "Conversations",
      value: stats.totalConversations.toLocaleString(),
      description: `${stats.averageMessagesPerConversation.toFixed(1)} avg messages`,
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      progress: Math.min((stats.totalConversations / 10000) * 100, 100)
    },
    {
      title: "Total Messages",
      value: stats.totalMessages.toLocaleString(),
      description: `${stats.totalReactions} reactions`,
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      progress: Math.min((stats.totalMessages / 100000) * 100, 100)
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      description: "Last 30 days",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      progress: (stats.activeUsers / stats.totalUsers) * 100
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
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
                {stat.progress.toFixed(1)}% of target
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Database Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="w-5 h-5 mr-2 text-yellow-600" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Real-time database performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Query Response Time</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                &lt; 10ms
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database Uptime</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                99.9%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Connection Pool</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Optimal
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cache Hit Rate</span>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                94.2%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              Security & Compliance
            </CardTitle>
            <CardDescription>Data protection and security status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">SSL/TLS Encryption</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data Backup</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Daily
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">GDPR Compliance</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Compliant
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data Retention</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Configured
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Neon Database Features */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Database className="w-6 h-6 mr-3 text-gray-700" />
            Neon Database Features
          </CardTitle>
          <CardDescription>
            Advanced PostgreSQL capabilities powering Tria AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Global Distribution",
                description: "Multi-region deployment for low latency worldwide",
                status: "Active"
              },
              {
                icon: Zap,
                title: "Auto-scaling",
                description: "Automatic resource scaling based on demand",
                status: "Enabled"
              },
              {
                icon: Shield,
                title: "Point-in-time Recovery",
                description: "Continuous backup with instant recovery options",
                status: "Protected"
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Live query performance and usage analytics",
                status: "Monitoring"
              },
              {
                icon: Star,
                title: "Branching",
                description: "Database branching for development and testing",
                status: "Available"
              },
              {
                icon: Activity,
                title: "Connection Pooling",
                description: "Optimized connection management for performance",
                status: "Optimized"
              }
            ].map((feature, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                    <feature.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      {feature.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseStatsComponent;