import type { SimpleTransaction, ValidTransaction } from './type';

export function mapToSimpleTransaction(transaction: ValidTransaction): SimpleTransaction {
  return {
    date: transaction.date.toString(),
    description: transaction.description,
    postings: transaction.postings.map((posting) => ({
      account: posting.account,
      amount: posting.amount,
      commodity: posting.commodity,
    })),
    tags: transaction.tags,
  };
}
