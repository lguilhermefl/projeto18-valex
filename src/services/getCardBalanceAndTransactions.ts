import * as rechargeRepository from "../repositories/rechargeRepository";
import * as paymentRepository from "../repositories/paymentRepository";

import getCardById from "./shared/getCardById";
import { isCardRegistered } from "./shared/validateCard";

export default async function getCardBalanceAndTransactions(
  id: number
): Promise<any> {
  const card: any = getCardById(id);

  isCardRegistered(card);

  const recharges: any = await getTrasactionByCardId(
    id,
    rechargeRepository.findByCardId
  );
  const transactions: any = await getTrasactionByCardId(
    id,
    paymentRepository.findByCardId
  );
  const balance: number = getCardBalance(recharges, transactions);

  const balanceAndTransactions: {
    balance: number;
    transactions: any;
    recharges: any;
  } = {
    balance,
    transactions,
    recharges,
  };

  return balanceAndTransactions;
}

async function getTrasactionByCardId(
  id: number,
  repositoryFunction: Function
): Promise<any> {
  return await repositoryFunction(id);
}

function getTransactionsSum(transactions: any): number {
  return transactions.reduce(
    (sum: number, transaction: any) => sum + transaction.amount,
    0
  );
}

function getCardBalance(recharges: any, payments: any): number {
  const rechargesSum: number = getTransactionsSum(recharges);
  const paymentsSum: number = getTransactionsSum(payments);

  return rechargesSum - paymentsSum;
}
