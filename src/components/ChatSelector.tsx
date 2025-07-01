import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, ArrowLeft, Users, Brain, Settings } from 'lucide-react';
import { useAuth } from '../contexts/HybridAuthContext';
import UserButton from './UserButton';

const ChatSelector = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <div className="relative bg-white shadow-sm border-b border-gray-200 p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} className="mr-3 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold hidden sm:inline">Back to Home</span>
            <span className="font-semibold sm:hidden">Back</span>
          </Link>
          
          <div className="text-center flex-1 mx-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
              Choose Your Experience
            </h1>
            <p className="text-sm sm:text-base text-gray-600 hidden sm:block">Select your preferred chat mode</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {currentUser && (
              <Link 
                to="/settings" 
                className="p-3 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 hover:scale-105"
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
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-50 border border-gray-200 mb-8">
              <Brain className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-gray-800 font-semibold">AI-Powered Conversations</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
              How would you like to chat today?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
              Choose between personalized learning assistance or engaging conversation with Leo and Max
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Study Mode */}
            <Link 
              to="/study-chat"
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Brain className="text-white" size={40} />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">Study Mode</h3>
                <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                  AI tutors that work together in real-time to understand your unique learning style, pace, and curiosity, 
                  guiding you from confusion to mastery with personalized educational support.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  <div className="flex items-center justify-center text-gray-700 bg-gray-100 px-4 sm:px-6 py-3 rounded-lg">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-sm sm:text-base font-semibold">Adaptive Learning</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-700 bg-gray-100 px-4 sm:px-6 py-3 rounded-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-sm sm:text-base font-semibold">Personalized Tutoring</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Conversation Mode */}
            <Link 
              to="/chat"
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <MessageCircle className="text-white" size={40} />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">Conversation with Leo & Max</h3>
                <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                  Engage in dynamic three-way conversations with Leo and Max - two distinct AI personalities 
                  that bring intelligence, humor, and engaging dialogue to every interaction.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  <div className="flex items-center justify-center text-gray-700 bg-gray-100 px-4 sm:px-6 py-3 rounded-lg">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-sm sm:text-base font-semibold">Dynamic Conversations</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-700 bg-gray-100 px-4 sm:px-6 py-3 rounded-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-sm sm:text-base font-semibold">AI Personalities</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* No Login Required Notice */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-8 py-4 bg-gray-50 border border-gray-200 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <MessageCircle className="w-5 h-5 mr-3 text-gray-600" />
              <span className="text-gray-700 font-semibold">
                No signup required - Start chatting instantly!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSelector;