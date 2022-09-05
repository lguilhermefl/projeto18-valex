import * as cardRepository from "../repositories/cardRepository";
import * as cardCreation from "../services/shared/cardCreation";
import * as validateCard from "./shared/validateCard";
import getCardById from "./shared/getCardById";

export default async function createVirtualCard(
  originalCardId: number,
  originalCardPassword: string
) {
  const originalCard: any = await getCardById(originalCardId);

  validateCard.isCardRegistered(originalCard);
  validateCard.isNotVirtual(originalCard.isVirtual);
  validateCard.isPasswordCorrect(originalCardPassword, originalCard.password);

  const number: string = cardCreation.generateCardNumber();
  const securityCode: string = cardCreation.generateEncryptedSecurityCode();
  const expirationDate: string = cardCreation.generateExpirationDate();
  const isVirtual: boolean = true;
  const isBlocked: boolean = false;

  const { employeeId, cardholderName, password, type } = originalCard;

  const cardData: {
    employeeId: number;
    number: string;
    cardholderName: string;
    securityCode: string;
    expirationDate: string;
    password: string;
    originalCardId: number;
    isVirtual: boolean;
    isBlocked: boolean;
    type: cardRepository.TransactionTypes;
  } = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type,
  };

  await cardRepository.insert(cardData);
}
