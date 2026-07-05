export type TabType = "dashboard" | "analytics" | "action" | "budgets" | "settings";

export interface TransactionItem {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  limit: number;
  spent: number;
}
