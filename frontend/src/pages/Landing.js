import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  TrendingUp, 
  Brain, 
  ArrowRight, 
  Sparkles, 
  Wallet, 
  PieChart, 
  FileText,
  BarChart3,
  Target,
  Zap,
  Users,
  Shield,
  Star,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

function Landing() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-based animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Ensure theme is properly applied on component mount
  useEffect(() => {
    // Force theme application to prevent visibility issues
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? isDarkMode 
            ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' 
            : 'bg-white/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Finance Tracker
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('features')}
                className={`transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className={`transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                How It Works
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogin}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white border border-gray-600 hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className={`px-4 py-2 rounded-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 ${
                  isDarkMode ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25' : 'bg-blue-500 hover:bg-blue-600 hover:shadow-blue-500/20'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden transition-all duration-700 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse animation-delay-1500"></div>
          <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-br from-violet-400/15 to-purple-400/15 rounded-full blur-2xl animate-pulse animation-delay-2500"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 transition-all duration-300 transform hover:scale-110 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-2xl shadow-blue-500/25' 
                : 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-2xl shadow-blue-500/20'
            }`}>
              <Wallet className="w-10 h-10 text-white" />
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Finance Tracker
            </h1>

            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Manage your money smarter and easier
            </p>

            <div className="flex justify-center items-center animate-slide-up animation-delay-400">
              <button
                onClick={handleSignUp}
                className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 relative overflow-hidden group ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/20'
                }`}
              >
                <span className="relative z-10">Get Started</span>
                <Sparkles className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className={`py-20 px-4 transition-all duration-700 relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate fade-in-up">
            <h2 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Powerful Features
            </h2>
            <p className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Everything you need to manage your finances effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className={`p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 scroll-animate fade-in-up stagger-1 ${
              isDarkMode 
                ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750 hover:shadow-blue-500/20' 
                : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-lg hover:shadow-blue-500/30'
            }`}>
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
              }`}>
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Expense Tracking
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Monitor your daily expenses and categorize transactions automatically
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 scroll-animate fade-in-up stagger-2 ${
              isDarkMode 
                ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750 hover:shadow-blue-500/10' 
                : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-lg hover:shadow-blue-500/20'
            }`}>
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <PieChart className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Budget Management
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Set budgets for different categories and track your spending limits
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 scroll-animate fade-in-up stagger-3 ${
              isDarkMode 
                ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750 hover:shadow-blue-500/10' 
                : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-lg hover:shadow-blue-500/20'
            }`}>
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
              }`}>
                <Brain className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                AI Insights
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Get intelligent financial insights and spending recommendations
              </p>
            </div>

            {/* Feature 4 */}
            <div className={`p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 scroll-animate fade-in-up stagger-4 ${
              isDarkMode 
                ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750 hover:shadow-blue-500/10' 
                : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-lg hover:shadow-blue-500/20'
            }`}>
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
              }`}>
                <FileText className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Reports & Analytics
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Generate detailed reports and analyze your spending patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className={`py-20 px-4 transition-all duration-700 relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 via-gray-700/30 to-gray-800' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate fade-in-left">
              <h2 className={`text-4xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                About Us
              </h2>
              <p className={`text-lg mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Finance Tracker is your comprehensive solution for personal financial management. 
                We believe that managing money should be simple, intuitive, and empowering.
              </p>
              <p className={`text-lg mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Our platform combines cutting-edge technology with user-friendly design to help 
                you track expenses, set budgets, and gain valuable insights into your spending habits. 
                Whether you're saving for a goal or just trying to stay on budget, we're here to help.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    10K+
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    50M+
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Transactions Tracked
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    99.9%
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Uptime
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`relative rounded-2xl overflow-hidden scroll-animate fade-in-right ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="aspect-square flex items-center justify-center p-8">
                <div className="w-full h-full relative">
                  {/* Finance Dashboard Illustration */}
                  <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    {/* Background */}
                    <rect width="400" height="400" fill="none" />
                    
                    {/* Chart Bar */}
                    <rect x="50" y="250" width="40" height="100" fill={isDarkMode ? '#3b82f6' : '#60a5fa'} className="animate-pulse" />
                    <rect x="110" y="200" width="40" height="150" fill={isDarkMode ? '#10b981' : '#34d399'} className="animate-pulse animation-delay-500" />
                    <rect x="170" y="180" width="40" height="170" fill={isDarkMode ? '#f59e0b' : '#fbbf24'} className="animate-pulse animation-delay-1000" />
                    <rect x="230" y="220" width="40" height="130" fill={isDarkMode ? '#ef4444' : '#f87171'} className="animate-pulse animation-delay-1500" />
                    <rect x="290" y="160" width="40" height="190" fill={isDarkMode ? '#8b5cf6' : '#a78bfa'} className="animate-pulse animation-delay-2000" />
                    
                    {/* Line Chart */}
                    <polyline 
                      points="50,300 100,250 150,200 200,180 250,150 300,120 350,100" 
                      fill="none" 
                      stroke={isDarkMode ? '#3b82f6' : '#60a5fa'} 
                      strokeWidth="3"
                      className="animate-slide-up"
                    />
                    
                    {/* Pie Chart */}
                    <circle cx="320" cy="80" r="40" fill="none" stroke={isDarkMode ? '#4b5563' : '#d1d5db'} strokeWidth="2" />
                    <path d="M 320 80 L 320 40 A 40 40 0 0 1 350 60 Z" fill={isDarkMode ? '#3b82f6' : '#60a5fa'} className="animate-fade-in" />
                    <path d="M 320 80 L 350 60 A 40 40 0 0 1 350 100 Z" fill={isDarkMode ? '#10b981' : '#34d399'} className="animate-fade-in animation-delay-200" />
                    <path d="M 320 80 L 350 100 A 40 40 0 0 1 320 120 Z" fill={isDarkMode ? '#f59e0b' : '#fbbf24'} className="animate-fade-in animation-delay-400" />
                    
                    {/* Dollar Sign */}
                    <text x="200" y="350" textAnchor="middle" fontSize="24" fill={isDarkMode ? '#10b981' : '#059669'} className="animate-bounce">
                      $
                    </text>
                    
                    {/* Trend Arrow */}
                    <path d="M 60 140 L 80 120 L 70 120 L 70 130 L 60 140" fill={isDarkMode ? '#10b981' : '#059669'} className="animate-slide-up animation-delay-1000" />
                    <path d="M 80 120 L 100 100 L 90 100 L 90 110 L 80 120" fill={isDarkMode ? '#10b981' : '#059669'} className="animate-slide-up animation-delay-1000" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className={`py-20 px-4 transition-all duration-700 relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate fade-in-up">
            <h2 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              How It Works
            </h2>
            <p className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center scroll-animate fade-in-up stagger-1">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-2xl font-bold ${
                isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              }`}>
                1
              </div>
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-xl mb-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
              }`}>
                <svg className="w-20 h-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  {/* Receipt/Paper */}
                  <rect x="20" y="10" width="60" height="70" fill="none" stroke={isDarkMode ? '#3b82f6' : '#60a5fa'} strokeWidth="2" className="animate-fade-in" />
                  
                  {/* Dollar signs */}
                  <text x="30" y="30" fontSize="12" fill={isDarkMode ? '#10b981' : '#059669'} className="animate-fade-in animation-delay-200">$</text>
                  <text x="30" y="45" fontSize="12" fill={isDarkMode ? '#10b981' : '#059669'} className="animate-fade-in animation-delay-400">$</text>
                  <text x="30" y="60" fontSize="12" fill={isDarkMode ? '#10b981' : '#059669'} className="animate-fade-in animation-delay-600">$</text>
                  
                  {/* Check marks */}
                  <path d="M 45 28 L 48 31 L 55 24" fill="none" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" className="animate-fade-in animation-delay-800" />
                  <path d="M 45 43 L 48 46 L 55 39" fill="none" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" className="animate-fade-in animation-delay-1000" />
                  <path d="M 45 58 L 48 61 L 55 54" fill="none" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" className="animate-fade-in animation-delay-1200" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Add Your Expenses
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Quickly log your expenses and categorize them automatically
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center scroll-animate fade-in-up stagger-2">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-2xl font-bold ${
                isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              }`}>
                2
              </div>
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-xl mb-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
              }`}>
                <svg className="w-20 h-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  {/* Target circles */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" className="animate-fade-in" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" className="animate-fade-in animation-delay-200" />
                  <circle cx="50" cy="50" r="15" fill="none" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" className="animate-fade-in animation-delay-400" />
                  <circle cx="50" cy="50" r="5" fill={isDarkMode ? '#10b981' : '#059669'} className="animate-pulse" />
                  
                  {/* Progress arrow */}
                  <path d="M 50 15 L 50 35" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="3" className="animate-slide-up animation-delay-600" />
                  <path d="M 45 30 L 50 35 L 55 30" fill={isDarkMode ? '#10b981' : '#059669'} className="animate-slide-up animation-delay-600" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Set Budgets
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Create budgets for different categories and track your progress
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center scroll-animate fade-in-up stagger-3">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-2xl font-bold ${
                isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              }`}>
                3
              </div>
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-xl mb-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
              }`}>
                <svg className="w-20 h-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  {/* Bar chart */}
                  <rect x="15" y="60" width="12" height="20" fill={isDarkMode ? '#3b82f6' : '#60a5fa'} className="animate-slide-up" />
                  <rect x="30" y="40" width="12" height="40" fill={isDarkMode ? '#10b981' : '#34d399'} className="animate-slide-up animation-delay-200" />
                  <rect x="45" y="30" width="12" height="50" fill={isDarkMode ? '#f59e0b' : '#fbbf24'} className="animate-slide-up animation-delay-400" />
                  <rect x="60" y="50" width="12" height="30" fill={isDarkMode ? '#ef4444' : '#f87171'} className="animate-slide-up animation-delay-600" />
                  <rect x="75" y="35" width="12" height="45" fill={isDarkMode ? '#8b5cf6' : '#a78bfa'} className="animate-slide-up animation-delay-800" />
                  
                  {/* Trend line */}
                  <polyline 
                    points="21,60 36,40 51,30 66,50 81,35" 
                    fill="none" 
                    stroke={isDarkMode ? '#8b5cf6' : '#7c3aed'} 
                    strokeWidth="2"
                    className="animate-fade-in animation-delay-1000"
                  />
                  
                  {/* Light bulb */}
                  <circle cx="85" cy="15" r="8" fill={isDarkMode ? '#fbbf24' : '#f59e0b'} className="animate-pulse animation-delay-1200" />
                  <path d="M 85 7 L 85 10" stroke={isDarkMode ? '#fbbf24' : '#f59e0b'} strokeWidth="2" className="animate-pulse animation-delay-1200" />
                  <path d="M 85 20 L 85 23" stroke={isDarkMode ? '#fbbf24' : '#f59e0b'} strokeWidth="2" className="animate-pulse animation-delay-1200" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Track & Analyze
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Monitor your spending patterns and get AI-powered insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL/IMAGE SECTION */}
      <section className={`py-20 px-4 transition-all duration-700 relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 via-gray-700/30 to-gray-800' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate fade-in-up">
            <h2 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Visual Analytics
            </h2>
            <p className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              See your finances at a glance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`p-6 rounded-2xl scroll-animate scale-in stagger-1 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="aspect-square flex items-center justify-center mb-4">
                <svg className="w-32 h-32" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                  {/* Animated Pie Chart */}
                  <circle cx="64" cy="64" r="50" fill="none" stroke={isDarkMode ? '#4b5563' : '#d1d5db'} strokeWidth="2" />
                  <path d="M 64 64 L 64 14 A 50 50 0 0 1 114 64 Z" fill={isDarkMode ? '#3b82f6' : '#60a5fa'} className="animate-fade-in" />
                  <path d="M 64 64 L 114 64 A 50 50 0 0 1 89 114 Z" fill={isDarkMode ? '#10b981' : '#34d399'} className="animate-fade-in animation-delay-200" />
                  <path d="M 64 64 L 89 114 A 50 50 0 0 1 39 114 Z" fill={isDarkMode ? '#f59e0b' : '#fbbf24'} className="animate-fade-in animation-delay-400" />
                  <path d="M 64 64 L 39 114 A 50 50 0 0 1 14 64 Z" fill={isDarkMode ? '#ef4444' : '#f87171'} className="animate-fade-in animation-delay-600" />
                  <path d="M 64 64 L 14 64 A 50 50 0 0 1 64 14 Z" fill={isDarkMode ? '#8b5cf6' : '#a78bfa'} className="animate-fade-in animation-delay-800" />
                  
                  {/* Center dot */}
                  <circle cx="64" cy="64" r="8" fill={isDarkMode ? '#1f2937' : '#ffffff'} className="animate-pulse" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold text-center mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Spending Breakdown
              </h3>
              <p className={`text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Visualize where your money goes
              </p>
            </div>

            <div className={`p-6 rounded-2xl scroll-animate scale-in stagger-2 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="aspect-square flex items-center justify-center mb-4">
                <svg className="w-32 h-32" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                  {/* Line Chart */}
                  <polyline 
                    points="10,100 25,80 40,70 55,50 70,40 85,25 100,15 115,10" 
                    fill="none" 
                    stroke={isDarkMode ? '#10b981' : '#059669'} 
                    strokeWidth="3"
                    className="animate-slide-up"
                  />
                  
                  {/* Area under line */}
                  <path 
                    d="M 10,100 L 25,80 L 40,70 L 55,50 L 70,40 L 85,25 L 100,15 L 115,10 L 115,118 L 10,118 Z" 
                    fill={isDarkMode ? '#10b98120' : '#05966920'}
                    className="animate-fade-in animation-delay-500"
                  />
                  
                  {/* Data points */}
                  {[10, 25, 40, 55, 70, 85, 100, 115].map((x, i) => (
                    <circle key={i} cx={x} cy={[100, 80, 70, 50, 40, 25, 15, 10][i]} r="4" fill={isDarkMode ? '#10b981' : '#059669'} className={`animate-fade-in animation-delay-${i * 100}`} />
                  ))}
                  
                  {/* Trend arrow */}
                  <path d="M 105 20 L 115 10 L 110 15 L 110 10 L 105 20" fill={isDarkMode ? '#10b981' : '#059669'} className="animate-bounce" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold text-center mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Trend Analysis
              </h3>
              <p className={`text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Track your financial progress
              </p>
            </div>

            <div className={`p-6 rounded-2xl scroll-animate scale-in stagger-3 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="aspect-square flex items-center justify-center mb-4">
                <svg className="w-32 h-32" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                  {/* Brain outline */}
                  <path 
                    d="M 64 20 C 40 20, 20 40, 20 64 C 20 80, 30 95, 45 105 C 50 110, 55 112, 64 112 C 73 112, 78 110, 83 105 C 98 95, 108 80, 108 64 C 108 40, 88 20, 64 20 Z" 
                    fill="none" 
                    stroke={isDarkMode ? '#8b5cf6' : '#7c3aed'} 
                    strokeWidth="3"
                    className="animate-fade-in"
                  />
                  
                  {/* Neural connections */}
                  <circle cx="45" cy="45" r="8" fill={isDarkMode ? '#8b5cf6' : '#a78bfa'} className="animate-pulse" />
                  <circle cx="83" cy="45" r="8" fill={isDarkMode ? '#8b5cf6' : '#a78bfa'} className="animate-pulse animation-delay-200" />
                  <circle cx="64" cy="65" r="8" fill={isDarkMode ? '#8b5cf6' : '#a78bfa'} className="animate-pulse animation-delay-400" />
                  <circle cx="45" cy="85" r="8" fill={isDarkMode ? '#8b5cf6' : '#a78bfa'} className="animate-pulse animation-delay-600" />
                  <circle cx="83" cy="85" r="8" fill={isDarkMode ? '#8b5cf6' : '#a78bfa'} className="animate-pulse animation-delay-800" />
                  
                  {/* Connection lines */}
                  <line x1="45" y1="45" x2="83" y2="45" stroke={isDarkMode ? '#8b5cf6' : '#a78bfa'} strokeWidth="2" className="animate-fade-in animation-delay-1000" />
                  <line x1="45" y1="45" x2="64" y2="65" stroke={isDarkMode ? '#8b5cf6' : '#a78bfa'} strokeWidth="2" className="animate-fade-in animation-delay-1200" />
                  <line x1="83" y1="45" x2="64" y2="65" stroke={isDarkMode ? '#8b5cf6' : '#a78bfa'} strokeWidth="2" className="animate-fade-in animation-delay-1400" />
                  <line x1="64" y1="65" x2="45" y2="85" stroke={isDarkMode ? '#8b5cf6' : '#a78bfa'} strokeWidth="2" className="animate-fade-in animation-delay-1600" />
                  <line x1="64" y1="65" x2="83" y2="85" stroke={isDarkMode ? '#8b5cf6' : '#a78bfa'} strokeWidth="2" className="animate-fade-in animation-delay-1800" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold text-center mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                AI Insights
              </h3>
              <p className={`text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Smart recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className={`py-20 px-4 transition-all duration-700 relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate fade-in-up">
            <h2 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              About Us
            </h2>
            <p className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of satisfied users managing their finances better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className={`p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 scroll-animate fade-in-up stagger-1 ${
              isDarkMode 
                ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750 hover:shadow-blue-500/20' 
                : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-lg hover:shadow-blue-500/30'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold mr-4">
                  JD
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Jane Doe
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Small Business Owner
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                "Finance Tracker has completely changed how I manage my business expenses. The AI insights alone have saved me thousands!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl scroll-animate fade-in-up stagger-2 ${
              isDarkMode 
                ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750' 
                : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-lg'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold mr-4">
                  MS
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Mike Smith
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Freelance Developer
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                "The budget management feature is incredible. I finally have control over my spending and can actually save money each month."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl scroll-animate fade-in-up stagger-3 ${
              isDarkMode 
                ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750' 
                : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-lg'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                  SJ
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sarah Johnson
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Marketing Manager
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                "Simple, intuitive, and powerful. The expense tracking saves me hours each month. Highly recommended!"
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                4.9/5
              </div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                10K+
              </div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Happy Users
              </div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                95%
              </div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Would Recommend
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className={`py-20 px-4 transition-all duration-700 relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 via-gray-700/30 to-gray-800' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`p-12 rounded-3xl transition-all duration-300 scroll-animate scale-in ${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-900 to-indigo-900 border border-blue-700' 
              : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
          }`}>
            <h2 className={`text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Take Control of Your Finances?
            </h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of users who have already transformed their financial lives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleSignUp}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 relative overflow-hidden group ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/20'
                }`}
              >
                <span className="relative z-10">Start Free Trial</span>
                <Sparkles className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 relative overflow-hidden group ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600 hover:shadow-blue-500/10' 
                    : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 shadow-lg hover:shadow-blue-500/20'
                }`}
              >
                <span className="relative z-10">Learn More</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            <div className={`mt-8 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <p>No credit card required • Free forever for basic features</p>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* App Name and Tagline */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Finance Tracker</h3>
            <p className="text-gray-400 text-lg">Manage your finances smarter</p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center gap-8 mb-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={handleLogin}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Login
            </button>
            <button 
              onClick={handleSignUp}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Register
            </button>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            <p>&copy; 2024 Finance Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Scroll animation base classes */
        .scroll-animate {
          opacity: 0;
          transition: all 0.8s ease-out;
        }

        .scroll-animate.fade-in-up {
          transform: translateY(30px);
        }

        .scroll-animate.fade-in-left {
          transform: translateX(-30px);
        }

        .scroll-animate.fade-in-right {
          transform: translateX(30px);
        }

        .scroll-animate.scale-in {
          transform: scale(0.9);
        }

        .scroll-animate.animate-visible {
          opacity: 1;
          transform: translateY(0) translateX(0) scale(1);
        }

        /* Staggered animations */
        .scroll-animate.stagger-1 { transition-delay: 0.1s; }
        .scroll-animate.stagger-2 { transition-delay: 0.2s; }
        .scroll-animate.stagger-3 { transition-delay: 0.3s; }
        .scroll-animate.stagger-4 { transition-delay: 0.4s; }

        /* Original animations */
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default Landing;
