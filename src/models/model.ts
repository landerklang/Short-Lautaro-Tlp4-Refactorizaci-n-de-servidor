import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    yearsOfService: { type: Number, required: true },
    finalSalary: { type: Number },
  },
  { timestamps: true },
);

const Employee = model("Employee", employeeSchema);

export default Employee;
