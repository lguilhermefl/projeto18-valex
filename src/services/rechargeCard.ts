import * as validateCompany from "./shared/validateCompany";
import * as validateEmployee from "./shared/validateEmployee";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as validateCard from "./shared/validateCard";
import getCardById from "./shared/getCardById";

export default async function rechargeCard(
  apiKey: string,
  cardId: number,
  amount: number
) {
  const card: any = await getCardById(cardId);
  const company: any = await validateCompany.getCompanyByApiKey(apiKey);

  validateCompany.validateCompany(company);
  validateCard.isCardRegistered(card);
  validateCard.isNotVirtual(card.isVirtual);

  const employee: any = await validateEmployee.getEmployeeById(card.employeeId);

  validateEmployee.validateEmployee(employee, company);
  validateCard.isCardInactive(card);
  validateCard.isCardExpired(card.expirationDate);

  const rechargeData: { cardId: number; amount: number } = {
    cardId,
    amount,
  };

  await rechargeRepository.insert(rechargeData);
}
