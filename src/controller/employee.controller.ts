import { Request, Response } from "express";
import Employee from "../models/model";

class EmployeeControllers {
  createEmployee = async (req: Request, res: Response) => {
    try {
      const newEmployee = new Employee(req.body);
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
  deleteEmployee(req: Request, res: Response) {}
}

export default EmployeeControllers;
