// import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "./client";
import { parseTransaction } from '@/week2/transaction/parser';
import { TestSimpleTransactionList } from '@/week2/transaction/fixtures';

export const transactionListQueryOption = {
  queryKey: ["transactions"],
  queryFn: async () => client.transactions.list(),
};

export function useTransactionList() {
  // const { data } = useSuspenseQuery(transactionListQueryOption);

  return TestSimpleTransactionList.map(parseTransaction);
}
