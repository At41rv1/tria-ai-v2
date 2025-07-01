import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, User, BarChart3, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '../components/Header';
import DatabaseStatsComponent from '../components/DatabaseStats';
import UserAnalyticsComponent from '../components/UserAnalytics';
import { useAuth } from '../contexts/HybridAuthContext';

const Analytics = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('database');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
              <BarChart3 className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Analytics Dashboard</h1>
              <p className="text-gray-500 mt-1">Comprehensive insights and database metrics</p>
            </div>
          </div>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="database" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Database Stats</span>
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>User Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="database" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Database Performance</h2>
              <p className="text-gray-600">
                Real-time statistics and performance metrics from our Neon PostgreSQL database
              </p>
            </div>
            <DatabaseStatsComponent />
          </TabsContent>

          <TabsContent value="user" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Analytics</h2>
              <p className="text-gray-600">
                Your conversation patterns, achievements, and engagement metrics
              </p>
            </div>
            <UserAnalyticsComponent />
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            to="/chat-selector"
            className="group p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Start New Chat</h3>
                <p className="text-sm text-gray-600">Begin a new conversation</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/settings"
            className="group p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">User Settings</h3>
                <p className="text-sm text-gray-600">Manage your preferences</p>
              </div>
            </div>
          </Link>

          <div className="group p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Export Data</h3>
                <p className="text-sm text-gray-600">Download your data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;