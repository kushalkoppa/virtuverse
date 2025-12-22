import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2 } from 'lucide-react';
import axios from 'axios';
import '../styles/ChatBot.css';

function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your VirtuSpace AI Assistant. I can help you with model integration, compatibility checks, and platform guidance. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/api/aiagent/query', {
        query: inputValue,
        context: {
          platform: 'virtuspace',
          timestamp: new Date().toISOString()
        }
      });

      setIsTyping(false);

      if (response.data.success) {
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: formatBotResponse(response.data.response),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch {
      setIsTyping(false);
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: "I apologize, but I'm having trouble connecting to the server. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const formatBotResponse = (response) => {
    if (typeof response === 'string') {
      return response;
    }

    let formatted = '';
    
    if (response.message) {
      formatted += response.message + '\n\n';
    }

    if (response.guidance && Array.isArray(response.guidance)) {
      formatted += response.guidance.join('\n') + '\n\n';
    }

    if (response.platforms) {
      formatted += 'Available Platforms:\n';
      Object.entries(response.platforms).forEach(([name, desc]) => {
        formatted += `• ${name}: ${desc}\n`;
      });
      formatted += '\n';
    }

    if (response.capabilities && Array.isArray(response.capabilities)) {
      formatted += 'I can help with:\n';
      response.capabilities.forEach(cap => {
        formatted += `• ${cap}\n`;
      });
      formatted += '\n';
    }

    if (response.recommendations && Array.isArray(response.recommendations)) {
      response.recommendations.forEach(rec => {
        formatted += `• ${rec}\n`;
      });
      formatted += '\n';
    }

    if (response.tip) {
      formatted += `💡 Tip: ${response.tip}\n`;
    }

    if (response.nextSteps && Array.isArray(response.nextSteps)) {
      formatted += '\nNext Steps:\n';
      response.nextSteps.forEach(step => {
        formatted += `• ${step}\n`;
      });
    }

    return formatted.trim();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How do I import models?",
    "Check model compatibility",
    "Which platform should I use?",
    "How to integrate models?"
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <Bot size={24} className="chatbot-icon" />
            <div>
              <h3>VirtuSpace AI Assistant</h3>
              <span className="chatbot-status">Online</span>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <button onClick={onClose} className="chatbot-action-btn" title="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message message-${message.type}`}>
              {message.type === 'bot' && (
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {message.content.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx < message.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {message.type === 'user' && (
                <div className="message-avatar message-avatar-user">
                  <span>You</span>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="message message-bot">
              <div className="message-avatar">
                <Bot size={20} />
              </div>
              <div className="message-content">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-questions">
            <p className="quick-questions-title">Quick questions:</p>
            <div className="quick-questions-grid">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chatbot-input">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about VirtuSpace..."
            className="chatbot-input-field"
          />
          <button 
            onClick={handleSendMessage} 
            className="chatbot-send-btn"
            disabled={!inputValue.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
