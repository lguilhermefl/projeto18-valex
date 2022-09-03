export function validateCardExistence(card: any): any {
  if (!card) throw { code: "Not Found", message: "Card not found" };
}

export function validateCardActivation(card: any): any {
  if (!card.isBlocked)
    throw { code: "Bad Request", message: "Card is already active" };
}
