export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Budget {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

export interface User {
  id: string;
  email: string;
}