import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/DashboardCard';
import SpendingChart from './components/SpendingChart';
import TransactionsPage from './components/TransactionsPage';
import BudgetPage from './components/BudgetPage';
import AnalyticsPage from './components/AnalyticsPage';
import SettingsPage from './components/SettingsPage';
import { Wallet, TrendingUp, TrendingDown, Clock } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'transactions':
        return <TransactionsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'budget':
        return <BudgetPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              <header className="mb-8">
                <h1 className="text-2xl font-bold">Financial Dashboard</h1>
                <p className="text-gray-400">Track your spending and savings</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <DashboardCard title="Total Balance">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Wallet className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$24,563</p>
                      <p className="text-green-500 text-sm">+2.5% from last month</p>
                    </div>
                  </div>
                </DashboardCard>

                <DashboardCard title="Income">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$8,350</p>
                      <p className="text-gray-400 text-sm">This month</p>
                    </div>
                  </div>
                </DashboardCard>

                <DashboardCard title="Expenses">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-500/20 rounded-lg">
                      <TrendingDown className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$4,223</p>
                      <p className="text-gray-400 text-sm">This month</p>
                    </div>
                  </div>
                </DashboardCard>

                <DashboardCard title="Upcoming Bills">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$1,500</p>
                      <p className="text-gray-400 text-sm">Due this week</p>
                    </div>
                  </div>
                </DashboardCard>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <DashboardCard title="Spending Overview" className="lg:col-span-2">
                  <SpendingChart />
                </DashboardCard>

                <DashboardCard title="Recent Transactions">
                  <div className="space-y-4">
                    {[
                      { desc: 'Grocery Shopping', amount: -120, date: 'Today' },
                      { desc: 'Salary Deposit', amount: 3500, date: 'Yesterday' },
                      { desc: 'Netflix Subscription', amount: -15, date: '2 days ago' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{tx.desc}</p>
                          <p className="text-sm text-gray-400">{tx.date}</p>
                        </div>
                        <p className={tx.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </DashboardCard>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar onPageChange={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;