import type { SimpleTransaction, ValidTransaction } from './type'

export function parseTransaction(transaction: SimpleTransaction): ValidTransaction {
    return transaction as ValidTransaction
}