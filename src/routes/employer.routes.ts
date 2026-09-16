import { Router } from "express";
import EmployeeControllers from "../controller/employee.controller.ts";

class EmployeeRoutes {
  router: Router;
  constructor(
    readonly employeeCtrl: EmployeeControllers = new EmployeeControllers(),
  ) {
    this.employeeCtrl = employeeCtrl;
    this.router = Router();
  }
  post() {
    this.router.post("/employees", this.employeeCtrl.createEmployee);
  }
  get() {
    this.router.get("/employees", this.employeeCtrl.findEmployee);
  }
  getOne() {
    this.router.get("/employees/:id", this.employeeCtrl.findOneEmployee);
  }
  updateOne() {
    this.router.post("/employees/:id", this.employeeCtrl.updateEmployee);
  }
  delete() {
    this.router.delete("/employees/:id", this.employeeCtrl.deleteEmployee);
  }
}

export default EmployeeRoutes;
