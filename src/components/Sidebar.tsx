import React from 'react';
import { Home, PieChart, Wallet, Settings, LogOut, BarChart3 } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

const Sidebar = ({ onPageChange, currentPage }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Wallet, label: 'Transactions', id: 'transactions' },
    { icon: BarChart3, label: 'Budget', id: 'budget' },
    { icon: PieChart, label: 'Analytics', id: 'analytics' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 h-screen p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Wallet className="w-8 h-8 text-purple-500" />
        <span className="text-white text-xl font-bold">FinSight</span>
      </div>
      
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={clsx(
              "flex items-center gap-3 text-gray-300 hover:text-white px-4 py-3 rounded-lg w-full mb-2 transition-colors",
              currentPage === item.id && "bg-purple-500/20 text-purple-500"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-lg w-full">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;