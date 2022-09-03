import { findById } from "../../repositories/cardRepository";

export default async function getCardById(id: number): Promise<any> {
  return await findById(id);
}
