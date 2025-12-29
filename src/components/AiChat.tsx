import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowLeft, Send, Mic, Paperclip, MoreVertical, Check, CheckCheck, Search, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";

interface AiChatProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  cartItemCount?: number;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isAI?: boolean;
  isOnline?: boolean;
}

export function AiChat({ onBack, onNavigate, cartItemCount = 0 }: AiChatProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const contacts: Contact[] = [
    {
      id: "bery-ai",
      name: "Bery AI Assistant",
      lastMessage: "I'm here to help with your finances!",
      timestamp: "Now",
      unread: 0,
      isAI: true,
      isOnline: true,
    },
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=45",
      lastMessage: "Thanks for the payment!",
      timestamp: "10:45 AM",
      unread: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=33",
      lastMessage: "Can you send me the invoice?",
      timestamp: "Yesterday",
      unread: 0,
      isOnline: false,
    },
    {
      id: "3",
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=44",
      lastMessage: "Perfect, I'll send it tomorrow",
      timestamp: "Yesterday",
      unread: 1,
      isOnline: true,
    },
    {
      id: "4",
      name: "James Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastMessage: "How much did you invest?",
      timestamp: "2 days ago",
      unread: 0,
      isOnline: false,
    },
  ];

  const [messages, setMessages] = useState<{ [contactId: string]: Message[] }>({
    "bery-ai": [
      {
        id: 1,
        text: "Hello! I'm Bery AI, your financial assistant. I can help you with:\n\n• Balance inquiries\n• Investment advice\n• Transaction support\n• Marketplace guidance\n\nHow can I help you today?",
        isUser: false,
        timestamp: new Date(Date.now() - 60000),
        status: "read",
      },
    ],
    "1": [
      {
        id: 1,
        text: "Hey! Did you receive the payment?",
        isUser: true,
        timestamp: new Date(Date.now() - 120000),
        status: "read",
      },
      {
        id: 2,
        text: "Yes! Just got it. Thanks so much! 💙",
        isUser: false,
        timestamp: new Date(Date.now() - 60000),
      },
      {
        id: 3,
        text: "Thanks for the payment!",
        isUser: false,
        timestamp: new Date(Date.now() - 30000),
      },
    ],
  });

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedContact) {
      scrollToBottom();
    }
  }, [messages, selectedContact]);

  const handleSend = () => {
    if (!inputValue.trim() || !selectedContact) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), userMessage],
    }));
    setInputValue("");

    // Update status to delivered
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id].map(msg => 
          msg.id === userMessage.id ? { ...msg, status: "delivered" as const } : msg
        ),
      }));
    }, 500);

    // Simulate response for Bery AI
    if (selectedContact.isAI) {
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: getAiResponse(inputValue),
          isUser: false,
          timestamp: new Date(),
          status: "read",
        };
        setMessages(prev => ({
          ...prev,
          [selectedContact.id]: [
            ...prev[selectedContact.id].map(msg => 
              msg.id === userMessage.id ? { ...msg, status: "read" as const } : msg
            ),
            aiResponse
          ],
        }));
      }, 1500);
    } else {
      // Mark as read for regular contacts
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [selectedContact.id]: prev[selectedContact.id].map(msg => 
            msg.id === userMessage.id ? { ...msg, status: "read" as const } : msg
          ),
        }));
      }, 2000);
    }
  };

  const getAiResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("balance") || lowerInput.includes("money") || lowerInput.includes("wallet")) {
      return "Your current balance is:\n\n💵 Total: $13,400\n₿ Bery: 119,260 (1 USD = 8.9 ₿)\n\nWould you like to see your transaction history or investment portfolio?";
    } else if (lowerInput.includes("invest")) {
      return "Great question! We have several investment options:\n\n📊 Fixed Deposit: 6% APY (Low risk)\n💰 Lending Pool: 10% APY (Medium risk)\n📈 Equity Pool: 15% APY (High risk)\n🚀 Venture Capital: 30% APY (High risk/reward)\n🏢 Real Estate: 12% APY (Medium risk)\n\nWhich interests you most?";
    } else if (lowerInput.includes("send") || lowerInput.includes("transfer")) {
      return "To send money:\n\n1. Tap 'Send' on your wallet\n2. Select recipient or enter wallet ID\n3. Enter amount in USD or Bery\n4. Confirm transaction\n\nYou can send to any Bery user instantly with zero fees! Need help with a specific transfer?";
    } else if (lowerInput.includes("marketplace") || lowerInput.includes("buy") || lowerInput.includes("shop")) {
      return "The Bery Marketplace has:\n\n🛍️ Products: Electronics, home goods, fashion & more\n💼 Services: Design, development, marketing, video editing\n\nAll payments accepted in Bery (₿) or USD. Want me to show you featured items?";
    } else if (lowerInput.includes("bery") || lowerInput.includes("currency")) {
      return "Bery (₿) is the platform's native currency!\n\n💱 Exchange Rate: 1 USD = 8.9 ₿\n✅ Use for all marketplace purchases\n⚡ Instant transfers, zero fees\n🌍 Accepted globally on Bery\n\nYou can convert USD to Bery anytime from your wallet!";
    } else if (lowerInput.includes("hi") || lowerInput.includes("hello") || lowerInput.includes("hey")) {
      return "Hi there! 👋 I'm Bery AI, your financial assistant.\n\nI can help you with:\n• Account & balance info\n• Investment recommendations\n• Transaction support\n• Marketplace guidance\n• Currency conversions\n\nWhat would you like to know?";
    } else if (lowerInput.includes("help") || lowerInput.includes("support")) {
      return "I'm here to help! You can ask me about:\n\n💰 Wallet & balances\n📊 Investments & returns\n💸 Sending & receiving money\n🛒 Marketplace purchases\n₿ Bery currency info\n🌍 Platform features\n\nJust ask your question and I'll do my best to help!";
    } else {
      return "I'm here to help with your Bery account! You can ask me about:\n\n• Your balance & wallet\n• Investment opportunities\n• Sending money\n• The marketplace\n• Bery currency\n\nWhat would you like to know?";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!selectedContact) {
    // Contacts List View
    return (
      <div className="h-screen flex flex-col bg-[#0a0a1a] pb-32">
        {/* Header */}
        <div className="bg-[#1a1d24] px-5 pt-14 pb-4 flex-shrink-0 border-b border-slate-800/50">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-slate-300 hover:bg-slate-800/50 rounded-full h-9 w-9"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Messages
            </h1>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="pl-10 bg-[#2a2f38] border-slate-700/40 text-white placeholder:text-slate-500 h-10 rounded-xl"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact, index) => (
            <motion.button
              key={contact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => setSelectedContact(contact)}
              className="w-full px-5 py-4 flex items-center gap-3 hover:bg-slate-800/30 transition-colors border-b border-slate-800/30"
            >
              <div className="relative">
                {contact.isAI ? (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                ) : (
                  <Avatar className="w-14 h-14 border-2 border-slate-700/50">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a1a]" />
                )}
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-white truncate" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {contact.name}
                  </p>
                  <span className="text-xs text-slate-400 ml-2 flex-shrink-0">
                    {contact.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400 truncate flex-1">
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <div className="ml-2 flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        {contact.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <BottomNavigation currentScreen="ai-chat" onNavigate={onNavigate} cartItemCount={cartItemCount} />
      </div>
    );
  }

  // Chat View
  const contactMessages = messages[selectedContact.id] || [];

  return (
    <div className="h-screen flex flex-col bg-[#0e1014] pb-32">
      {/* Header - WhatsApp style */}
      <div className="bg-[#1a1d24] px-4 pt-14 pb-3 flex-shrink-0 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedContact(null)}
            className="text-slate-300 hover:bg-slate-800/50 rounded-full h-9 w-9"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="relative">
            {selectedContact.isAI ? (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            ) : (
              <Avatar className="w-10 h-10 border-2 border-slate-700/50">
                <AvatarImage src={selectedContact.avatar} />
                <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
              </Avatar>
            )}
            {selectedContact.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1d24]" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-sm text-white truncate" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {selectedContact.name}
            </h1>
            <p className="text-xs text-slate-400">
              {selectedContact.isOnline ? (selectedContact.isAI ? "AI-powered • Always available" : "Online") : "Offline"}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-300 hover:bg-slate-800/50 rounded-full h-9 w-9"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Chat Background */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{
          background: 'linear-gradient(to bottom, #0a0c0f 0%, #0e1014 100%)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          {contactMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2 mb-2 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 ${
                  message.isUser
                    ? 'bg-[#005c4b] text-white rounded-br-sm'
                    : selectedContact.isAI 
                      ? 'bg-gradient-to-br from-blue-600/30 to-blue-800/30 border border-blue-500/30 text-white rounded-bl-sm'
                      : 'bg-[#1f2329] text-white rounded-bl-sm'
                }`}
                style={{
                  boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                }}
              >
                <p className="text-sm break-words whitespace-pre-line" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {message.text}
                </p>
                <div className={`flex items-center gap-1 mt-1 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs ${message.isUser ? 'text-slate-300' : 'text-slate-500'}`}>
                    {formatTime(message.timestamp)}
                  </span>
                  {message.isUser && message.status && (
                    <span className="text-slate-300">
                      {message.status === "sent" && <Check className="w-3 h-3" />}
                      {message.status === "delivered" && <CheckCheck className="w-3 h-3" />}
                      {message.status === "read" && <CheckCheck className="w-3 h-3 text-blue-400" />}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - WhatsApp style */}
      <div className="px-4 pb-6 flex-shrink-0 bg-[#1a1d24] border-t border-slate-800/50">
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:bg-slate-800/50 rounded-full h-10 w-10 flex-shrink-0"
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          <div className="flex-1 flex items-center gap-2 bg-[#2a2f38] rounded-full px-4 py-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message"
              className="flex-1 bg-transparent border-0 text-white placeholder:text-slate-500 h-9 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {inputValue.trim() ? (
            <Button
              onClick={handleSend}
              className="w-11 h-11 rounded-full bg-[#00a884] hover:bg-[#00977a] flex-shrink-0 p-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-slate-800/50 rounded-full h-10 w-10 flex-shrink-0"
            >
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <BottomNavigation currentScreen="ai-chat" onNavigate={onNavigate} cartItemCount={cartItemCount} />
    </div>
  );
}
