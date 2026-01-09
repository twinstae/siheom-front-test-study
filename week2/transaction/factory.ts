import invariant from '../invariant'
import type { SimpleTransaction, ValidTransaction } from './type'

const DATE_REGEX = /^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/i

export function parseTransaction(transaction: SimpleTransaction): ValidTransaction {
    invariant(DATE_REGEX.test(transaction.date), "[INVALID_DATE] " + transaction.date);
    invariant(transaction.description.length < 1028, "[MAX_LENGTH] " + transaction.description);
    invariant(DATE_REGEX.test(transaction.date), "[INVALID_DATE] " + transaction.date);
    invariant(DATE_REGEX.test(transaction.date), "[INVALID_DATE] " + transaction.date);


    return transaction as ValidTransaction
}