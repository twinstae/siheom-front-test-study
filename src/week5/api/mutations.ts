import type { ValidTransaction } from "@/week2/transaction/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import { transactionListQueryOption } from './queries';

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createTransaction"],
    mutationFn: (data: ValidTransaction) => {
      return client.transactions.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(transactionListQueryOption);
    }
  });
}
