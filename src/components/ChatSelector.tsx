import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, ArrowLeft, Users, Brain, Settings, Sparkles, Zap, Crown } from 'lucide-react';
import { useAuth } from '../contexts/HybridAuthContext';
import UserButton from './UserButton';

const ChatSelector = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/30 p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="group flex items-center text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} className="mr-3 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold hidden sm:inline">Back to Home</span>
            <span className="font-bold sm:hidden">Back</span>
          </Link>
          
          <div className="text-center flex-1 mx-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800">
              Choose Your Experience
            </h1>
            <p className="text-sm sm:text-base text-gray-600 hidden sm:block font-medium">Select your preferred chat mode</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {currentUser && (
              <Link 
                to="/settings" 
                className="p-3 text-gray-600 hover:text-gray-800 transition-all duration-200 rounded-xl hover:bg-white/50 hover:scale-105"
              >
                <Settings size={20} />
              </Link>
            )}
            <UserButton />
          </div>
        </div>
      </div>

      {/* Chat Options */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 mb-8">
              <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-blue-800 font-semibold">AI-Powered Conversations</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 mb-6">
              How would you like to chat today?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 font-medium leading-relaxed">
              Choose between personalized learning assistance or engaging conversation with Leo and Max
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Study Mode */}
            <Link 
              to="/study-chat"
              className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-8 sm:p-12 border border-white/50 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                  <Brain className="text-white" size={40} />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">Study Mode</h3>
                <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 font-medium">
                  AI tutors that work together in real-time to understand your unique learning style, pace, and curiosity, 
                  guiding you from confusion to mastery with personalized educational support.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  <div className="flex items-center justify-center text-blue-700 bg-blue-100 px-4 sm:px-6 py-3 rounded-full shadow-lg">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-sm sm:text-base font-bold">Adaptive Learning</span>
                  </div>
                  <div className="flex items-center justify-center text-blue-700 bg-blue-100 px-4 sm:px-6 py-3 rounded-full shadow-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-sm sm:text-base font-bold">Personalized Tutoring</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Conversation Mode */}
            <Link 
              to="/chat"
              className="group relative bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-8 sm:p-12 border border-white/50 hover:bg-gradient-to-br hover:from-white hover:to-purple-50 hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                  <MessageCircle className="text-white" size={40} />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">Conversation with Leo & Max</h3>
                <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 font-medium">
                  Engage in dynamic three-way conversations with Leo and Max - two distinct AI personalities 
                  that bring intelligence, humor, and engaging dialogue to every interaction.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  <div className="flex items-center justify-center text-purple-700 bg-purple-100 px-4 sm:px-6 py-3 rounded-full shadow-lg">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-sm sm:text-base font-bold">Dynamic Conversations</span>
                  </div>
                  <div className="flex items-center justify-center text-purple-700 bg-purple-100 px-4 sm:px-6 py-3 rounded-full shadow-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-sm sm:text-base font-bold">AI Personalities</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Enhanced No Login Required Notice */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-white/90 to-green-50/90 backdrop-blur-xl border border-white/50 rounded-full shadow-2xl">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <MessageCircle className="w-5 h-5 mr-3 text-green-600" />
              <span className="text-gray-700 font-bold">
                No signup required - Start chatting instantly!
              </span>
              <Crown className="w-5 h-5 ml-3 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSelector;