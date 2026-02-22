// src/routes/index.tsx
import { getId } from '@/week2/transaction/domain';
import { mapToSimpleTransaction } from '@/week2/transaction/mapper';
import { TransactionList } from '@/week3/TransactionList';
import { NewTransactionForm } from '@/week4/NewTransactionForm';
import { useCreateTransaction } from '@/week5/api/mutations';
import { useTransactionList } from '@/week5/api/queries';
import { createFileRoute } from "@tanstack/react-router";
import { useState } from 'react';
import { Temporal } from 'temporal-polyfill';

function getInitTransaction({ transactions, selectedId, now }: { transactions: ReturnType<typeof useTransactionList>, selectedId: string | null, now: Temporal.PlainDate }) {
  const selectedTransaction = transactions.find(t => getId(t) === selectedId);
  const initTransaction = selectedTransaction ? mapToSimpleTransaction(selectedTransaction) : {};

  return {
    ...initTransaction,
    date: now.toString(),
  }
}

export const Route = createFileRoute('/transactions/add')({
  component: NewTransactionPage,
})

function NewTransactionPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const transactions = useTransactionList();

  const initTransaction = getInitTransaction({ transactions, selectedId, now: Temporal.Now.plainDateISO() });

  const { mutateAsync } = useCreateTransaction();

  return (
    <div className="flex flex-col gap-8">
      <NewTransactionForm
        key={selectedId ?? "empty"}
        addTransaction={mutateAsync}
        initTransaction={initTransaction} />

      <TransactionList
        transactions={transactions} selectId={(id) => {
          setSelectedId(id);
        }} />
    </div>
  )
}
