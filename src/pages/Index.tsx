import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, ArrowRight, Database, Zap, Shield, Star, CheckCircle, Brain, Globe, Award, Server, Lock, BarChart3, Layers, RefreshCw, Clock } from 'lucide-react';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 text-sm mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Next-Generation AI Chat Experience
            </div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-8 animate-fade-in delay-300 leading-tight">
            Tria AI
          </h1>
          
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-8 animate-fade-in delay-500 leading-relaxed">
            Where AI Personalities Come Alive
          </p>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-16 max-w-4xl mx-auto animate-fade-in delay-700 leading-relaxed px-4">
            Experience dynamic conversations with Leo and Max - two distinct AI personalities that bring intelligence, 
            humor, and engaging dialogue to every interaction. Powered by advanced Neon database technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-1000">
            <Link 
              to="/chat-selector" 
              className="group inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Chatting Now
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <div className="flex items-center text-gray-600 text-base bg-gray-50 px-6 py-3 rounded-lg border border-gray-200">
              <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
              Free to use • No signup required
            </div>
          </div>
        </div>
      </section>

      {/* Neon Database Features Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-gray-200 mb-8">
              <Database className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-gray-800 font-semibold">Powered by Neon Database</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
              Enterprise-Grade Database Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Built on Neon's serverless PostgreSQL platform for unmatched performance, 
              scalability, and reliability in AI conversation management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { 
                icon: Zap, 
                title: "Instant Scaling", 
                desc: "Auto-scaling database that handles millions of conversations without performance degradation.",
                feature: "Serverless Architecture"
              },
              { 
                icon: Lock, 
                title: "Enterprise Security", 
                desc: "Bank-grade encryption and security protocols protect your conversation data at all times.",
                feature: "SSL/TLS Encryption"
              },
              { 
                icon: RefreshCw, 
                title: "Real-time Sync", 
                desc: "Instant data synchronization across all devices with sub-millisecond latency.",
                feature: "Live Updates"
              },
              { 
                icon: BarChart3, 
                title: "Advanced Analytics", 
                desc: "Comprehensive conversation analytics and insights powered by PostgreSQL queries.",
                feature: "Data Intelligence"
              },
              { 
                icon: Layers, 
                title: "Multi-tenant Architecture", 
                desc: "Isolated data environments ensuring complete privacy and data separation.",
                feature: "Data Isolation"
              },
              { 
                icon: Clock, 
                title: "Point-in-time Recovery", 
                desc: "Advanced backup and recovery systems ensure your data is never lost.",
                feature: "Data Protection"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{feature.feature}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Database Performance Stats */}
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-200 shadow-sm">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Database Performance</h3>
              <p className="text-gray-600 text-lg">Real-time metrics from our Neon PostgreSQL infrastructure</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Query Response Time", value: "<10ms", icon: Zap },
                { label: "Uptime Guarantee", value: "99.9%", icon: Shield },
                { label: "Data Centers", value: "Global", icon: Globe },
                { label: "Concurrent Users", value: "Unlimited", icon: Users }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Companions Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-50 border border-gray-200 mb-8">
              <Users className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-gray-800 font-semibold">Meet Your AI Team</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
              Meet Your AI Companions
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of AI interaction with Leo and Max - two unique personalities 
              designed to understand, engage, and entertain in every conversation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="group bg-white rounded-2xl p-10 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Leo</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Your dedicated AI companion who delivers perfect answers with intelligence and charm. 
                Leo brings depth to every conversation, making complex topics accessible and enjoyable 
                with his engaging personality and thoughtful responses.
              </p>
              <div className="inline-flex items-center text-gray-700 bg-gray-100 px-6 py-3 rounded-lg">
                <Shield className="w-5 h-5 mr-3" />
                <span className="font-semibold">Intelligent & Reliable</span>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-10 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Max</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                The witty conversationalist who combines perfect accuracy with humor and lightness. 
                Max transforms every interaction into an entertaining experience while maintaining 
                exceptional helpfulness and providing insightful, engaging responses.
              </p>
              <div className="inline-flex items-center text-gray-700 bg-gray-100 px-6 py-3 rounded-lg">
                <Star className="w-5 h-5 mr-3" />
                <span className="font-semibold">Witty & Entertaining</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gray-50 rounded-2xl p-12 sm:p-16 border border-gray-200 max-w-5xl mx-auto">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <MessageCircle className="text-white" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Dynamic Three-Way Conversations</h3>
              <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                Experience truly natural AI interactions where both Leo and Max respond to you and engage 
                with each other, creating rich, contextual conversations that feel completely human and authentic.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center text-gray-700 bg-white px-6 py-3 rounded-lg border border-gray-200">
                  <Zap className="w-5 h-5 mr-3" />
                  <span className="font-semibold">Real-time Responses</span>
                </div>
                <div className="flex items-center text-gray-700 bg-white px-6 py-3 rounded-lg border border-gray-200">
                  <Brain className="w-5 h-5 mr-3" />
                  <span className="font-semibold">Context Aware</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-gray-200 mb-8">
              <Star className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-gray-800 font-semibold">Key Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
              Why Choose Tria AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of AI conversation with features designed for natural, 
              engaging, and meaningful interactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MessageCircle, title: "Instant Access", desc: "No registration required. Start chatting with Leo and Max immediately without any barriers." },
              { icon: Users, title: "Dual Personalities", desc: "Experience conversations with two distinct AI personalities that complement each other perfectly." },
              { icon: Zap, title: "Lightning Fast", desc: "Get instant responses powered by advanced AI models optimized for speed and accuracy." },
              { icon: Shield, title: "Privacy Focused", desc: "Your conversations are secure and private. We prioritize your data protection and privacy." },
              { icon: Brain, title: "Context Aware", desc: "Leo and Max remember your conversation context and respond accordingly for natural flow." },
              { icon: Globe, title: "Always Available", desc: "24/7 availability means Leo and Max are always ready to chat whenever you need them." }
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-gray-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gray-50 rounded-2xl p-12 sm:p-20 border border-gray-200">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users discovering the next level of AI conversation technology. 
              Start chatting with Leo and Max right now - no signup required!
            </p>
            <Link 
              to="/chat-selector" 
              className="group inline-flex items-center px-12 py-6 bg-gray-900 text-white rounded-xl text-xl font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Chatting Now
              <MessageCircle className="ml-4 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tria AI
            </h3>
            <p className="text-gray-600 mb-6">
              Crafted with care for the Future of AI Conversation
            </p>
          </div>
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="flex items-center text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <Database className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Powered by Neon</span>
            </div>
            <div className="flex items-center text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <Brain className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">AI Powered</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Experience the magic of Leo and Max - Your AI companions for every conversation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;