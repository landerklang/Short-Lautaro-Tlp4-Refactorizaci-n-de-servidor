import { Router } from "express";
import EmployeeControllers from "../controller/employee.controller.ts";

class EmployeeRoutes {
  public router: Router;
  constructor(
    readonly employeeCtrl: EmployeeControllers = new EmployeeControllers(),
  ) {
    this.employeeCtrl = employeeCtrl;
    this.router = Router();
    this.post();
  this.get();
  this.getOne();
  this.updateOne();
  this.delete();
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
    this.router.put("/employees/:id", this.employeeCtrl.updateEmployee);
  }
  delete() {
    this.router.delete("/employees/:id", this.employeeCtrl.deleteEmployee);
  }
}

export default EmployeeRoutes;
