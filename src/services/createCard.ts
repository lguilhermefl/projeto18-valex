import * as validateCompany from "./shared/validateCompany";
import * as validateEmployee from "./shared/validateEmployee";
import * as cardRepository from "../repositories/cardRepository";
import * as cardCreation from "../services/shared/cardCreation";

export default async function createCard(
  apiKey: string,
  employeeId: number,
  type: cardRepository.TransactionTypes
): Promise<any> {
  const company: any = await validateCompany.getCompanyByApiKey(apiKey);
  const employee: any = await validateEmployee.getEmployeeById(employeeId);
  const hasCardType: any = await getCardByTypeAndEmployeeId(type, employeeId);

  validateCompany.validateCompany(company);
  validateEmployee.validateEmployee(employee, company);
  validateCardType(hasCardType, type);

  const number: string = cardCreation.generateCardNumber();
  const cardholderName: string = cardCreation.generateCardHolderName(
    employee.fullName
  );
  const securityCode: string = cardCreation.generateEncryptedSecurityCode();
  const expirationDate: string = cardCreation.generateExpirationDate();
  const isVirtual: boolean = false;
  const isBlocked: boolean = true;

  const cardData: {
    employeeId: number;
    number: string;
    cardholderName: string;
    securityCode: string;
    expirationDate: string;
    isVirtual: boolean;
    isBlocked: boolean;
    type: cardRepository.TransactionTypes;
  } = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    isVirtual,
    isBlocked,
    type,
  };

  await cardRepository.insert(cardData);
}

async function getCardByTypeAndEmployeeId(
  type: cardRepository.TransactionTypes,
  employeeId: number
): Promise<any> {
  return await cardRepository.findByTypeAndEmployeeId(type, employeeId);
}

function validateCardType(
  hasCardType: any,
  type: cardRepository.TransactionTypes
): any {
  if (hasCardType) {
    throw {
      code: "Conflict",
      message: `Employee already has a card with type ${type}`,
    };
  }
}
