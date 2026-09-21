export class EmployeeService {
  calcularSalario(base: number, anios: number): number {
    const bonoPorAnio = base * 0.02;
    return base + bonoPorAnio * anios;
  }
}
