import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, ArrowRight, Sparkles, Zap, Shield, Star, CheckCircle, Brain, Heart, Globe, Award } from 'lucide-react';
import Header from '../components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg text-gray-700 text-sm mb-8 hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2 text-gray-600" />
              Next-Generation AI Chat Experience
              <Star className="w-4 h-4 ml-2 text-yellow-500" />
            </div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-800 mb-6 animate-fade-in delay-300">
            Tria
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800"> AI</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-6 animate-fade-in delay-500 leading-relaxed">
            Where AI Personalities Come Alive
          </p>
          
          <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-3xl mx-auto animate-fade-in delay-700 leading-relaxed px-4">
            Experience dynamic conversations with Leo and Max - two distinct AI personalities that bring intelligence, 
            humor, and engaging dialogue to every interaction. No signup required, just start chatting!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-1000">
            <Link 
              to="/chat-selector" 
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full text-lg font-semibold hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Start Chatting Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center text-gray-500 text-sm bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Free to use • No signup required
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your AI Companions Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
              Meet Your AI Companions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of AI interaction with Leo and Max - two unique personalities 
              designed to understand, engage, and entertain in every conversation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Leo</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                Your dedicated AI companion who delivers perfect answers with intelligence and charm. 
                Leo brings depth to every conversation, making complex topics accessible and enjoyable 
                with his engaging personality and thoughtful responses.
              </p>
              <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full w-fit">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Intelligent & Reliable</span>
              </div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Max</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                The witty conversationalist who combines perfect accuracy with humor and lightness. 
                Max transforms every interaction into an entertaining experience while maintaining 
                exceptional helpfulness and providing insightful, engaging responses.
              </p>
              <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full w-fit">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Witty & Entertaining</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-200 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageCircle className="text-white" size={40} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Dynamic Three-Way Conversations</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Experience truly natural AI interactions where both Leo and Max respond to you and engage 
                with each other, creating rich, contextual conversations that feel completely human and authentic.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Real-time Responses</span>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Context Aware</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
              About Tria AI
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Pioneering the future of AI conversation technology with innovative personalities 
              that understand, engage, and inspire meaningful interactions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Brain className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Advanced AI Technology</h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by cutting-edge language models and sophisticated personality frameworks 
                that create truly engaging and intelligent conversations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Human-Centered Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Every interaction is designed to feel natural and meaningful, with AI personalities 
                that adapt to your communication style and preferences.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Accessible to Everyone</h3>
              <p className="text-gray-600 leading-relaxed">
                No barriers, no complicated setups. Just open your browser and start chatting 
                with Leo and Max instantly, anywhere in the world.
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed text-center max-w-4xl mx-auto mb-8">
              At Tria AI, we believe that artificial intelligence should enhance human connection, not replace it. 
              Our mission is to create AI companions that understand context, emotion, and nuance - making every 
              conversation feel authentic and valuable. Whether you're seeking knowledge, entertainment, or simply 
              someone to talk to, Leo and Max are here to provide meaningful interactions that adapt to your needs.
            </p>
            <div className="text-center">
              <p className="text-gray-500 font-medium">
                "In Greek, the number '3' is τρία (Tria) - representing the perfect harmony of user, Leo, and Max in conversation."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
              Why Choose Tria AI?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of AI conversation with features designed for natural, 
              engaging, and meaningful interactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-gray-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Instant Access</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                No registration required. Start chatting with Leo and Max immediately without any barriers.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Dual Personalities</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Experience conversations with two distinct AI personalities that complement each other perfectly.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-gray-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Lightning Fast</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get instant responses powered by advanced AI models optimized for speed and accuracy.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-gray-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Privacy Focused</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your conversations are secure and private. We prioritize your data protection and privacy.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-gray-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Context Aware</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Leo and Max remember your conversation context and respond accordingly for natural flow.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-gray-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Always Available</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                24/7 availability means Leo and Max are always ready to chat whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users discovering the next level of AI conversation technology. 
            Start chatting with Leo and Max right now - no signup required!
          </p>
          <Link 
            to="/chat-selector" 
            className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full text-xl font-semibold hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            Start Chatting Now
            <MessageCircle className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 mb-4">
            Crafted with ❤️ by At41rv for the Future of AI Conversation
          </p>
          <p className="text-gray-400 text-sm">
            Experience the magic of Leo and Max - Your AI companions for every conversation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;