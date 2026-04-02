import React, { useState, useContext } from 'react';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Lightbulb, 
  Bell,
  Menu,
  X
} from 'lucide-react';
import DashboardOverview from './components/DashboardOverview';
import TransactionsTable from './components/TransactionsTable';
import Insights from './components/Insights';
import { DashboardContext } from './context/DashboardContext';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userRole, setUserRole } = useContext(DashboardContext);

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsMobileMenuOpen(false); // Hide menu automatically on mobile when a link is clicked
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'transactions':
        return <TransactionsTable />;
      case 'insights':
        return <Insights />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Dashboard Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar Dropdown Menu */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="avatar" style={{ width: '32px', height: '32px', borderRadius: '8px' }}>F</div>
            FinanceIQ
          </div>
          <button className="mobile-close-btn btn-icon" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="sidebar-nav">
          <a 
            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('dashboard'); }}
            href="#"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a 
            className={`nav-item ${activeView === 'transactions' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('transactions'); }}
            href="#"
          >
            <ArrowRightLeft size={20} />
            Transactions
          </a>
          <a 
            className={`nav-item ${activeView === 'insights' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('insights'); }}
            href="#"
          >
            <Lightbulb size={20} />
            Insights
          </a>

          {/* Hidden on desktop, visible on mobile */}
          <div className="mobile-only-role">
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Switch Role:</span>
            <select 
              className="role-select" 
              style={{ width: '100%' }}
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu-btn btn-icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="mobile-logo-topbar">
              <div className="avatar" style={{ width: '32px', height: '32px', borderRadius: '8px' }}>F</div>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>FinanceIQ</span>
            </div>
            <h2 className="topbar-title" style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
              <span className="desktop-slash" style={{ display: 'none', margin: '0 12px', color: 'var(--text-muted)' }}>/</span>
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h2>
          </div>
          
          <div className="topbar-right">
            <div className="role-switcher">
              <span>View as:</span>
              <select 
                className="role-select" 
                value={userRole} 
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <button className="btn-icon bell-btn">
              <Bell size={20} />
            </button>
            
            <div className="user-profile" style={{ marginLeft: '12px', paddingLeft: '24px', borderLeft: '1px solid var(--border)' }}>
              <div className="avatar">JD</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>John Doe</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{userRole === 'admin' ? 'Administrator' : 'Read Only'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* View Container */}
        <div className="view-container">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
