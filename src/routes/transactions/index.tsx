// src/routes/index.tsx
import { TransactionList } from '@/week3/TransactionList';
import { useTransactionList } from '@/week5/api/queries';
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/transactions/')({
  component: Home,
})

function Home() {
  const transactions = useTransactionList();

  return (
    <div>
      <TransactionList transactions={transactions} />

    </div>
  )
}
