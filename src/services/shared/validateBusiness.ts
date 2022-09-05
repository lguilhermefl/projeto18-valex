import * as businessRepository from "../../repositories/businessRepository";
import { TransactionTypes } from "../../repositories/cardRepository";

export async function getBusinessById(id: number): Promise<any> {
  return await businessRepository.findById(id);
}

export function validateBusiness(business: any): any {
  if (!business) throw { code: "Not Found", message: "Business not found" };
}

export function validateBusinessType(
  businessType: TransactionTypes,
  cardType: TransactionTypes
): any {
  if (businessType !== cardType)
    throw {
      code: "Bad Request",
      message: `Card type(${cardType}) is different from business type(${businessType})`,
    };
}
