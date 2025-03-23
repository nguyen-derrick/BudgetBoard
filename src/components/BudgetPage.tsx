import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import { AlertCircle } from 'lucide-react';

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  recurring: boolean;
}

const BudgetPage = () => {
  const [budgets] = useState<Budget[]>([
    { id: '1', category: 'Food & Dining', limit: 500, spent: 450, recurring: true },
    { id: '2', category: 'Transportation', limit: 200, spent: 150, recurring: true },
    { id: '3', category: 'Entertainment', limit: 300, spent: 280, recurring: true },
    { id: '4', category: 'Shopping', limit: 400, spent: 200, recurring: false },
  ]);

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Budget Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentage = Math.round((budget.spent / budget.limit) * 100);
          const progressColor = getProgressColor(budget.spent, budget.limit);
          const isNearLimit = percentage >= 90;

          return (
            <DashboardCard key={budget.id}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{budget.category}</h3>
                  <p className="text-sm text-gray-400">
                    {budget.recurring ? 'Monthly Budget' : 'One-time Budget'}
                  </p>
                </div>
                {isNearLimit && (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">Near limit</span>
                  </div>
                )}
              </div>

              <div className="mb-2">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${progressColor} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Spent: ${budget.spent.toLocaleString()}
                </span>
                <span className="text-gray-400">
                  Limit: ${budget.limit.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 text-right">
                <span className={`text-lg font-semibold ${percentage >= 90 ? 'text-red-500' : 'text-green-500'}`}>
                  {percentage}%
                </span>
              </div>
            </DashboardCard>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetPage;