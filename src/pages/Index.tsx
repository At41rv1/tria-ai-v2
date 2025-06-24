import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, Bot, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Next-Generation AI Chat Experience
            </div>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 animate-fade-in delay-300">
            Triple
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Chat</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-6 animate-fade-in delay-500">
            Where AI Personalities Come Alive
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in delay-700">
            Experience dynamic three-way conversations with Ram & Laxman - two distinct AI personalities 
            powered by advanced models, creating natural and engaging dialogues.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-1000">
            <Link 
              to="/chat" 
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Chatting 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="text-gray-400 text-sm">
              Free • No Registration Required
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Meet Your AI Companions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of AI interaction with personalities that understand, engage, and entertain
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Ram</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Your dedicated AI companion who delivers perfect answers with intelligence and charm. 
                Ram brings depth to every conversation, making complex topics accessible and enjoyable 
                with his engaging personality.
              </p>
              <div className="mt-6 flex items-center text-purple-400">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Intelligent & Reliable</span>
              </div>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Laxman</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                The witty conversationalist who combines perfect accuracy with humor and lightness. 
                Laxman transforms every interaction into an entertaining experience while maintaining 
                exceptional helpfulness and insight.
              </p>
              <div className="mt-6 flex items-center text-green-400">
                <Sparkles className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Witty & Entertaining</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-white" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Dynamic Three-Way Conversations</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Experience truly natural AI interactions where both personalities respond to you and engage 
                with each other, creating rich, contextual conversations that feel completely human and authentic.
              </p>
              <div className="mt-8 flex justify-center space-x-6">
                <div className="flex items-center text-indigo-400">
                  <Zap className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Real-time Responses</span>
                </div>
                <div className="flex items-center text-purple-400">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Context Aware</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of users discovering the next level of AI conversation technology
          </p>
          <Link 
            to="/chat" 
            className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Enter Chat Room 
            <MessageCircle className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            Built with ❤️ for the future of AI conversation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
