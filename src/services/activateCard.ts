import * as cardRepository from "../repositories/cardRepository";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

import { validateCardExistence, isCardActive } from "./shared/validateCard";
import getCardById from "./shared/getCardById";

import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "secret");

export default async function activateCard(
  id: number,
  securityCode: string,
  password: string
): Promise<any> {
  const card: any = await getCardById(id);

  validateCardExistence(card);
  isCardActive(card);
  validateExpirationDate(card.expirationDate);
  validateSecurityCode(securityCode, card.securityCode);

  const passwordHash: string = encryptPassword(password);

  const cardData: { isBlocked: boolean; password: string } = {
    isBlocked: false,
    password: passwordHash,
  };

  await cardRepository.update(id, cardData);
}

function validateExpirationDate(expirationDate: string): any {
  const today: string = getTodaysDateInFinancialFormat();
  const arrayToday: string[] = splitFinancialDateValues(today);
  const arrayExpirationDate: string[] =
    splitFinancialDateValues(expirationDate);

  const [todaysMonth, todaysYear]: string[] = arrayToday;
  const [expirationDateMonth, expirationDateYear]: string[] =
    arrayExpirationDate;

  const monthDifference: number = getDifferenceTwoDigitsDateString(
    todaysMonth,
    expirationDateMonth
  );
  const yearDifference: number = getDifferenceTwoDigitsDateString(
    todaysYear,
    expirationDateYear
  );

  if (monthDifference < 0 && yearDifference <= 0) {
    throw { code: "Bad Request", message: "Card is expired" };
  } else if (yearDifference < 0) {
    throw { code: "Bad Request", message: "Card is expired" };
  }
}

function getTodaysDateInFinancialFormat(): string {
  return dayjs(Date.now()).format("MM/YY");
}

function splitFinancialDateValues(date: string): string[] {
  return date.split("/");
}

function getDifferenceTwoDigitsDateString(
  today: string,
  futureDate: string
): number {
  return Number(futureDate) - Number(today);
}

function validateSecurityCode(
  securityCode: string,
  cardSecurityCode: string
): any {
  const decryptedCardSecurityCode: string = cryptr.decrypt(cardSecurityCode);

  if (securityCode !== decryptedCardSecurityCode)
    throw { code: "Bad Request", message: "Security code is incorrect" };
}

function encryptPassword(password: string): string {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}
