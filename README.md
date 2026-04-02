# Finance Dashboard

A clean, modern, and interactive finance dashboard built specifically for evaluation purposes. This dashboard provides a simplified view of financial activity with role-based features, analytical insights, and responsive design structure.

## Features

- **Dashboard Overview**: Essential summary metrics (Balance, Income, Expenses, Savings Rate) alongside visual data representations using Recharts (Income vs Expense bar chart, Spending breakdown pie chart).
- **Transactions Management**: Includes a responsive data table to display your transactions. Features include dynamic sorting to easily order data, transaction type filters, and a search system for categories.
- **Insights Engine**: A dedicated component to give users automated analytical observations based on the current data state.
- **Role-Based UI**: Simulate role switching from a simple dropdown. 'Viewer' limits the user to a read-only state. Switching to 'Admin' enables adding new transactions directly into the dynamic table.
- **Premium Design Aesthetics**: Built thoroughly with external vanilla CSS. Contains modern UI patterns like dynamic hover states, smooth transitions, glass-like shadows, curated soft typography, and a cohesive color palette.

## Technical Approach
- **Core Library**: React (Vite environment)
- **Styling**: Pure External Vanilla CSS (Variable driven for scalability)
- **Visuals**: Recharts for statistical graphics, Lucide-React for clean iconography. 
- **State Management**: React fundamental hooks (`useState`, `useMemo`) efficiently managing top-level mock data passed down cleanly via props to avoid unneeded external dependencies.

## Setup Instructions

### Pre-requisites
Ensure you have Node.js and npm installed.

### Installation

1. Navigate to the project directory:
   ```bash
   cd zorvyn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Troubleshooting
If you encounter a `rolldown` build error regarding native bindings (a known Vite 6 beta/npm bug on Windows), simply force dependency overrides or explicitly install vite 5 instead:
   ```bash
   npm install vite@5 @vitejs/plugin-react@4 --save-dev
   npm run dev
   ```
