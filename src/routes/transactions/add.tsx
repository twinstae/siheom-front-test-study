// src/routes/index.tsx
import { mapToSimpleTransaction } from '@/week2/transaction/mapper';
import { TransactionList } from '@/week3/TransactionList';
import { NewTransactionForm } from '@/week4/NewTransactionForm';
import { useCreateTransaction } from '@/week5/api/mutations';
import { useTransactionList } from '@/week5/api/queries';
import { createFileRoute } from "@tanstack/react-router";
import { useState } from 'react';
import { Temporal } from 'temporal-polyfill';

export const Route = createFileRoute('/transactions/add')({
  component: NewTransactionPage,
})

function NewTransactionPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const transactions = useTransactionList();

  const selectedTransaction = transactions.find((transaction) => transaction.date.toString() + transaction.description === selectedId);
  const initTransaction = selectedTransaction ? mapToSimpleTransaction(selectedTransaction) : {};

  const { mutateAsync } = useCreateTransaction();
  return (
    <div className="flex flex-col gap-8">
      <NewTransactionForm
        key={selectedId}
        addTransaction={mutateAsync}
        initTransaction={{
          ...initTransaction,
          date: Temporal.Now.plainDateISO().toString(),
        }} />

      <TransactionList transactions={transactions} selectId={setSelectedId} />
    </div>
  )
}
