import Employee from "../models/model.ts";

export class EmployeeRepository {
  async create(data: any) {
    return await Employee.create(data);
  }

  async findAll() {
    return await Employee.find();
  }

  async findById(id: string) {
    return await Employee.findById(id);
  }

  async update(id: string, data: any) {
    return await Employee.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await Employee.findByIdAndDelete(id);
  }
}
