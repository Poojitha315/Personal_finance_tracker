import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-40 flex items-center justify-center ${
          isCollapsed ? 'left-24 w-12 h-12' : 'left-60 w-10 h-10'
        } ${
          document.documentElement.classList.contains('dark') 
            ? 'bg-gray-800 text-gray-200' 
            : 'bg-white text-gray-600'
        }`}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'ml-20' : 'ml-56'
      }`}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
