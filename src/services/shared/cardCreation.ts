import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "secret");

export const generateCardNumber = (): string =>
  faker.finance.creditCardNumber("mastercard");

export function generateCardHolderName(employeeFullName: string): string {
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

export const generateExpirationDate = (): string =>
  dayjs(Date.now()).add(5, "year").format("MM/YY");

export const generateEncryptedSecurityCode = (): string =>
  cryptr.encrypt(faker.finance.creditCardCVV());
