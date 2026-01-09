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

type Brand<K, T> = K & { __brand: T }

export type ValidTransaction = Brand<SimpleTransaction, "ValidTransaction">
