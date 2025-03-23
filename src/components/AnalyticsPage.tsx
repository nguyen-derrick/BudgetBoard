import React, { useState, useMemo } from 'react';
import DashboardCard from './DashboardCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import regression from 'regression';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsPage = () => {
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'charts' | 'predictions'>('charts');

  // Sample historical data
  const historicalData = [
    { month: 'Jan', income: 3000, expenses: 2500 },
    { month: 'Feb', income: 3500, expenses: 2800 },
    { month: 'Mar', income: 3200, expenses: 2600 },
    { month: 'Apr', income: 3800, expenses: 2900 },
    { month: 'May', income: 3600, expenses: 2700 },
    { month: 'Jun', income: 4000, expenses: 3000 },
  ];

  // Calculate trend predictions
  const predictedData = useMemo(() => {
    const expensePoints = historicalData.map((data, i) => [i, data.expenses]);
    const result = regression.linear(expensePoints);
    const prediction = result.predict(expensePoints.length)[1];
    return prediction;
  }, [historicalData]);

  const lineChartData = {
    labels: historicalData.map(data => data.month),
    datasets: [
      {
        label: 'Income',
        data: historicalData.map(data => data.income),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: historicalData.map(data => data.expenses),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'],
    datasets: [{
      label: 'Spending by Category',
      data: [450, 300, 400, 600, 250],
      backgroundColor: [
        'rgba(139, 92, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
      ],
    }],
  };

  const doughnutData = {
    labels: ['Savings', 'Expenses', 'Investments'],
    datasets: [{
      data: [30, 50, 20],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ],
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Analytics</h1>
        
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedView('charts')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedView === 'charts'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Charts
            </button>
            <button
              onClick={() => setSelectedView('predictions')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedView === 'predictions'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Predictions
            </button>
          </div>
          
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date || new Date())}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg"
          />
          <span className="text-gray-400">to</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date || new Date())}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg"
          />
        </div>
      </div>

      {selectedView === 'charts' ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <DashboardCard title="Income vs Expenses">
              <div className="h-[300px]">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </DashboardCard>

            <DashboardCard title="Spending by Category">
              <div className="h-[300px]">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </DashboardCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <DashboardCard title="Money Distribution" className="lg:col-span-1">
              <div className="h-[300px]">
                <Doughnut data={doughnutData} options={{
                  ...chartOptions,
                  cutout: '70%',
                }} />
              </div>
            </DashboardCard>

            <DashboardCard title="Key Insights" className="lg:col-span-2">
              <div className="space-y-4">
                <div className="p-4 bg-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-500">Positive Trends</h3>
                  <p className="text-gray-300 mt-1">Your savings rate has increased by 15% compared to last month.</p>
                </div>
                <div className="p-4 bg-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-500">Areas for Improvement</h3>
                  <p className="text-gray-300 mt-1">Entertainment spending is 20% higher than your monthly average.</p>
                </div>
                <div className="p-4 bg-purple-500/20 rounded-lg">
                  <h3 className="font-semibold text-purple-500">Recommendations</h3>
                  <p className="text-gray-300 mt-1">Consider increasing your investment allocation to meet your yearly goals.</p>
                </div>
              </div>
            </DashboardCard>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DashboardCard title="Expense Prediction">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Next Month's Projected Expenses</h3>
              <div className="text-4xl font-bold text-purple-500 mb-4">
                ${Math.round(predictedData).toLocaleString()}
              </div>
              <p className="text-gray-400">
                Based on your historical spending patterns, we predict your expenses will
                {predictedData > historicalData[historicalData.length - 1].expenses
                  ? ' increase '
                  : ' decrease '}
                next month.
              </p>
            </div>
          </DashboardCard>

          <DashboardCard title="Spending Patterns">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Trend Analysis</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Recurring Expenses</h4>
                  <p className="text-gray-400">Monthly subscriptions and bills make up 45% of your expenses</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Seasonal Patterns</h4>
                  <p className="text-gray-400">Your spending typically increases during summer months</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Savings Potential</h4>
                  <p className="text-gray-400">You could save an additional $200/month by optimizing subscriptions</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;