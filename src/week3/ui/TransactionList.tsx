import { useId } from "react";
import type { ValidTransaction } from "../../week2/transaction/type";

export function TransactionList({ transactions }: { transactions: ValidTransaction[] }) {
  const titleId = useId();
  return (
    <div>
      <h2 id={titleId} className="text-3xl font-bold mb-2">
        거래 목록
      </h2>
      <ul role="list" aria-labelledby={titleId}>
        {transactions.length === 0 ? (
          <li>거래가 없습니다.</li>
        ) : (
          transactions.map((transaction, index) => {
            return <TransactionItem key={index} transaction={transaction} />;
          })
        )}
      </ul>
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: ValidTransaction }) {
  return (
    <li className="shadow-sm rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-2xl text-primary font-semibold">{transaction.description}</h3>
        <time dateTime={transaction.date.toString()}>{transaction.date.toLocaleString()}</time>
      </div>
      <h4>postings</h4>
      <ul>
        {transaction.postings.map((posting) => {
          return (
            <li key={posting.account}>
              {posting.account} {posting.amount} {posting.commodity}
            </li>
          );
        })}
      </ul>
    </li>
  );
}
