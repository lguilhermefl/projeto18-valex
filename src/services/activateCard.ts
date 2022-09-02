import * as cardRepository from "../repositories/cardRepository";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "secret");

export default async function activateCard(
  id: number,
  securityCode: string,
  password: string
) {
  const card: any = await getCardById(id);

  validateCard(card);
  validateExpirationDate(card.expirationDate);
  validateSecurityCode(securityCode, card.securityCode);

  const passwordHash = encryptPassword(password);

  const cardData = {
    isBlocked: false,
    password: passwordHash,
  };

  await cardRepository.update(id, cardData);
}

async function getCardById(id: number) {
  return await cardRepository.findById(id);
}

function validateCard(card: any) {
  if (!card) throw { code: "Not Found", message: "Card not found" };
  if (!card.isBlocked)
    throw { code: "Bad Request", message: "Card is already active" };
}

function validateExpirationDate(expirationDate: string) {
  const today = getTodaysDateInFinancialFormat();
  const arrayToday = splitDateValues(today);
  const arrayExpirationDate = splitDateValues(expirationDate);

  const todayObject = {
    month: arrayToday[0],
    year: arrayToday[1],
  };
  const expirationDateObject = {
    month: arrayExpirationDate[0],
    year: arrayExpirationDate[1],
  };

  const monthDifference = differenceTwoDigitsDateString(
    todayObject.month,
    expirationDateObject.month
  );
  const yearDifference = differenceTwoDigitsDateString(
    todayObject.year,
    expirationDateObject.year
  );

  if (monthDifference < 0 && yearDifference <= 0) {
    throw { code: "Bad Request", message: "Card is expired" };
  } else if (yearDifference < 0) {
    throw { code: "Bad Request", message: "Card is expired" };
  }
}

function getTodaysDateInFinancialFormat() {
  return dayjs(Date.now()).format("MM/YY");
}

function splitDateValues(date: string) {
  return date.split("/");
}

function differenceTwoDigitsDateString(today: string, futureDate: string) {
  return Number(futureDate) - Number(today);
}

function validateSecurityCode(securityCode: string, cardSecurityCode: string) {
  const decryptedCardSecurityCode = cryptr.decrypt(cardSecurityCode);
  console.log(decryptedCardSecurityCode);
  if (securityCode !== decryptedCardSecurityCode)
    throw { code: "Bad Request", message: "Security code is incorrect" };
}

function encryptPassword(password: string) {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}
