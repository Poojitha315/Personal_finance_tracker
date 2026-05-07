import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, Wallet, FileText, TrendingUp, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

function Sidebar({ isCollapsed, toggleSidebar }) {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const isActiveLink = (path) => location.pathname === path;

  const navLinkClass = (path) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group
    ${isActiveLink(path) 
      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105 border border-blue-400' 
      : 'text-gray-400 hover:bg-gray-800 hover:text-white hover:transform hover:translate-x-1 hover:shadow-md'
    }
  `;

  return (
    <div className={`h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white fixed left-0 top-0 flex flex-col justify-between border-r border-gray-700 dark:border-gray-800 transition-all duration-300 ease-in-out z-50 ${
      isCollapsed ? 'w-20' : 'w-56'
    }`}>
      {/* Top Section */}
      <div>
        {/* Logo/Brand */}
        <div className={`flex flex-col transition-all duration-300 ${
          isCollapsed ? 'items-center' : 'items-start'
        }`}>
          <div className={`flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-2xl shadow-xl transition-all duration-300 ${
            isCollapsed ? 'justify-center w-12 h-12 p-2' : 'w-full'
          }`}>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm flex-shrink-0">
              <TrendingUp className={`${isCollapsed ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
            </div>
            {!isCollapsed && (
              <h2 className="text-2xl font-bold text-white tracking-tight">Finance Tracker</h2>
            )}
          </div>
          
          {/* Divider */}
          {!isCollapsed && (
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 dark:via-gray-500 to-transparent mb-6"></div>
          )}
        </div>

        {/* Theme Toggle */}
        <div className={`mb-4 ${isCollapsed ? 'justify-center' : ''}`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md group ${
              isCollapsed ? 'justify-center' : ''
            } ${
              isDarkMode 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 flex-shrink-0 transition-colors duration-300 group-hover:text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 flex-shrink-0 transition-colors duration-300 group-hover:text-gray-900" />
            )}
            {!isCollapsed && (
              <span className="font-medium transition-colors duration-300">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link to="/dashboard" className={`${navLinkClass('/dashboard')} ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <Home className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                isActiveLink('/dashboard') ? 'text-white' : 'text-gray-400 group-hover:text-white'
              }`} />
              {!isCollapsed && (
                <span className={`font-medium transition-colors duration-300 ${
                  isActiveLink('/dashboard') ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`}>Dashboard</span>
              )}
              {isActiveLink('/dashboard') && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
              )}
            </div>
          </Link>

          <Link to="/add" className={`${navLinkClass('/add')} ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <PlusCircle className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                isActiveLink('/add') ? 'text-white' : 'text-gray-400 group-hover:text-white'
              }`} />
              {!isCollapsed && (
                <span className={`font-medium transition-colors duration-300 ${
                  isActiveLink('/add') ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`}>Add Expense</span>
              )}
              {isActiveLink('/add') && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
              )}
            </div>
          </Link>

          <Link to="/budget" className={`${navLinkClass('/budget')} ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <Wallet className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                isActiveLink('/budget') ? 'text-white' : 'text-gray-400 group-hover:text-white'
              }`} />
              {!isCollapsed && (
                <span className={`font-medium transition-colors duration-300 ${
                  isActiveLink('/budget') ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`}>Budget</span>
              )}
              {isActiveLink('/budget') && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
              )}
            </div>
          </Link>

          <Link to="/reports" className={`${navLinkClass('/reports')} ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <FileText className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                isActiveLink('/reports') ? 'text-white' : 'text-gray-400 group-hover:text-white'
              }`} />
              {!isCollapsed && (
                <span className={`font-medium transition-colors duration-300 ${
                  isActiveLink('/reports') ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`}>Reports</span>
              )}
              {isActiveLink('/reports') && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
              )}
            </div>
          </Link>
        </nav>
      </div>

    </div>
  );
}

export default Sidebar;