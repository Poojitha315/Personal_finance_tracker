import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { DollarSign, TrendingUp, PieChart, Brain, AlertCircle, Wallet, Receipt, Loader2, Sparkles, Sun, Moon, MessageSquare, Send } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    message: ''
  });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState(() => {
    // Load dismissed alerts from localStorage on component mount
    try {
      const saved = localStorage.getItem('dismissedBudgetAlerts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [animatingAlerts, setAnimatingAlerts] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackData.message.trim()) {
      return;
    }

    setIsSubmittingFeedback(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store feedback in localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    const newFeedback = {
      ...feedbackData,
      timestamp: new Date().toISOString(),
      id: Date.now(),
      type: 'logout'
    };
    existingFeedback.push(newFeedback);
    localStorage.setItem('feedback', JSON.stringify(existingFeedback));
    
    // Clear feedback and logout
    setFeedbackData({ name: '', message: '' });
    setIsSubmittingFeedback(false);
    setShowFeedbackModal(false);
    
    // Proceed with actual logout
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleSkipLogout = () => {
    setShowFeedbackModal(false);
    
    // Proceed with actual logout
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDismissAlert = (budgetId) => {
    // Start animation
    setAnimatingAlerts(prev => [...prev, budgetId]);
    
    // Actually dismiss after animation completes
    setTimeout(() => {
      setDismissedAlerts(prev => {
        const newDismissed = [...prev, budgetId];
        // Save to localStorage for persistence
        try {
          localStorage.setItem('dismissedBudgetAlerts', JSON.stringify(newDismissed));
        } catch (error) {
          console.error('Failed to save dismissed alerts to localStorage:', error);
        }
        return newDismissed;
      });
      setAnimatingAlerts(prev => prev.filter(id => id !== budgetId));
    }, 300); // Match animation duration
  };

  const getExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/expenses", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getBudgets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/budget", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setBudgets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExpenses();
    getBudgets();
  }, []);

  const getInsights = async () => {
    setLoadingInsight(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/insights",
        expenses
      );
      setInsight(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingInsight(false);
    }
  };

  // calculations
  const categoryData = {};
  expenses.forEach((item) => {
    categoryData[item.category] =
      (categoryData[item.category] || 0) + Number(item.amount);
  });

  const totalAmount = Object.values(categoryData).reduce(
    (a, b) => a + b,
    0
  );

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
          "#f97316",
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = '₹' + context.parsed;
            const percentage = ((context.parsed / totalAmount) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar />
      <div className="flex-1 ml-56 p-10 transition-colors duration-300">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 relative overflow-hidden animate-fade-in transition-colors duration-300">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-10 py-16">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight animate-slide-up">
                Welcome back
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-light animate-slide-up animation-delay-200">
                Manage your finances smarter
              </p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="px-10 py-8 animate-fade-in animation-delay-300">
          {/* Header */}
          <div className="flex justify-between items-center mb-12 animate-slide-up animation-delay-400">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Track your finances at a glance</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
                title="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                )}
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2 shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-7 border border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spending</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">₹{totalAmount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800 transition-transform duration-300 hover:scale-110">
                  <DollarSign className="w-7 h-7 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-7 border border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{expenses.length}</p>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-transform duration-300 hover:scale-110">
                  <Receipt className="w-7 h-7 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-7 border border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{Object.keys(categoryData).length}</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800 transition-transform duration-300 hover:scale-110">
                  <PieChart className="w-7 h-7 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-7 border border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Expense</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                    ₹{expenses.length > 0 ? Math.round(totalAmount / expenses.length).toLocaleString() : 0}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl border border-orange-200 dark:border-orange-800 transition-transform duration-300 hover:scale-110">
                  <TrendingUp className="w-7 h-7 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Chart Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-102 p-8 border border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-900">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 transition-transform duration-300 hover:scale-110">
                  <PieChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                Spending by Category
              </h2>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : expenses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <PieChart className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No data to display</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Add expenses to see your spending chart</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-[300px] h-[300px] flex items-center justify-center">
                    <Pie data={chartData} options={chartOptions} />
                  </div>
                </div>
              )}
            </div>

            {/* Recent Expenses */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-102 p-8 border border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-1000">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-transform duration-300 hover:scale-110">
                  <Receipt className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                Recent Expenses
              </h2>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : expenses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <Receipt className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No expenses yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Start tracking your expenses</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {expenses.slice(0, 5).map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-102 hover:translate-x-1 border border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.category}</p>
                      </div>
                      <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">₹{Number(item.amount).toLocaleString()}</p>
                    </div>
                  ))}
                  {expenses.length > 5 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-3 font-medium">...and {expenses.length - 5} more</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up animation-delay-1100">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="p-3 bg-blue-600 dark:bg-blue-700 rounded-xl shadow-lg transition-transform duration-300 hover:scale-110">
                <Brain className="w-7 h-7 text-white" />
              </div>
              AI Financial Insights
            </h2>
            <button
              onClick={getInsights}
              disabled={loadingInsight || expenses.length === 0}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 shadow-lg text-lg font-medium"
            >
              {loadingInsight ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                  Get AI Insights
                </>
              )}
            </button>
            
            {insight && (
              <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-blue-200 dark:border-blue-800 animate-fade-in shadow-inner hover:shadow-lg transition-all duration-300">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{insight}</p>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-7 border border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{expenses.length}</p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-transform duration-300 hover:scale-110">
                <Receipt className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-7 border border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{Object.keys(categoryData).length}</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800 transition-transform duration-300 hover:scale-110">
                <PieChart className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-7 border border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Expense</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                  ₹{expenses.length > 0 ? Math.round(totalAmount / expenses.length).toLocaleString() : 0}
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl border border-orange-200 dark:border-orange-800 transition-transform duration-300 hover:scale-110">
                <TrendingUp className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </div>
        </div>


        {/* Budget Tracking */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <Wallet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            Budget Tracking
          </h2>
          {budgets.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 border border-gray-200 dark:border-gray-700 text-center">
              <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">No budgets set</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Set budgets to track your spending</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgets.map((b) => {
                const spent = categoryData[b.category] || 0;
                const percentage = (spent / b.amount) * 100;
                const isOverBudget = spent > b.amount;
                const isNearBudget = percentage >= 80 && percentage <= 100;

                return (
                  <div key={b._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-102 p-6 border-2 border-gray-200 dark:border-gray-700 animate-slide-up animation-delay-1200">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{b.category}</h3>
                          {isOverBudget && (
                            <div className="flex items-center gap-1 text-amber-700 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-800">
                              <AlertCircle className="w-3 h-3" />
                              <span className="text-xs font-medium">Over Budget</span>
                            </div>
                          )}
                          {isNearBudget && !isOverBudget && (
                            <div className="flex items-center gap-1 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md border border-yellow-200 dark:border-yellow-800">
                              <AlertCircle className="w-3 h-3" />
                              <span className="text-xs font-medium">Near Limit</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Budget: <span className="font-semibold text-gray-900 dark:text-gray-100">₹{Number(b.amount).toLocaleString()}</span>
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            Spent: <span className="font-semibold text-gray-900 dark:text-gray-100">₹{spent.toLocaleString()}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Section */}
                    <div className="space-y-3">
                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner overflow-hidden">
                          <div
                            className={`h-4 rounded-full transition-all duration-1000 ease-out relative ${
                              isOverBudget
                                ? 'bg-amber-500'
                                : isNearBudget
                                ? 'bg-yellow-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          >
                            {percentage > 10 && (
                              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                                {percentage.toFixed(0)}%
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Progress Indicators */}
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-gray-600 dark:text-gray-400">
                            {percentage.toFixed(1)}% used
                          </span>
                          <span className="font-semibold text-gray-700">
                            ₹{(b.amount - spent).toLocaleString()} left
                          </span>
                        </div>
                      </div>
                      
                      {/* Status Message */}
                      {isOverBudget && !dismissedAlerts.includes(b._id) && (
                        <div className={`bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-3 relative group transition-all duration-300 ${
                          animatingAlerts.includes(b._id) ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                        }`}>
                          <button
                            onClick={() => handleDismissAlert(b._id)}
                            className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 opacity-60 hover:opacity-100"
                            title="Dismiss alert"
                          >
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium pr-8">
                            Over Budget by ₹{(spent - b.amount).toLocaleString()}
                          </p>
                        </div>
                      )}
                      {isNearBudget && !isOverBudget && !dismissedAlerts.includes(b._id) && (
                        <div className={`bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-3 relative group transition-all duration-300 ${
                          animatingAlerts.includes(b._id) ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                        }`}>
                          <button
                            onClick={() => handleDismissAlert(b._id)}
                            className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 opacity-60 hover:opacity-100"
                            title="Dismiss alert"
                          >
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium pr-8">
                            Near budget limit (₹{(b.amount - spent).toLocaleString()} remaining)
                          </p>
                        </div>
                      )}
                      {!isOverBudget && !isNearBudget && spent > 0 && !dismissedAlerts.includes(b._id) && (
                        <div className={`bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-3 relative group transition-all duration-300 ${
                          animatingAlerts.includes(b._id) ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                        }`}>
                          <button
                            onClick={() => handleDismissAlert(b._id)}
                            className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 opacity-60 hover:opacity-100"
                            title="Dismiss alert"
                          >
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium pr-8">
                            Within budget (₹{(b.amount - spent).toLocaleString()} remaining)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowFeedbackModal(false)}
          />
          
          {/* Modal Content */}
          <div className={`relative w-full max-w-md transform transition-all duration-300 scale-100 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-2xl p-8 m-4`}>
            {/* Close Button */}
            <button
              onClick={() => setShowFeedbackModal(false)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Before you go...
              </h3>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                We'd love your feedback to improve the app
              </p>
            </div>

            {/* Feedback Form */}
            <form className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Name (Optional)
                </label>
                <input
                  type="text"
                  name="name"
                  value={feedbackData.name}
                  onChange={handleFeedbackChange}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Your feedback *
                </label>
                <textarea
                  name="message"
                  value={feedbackData.message}
                  onChange={handleFeedbackChange}
                  placeholder="Share your thoughts, suggestions, or report issues..."
                  rows="4"
                  required
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 resize-none ${
                    isDarkMode 
                      ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSkipLogout}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  Skip & Logout
                </button>
                <button
                  type="button"
                  onClick={handleFeedbackSubmit}
                  disabled={isSubmittingFeedback || !feedbackData.message.trim()}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    isDarkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25' 
                      : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20'
                  }`}
                >
                  {isSubmittingFeedback ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit & Logout</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;