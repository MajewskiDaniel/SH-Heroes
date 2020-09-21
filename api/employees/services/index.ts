import { IEmployee, IEmployeeDB, employeeSchema } from "../models";
import mongoose  from "mongoose";
import {ParamsDictionary} from "express-serve-static-core";

export class EmployeesService  {
  static Employee = mongoose.model<IEmployeeDB>("Employee", employeeSchema);

  constructor() {
  }

  async getEmployees(params: ParamsDictionary) {
    return EmployeesService.Employee.find(params);
  }

  async getEmployeeById(id: string) {
    return EmployeesService.Employee.findById(id);
  }

  async addEmployee(employee: IEmployee) {
    if (! (await this.occurred(employee))) {
      const employeeModel = new EmployeesService.Employee(employee);
      return employeeModel.save();
    } else {
      throw new Error('occurred');
    }
  }

  async editEmployee(id: string, employee: IEmployee) {
    return EmployeesService.Employee.findByIdAndUpdate(id, employee, { new: true })
  }

  async deleteEmployee(id: string) {
    return EmployeesService.Employee.findByIdAndDelete(id);
  }

  async occurred(employee: IEmployee){
    const occurred = await EmployeesService.Employee.find({ firstName: employee.firstName, lastName: employee.lastName });
    return occurred.length > 0;
  }
}
