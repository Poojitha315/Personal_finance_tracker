import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Wallet, Tag, DollarSign, Save, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNotification } from "../contexts/NotificationContext";

function Budget() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();
  const { showSuccess, showError } = useNotification();

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:5000/budget",
        { category, amount },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      showSuccess("Budget saved successfully!");
      setCategory("");
      setAmount("");
    } catch (err) {
      showError("Error saving budget. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen p-10 transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a 
              href="/dashboard" 
              className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </a>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Set Budget</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Create spending limits for your categories</p>
            </div>
          </div>
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
        </div>

        {/* Form Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="p-3 bg-emerald-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Wallet className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Budget Planning</h2>
              <p className="text-gray-600">Set limits to manage your expenses better</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Category Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Category Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., Food, Transport, Entertainment"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 text-lg dark:text-gray-100"
                  />
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Budget Amount (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 text-lg dark:text-gray-100"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 text-lg"
              >
                <Save className="w-6 h-6" />
                Save Budget
              </button>
            </div>

            {/* Quick Categories */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Quick Categories:</p>
              <div className="flex flex-wrap gap-2">
                {['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Education', 'Other'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-200 text-sm font-medium"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Budget;