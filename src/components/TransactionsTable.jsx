import React, { useState, useMemo, useContext } from 'react';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';
import { DashboardContext } from '../context/DashboardContext';

const TransactionsTable = () => {
  const { transactions, userRole, addTransaction } = useContext(DashboardContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [showModal, setShowModal] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    date: '', amount: '', category: '', type: 'expense'
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let filteredData = [...transactions];

    if (searchTerm) {
      filteredData = filteredData.filter(t => 
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.amount.toString().includes(searchTerm)
      );
    }

    if (filterType !== 'all') {
      filteredData = filteredData.filter(t => t.type === filterType);
    }

    filteredData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filteredData;
  }, [transactions, searchTerm, filterType, sortConfig]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTransaction.date || !newTransaction.amount || !newTransaction.category) return;
    
    addTransaction({
      ...newTransaction,
      id: Date.now().toString(),
      amount: Number(newTransaction.amount),
      status: 'completed'
    });
    
    setShowModal(false);
    setNewTransaction({ date: '', amount: '', category: '', type: 'expense' });
  };

  return (
    <div className="transactions-section">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">Manage your recent income and expenses</p>
        </div>
        {userRole === 'admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Add Transaction
          </button>
        )}
      </div>

      <div className="table-container">
        <div className="table-controls">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search category or amount..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="table-wrapper">
          {filteredAndSortedData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('date')}>Date <ArrowUpDown size={14} className="sort-icon" /></th>
                  <th onClick={() => handleSort('category')}>Category <ArrowUpDown size={14} className="sort-icon" /></th>
                  <th onClick={() => handleSort('type')}>Type <ArrowUpDown size={14} className="sort-icon" /></th>
                  <th onClick={() => handleSort('amount')}>Amount <ArrowUpDown size={14} className="sort-icon" /></th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td style={{ fontWeight: 500 }}>{transaction.category}</td>
                    <td>
                      <span className={`badge ${transaction.type}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`amount ${transaction.type}`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Filter size={32} />
              </div>
              <h3 className="empty-state-title">No transactions found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Add New Transaction</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select 
                  className="form-select"
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Groceries, Salary..."
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
