import * as cardRepository from "../repositories/cardRepository";
import * as validateCard from "./shared/validateCard";
import getCardById from "./shared/getCardById";

export default async function deleteVirtualCard(id: number, password: string) {
  const card: any = await getCardById(id);

  validateCard.isCardRegistered(card);
  validateCard.isVirtual(card.isVirtual);
  validateCard.isPasswordCorrect(password, card.password);

  await cardRepository.remove(id);
}
