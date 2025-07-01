import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, ArrowRight, Sparkles, Zap, Shield, Star, CheckCircle, Brain, Heart, Globe, Award, Rocket, Crown, Gem } from 'lucide-react';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full opacity-50 animate-float delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-pink-400 rounded-full opacity-40 animate-float delay-500"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-cyan-400 rounded-full opacity-70 animate-float delay-700"></div>
      </div>

      <Header />

      {/* Hero Section with Enhanced Design */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-lg border border-white/30 shadow-2xl text-gray-700 text-sm mb-8 hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <Sparkles className="w-5 h-5 mr-3 text-blue-600 animate-pulse" />
              Next-Generation AI Chat Experience
              <Crown className="w-5 h-5 ml-3 text-yellow-500" />
            </div>
          </div>
          
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 mb-8 animate-fade-in delay-300 leading-tight">
            Tria
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse"> AI</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-blue-700 mb-8 animate-fade-in delay-500 leading-relaxed">
            Where AI Personalities Come Alive ✨
          </p>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-16 max-w-4xl mx-auto animate-fade-in delay-700 leading-relaxed px-4 font-medium">
            Experience dynamic conversations with Leo and Max - two distinct AI personalities that bring intelligence, 
            humor, and engaging dialogue to every interaction. No signup required, just start chatting!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in delay-1000">
            <Link 
              to="/chat-selector" 
              className="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full text-xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Rocket className="mr-3 w-6 h-6 group-hover:animate-bounce" />
              Start Chatting Now
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            
            <div className="flex items-center text-gray-600 text-base bg-white/80 backdrop-blur-lg px-6 py-3 rounded-full border border-white/50 shadow-xl">
              <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
              <Gem className="w-4 h-4 mr-2 text-purple-500" />
              Free to use • No signup required
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced AI Companions Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 mb-8">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-blue-800 font-semibold">Meet Your AI Team</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 mb-8">
              Meet Your AI Companions
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Experience the future of AI interaction with Leo and Max - two unique personalities 
              designed to understand, engage, and entertain in every conversation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="group relative bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-xl rounded-3xl p-10 border border-white/50 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                  <Users className="text-white" size={40} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">Leo</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                  Your dedicated AI companion who delivers perfect answers with intelligence and charm. 
                  Leo brings depth to every conversation, making complex topics accessible and enjoyable 
                  with his engaging personality and thoughtful responses.
                </p>
                <div className="flex items-center text-blue-700 bg-blue-100 px-6 py-3 rounded-full w-fit shadow-lg">
                  <Shield className="w-5 h-5 mr-3" />
                  <span className="font-bold">Intelligent & Reliable</span>
                </div>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-xl rounded-3xl p-10 border border-white/50 hover:bg-gradient-to-br hover:from-white hover:to-purple-50 hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                  <MessageCircle className="text-white" size={40} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">Max</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                  The witty conversationalist who combines perfect accuracy with humor and lightness. 
                  Max transforms every interaction into an entertaining experience while maintaining 
                  exceptional helpfulness and providing insightful, engaging responses.
                </p>
                <div className="flex items-center text-purple-700 bg-purple-100 px-6 py-3 rounded-full w-fit shadow-lg">
                  <Sparkles className="w-5 h-5 mr-3" />
                  <span className="font-bold">Witty & Entertaining</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="relative bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl rounded-3xl p-12 sm:p-16 border border-white/50 max-w-5xl mx-auto hover:shadow-3xl transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <MessageCircle className="text-white" size={48} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">Dynamic Three-Way Conversations</h3>
                <p className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-medium">
                  Experience truly natural AI interactions where both Leo and Max respond to you and engage 
                  with each other, creating rich, contextual conversations that feel completely human and authentic.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <div className="flex items-center text-blue-700 bg-blue-100 px-6 py-3 rounded-full shadow-lg">
                    <Zap className="w-5 h-5 mr-3" />
                    <span className="font-bold">Real-time Responses</span>
                  </div>
                  <div className="flex items-center text-green-700 bg-green-100 px-6 py-3 rounded-full shadow-lg">
                    <Shield className="w-5 h-5 mr-3" />
                    <span className="font-bold">Context Aware</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Showcase */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50/50 to-blue-50/50 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 mb-8">
              <Star className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-green-800 font-semibold">Premium Features</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 mb-8">
              Why Choose Tria AI?
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Experience the next generation of AI conversation with features designed for natural, 
              engaging, and meaningful interactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MessageCircle, title: "Instant Access", desc: "No registration required. Start chatting with Leo and Max immediately without any barriers.", color: "from-blue-500 to-cyan-500" },
              { icon: Users, title: "Dual Personalities", desc: "Experience conversations with two distinct AI personalities that complement each other perfectly.", color: "from-purple-500 to-pink-500" },
              { icon: Zap, title: "Lightning Fast", desc: "Get instant responses powered by advanced AI models optimized for speed and accuracy.", color: "from-yellow-500 to-orange-500" },
              { icon: Shield, title: "Privacy Focused", desc: "Your conversations are secure and private. We prioritize your data protection and privacy.", color: "from-green-500 to-emerald-500" },
              { icon: Brain, title: "Context Aware", desc: "Leo and Max remember your conversation context and respond accordingly for natural flow.", color: "from-indigo-500 to-purple-500" },
              { icon: Globe, title: "Always Available", desc: "24/7 availability means Leo and Max are always ready to chat whenever you need them.", color: "from-teal-500 to-blue-500" }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-3xl p-12 sm:p-20 border border-white/50 shadow-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-20 -translate-x-20"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full translate-y-20 translate-x-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 mb-8">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                Join thousands of users discovering the next level of AI conversation technology. 
                Start chatting with Leo and Max right now - no signup required!
              </p>
              <Link 
                to="/chat-selector" 
                className="group relative inline-flex items-center px-16 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full text-2xl font-black hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-110 shadow-3xl hover:shadow-4xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Rocket className="mr-4 w-8 h-8 group-hover:animate-bounce" />
                Start Chatting Now
                <MessageCircle className="ml-4 w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/30 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-xl z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-800 mb-4">
              Tria AI
            </h3>
            <p className="text-gray-600 mb-6 font-medium">
              Crafted with ❤️ by At41rv for the Future of AI Conversation
            </p>
          </div>
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="flex items-center text-gray-500 bg-white/60 px-4 py-2 rounded-full border border-gray-200">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              <span className="text-sm font-medium">Made with Love</span>
            </div>
            <div className="flex items-center text-gray-500 bg-white/60 px-4 py-2 rounded-full border border-gray-200">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
              <span className="text-sm font-medium">AI Powered</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium">
            Experience the magic of Leo and Max - Your AI companions for every conversation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;