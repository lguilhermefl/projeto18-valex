import * as validateCard from "./shared/validateCard";
import * as validateBusiness from "./shared/validateBusiness";
import * as paymentRepository from "../repositories/paymentRepository";
import { findByCardDetails } from "../repositories/cardRepository";
import getCardBalanceAndTransactions from "./getCardBalanceAndTransactions";
import getCardById from "./shared/getCardById";

export default async function payment(paymentInfo: any) {
  if (paymentInfo.password) await posPayment(paymentInfo);
  else await onlinePayment(paymentInfo);
}

async function posPayment(paymentInfo: any) {
  const {
    cardId,
    businessId,
    amount,
  }: { cardId: number; businessId: number; amount: number } = paymentInfo;

  const card: any = await getCardById(cardId);

  validateCard.isCardRegistered(card);
  validateCard.isNotVirtual(card.isVirtual);
  validateCard.isCardInactive(card);
  validateCard.isCardExpired(card.expirationDate);
  validateCard.isCardBlocked(card);
  validateCard.isPasswordCorrect(paymentInfo.password, card.password);

  const business = await validateBusiness.getBusinessById(businessId);

  validateBusiness.validateBusiness(business);
  validateBusiness.validateBusinessType(business.type, card.type);

  const { balance }: { balance: number } = await getCardBalanceAndTransactions(
    cardId
  );

  validateCard.hasBalanceForPayment(balance, amount);

  const paymentData: { cardId: number; businessId: number; amount: number } = {
    cardId,
    businessId,
    amount,
  };

  await paymentRepository.insert(paymentData);
}

async function onlinePayment(paymentInfo: any) {
  const {
    number,
    cardholderName,
    expirationDate,
    securityCode,
    businessId,
    amount,
  }: {
    number: string;
    cardholderName: string;
    expirationDate: string;
    securityCode: string;
    businessId: number;
    amount: number;
  } = paymentInfo;

  const card: any = await findByCardDetails(
    number,
    cardholderName,
    expirationDate
  );

  validateCard.isCardRegistered(card);
  validateCard.isSecurityCodeCorrect(securityCode, card.securityCode);
  validateCard.isCardExpired(card.expirationDate);
  validateCard.isCardBlocked(card);

  const business = await validateBusiness.getBusinessById(businessId);

  validateBusiness.validateBusiness(business);
  validateBusiness.validateBusinessType(business.type, card.type);

  const cardId = getOriginalCardId(card);

  const { balance }: { balance: number } = await getCardBalanceAndTransactions(
    cardId
  );

  validateCard.hasBalanceForPayment(balance, amount);

  const paymentData: { cardId: number; businessId: number; amount: number } = {
    cardId,
    businessId,
    amount,
  };

  await paymentRepository.insert(paymentData);
}

function getOriginalCardId(card: any): number {
  if (card.isVirtual) return card.originalCardId;
  else return card.id;
}
