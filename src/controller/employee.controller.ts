import { NextFunction, Request, Response } from "express";
import Employee from "../models/model.js";
import { EmployeeService } from "../service/employee.service";

class EmployeeControllers {
  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { baseSalary, yearsOfService } = req.body;
      const calculo = new EmployeeService();
      const salariofinal = calculo.calcularSalario(baseSalary, yearsOfService);
      const newEmployee = new Employee(req.body);
      newEmployee.finalSalary = salariofinal;
      await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      next(error);
    }
  };
  findEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await Employee.find();
      res.json(employee);
    } catch (error) {
      next(error);
    }
  };
  findOneEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id);
      if (!employee) {
        const error: any = new Error("No se encontró al empleado");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(employee);
    } catch (error) {
      next(error);
    }
  };
  updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { baseSalary, yearsOfService } = req.body;

      const calculo = new EmployeeService();
      const salariofinal = calculo.calcularSalario(baseSalary, yearsOfService);
      const employee = await Employee.findByIdAndUpdate(
        id,
        { ...req.body, finalSalary: salariofinal },
        { new: true },
      );
      if (!employee) {
        const error: any = new Error("No se encontró al empleado");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Se actualizo al empleado", employee });
    } catch (error) {
      next(error);
    }
  };
  deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        const error: any = new Error("No se encontró al empleado");
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({ message: "Se elimino al empleado" });
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeeControllers;
