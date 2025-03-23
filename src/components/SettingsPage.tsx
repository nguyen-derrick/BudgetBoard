import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import { Download, Save } from 'lucide-react';
import { jsPDF } from 'jspdf';

const SettingsPage = () => {
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [theme, setTheme] = useState('dark');

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  ];

  const dateFormats = [
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD',
  ];

  const themes = [
    { id: 'dark', name: 'Dark Theme' },
    { id: 'light', name: 'Light Theme' },
  ];

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Financial Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 30);
    
    // Add more content as needed
    
    doc.save('financial-report.pdf');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardCard title="Preferences">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {currencies.map((cur) => (
                  <option key={cur.code} value={cur.code}>
                    {cur.symbol} - {cur.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Date Format
              </label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {dateFormats.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Theme
              </label>
              <div className="space-y-2">
                {themes.map((t) => (
                  <label key={t.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="theme"
                      value={t.id}
                      checked={theme === t.id}
                      onChange={(e) => setTheme(e.target.value)}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span>{t.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </DashboardCard>

        <DashboardCard title="Export Data">
          <div className="space-y-4">
            <p className="text-gray-400">
              Download your financial data in various formats for record keeping or analysis.
            </p>
            
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export as PDF
            </button>

            <button className="flex items-center gap-2 w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export as CSV
            </button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default SettingsPage;