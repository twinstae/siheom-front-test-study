import { Temporal } from "temporal-polyfill";

export interface SimpleTransaction {
  date: string; // 어떤 포맷일까?
  description: string; // 몇 자까지 가능할까?
  postings: {
    account: string; // 올바른 종류는 무엇이 있을까?
    amount: number; // 0 이상, 0 이하일 수도 있을까?
    commodity: string; // 'KRW' 말고 다른 것도 있을까? 어떻게 알지?
  }[];
  tags: string[]; // 몇 개까지 가능할까? 미리 지정된 것만 가능한가?
}

type Brand<K, T> = K & { __brand: T };

export const ACCOUNT_LIST = ["자본:출자금", "자산:현금"] as const;
export type Account = (typeof ACCOUNT_LIST)[number]; // ...
export const COMMODITY_LIST = ["KRW"];
export type Commodity = "KRW";

export type ValidTransaction = Brand<
  {
    date: Temporal.PlainDate;
    description: string;
    postings: {
      account: Account;
      amount: number;
      commodity: Commodity;
    }[];
    tags: string[];
  },
  "ValidTransaction"
>;
