import { Home, TrendingUpIcon, MessageCircle, User, ShoppingBag } from "lucide-react";

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
      <div 
        className="mx-5 mb-6 rounded-full px-6 py-4 shadow-2xl"
        style={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          boxShadow: '0 10px 40px rgba(30, 58, 138, 0.3)'
        }}
      >
        <div className="flex items-center justify-around">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 'dashboard' 
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-600/40' 
                : 'hover:bg-blue-600/20'
            }`}
          >
            <Home className={`w-5 h-5 ${currentScreen === 'dashboard' ? 'text-white' : 'text-blue-200/70'}`} />
          </button>
          <button 
            onClick={() => onNavigate('investments')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 'investments' 
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-600/40' 
                : 'hover:bg-blue-600/20'
            }`}
          >
            <TrendingUpIcon className={`w-5 h-5 ${currentScreen === 'investments' ? 'text-white' : 'text-blue-200/70'}`} />
          </button>
          <button 
            onClick={() => onNavigate('marketplace')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 'marketplace' 
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-600/40' 
                : 'hover:bg-blue-600/20'
            }`}
          >
            <ShoppingBag className={`w-5 h-5 ${currentScreen === 'marketplace' ? 'text-white' : 'text-blue-200/70'}`} />
          </button>
          <button 
            onClick={() => onNavigate('ai-chat')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 'ai-chat' 
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-600/40' 
                : 'hover:bg-blue-600/20'
            }`}
          >
            <MessageCircle className={`w-5 h-5 ${currentScreen === 'ai-chat' ? 'text-white' : 'text-blue-200/70'}`} />
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 'profile' 
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-600/40' 
                : 'hover:bg-blue-600/20'
            }`}
          >
            <User className={`w-5 h-5 ${currentScreen === 'profile' ? 'text-white' : 'text-blue-200/70'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}