import * as companyRepository from "../../repositories/companyRepository";

export async function getCompanyByApiKey(apiKey: string): Promise<any> {
  return await companyRepository.findByApiKey(apiKey);
}

export function validateCompany(company: any): any {
  if (!company) throw { code: "Not Found", message: "Company not found" };
}
