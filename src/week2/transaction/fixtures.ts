export const validSimpleTransaction = {
  date: "2025-11-11",
  description: "김토끼가 또 출자함",
  postings: [
    { account: "자본:출자금", amount: 10000, commodity: "KRW" },
    { account: "자산:현금", amount: -10000, commodity: "KRW" },
  ],
  tags: ["출자"],
};

export const notBalancedSimpleTransaction = {
  date: "2025-11-11",
  description: "김토끼가 또 출자함",
  postings: [
    { account: "자본:출자금", amount: 10000, commodity: "KRW" },
    { account: "자산:현금", amount: -10001, commodity: "KRW" },
  ],
  tags: ["출자"],
};

export const goodsSalesTransaction = {
  date: "2025-11-08",
  description: "굿즈 판매 매출",
  postings: [
    {
      account: "사업수익:수익사업수익:기념품판매수익",
      amount: -18182,
      commodity: "KRW",
    },
    {
      account: "부채:유동부채:예수금:부가세예수금(수익사업매출)",
      amount: -1818,
      commodity: "KRW",
    },
    {
      account: "자산:유동자산:당좌자산:현금및현금성자산:현금",
      amount: 20000,
      commodity: "KRW",
    },
  ],
  tags: ["매출", "굿즈", "부가세"],
};

export const emailServiceFeeTransaction = {
  date: "2026-01-05",
  description: "이메일 서비스 1년 이용료",
  postings: [
    {
      account: "사업비용:일반관리비용:기타비용:지급수수료",
      amount: 34250,
      commodity: "KRW",
    },
    {
      account: "부채:유동부채:미지급금",
      amount: -34250,
      commodity: "KRW",
    },
  ],
  tags: ["비용", "이메일서비스", "미지급금"],
};

export const cloudflareDomainFeeTransaction = {
  date: "2026-01-03",
  description: "클라우드플레어 | 도메인 이전 및 연장비용",
  postings: [
    {
      account: "자산:유동자산:당좌자산:현금및현금성자산:보통예금",
      amount: -13294,
      commodity: "KRW",
    },
    {
      account: "사업비용:일반관리비용:기타비용:지급수수료",
      amount: 13294,
      commodity: "KRW",
    },
  ],
  tags: ["비용", "클라우드플레어", "도메인"],
};

export const TestSimpleTransactionList = [
  goodsSalesTransaction,
  emailServiceFeeTransaction,
  cloudflareDomainFeeTransaction,
];
