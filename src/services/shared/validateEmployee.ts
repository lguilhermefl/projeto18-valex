import * as employeeRepository from "../../repositories/employeeRepository";

export async function getEmployeeById(employeeId: number): Promise<any> {
  return await employeeRepository.findById(employeeId);
}

export function validateEmployee(employee: any, company: any): any {
  if (!employee || employee.companyId !== company.id)
    throw {
      code: "Not Found",
      message: `Employee not found in ${company.name}`,
    };
}
