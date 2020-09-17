import { IEmployee, IEmployeeDB, employeeSchema, IEmployeeService} from "../models";
import mongoose, {Model} from "mongoose";

export class EmployeesService implements IEmployeeService {
  Employee: Model<IEmployeeDB>;

  constructor() {
    this.Employee = mongoose.model<IEmployeeDB>("Employee", employeeSchema);
  }

  async getEmployees(params: any) {
    return this.Employee.find(params);
  }

  async getEmployeeById(id: string) {
    return this.Employee.findById(id);
  }

  async addEmployee(employee: IEmployee) {
    const employeeModel = new this.Employee(employee);
    return employeeModel.save();
  }

  async editEmployee(id: string, employee: IEmployee) {
    return this.Employee.findByIdAndUpdate(id, employee, { new: true })
  }

  async deleteEmployee(id: string) {
    return this.Employee.findByIdAndDelete(id);
  }
}
