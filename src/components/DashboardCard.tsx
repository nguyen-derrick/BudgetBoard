import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DashboardCard = ({ title, children, className }: DashboardCardProps) => {
  return (
    <div className={clsx("bg-gray-800 rounded-xl p-4", className)}>
      <h3 className="text-gray-400 text-sm font-medium mb-3">{title}</h3>
      {children}
    </div>
  );
};

export default DashboardCard;