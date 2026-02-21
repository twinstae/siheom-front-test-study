import { TestSimpleTransactionList } from '@/week2/transaction/fixtures';
import { parseTransaction } from '@/week2/transaction/parser';
import type { ValidTransaction } from '@/week2/transaction/type';

const fakeTransactionsClient = {
    _state: TestSimpleTransactionList.map(parseTransaction),
    list: async () => {
        return [...fakeTransactionsClient._state];
    },
    create: async (transaction: ValidTransaction) => {
        fakeTransactionsClient._state = [...fakeTransactionsClient._state, transaction];
    }
}

export const client = {
    transactions: fakeTransactionsClient,
};