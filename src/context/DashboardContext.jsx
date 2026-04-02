import React, { createContext, useState, useMemo } from 'react';
import { transactionsData as initialTransactions, monthlyOverview, spendingsByCategory, summaryStats } from '../data/mockData';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('viewer');
  const [transactions, setTransactions] = useState(initialTransactions);

  const addTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
    // In a dynamic app, we would recalculate summaryStats/spendingsByCategory here based on the combined `transactions` state.
  };

  const contextValue = useMemo(() => ({
    userRole,
    setUserRole,
    transactions,
    addTransaction,
    monthlyOverview, // Sourced from mock data
    spendingsByCategory, // Sourced from mock data
    summaryStats // Sourced from mock data
  }), [userRole, transactions]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};
