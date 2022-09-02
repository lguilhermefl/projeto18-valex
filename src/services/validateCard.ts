export default function validateCard(card: any): any {
  if (!card) throw { code: "Not Found", message: "Card not found" };
  if (!card.isBlocked)
    throw { code: "Bad Request", message: "Card is already active" };
}
