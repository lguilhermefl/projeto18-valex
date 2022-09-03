import * as cardRepository from "../repositories/cardRepository";
import bcrypt from "bcrypt";

import * as validateCard from "./shared/validateCard";
import getCardById from "./shared/getCardById";

export default async function activateCard(
  id: number,
  securityCode: string,
  password: string
): Promise<any> {
  const card: any = await getCardById(id);

  validateCard.isCardRegistered(card);
  validateCard.isCardActive(card);
  validateCard.isCardExpired(card.expirationDate);
  validateCard.isSecurityCodeValid(securityCode, card.securityCode);

  const passwordHash: string = encryptPassword(password);

  const cardData: { isBlocked: boolean; password: string } = {
    isBlocked: false,
    password: passwordHash,
  };

  await cardRepository.update(id, cardData);
}

function encryptPassword(password: string): string {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}
