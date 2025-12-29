import { useState, useEffect } from "react";
import { WelcomeSplash } from "./components/WelcomeSplash";
import { LoginScreen } from "./components/LoginScreen";
import { SignUpScreen } from "./components/SignUpScreen";
import { OTPVerification } from "./components/OTPVerification";
import { ProfileSetup } from "./components/ProfileSetup";
import { FeatureWalkthrough } from "./components/FeatureWalkthrough";
import { NewDashboard } from "./components/NewDashboard";
import { SendMoneyFlow } from "./components/SendMoneyFlow";
import { TransactionHistory } from "./components/TransactionHistory";
import { ProfileSettings } from "./components/ProfileSettings";
import { InvestmentsPage } from "./components/InvestmentsPage";
import { InvestmentConfirmation } from "./components/InvestmentConfirmation";
import { InvestmentSuccess } from "./components/InvestmentSuccess";
import { AiChat } from "./components/AiChat";
import { Marketplace } from "./components/Marketplace";
import { ErrorScreen } from "./components/ErrorScreen";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { DevDebugPanel } from "./components/DevDebugPanel";

type Screen =
  | "splash"
  | "login"
  | "signup"
  | "otp-verification"
  | "profile-setup"
  | "feature-walkthrough"
  | "dashboard"
  | "send-money"
  | "history"
  | "profile"
  | "investments"
  | "investment-confirmation"
  | "investment-success"
  | "ai-chat"
  | "marketplace"
  | "error";

interface UserData {
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
}

