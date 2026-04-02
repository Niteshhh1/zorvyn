export const transactionsData = [
  { id: '1', date: '2026-03-25', amount: 3200, category: 'Salary', type: 'income', status: 'completed' },
  { id: '2', date: '2026-03-26', amount: 150, category: 'Groceries', type: 'expense', status: 'completed' },
  { id: '3', date: '2026-03-27', amount: 60, category: 'Entertainment', type: 'expense', status: 'completed' },
  { id: '4', date: '2026-03-28', amount: 1200, category: 'Rent', type: 'expense', status: 'completed' },
  { id: '5', date: '2026-03-29', amount: 85, category: 'Utilities', type: 'expense', status: 'completed' },
  { id: '6', date: '2026-03-30', amount: 400, category: 'Freelance', type: 'income', status: 'completed' },
  { id: '7', date: '2026-04-01', amount: 210, category: 'Shopping', type: 'expense', status: 'completed' },
  { id: '8', date: '2026-04-02', amount: 45, category: 'Dining', type: 'expense', status: 'completed' },
];

export const monthlyOverview = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 4500, expense: 2800 },
  { name: 'Apr', income: 3600, expense: 1908 },
  { name: 'May', income: 3200, expense: 2100 },
  { name: 'Jun', income: 4800, expense: 2900 },
];

export const spendingsByCategory = [
  { name: 'Rent', value: 1200 },
  { name: 'Groceries', value: 300 },
  { name: 'Utilities', value: 150 },
  { name: 'Entertainment', value: 200 },
  { name: 'Shopping', value: 250 },
  { name: 'Dining', value: 180 },
];

export const summaryStats = {
  totalBalance: 24500.50,
  incomeThisMonth: 3600,
  expensesThisMonth: 1908,
  savingsRate: 47,
};
