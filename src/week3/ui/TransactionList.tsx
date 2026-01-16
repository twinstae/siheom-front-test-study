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
        {transactions.length === 0 && <li>거래가 없습니다.</li>}
      </ul>
    </div>
  );
}
