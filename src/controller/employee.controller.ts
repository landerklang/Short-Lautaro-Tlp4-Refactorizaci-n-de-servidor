import { Request, Response } from "express";
import Employee from "../models/model.js";
import { EmployeeService } from "../service/employee.service";

class EmployeeControllers {
  createEmployee = async (req: Request, res: Response) => {
    try {
      const { baseSalary, yearsOfService } = req.body;
      const Calculo = new EmployeeService();
      const Salariofinal = Calculo.calcularSalario(baseSalary, yearsOfService);
      console.log(Salariofinal);
      const newEmployee = new Employee(req.body);
      newEmployee.finalSalary = Salariofinal;
      await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Error al crear empleado", error: error.message });
    }
  };
  findEmployee = async (req: Request, res: Response) => {
    try {
      const employee = await Employee.find();
      res.json(employee);
    } catch (error: any) {
      res.status(500).json({
        message: "Error al buscar a los empleados",
        error: error.message,
      });
    }
  };
  findOneEmployee = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "No se encontro al empleado" });
      }
      res.status(201).json(employee);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error del sistema", error: error.message });
    }
  };
  updateEmployee = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndUpdate(id);
      if (!employee) {
        return res.status(404).json({ message: "No se encontro al empleado" });
      }
      res.status(200).json({ message: "Se actualizo al empleado", employee });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error del sistema", error: error.message });
    }
  };
  deleteEmployee = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        return res.status(404).json({ message: "No se ecnotro el empleado" });
      }
      return res.status(200).json({ message: "Se elimino al empleado" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error en el sistema", error: error.message });
    }
  };
}

export default EmployeeControllers;
