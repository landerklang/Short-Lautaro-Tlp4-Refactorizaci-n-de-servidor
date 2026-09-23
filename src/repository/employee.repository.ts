import Employee from "../models/model.ts";

// las interface se nombrar en Pascalcase
interface EmployeeData{
  name:string;
  position:string;
  baseSalary: number;
  yearsOfService:number;
  finalSalary: number;  
}

export class EmployeeRepository {
  async create(data: EmployeeData) {
    return await Employee.create(data);
  }

  async findAll() {
    return await Employee.find();
  }

  async findById(id: string) {
    return await Employee.findById(id);
  }

  async update(id: string, data: EmployeeData) {
    return await Employee.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await Employee.findByIdAndDelete(id);
  }
}
