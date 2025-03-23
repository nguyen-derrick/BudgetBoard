import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Download, Filter } from 'lucide-react';
import DashboardCard from './DashboardCard';
import DatePicker from 'react-datepicker';
import { format, isWithinInterval } from 'date-fns';
import Papa from 'papaparse';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const transactions: Transaction[] = [
    { id: '1', description: 'Grocery Shopping', amount: -120, category: 'Food', date: '2024-02-20', type: 'expense' },
    { id: '2', description: 'Salary Deposit', amount: 3500, category: 'Income', date: '2024-02-19', type: 'income' },
    { id: '3', description: 'Netflix Subscription', amount: -15, category: 'Entertainment', date: '2024-02-18', type: 'expense' },
    { id: '4', description: 'Gas Station', amount: -45, category: 'Transportation', date: '2024-02-17', type: 'expense' },
    { id: '5', description: 'Freelance Payment', amount: 800, category: 'Income', date: '2024-02-16', type: 'income' },
  ];

  const categories = [...new Set(transactions.map(tx => tx.category))];
  const types = [...new Set(transactions.map(tx => tx.type))];

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(tx => {
        const matchesSearch = 
          tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategories.length === 0 || 
          selectedCategories.includes(tx.category);
        
        const matchesType = selectedTypes.length === 0 || 
          selectedTypes.includes(tx.type);
        
        const matchesDateRange = !startDate || !endDate || 
          isWithinInterval(new Date(tx.date), { start: startDate, end: endDate });

        return matchesSearch && matchesCategory && matchesType && matchesDateRange;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
  }, [transactions, searchTerm, selectedCategories, selectedTypes, startDate, endDate, sortField, sortDirection]);

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredTransactions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
      
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Date Range</label>
              <div className="flex gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  placeholderText="Start Date"
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg w-full"
                />
                <DatePicker
                  selected={endDate}
                  onChange={setEndDate}
                  placeholderText="End Date"
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Categories</label>
              <select
                multiple
                value={selectedCategories}
                onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
              <select
                multiple
                value={selectedTypes}
                onChange={(e) => setSelectedTypes(Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedTypes([]);
                  setStartDate(null);
                  setEndDate(null);
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <DashboardCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-2">
                    Date
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('description')}>
                  <div className="flex items-center gap-2">
                    Description
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('category')}>
                  <div className="flex items-center gap-2">
                    Category
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="pb-3 cursor-pointer text-right" onClick={() => handleSort('amount')}>
                  <div className="flex items-center gap-2 justify-end">
                    Amount
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3">{format(new Date(tx.date), 'MMM dd, yyyy')}</td>
                  <td className="py-3">{tx.description}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-700">{tx.category}</span>
                  </td>
                  <td className={`py-3 text-right ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default TransactionsPage;