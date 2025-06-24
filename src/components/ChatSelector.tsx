
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, ArrowLeft, Users, Brain } from 'lucide-react';

const ChatSelector = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Choose Your Experience
            </h1>
            <p className="text-sm text-gray-600">Select your preferred chat mode</p>
          </div>
          
          <div className="w-24"></div>
        </div>
      </div>

      {/* Chat Options */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              How would you like to chat today?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose between personalized learning assistance or engaging conversation with our AI companions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Study Mode */}
            <Link 
              to="/study-chat"
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Brain className="text-white" size={40} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Study Mode</h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  AI tutors that work together in real-time to understand your unique learning style, pace, and curiosity, 
                  guiding you from confusion to mastery with personalized educational support.
                </p>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-center text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Adaptive Learning</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Personalized Tutoring</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Conversation Mode */}
            <Link 
              to="/chat"
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <MessageCircle className="text-white" size={40} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Conversation with Ram & Laxman</h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  Engage in dynamic three-way conversations with Ram and Laxman - two distinct AI personalities 
                  that bring intelligence, humor, and engaging dialogue to every interaction.
                </p>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Dynamic Conversations</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">AI Personalities</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSelector;
