import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { FileText, TrendingUp, DollarSign, Calendar, Tag, Download, FileSpreadsheet, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import jsPDF from "jspdf";

function Reports() {
  const [expenses, setExpenses] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();

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
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  // Category totals
  const categoryData = {};
  expenses.forEach((item) => {
    categoryData[item.category] =
      (categoryData[item.category] || 0) + Number(item.amount);
  });

  const total = Object.values(categoryData).reduce(
    (a, b) => a + b,
    0
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let yPos = 30;
    
    // Helper function to add new page if needed
    const checkPageBreak = (requiredHeight = 20) => {
      if (yPos > doc.internal.pageSize.height - requiredHeight) {
        doc.addPage();
        yPos = 30;
        return true;
      }
      return false;
    };
    
    // Title Section
    doc.setFontSize(24);
    doc.setTextColor(59, 130, 246);
    doc.setFont(undefined, 'bold');
    doc.text('Finance Report', margin, yPos);
    
    // Subtitle
    yPos += 15;
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, 'normal');
    doc.text('Personal Finance Summary', margin, yPos);
    
    // Generation Date
    yPos += 10;
    const today = new Date().toLocaleDateString('en-GB', { 
      day: '2-digit',
      month: 'long', 
      year: 'numeric' 
    });
    doc.text(`Generated on: ${today}`, margin, yPos);
    
    // Add horizontal line
    yPos += 15;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    
    // Total Spending Section
    yPos += 20;
    checkPageBreak(40);
    doc.setFontSize(18);
    doc.setTextColor(59, 130, 246);
    doc.setFont(undefined, 'bold');
    doc.text('Total Spending', margin, yPos);
    
    yPos += 12;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text(`₹${total.toLocaleString()}`, margin, yPos);
    
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, 'normal');
    doc.text(`Total Transactions: ${expenses.length}`, margin, yPos);
    
    // Category Breakdown Section
    yPos += 20;
    checkPageBreak(60);
    doc.setFontSize(18);
    doc.setTextColor(59, 130, 246);
    doc.setFont(undefined, 'bold');
    doc.text('Category Breakdown', margin, yPos);
    
    yPos += 15;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    
    // Create table-like structure for categories
    const categories = Object.entries(categoryData)
      .sort(([,a], [,b]) => b - a);
    
    categories.forEach(([cat, amount]) => {
      checkPageBreak(15);
      const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
      
      // Category name (left aligned)
      doc.text(cat, margin, yPos);
      
      // Amount and percentage (right aligned)
      const amountText = `₹${amount.toLocaleString()} (${percentage}%)`;
      doc.text(amountText, pageWidth - margin - doc.getTextWidth(amountText), yPos);
      
      yPos += 12;
    });
    
    // Expense List Section
    yPos += 20;
    checkPageBreak(80);
    doc.setFontSize(18);
    doc.setTextColor(59, 130, 246);
    doc.setFont(undefined, 'bold');
    doc.text('Expense List', margin, yPos);
    
    // Table headers for expenses
    yPos += 15;
    checkPageBreak(60);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    
    // Create column positions
    const col1X = margin;
    const col2X = 80;
    const col3X = 130;
    const col4X = pageWidth - margin - 40;
    
    // Table headers
    doc.text('#', col1X, yPos);
    doc.text('Title', col1X + 10, yPos);
    doc.text('Category', col2X, yPos);
    doc.text('Date', col3X, yPos);
    doc.text('Amount', col4X, yPos);
    
    // Add line under headers
    yPos += 8;
    doc.setDrawColor(150, 150, 150);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    
    // Expense data rows
    yPos += 8;
    doc.setFont(undefined, 'normal');
    expenses.forEach((item, index) => {
      checkPageBreak(12);
      
      // Format date
      const expenseDate = item.date ? new Date(item.date).toLocaleDateString('en-GB') : 'N/A';
      
      // Table row data
      doc.text(`${index + 1}`, col1X, yPos);
      
      // Truncate long titles
      const title = item.title.length > 25 ? item.title.substring(0, 22) + '...' : item.title;
      doc.text(title, col1X + 10, yPos);
      
      doc.text(item.category, col2X, yPos);
      doc.text(expenseDate, col3X, yPos);
      
      // Right-align amount
      const amountText = `₹${Number(item.amount).toLocaleString()}`;
      doc.text(amountText, pageWidth - margin - doc.getTextWidth(amountText), yPos);
      
      yPos += 12;
    });
    
    // Summary Statistics
    yPos += 20;
    checkPageBreak(40);
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.setFont(undefined, 'bold');
    doc.text('Summary Statistics', margin, yPos);
    
    yPos += 12;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    
    const avgExpense = expenses.length > 0 ? Math.round(total / expenses.length) : 0;
    doc.text(`Average Expense: ₹${avgExpense.toLocaleString()}`, margin, yPos);
    
    yPos += 10;
    doc.text(`Number of Categories: ${Object.keys(categoryData).length}`, margin, yPos);
    
    yPos += 10;
    doc.text(`Report Period: All transactions`, margin, yPos);
    
    // Footer
    yPos = doc.internal.pageSize.height - 20;
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.setFont(undefined, 'italic');
    doc.text('Generated by FinanceTracker App', margin, yPos);
    doc.text(`Page 1 of ${doc.internal.getNumberOfPages()}`, pageWidth - margin - 30, yPos);
    
    // Save the PDF
    doc.save(`FinanceTracker_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportCSV = () => {
    // Helper function to escape CSV fields properly
    const escapeCSVField = (field) => {
      if (field == null) return 'N/A';
      const stringField = String(field);
      // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
      if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    };
    
    // Helper function to format date consistently
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      } catch {
        return 'N/A';
      }
    };
    
    // Create CSV content with proper structure
    const headers = ['Title', 'Amount', 'Category', 'Date'];
    
    // Add summary information at the top
    const summaryRows = [
      ['Finance Tracker - Expense Report', '', '', ''],
      [`Generated on: ${new Date().toLocaleDateString('en-GB')}`, '', '', ''],
      [`Total Spending: ₹${total.toLocaleString()}`, '', '', ''],
      [`Total Transactions: ${expenses.length}`, '', '', ''],
      ['', '', '', ''], // Empty row for separation
      headers
    ];
    
    // Process expense data
    const expenseRows = expenses.map((expense, index) => {
      return [
        escapeCSVField(expense.title),
        escapeCSVField(`₹${Number(expense.amount).toLocaleString()}`),
        escapeCSVField(expense.category),
        formatDate(expense.date)
      ];
    });
    
    // Add category summary at the end
    const categorySummary = [
      ['', '', '', ''], // Empty row for separation
      ['Category Summary', '', '', ''],
      ['Category', 'Amount', 'Percentage', 'Count']
    ];
    
    const categories = Object.entries(categoryData)
      .sort(([,a], [,b]) => b - a)
      .map(([category, amount]) => {
        const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
        const count = expenses.filter(exp => exp.category === category).length;
        return [
          escapeCSVField(category),
          escapeCSVField(`₹${amount.toLocaleString()}`),
          escapeCSVField(`${percentage}%`),
          escapeCSVField(count)
        ];
      });
    
    // Combine all rows
    const allRows = [
      ...summaryRows.map(row => row.join(',')),
      ...expenseRows.map(row => row.join(',')),
      ...categorySummary.map(row => row.join(',')),
      ...categories.map(row => row.join(','))
    ];
    
    const csvContent = allRows.join('\n');
    
    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a link element and trigger the download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `FinanceTracker_Expenses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen p-10 transition-colors duration-300">
        {/* Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Reports</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Detailed analysis of your expenses</p>
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
              onClick={exportCSV}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
            >
              <FileSpreadsheet className="w-5 h-5" />
              Export CSV
            </button>
            <button
              onClick={downloadPDF}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>

        {/* Total Spending Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                Total Spending
              </h2>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">₹{total.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Transactions</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{expenses.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Breakdown Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <Tag className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              Category Breakdown
            </h2>
            
            {Object.keys(categoryData).length === 0 ? (
              <div className="text-center py-8">
                <Tag className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">No categories yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Start adding expenses to see categories</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(categoryData)
                  .sort(([,a], [,b]) => b - a)
                  .map(([cat, amount]) => {
                    const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
                    return (
                      <div key={cat} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-102">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{cat}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{percentage}% of total</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">₹{amount.toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* All Expenses Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              All Expenses
            </h2>
            
            {expenses.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">No expenses yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Start tracking your expenses</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {expenses.map((item) => (
                  <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-102">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600 dark:text-purple-400">₹{Number(item.amount).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Expense</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  ₹{expenses.length > 0 ? Math.round(total / expenses.length).toLocaleString() : 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <Tag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{Object.keys(categoryData).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{expenses.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Reports;