import React, { useContext } from 'react';
import { Lightbulb, TrendingDown, ArrowUpRight } from 'lucide-react';
import { DashboardContext } from '../context/DashboardContext';

const Insights = () => {
  const { spendingsByCategory, summaryStats } = useContext(DashboardContext);
  const highestCategory = [...spendingsByCategory].sort((a, b) => b.value - a.value)[0];
  
  return (
    <div className="insights-section">
      <div className="page-header">
        <h1 className="page-title">Financial Insights</h1>
        <p className="page-subtitle">AI-driven observations based on your recent activity</p>
      </div>

      <div className="summary-cards">
        <div className="card" style={{ borderColor: 'var(--primary)', backgroundColor: '#f8fafc' }}>
          <div className="card-header">
            <span className="card-title" style={{ color: 'var(--primary)' }}>Top Spending Category</span>
            <div className="card-icon blue">
              <TrendingDown size={20} />
            </div>
          </div>
          <div className="card-amount">{highestCategory.name}</div>
          <div className="role-switcher" style={{ color: 'var(--text-muted)' }}>
            <span>You spent <strong style={{ color: 'var(--text-main)' }}>₹{highestCategory.value}</strong> this month. Try to cut down by 10% to meet your savings goal.</span>
          </div>
        </div>

        <div className="card" style={{ borderColor: 'var(--success)' }}>
          <div className="card-header">
            <span className="card-title" style={{ color: 'var(--success)' }}>Savings Milestone</span>
            <div className="card-icon green">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="card-amount">On Track</div>
          <div className="role-switcher" style={{ color: 'var(--text-muted)' }}>
            <span>Your savings rate is currently <strong>{summaryStats.savingsRate}%</strong>. You are on track to exceed your quarterly goal!</span>
          </div>
        </div>
        
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <div className="card-header">
            <span className="card-title">General Observation</span>
            <div className="card-icon purple">
              <Lightbulb size={20} />
            </div>
          </div>
          <div className="card-amount" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Consistency is key</div>
          <div className="role-switcher" style={{ color: 'var(--text-muted)' }}>
            <span>Your income to expense ratio is healthy. Keep tracking daily to maintain this stability.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
