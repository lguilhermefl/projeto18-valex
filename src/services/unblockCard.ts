import * as cardRepository from "../repositories/cardRepository";
import * as validateCard from "./shared/validateCard";
import getCardById from "./shared/getCardById";

export default async function unblockCard(id: number, password: string) {
  const card: any = await getCardById(id);

  validateCard.isCardRegistered(card);
  validateCard.isCardExpired(card.expirationDate);
  validateCard.isCardUnblocked(card);
  validateCard.isPasswordCorrect(password, card.password);

  const cardData = {
    isBlocked: false,
  };

  await cardRepository.update(id, cardData);
}
