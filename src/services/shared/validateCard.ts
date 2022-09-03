import dayjs from "dayjs";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "secret");

export function isCardRegistered(card: any): any {
  if (!card) throw { code: "Not Found", message: "Card not found" };
}

export function isCardActive(card: any): any {
  if (card.password)
    throw { code: "Bad Request", message: "Card is already active" };
}

export function isSecurityCodeValid(
  securityCode: string,
  cardSecurityCode: string
): any {
  const decryptedCardSecurityCode: string = cryptr.decrypt(cardSecurityCode);

  if (securityCode !== decryptedCardSecurityCode)
    throw { code: "Bad Request", message: "Security code is incorrect" };
}

export function isCardExpired(expirationDate: string): any {
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
