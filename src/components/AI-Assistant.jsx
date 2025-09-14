// src/components/AI-Assistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User,
  Settings,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// BotPress WebChat Component
const BotPressWebChat = () => {
  useEffect(() => {
    // Create and append the core script
    const coreScript = document.createElement('script');
    coreScript.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
    coreScript.defer = true;
    
    // Create and append the bot script
    const botScript = document.createElement('script');
    botScript.src = 'https://files.bpcontent.cloud/2025/09/14/06/20250914062431-PZV271HF.js';
    botScript.defer = true;
    
    // Append scripts to document body
    document.body.appendChild(coreScript);
    document.body.appendChild(botScript);
    
    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.body.removeChild(coreScript);
      document.body.removeChild(botScript);
      
      // Also remove any BotPress iframe that might have been created
      const botpressIframe = document.getElementById('botpress-webchat');
      if (botpressIframe) {
        botpressIframe.remove();
      }
    };
  }, []);

  return <div id="botpress-webchat"></div>;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Waste Management Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInputText(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle voice input
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Simulate bot response
  const simulateBotResponse = (userMessage) => {
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      let response = "";
      
      // Simple response logic based on keywords
      if (userMessage.toLowerCase().includes('recycle') || userMessage.toLowerCase().includes('recycling')) {
        response = "Recycling helps reduce waste in landfills. Different materials have different recycling processes. Would you like to know about specific recycling guidelines?";
      } else if (userMessage.toLowerCase().includes('bin') || userMessage.toLowerCase().includes('waste bin')) {
        response = "We have different types of waste bins: dry waste (blue), wet waste (green), and hazardous waste (red). You can upload bin locations through our platform to help others find proper disposal points.";
      } else if (userMessage.toLowerCase().includes('hazardous') || userMessage.toLowerCase().includes('dangerous')) {
        response = "Hazardous waste includes batteries, electronics, chemicals, and medical waste. These should never be disposed of in regular bins. We have special collection points for these materials.";
      } else if (userMessage.toLowerCase().includes('points') || userMessage.toLowerCase().includes('reward')) {
        response = "You earn 50 points for each verified bin upload! These points can be redeemed for rewards and discounts with our partner organizations.";
      } else if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        response = "Hello! I'm here to help with all your waste management questions. What would you like to know?";
      } else {
        response = "I'm here to assist with waste management questions. You can ask me about recycling, waste bin locations, hazardous materials, or how to earn points on our platform.";
      }
      
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: response,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    simulateBotResponse(inputText);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Feedback buttons
  const handleFeedback = (messageId, isPositive) => {
    // In a real app, this would send feedback to the backend
    console.log(`Feedback for message ${messageId}: ${isPositive ? 'positive' : 'negative'}`);
    
    // Visual feedback
    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, feedback: isPositive ? 'positive' : 'negative' };
      }
      return msg;
    });
    
    setMessages(updatedMessages);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 h-96 bg-emerald-50 dark:bg-green-800 rounded-2xl shadow-xl flex flex-col border border-green-200 dark:border-green-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-600 dark:bg-green-700 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white dark:bg-emerald-100 p-1 rounded-full mr-3">
                  <Bot size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Waste Assistant</h3>
                  <p className="text-xs opacity-80">Ask me about waste management</p>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-emerald-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-white dark:bg-green-700 text-green-900 dark:text-emerald-50 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    
                    {message.sender === 'bot' && message.id !== 1 && (
                      <div className="flex justify-end mt-2 space-x-1">
                        <button
                          onClick={() => handleFeedback(message.id, true)}
                          className={`p-1 rounded-full ${
                            message.feedback === 'positive' 
                              ? 'text-green-500 bg-green-100 dark:bg-green-600' 
                              : 'text-gray-400 hover:text-green-500'
                          }`}
                        >
                          <ThumbsUp size={14} />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, false)}
                          className={`p-1 rounded-full ${
                            message.feedback === 'negative' 
                              ? 'text-red-500 bg-red-100 dark:bg-red-600' 
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-green-700 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-green-200 dark:border-green-700 bg-white dark:bg-green-900">
              <div className="flex items-center">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full py-2 pl-4 pr-10 bg-emerald-50 dark:bg-green-800 text-green-900 dark:text-emerald-50 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    disabled={isListening}
                  />
                  <button
                    onClick={toggleListening}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                      isListening 
                        ? 'text-red-500 animate-pulse' 
                        : 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200'
                    }`}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={inputText.trim() === ''}
                  className="ml-2 p-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-full transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-green-400 mt-2">
                Ask me about recycling, bin locations, or waste management tips
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BotPress WebChat Integration */}
      <BotPressWebChat />
    </>
  );
};

export default AIAssistant;