import * as validateCompany from "./shared/validateCompany";
import * as validateEmployee from "./shared/validateEmployee";
import * as cardRepository from "../repositories/cardRepository";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "secret");

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

  const number: string = generateCardNumber();
  const cardholderName: string = generateCardHolderName(employee.fullName);
  const securityCode: string = generateEncryptedSecurityCode();
  const expirationDate: string = generateExpirationDate();
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

// async function getCompanyByApiKey(apiKey: string): Promise<any> {
//   return await companyRepository.findByApiKey(apiKey);
// }

// async function getEmployeeById(employeeId: number): Promise<any> {
//   return await employeeRepository.findById(employeeId);
// }

async function getCardByTypeAndEmployeeId(
  type: cardRepository.TransactionTypes,
  employeeId: number
): Promise<any> {
  return await cardRepository.findByTypeAndEmployeeId(type, employeeId);
}

const generateCardNumber = (): string =>
  faker.finance.creditCardNumber("####-####-####-####");

function generateCardHolderName(employeeFullName: string): string {
  const nameArray: string[] = employeeFullName.split(" ");
  const cardHolderName: string[] = [];

  nameArray.forEach((str, index) => {
    if (index === 0 || index === nameArray.length - 1) {
      cardHolderName.push(str);
    } else {
      if (str.length >= 3) {
        cardHolderName.push(str[0]);
      }
    }
  });

  return cardHolderName.join(" ").toUpperCase();
}

const generateExpirationDate = (): string =>
  dayjs(Date.now()).add(5, "year").format("MM/YY");

const generateEncryptedSecurityCode = (): string =>
  cryptr.encrypt(faker.finance.creditCardCVV());

// function validateCompany(company: any): any {
//   if (!company) throw { code: "Not Found", message: "Company not found" };
// }

// function validateEmployee(employee: any, company: any): any {
//   if (!employee || employee.companyId !== company.id)
//     throw { code: "Not Found", message: "Employee not found" };
// }

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
