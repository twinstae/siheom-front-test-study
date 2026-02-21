import { useId } from "react";
import type { ValidTransaction } from "../week2/transaction/type";
import type { Temporal } from "temporal-polyfill";
import { Badge } from "../components/base/badges/badges";
import { getAccountType } from "../week2/transaction/domain";
import { cx } from "../utils/cx";
import { Button } from '@/components/base/buttons/button';

export function TransactionList({ transactions, selectId }: { transactions: ValidTransaction[], selectId: (id: string) => void }) {
  const titleId = useId();
  return (
    <div>
      <h2 id={titleId} className="text-3xl font-bold mb-2">
        거래 목록
      </h2>
      <ul role="list" aria-labelledby={titleId} className='flex flex-col gap-4'>
        {transactions.length === 0 ? (
          <li>
            거래 내역이 없습니다
          </li>
        ) : (
          transactions.map((transaction, index) => {
            return <TransactionItem key={index} transaction={transaction} selectId={selectId} />;
          })
        )}
      </ul>
    </div>
  );
}

function TransactionItem({ transaction, selectId }: { transaction: ValidTransaction, selectId: (id: string) => void }) {
  return (
    <li className="shadow-sm rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-2xl text-primary font-semibold">{transaction.description}</h3>
        <DateBadge date={transaction.date} />
        <Button color="secondary" onClick={() => selectId(transaction.date.toString() + transaction.description)}>
          복제하기
        </Button>
      </div>
      <PostingsList postings={transaction.postings} />
      <ul className="flex gap-1 mt-3">
        {transaction.tags.map((tag) => (
          <Badge type="modern" key={tag}>
            {tag}
          </Badge>
        ))}
      </ul>
    </li>
  );
}

function getAccountColor(account: string): "blue" | "gray" | "error" {
  switch (getAccountType(account)) {
    case "자본":
      return "blue";
    case "자산":
      return "gray";
    case "부채":
      return "error";
    case "사업수익":
      return "blue";
    case "사업비용":
      return "error";
    case "사업외비용":
      return "error";
    case "사업외수익":
      return "blue";
  }
}

function DateBadge({ date }: { date: Temporal.PlainDate }) {
  return <time dateTime={date.toString()}>{date.toLocaleString("ko-KR")}</time>;
}

function PostingsList({ postings }: { postings: ValidTransaction["postings"] }) {
  const postingsTitleId = useId();
  return (
    <div>
      <h4 id={postingsTitleId} className="font-semibold mb-1">
        분개
      </h4>
      <ul role="list" aria-labelledby={postingsTitleId} className="flex flex-col gap-2">
        {postings.map((posting, pIndex) => (
          <li key={pIndex} className="flex gap-2 items-center justify-between">
            <Badge type="color" color={getAccountColor(posting.account)} size="md">
              {posting.account}
            </Badge>

            <span
              className={cx(
                "font-medium text-lg",
                posting.amount > 0 ? "text-black" : "text-error-600",
              )}
            >
              {posting.amount.toLocaleString()} {posting.commodity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
