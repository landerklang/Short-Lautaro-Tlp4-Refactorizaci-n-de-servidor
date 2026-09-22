import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../service/employee.service.ts";

class EmployeeControllers {
  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const servicio = new EmployeeService();
      const newEmployee = await servicio.createEmployee(req.body);
      res.status(201).json(newEmployee);
    } catch (error) {
      next(error);
    }
  };
  findAllEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const servicio = new EmployeeService();
      const employees = await servicio.findAll();
      res.json(employees);
    } catch (error) {
      next(error);
    }
  };
  findOneEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const servicio = new EmployeeService();
      const id = req.params.id as string;
      const employee = await servicio.findOne(id);
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
      const servicio = new EmployeeService();
      const id = req.params.id as string;
      const employee = await servicio.updateEmployee(id, req.body);
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
      const id = req.params.id as string;
      const servicio = new EmployeeService();
      const employee = await servicio.deleteEmployee(id);
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
