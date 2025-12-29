import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, QrCode, Download, ArrowRight, TrendingUp, DollarSign, BarChart3, Copy, Plus } from "lucide-react";
import { motion } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { toast } from "sonner@2.0.3";

interface ActiveInvestment {
  id: number;
  name: string;
  type: string;
  amount: number;
  return: number;
  period: string;
  earnings: number;
  status: string;
  icon: any;
  color: string;
  startDate: number;
}

interface NewDashboardProps {
  onSendMoney?: () => void;
  onInvestments?: () => void;
  onHistory?: () => void;
  onAiChat?: () => void;
  onProfile?: () => void;
  onNavigate?: (screen: string) => void;
  walletBalance?: number;
  activeInvestments?: ActiveInvestment[];
}

export function NewDashboard({ onSendMoney, onInvestments, onHistory, onAiChat, onProfile, onNavigate, walletBalance = 13400, activeInvestments = [] }: NewDashboardProps) {
  const investmentOptions = [
    { 
      id: 'fixed-deposit', 
      name: 'Fixed Deposit', 
      icon: DollarSign, 
      color: 'from-emerald-400 to-emerald-500',
      bgColor: 'bg-emerald-500',
      apy: '6%',
    },
    { 
      id: 'lending-pool', 
      name: 'Lending Pool', 
      icon: TrendingUp, 
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-500',
      apy: '10%',
    },
    { 
      id: 'equity-pool', 
      name: 'Equity Pool', 
      icon: BarChart3, 
      color: 'from-orange-400 to-orange-500',
      bgColor: 'bg-orange-500',
      apy: '15%',
    },
  ];

  const handleNavigate = (screen: string) => {
    if (screen === 'send-money') {
      onSendMoney?.();
    } else if (screen === 'investments') {
      onInvestments?.();
    } else if (onNavigate) {
      onNavigate(screen);
    }
  };

  const handleCopyWalletId = () => {
    const walletId = "0x742d...8f4e";
    navigator.clipboard.writeText("0x742d3b8c9f2a1e6d5c4b3a2f1e0d9c8b7a6f8f4e");
    toast.success("Wallet ID Copied", {
      description: "Your wallet address has been copied to clipboard.",
    });
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#0a0a1a] pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-blue-600/30">
              <AvatarFallback className="bg-[#1e3a8a] text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                GU
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-slate-400">Good morning,</p>
              <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Guest
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-slate-700/30 relative"
          >
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>

      {/* My Wallet Card */}
      <div className="px-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="relative rounded-3xl p-6 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              boxShadow: '0 20px 60px rgba(30, 58, 138, 0.4)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <path d="M2 10h20"/>
                  </svg>
                </div>
                <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  My Wallet
                </span>
              </div>
              <button 
                className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <QrCode className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Balance Section */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs text-blue-100/70 mb-1">Total Balance</p>
                <h2 
                  className="text-4xl tracking-tight"
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontWeight: 700,
                    color: '#ffffff'
                  }}
                >
                  ${walletBalance.toLocaleString()}
                </h2>
              </div>

              {/* Bery Badge */}
              <div 
                className="rounded-2xl px-4 py-3"
                style={{ backgroundColor: 'rgba(30, 58, 138, 0.5)', backdropFilter: 'blur(10px)' }}
              >
                <p className="text-[10px] text-blue-200/70 mb-0.5">Bery (₿)</p>
                <p className="text-xl text-white mb-0.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  ₿ {(walletBalance * 8.9).toLocaleString()}
                </p>
                <p className="text-[9px] text-blue-200/60">1 USD = 8.9 ₿</p>
              </div>
            </div>

            {/* Wallet ID */}
            <div 
              className="rounded-2xl px-4 py-3 mb-4 flex items-center justify-between"
              style={{ backgroundColor: 'rgba(30, 58, 138, 0.5)' }}
            >
              <div>
                <p className="text-[10px] text-blue-200/70 mb-0.5">Wallet ID</p>
                <p className="text-sm text-white" style={{ fontFamily: 'monospace', fontWeight: 500 }}>
                  0x742d...8f4e
                </p>
              </div>
              <button 
                onClick={handleCopyWalletId}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Copy className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleNavigate('send-money')}
                className="rounded-2xl px-4 py-3 flex items-center justify-center gap-2 transition-all hover:scale-105"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}
              >
                <Download className="w-4 h-4 text-white" />
                <span className="text-sm text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Receive
                </span>
              </button>
              <button
                onClick={onSendMoney}
                className="rounded-2xl px-4 py-3 flex items-center justify-center gap-2 transition-all hover:scale-105"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}
              >
                <ArrowRight className="w-4 h-4 text-white" />
                <span className="text-sm text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Send
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Invest */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Quick Invest
          </h2>
          <button 
            onClick={onInvestments}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            Explore
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {investmentOptions.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={onInvestments}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="rounded-2xl p-4 flex flex-col items-center gap-3 transition-all hover:scale-105"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <div className={`w-12 h-12 rounded-2xl ${option.bgColor} flex items-center justify-center`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-300 mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {option.name}
                </p>
                <p className={`text-lg ${option.bgColor.replace('bg-', 'text-')}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  {option.apy}
                </p>
                <p className="text-[10px] text-slate-500">APY</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Send */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Quick Send
          </h2>
          <button 
            onClick={onSendMoney}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            See All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={onSendMoney}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div 
              className="w-16 h-16 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center group-hover:border-blue-500 transition-colors"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <Plus className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className="text-xs text-slate-400">Add</span>
          </button>
        </div>
      </div>

      <BottomNavigation currentScreen="dashboard" onNavigate={handleNavigate} />
    </div>
  );
}
