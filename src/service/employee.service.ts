import { EmployeeRepository } from "../repository/employee.repository.ts";

export class EmployeeService {
  private repo = new EmployeeRepository();
  calcularSalario(base: number, anios: number): number {
    const bonoPorAnio = base * 0.02;
    return base + bonoPorAnio * anios;
  }
  async createEmployee(data: any) {
    data.finalSalary = this.calcularSalario(
      data.baseSalary,
      data.yearsOfService,
    );
    return await this.repo.create(data);
  }
  async findAll() {
    return await this.repo.findAll();
  }
  async findOne(id: string) {
    return await this.repo.findById(id);
  }
  async updateEmployee(id: string, data: any) {
    data.finalSalary = this.calcularSalario(
      data.baseSalary,
      data.yearsOfService,
    );
    return await this.repo.update(id, data);
  }
  async deleteEmployee(id: string) {
    return await this.repo.delete(id);
  }
}
