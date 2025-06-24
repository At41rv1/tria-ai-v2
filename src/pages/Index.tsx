
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, Bot, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white transform -skew-y-1 scale-110"></div>
        
        {/* Floating Elements for Parallax Effect */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gray-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gray-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-gray-400 rounded-full opacity-25 animate-bounce delay-1000"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 animate-fade-in">
            Triple
            <span className="text-gray-600"> Chat</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in delay-300">
            Experience conversations like never before with two AI personalities
          </p>
          <p className="text-lg text-gray-500 mb-12 animate-fade-in delay-500">
            Meet Ram & Laxman - Your AI conversation partners with unique personalities
          </p>
          
          <Link 
            to="/chat" 
            className="inline-flex items-center px-8 py-4 bg-gray-800 text-white rounded-full text-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 animate-fade-in delay-700"
          >
            Start Chatting <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Meet Your AI Companions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Bot className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ram</h3>
              <p className="text-gray-600 text-lg">
                Dedicated and perfect answers with a touch of fun. Ram brings intelligence 
                and personality to every conversation, making complex topics engaging and enjoyable.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Laxman</h3>
              <p className="text-gray-600 text-lg">
                Funny and witty while delivering perfect answers. Laxman adds humor 
                and lightness to conversations, making every interaction memorable and entertaining.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <MessageCircle className="mx-auto mb-4 text-gray-600" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Natural Conversations</h3>
              <p className="text-gray-600 text-lg">
                Experience three-way conversations where both AIs respond to you and each other, 
                creating dynamic, natural, and engaging dialogues that feel completely human.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready for an Amazing Conversation?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the future of AI interaction and experience conversations like never before
          </p>
          <Link 
            to="/chat" 
            className="inline-flex items-center px-10 py-5 bg-gray-800 text-white rounded-full text-xl font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            Enter Chat Room <MessageCircle className="ml-3" size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
