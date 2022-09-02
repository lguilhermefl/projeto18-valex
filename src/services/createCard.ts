import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as cardRepository from "../repositories/cardRepository";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "secret");

export default async function createCard(
  apiKey: string,
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  const company: any = await getCompanyByApiKey(apiKey);
  const employee: any = await getEmployeeById(employeeId);
  const hasCardType: any = await getCardByTypeAndIdEmployeeId(type, employeeId);

  validateCompany(company);
  validateEmployee(employee, company);
  validateCardType(hasCardType, type);

  const number: string = generateCardNumber();
  const cardholderName: string = generateCardHolderName(employee.fullName);
  const securityCode: string = generateEncryptedSecurityCode();
  const expirationDate: string = generateExpirationDate();
  const isVirtual = false;
  const isBlocked = true;

  const cardData = {
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

async function getCompanyByApiKey(apiKey: string) {
  return await companyRepository.findByApiKey(apiKey);
}

async function getEmployeeById(employeeId: number) {
  return await employeeRepository.findById(employeeId);
}

async function getCardByTypeAndIdEmployeeId(
  type: cardRepository.TransactionTypes,
  employeeId: number
) {
  return await cardRepository.findByTypeAndEmployeeId(type, employeeId);
}

const generateCardNumber = () =>
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

const generateExpirationDate = () =>
  dayjs(Date.now()).add(5, "year").format("MM/YY");

const generateEncryptedSecurityCode = () =>
  cryptr.encrypt(faker.finance.creditCardCVV());

function validateCompany(company: any) {
  if (!company) throw { code: "Not Found", message: "Company not found" };
}

function validateEmployee(employee: any, company: any) {
  if (!employee || employee.companyId !== company.id)
    throw { code: "Not Found", message: "Employee not found" };
}

function validateCardType(
  hasCardType: any,
  type: cardRepository.TransactionTypes
) {
  if (hasCardType) {
    throw {
      code: "Conflict",
      message: `Employee already has a card with type ${type}`,
    };
  }
}
