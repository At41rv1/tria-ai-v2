
import React, { useState } from 'react';
import { useAuth } from '../contexts/HybridAuthContext';
import { updateUser } from '../lib/database';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Save, ArrowLeft, Shield, Bell, Palette, Database, Trash2, Download, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Settings = () => {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      await updateUser(currentUser.id, { displayName });
      toast({ title: "Profile updated successfully" });
    } catch (error) {
      toast({ 
        title: "Error updating profile", 
        variant: "destructive" 
      });
    }
    setLoading(false);
  };

  const handleExportData = () => {
    toast({ title: "Data export feature coming soon!" });
  };

  const handleDeleteAccount = () => {
    toast({ 
      title: "Account deletion", 
      description: "Please contact support to delete your account",
      variant: "destructive" 
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <Card className="w-full max-w-md border-gray-200 shadow-sm">
            <CardHeader className="text-center bg-gray-50">
              <Shield className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <CardTitle className="text-xl text-gray-800">Access Denied</CardTitle>
              <CardDescription className="text-gray-600">Please sign in to view your settings</CardDescription>
            </CardHeader>
            <CardContent className="text-center p-6">
              <Link to="/">
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
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
              <SettingsIcon className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-500 mt-1">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <User className="w-5 h-5 mr-3 text-gray-600" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Update your personal information and display preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={currentUser.email}
                        disabled
                        className="pl-10 h-12 bg-gray-50 border-gray-300 text-gray-500"
                      />
                    </div>
                    <p className="text-xs text-gray-400">Email cannot be changed</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">Display Name</Label>
                    <Input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                      className="h-12 border-gray-300 focus:border-gray-500"
                    />
                  </div>
                </div>
                
                <Separator className="bg-gray-200" />
                
                <Button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="bg-gray-800 hover:bg-gray-900 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <Palette className="w-5 h-5 mr-3 text-gray-600" />
                  Preferences
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Customize your application experience
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Dark Mode</h4>
                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                  </div>
                  <Badge variant="secondary" className="bg-gray-200 text-gray-600">Coming Soon</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive updates about your chats</p>
                  </div>
                  <Badge variant="secondary" className="bg-gray-200 text-gray-600">Coming Soon</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <h4 className="font-medium text-gray-800">Auto-save Conversations</h4>
                    <p className="text-sm text-gray-500">Automatically save your chat history</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300">
                    Enabled
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Data & Privacy */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <Database className="w-5 h-5 mr-3 text-gray-600" />
                  Data & Privacy
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Manage your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button 
                  variant="outline" 
                  onClick={handleExportData}
                  className="w-full justify-start h-12 border-gray-300 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Export My Data
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleDeleteAccount}
                  className="w-full justify-start h-12 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-3" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Overview */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="flex items-center text-lg text-gray-800">
                  <Shield className="w-5 h-5 mr-3 text-gray-600" />
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">User ID</span>
                    <Badge variant="outline" className="font-mono text-xs border-gray-300">
                      {currentUser.id.slice(0, 8)}...
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="text-sm font-medium text-gray-800">
                      {new Date(currentUser.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Account Type</span>
                    <Badge className="bg-gray-800 text-white">
                      Premium
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="flex items-center text-lg text-gray-800">
                  <Bell className="w-5 h-5 mr-3 text-gray-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Link to="/chat-selector" className="block">
                  <Button variant="outline" className="w-full h-10 justify-start border-gray-300 hover:bg-gray-50">
                    Start New Chat
                  </Button>
                </Link>
                <Link to="/chat" className="block">
                  <Button variant="outline" className="w-full h-10 justify-start border-gray-300 hover:bg-gray-50">
                    Continue Last Chat
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card className="border-gray-300 bg-gray-50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get support or learn more about Triple Chat features.
                </p>
                <Button variant="outline" className="w-full border-gray-400 text-gray-700 hover:bg-gray-100">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
