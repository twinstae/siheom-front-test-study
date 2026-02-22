// import { useSuspenseQuery } from "@tanstack/react-query";
import { useSuspenseQuery } from '@tanstack/react-query';
import { client } from "./client";

export const transactionListQueryOption = {
  queryKey: ["transactions"],
  queryFn: async () => client.transactions.list(),
};

export function useTransactionList() {
  const { data } = useSuspenseQuery(transactionListQueryOption);
  return data;
}