interface InvestmentData {
  name: string;
  icon: any;
  color: string;
  amount: number;
  apy: number;
  lockPeriod: string;
  riskLevel: string;
  estimatedReturn: number;
}

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [userData, setUserData] = useState<UserData>({ email: "", phone: "" });
  const [pendingInvestment, setPendingInvestment] = useState<InvestmentData | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [activeInvestments, setActiveInvestments] = useState<ActiveInvestment[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(13400); // USD balance
  
  // Navigation History
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>(["splash"]);
  
  // Error State
  const [errorType, setErrorType] = useState<"network" | "transaction" | "general" | "not-found">("general");

  // Onboarding Flow Handlers
  const handleGetStarted = () => {
    setCurrentScreen("signup");
  };

  const handleBackToSplash = () => {
    setCurrentScreen("splash");
  };

  const handleGoToSignUp = () => {
    setCurrentScreen("signup");
  };

  const handleGoToLogin = () => {
    setCurrentScreen("login");
  };

  const handleSignUp = (email: string, phone: string, password: string) => {
    // In production, this would call your API
    setUserData({ email, phone });
    setCurrentScreen("otp-verification");
    toast.success("Account created!", {
      description: "Please verify your phone number.",
    });
  };

  const handleLogin = (email: string, password: string) => {
    // In production, this would call your API
    setUserData({ email, phone: "+1 (555) 123-4567" });
    // For demo, skip OTP and go straight to dashboard
    // In production with 2FA enabled: setCurrentScreen("otp-verification");
    setCurrentScreen("dashboard");
    toast.success("Welcome back!", {
      description: "You've successfully logged in.",
    });
  };

  const handleForgotPassword = () => {
    toast.info("Password Reset", {
      description: "A reset link has been sent to your email.",
    });
  };

  const handleOTPVerify = (otp: string) => {
    // In production, verify OTP with backend
    if (userData.firstName) {
      // User already has profile (returning user with 2FA)
      setCurrentScreen("dashboard");
      toast.success("Verified!", {
        description: "Welcome back to Bery.",
      });
    } else {
      // New user, go to profile setup
      setCurrentScreen("profile-setup");
      toast.success("Verified!", {
        description: "Let's complete your profile.",
      });
    }
  };

  const handleProfileSetup = (profileData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    country: string;
  }) => {
    setUserData({ ...userData, ...profileData });
    setCurrentScreen("feature-walkthrough");
  };

  const handleFeatureWalkthroughComplete = () => {
    setCurrentScreen("dashboard");
    toast.success("Welcome to Bery!", {
      description: "Your account is ready to use.",
    });
  };

  const handleSkipWalkthrough = () => {
    setCurrentScreen("dashboard");
  };

  // Investment Flow Handlers
  const handleInvestmentConfirm = (investmentData: InvestmentData) => {
    // Check if user has sufficient funds
    if (investmentData.amount > walletBalance) {
      toast.error("Insufficient Funds", {
        description: `You need $${investmentData.amount.toLocaleString()} but only have $${walletBalance.toLocaleString()}`,
        duration: 4000,
      });
      return;
    }
    setPendingInvestment(investmentData);
    setCurrentScreen("investment-confirmation");
  };

  const handleInvestmentFinalConfirm = () => {
    // Generate transaction ID
    const txId = `TX${Date.now().toString(36).toUpperCase()}`;
    setTransactionId(txId);
    
    // Add the investment to active investments and deduct from wallet
    if (pendingInvestment) {
      // Deduct amount from wallet
      setWalletBalance(prev => prev - pendingInvestment.amount);
      
      const newInvestment: ActiveInvestment = {
        id: Date.now(),
        name: pendingInvestment.name,
        type: pendingInvestment.riskLevel,
        amount: pendingInvestment.amount,
        return: pendingInvestment.apy,
        period: pendingInvestment.lockPeriod,
        earnings: 0, // Will grow over time
        status: "active",
        icon: pendingInvestment.icon,
        color: pendingInvestment.color,
        startDate: Date.now(),
      };
      setActiveInvestments([...activeInvestments, newInvestment]);
    }
    
    setCurrentScreen("investment-success");
    toast.success("Investment Confirmed!", {
      description: `Transaction ID: ${txId}`,
      duration: 5000,
    });
  };

  const handleInvestmentSuccessDone = () => {
    setPendingInvestment(null);
    setCurrentScreen("dashboard");
  };

  const handleViewInvestments = () => {
    setPendingInvestment(null);
    setCurrentScreen("investments");
  };

  const handleWithdrawInvestment = (investmentId: number) => {
    // Find the investment being withdrawn
    const investment = activeInvestments.find(inv => inv.id === investmentId);
    if (investment) {
      // Add principal + earnings back to wallet
      const totalAmount = investment.amount + investment.earnings;
      setWalletBalance(prev => prev + totalAmount);
      
      toast.success("Investment Withdrawn", {
        description: `$${totalAmount.toLocaleString()} transferred to your wallet (Principal: $${investment.amount.toLocaleString()} + Earnings: $${investment.earnings.toLocaleString()})`,
        duration: 5000,
      });
    }
    
    setActiveInvestments(activeInvestments.filter(inv => inv.id !== investmentId));
  };

  const handleLogout = () => {
    // Reset all state
    setUserData({ email: "", phone: "" });
    setActiveInvestments([]);
    setPendingInvestment(null);
    setNavigationHistory(["splash"]);
    setWalletBalance(13400); // Reset to default
    setCurrentScreen("splash");
    toast.success("Logged Out", {
      description: "You've been successfully logged out.",
    });
  };

  // Simulate earnings growth over time
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInvestments(prev => prev.map(inv => {
        // Calculate time elapsed in milliseconds
        const timeElapsed = Date.now() - inv.startDate;
        // Convert to years (for APY calculation) - using seconds for faster demo
        const yearsElapsed = timeElapsed / (1000 * 10); // 10 seconds = 1 year for demo purposes
        
        // Calculate earnings based on APY and time elapsed
        const newEarnings = Math.floor(inv.amount * (inv.return / 100) * yearsElapsed);
        
        return {
          ...inv,
          earnings: newEarnings > 0 ? newEarnings : 0
        };
      }));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [activeInvestments.length]); // Re-create interval when investments change

  // General Navigation Handlers
  const handleSendMoney = () => {
    setCurrentScreen("send-money");
  };

  const handleSendComplete = () => {
    toast.success("Money Sent Successfully!", {
      description: "Your transaction has been processed.",
      duration: 4000,
    });
    setCurrentScreen("dashboard");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleNavigate = (screen: string) => {
    setNavigationHistory([...navigationHistory, screen as Screen]);
    setCurrentScreen(screen as Screen);
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentScreen(previousScreen);
    }
  };

  // Error Handlers
  const handleShowError = (type: "network" | "transaction" | "general" | "not-found" = "general") => {
    setErrorType(type);
    setCurrentScreen("error");
  };

  const handleRetryFromError = () => {
    setCurrentScreen("dashboard");
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-background">
      {/* Mobile viewport container */}
      <div className="h-screen overflow-hidden">
        {/* Onboarding & Authentication Screens */}
        {currentScreen === "splash" && (
          <WelcomeSplash 
            onGetStarted={handleGetStarted}
            onLogin={handleGoToLogin}
          />
        )}

        {currentScreen === "login" && (
          <LoginScreen
            onBack={handleBackToSplash}
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
            onSignUp={handleGoToSignUp}
          />
        )}

        {currentScreen === "signup" && (
          <SignUpScreen
            onBack={handleBackToSplash}
            onSignUp={handleSignUp}
            onLogin={handleGoToLogin}
          />
        )}

        {currentScreen === "otp-verification" && (
          <OTPVerification
            onBack={() => setCurrentScreen(userData.firstName ? "login" : "signup")}
            onVerify={handleOTPVerify}
            phoneOrEmail={userData.phone || userData.email}
            type={userData.phone ? "phone" : "email"}
          />
        )}

        {currentScreen === "profile-setup" && (
          <ProfileSetup onComplete={handleProfileSetup} />
        )}

        {currentScreen === "feature-walkthrough" && (
          <FeatureWalkthrough
            onComplete={handleFeatureWalkthroughComplete}
            onSkip={handleSkipWalkthrough}
          />
        )}

        {/* Main App Screens */}
        {currentScreen === "dashboard" && (
          <NewDashboard
            onSendMoney={handleSendMoney}
            onInvestments={() => setCurrentScreen("investments")}
            onHistory={() => setCurrentScreen("history")}
            onAiChat={() => setCurrentScreen("ai-chat")}
            onProfile={() => setCurrentScreen("profile")}
            onNavigate={handleNavigate}
            walletBalance={walletBalance}
            activeInvestments={activeInvestments}
          />
        )}

        {currentScreen === "send-money" && (
          <SendMoneyFlow
            onBack={handleBackToDashboard}
            onComplete={handleSendComplete}
          />
        )}

        {currentScreen === "history" && (
          <TransactionHistory
            onBack={handleBackToDashboard}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === "profile" && (
          <ProfileSettings
            onBack={handleBackToDashboard}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {currentScreen === "investments" && (
          <InvestmentsPage
            onBack={handleBackToDashboard}
            onNavigate={handleNavigate}
            onInvestmentConfirm={handleInvestmentConfirm}
            onWithdrawInvestment={handleWithdrawInvestment}
            activeInvestments={activeInvestments}
            walletBalance={walletBalance}
          />
        )}

        {currentScreen === "investment-confirmation" && pendingInvestment && (
          <InvestmentConfirmation
            investment={pendingInvestment}
            onBack={() => setCurrentScreen("investments")}
            onConfirm={handleInvestmentFinalConfirm}
          />
        )}

        {currentScreen === "investment-success" && pendingInvestment && (
          <InvestmentSuccess
            investment={pendingInvestment}
            transactionId={transactionId}
            onDone={handleInvestmentSuccessDone}
            onViewInvestments={handleViewInvestments}
          />
        )}

        {currentScreen === "ai-chat" && (
          <AiChat
            onBack={handleBackToDashboard}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === "marketplace" && (
          <Marketplace
            onBack={handleBackToDashboard}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === "error" && (
          <ErrorScreen
            type={errorType}
            onRetry={handleRetryFromError}
            onGoHome={handleBackToDashboard}
          />
        )}
      </div>

      <Toaster />
      <DevDebugPanel currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}