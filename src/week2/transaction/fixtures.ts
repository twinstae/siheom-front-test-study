export const validTransaction = {
  date: "2025-11-11",
  description: "김토끼가 또 출자함",
  postings: [
    { account: "자본:출자금", amount: 10000, commodity: "KRW" },
    { account: "자산:현금", amount: -10000, commodity: "KRW" },
  ],
  tags: ["출자"],
};

export const notBalancedTransaction = {
  date: "2025-11-11",
  description: "김토끼가 또 출자함",
  postings: [
    { account: "자본:출자금", amount: 10000, commodity: "KRW" },
    { account: "자산:현금", amount: -10001, commodity: "KRW" },
  ],
  tags: ["출자"],
};
