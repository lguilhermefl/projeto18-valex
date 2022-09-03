export function validateCardExistence(card: any): any {
  if (!card) throw { code: "Not Found", message: "Card not found" };
}

export function isCardActive(card: any): any {
  if (card.password)
    throw { code: "Bad Request", message: "Card is already active" };
}
