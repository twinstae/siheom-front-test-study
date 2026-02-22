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

// html이나 form에 넣기 어렵다... 문자열 형태로 직렬화...
// 직렬화 가능한 형태로 바꿔주는... (redux 의 제약...)