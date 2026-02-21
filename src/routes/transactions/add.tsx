// src/routes/index.tsx
import { TransactionList } from '@/week3/TransactionList';
import { NewTransactionForm } from '@/week4/NewTransactionForm';
import { useCreateTransaction } from '@/week5/api/mutations';
import { useTransactionList } from '@/week5/api/queries';
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/transactions/add')({
  component: NewTransactionPage,
})

function NewTransactionPage() {
  const transactions = useTransactionList();

  const { mutateAsync } = useCreateTransaction();
  return (
    <div className="flex flex-col gap-8">
      <NewTransactionForm
        addTransaction={mutateAsync}
        initTransaction={{}} />

      <TransactionList transactions={transactions} />
    </div>
  )
}
