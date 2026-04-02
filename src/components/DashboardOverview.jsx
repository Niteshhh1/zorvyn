import React, { useContext } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { DashboardContext } from '../context/DashboardContext';

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#64748b'];

const DashboardOverview = () => {
  const { summaryStats, monthlyOverview, spendingsByCategory } = useContext(DashboardContext);

  return (
    <div className="dashboard-overview">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, here's your financial overview</p>
      </div>

      <div className="summary-cards">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Total Balance</span>
            <div className="card-icon blue">
              <Wallet size={20} />
            </div>
          </div>
          <div className="card-amount">₹{summaryStats.totalBalance.toLocaleString()}</div>
          <div className="role-switcher" style={{ color: 'var(--success)' }}>
            <TrendingUp size={16} />
            <span>+2.5% from last month</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Income</span>
            <div className="card-icon green">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="card-amount">₹{summaryStats.incomeThisMonth.toLocaleString()}</div>
          <div className="role-switcher" style={{ color: 'var(--text-muted)' }}>
            <span>This Month</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Expenses</span>
            <div className="card-icon red">
              <TrendingDown size={20} />
            </div>
          </div>
          <div className="card-amount">₹{summaryStats.expensesThisMonth.toLocaleString()}</div>
          <div className="role-switcher" style={{ color: 'var(--text-muted)' }}>
            <span>This Month</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Savings Rate</span>
            <div className="card-icon purple">
              <PiggyBank size={20} />
            </div>
          </div>
          <div className="card-amount">{summaryStats.savingsRate}%</div>
          <div className="role-switcher" style={{ color: 'var(--text-muted)' }}>
            <span>Target: 50%</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-header">Income vs Expenses</h3>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyOverview} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  cursor={{ fill: 'var(--hover-bg)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="income" name="Income" fill="var(--success)" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="expense" name="Expenses" fill="var(--danger)" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-header">Spending Breakdown</h3>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingsByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {spendingsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                  formatter={(value) => `₹${value}`}
                />
                <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
