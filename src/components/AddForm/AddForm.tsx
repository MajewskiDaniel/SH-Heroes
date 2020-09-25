import React, { useState, useEffect } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import { DatePicker, FormItem, Input, Select, SubmitButton } from "formik-antd";
import { notification } from "antd";
import * as yup from "yup";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { FormikState } from "formik/dist/types";

import { Tags } from "../Tags/Tags";
import { PhotoPicker } from "../PhotoPicker/PhotoPicker";
import { EmployeeFetch } from "../../services/EmployeeFetch";
import {
  EmployeePosition,
  employeePositionMap,
  IEmployee,
  SeniorityLevel,
  seniorityMap,
} from "../../models/employee";

import styles from "./AddForm.module.scss";

const AddSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  startingYear: yup.string().required("Required"),
  lastEvaluationDate: yup.string().required("Required"),
  tags: yup.array(),
  level: yup.mixed().required("Required"),
  position: yup.mixed().required("Required"),
  photo: yup.string().required("Required"),
});

const INITIAL_VALUES: FormIEmployee | IEmployee = {
  firstName: "",
  lastName: "",
  startingYear: "",
  lastEvaluationDate: "",
  projectName: "",
  tags: [],
  level: "",
  position: "",
  photo: "",
};

interface FormIEmployee extends Omit<IEmployee, "level" | "position"> {
  level: SeniorityLevel | "";
  position: EmployeePosition | "";
}

export interface IAddForm {
  id: string;
}

export const AddForm: React.FC<IAddForm> = ({ id }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [initialValuesWithId, setInitialValuesWithId] = useState<
    FormIEmployee | IEmployee
  >(INITIAL_VALUES);
  const history = useHistory();

  const fetchUser = async (id: string) => {
    try {
      const data = await EmployeeFetch.getEmployee(id);
      setInitialValuesWithId(data);
    } catch (e) {}
  };

  useEffect(() => {
    id && fetchUser(id);
  }, []);

  const disabledStartDate = (current: moment.Moment) => {
    return current && current > moment().endOf("day");
  };

  const disabledEvaluationDate = (current: moment.Moment) => {
    return current && current > moment().startOf("day");
  };

  const handleSubmit = async (
    values: FormIEmployee | IEmployee,
    handlers: {
      setSubmitting: (isSubmitting: boolean) => void;
      setStatus: (status?: any) => void;
      resetForm: (
        nextState?: Partial<FormikState<FormIEmployee | IEmployee>>
      ) => void;
      setErrors: (fields: { [field: string]: string }) => void;
    }
  ) => {
    try {
      if (!isIEmployee(values)) throw new Error("Wrong data type");
      id
        ? await EmployeeFetch.editEmployee(values, id)
        : await EmployeeFetch.addEmployee(values);
      notification["success"]({
        message: "Success",
        description: id ? "Edited employee" : "Added employee",
      });
      id && (await fetchUser(id));
      id
        ? handlers.resetForm({ values: initialValuesWithId })
        : handlers.resetForm({ values: INITIAL_VALUES });
      handlers.setStatus({ success: true });
      history.push("/employee-list");
    } catch (e) {
      notification["error"]({
        message: "Error",
        description: id ? "Employee not edited" : "Employee not added",
      });
      handlers.setStatus({ success: false });
      handlers.setSubmitting(false);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={id ? initialValuesWithId : INITIAL_VALUES}
      validationSchema={AddSchema}
      validateOnChange={submitted}
      validateOnBlur={submitted}
      onSubmit={handleSubmit}
    >
      <Form className={styles.Form}>
        <FormItem name="firstName">
          <label htmlFor="firstName" className={styles.Label}>
            Name
          </label>
          <Input id="firstName" name="firstName" placeholder="name" />
        </FormItem>

        <FormItem name="lastName">
          <label htmlFor="lastName" className={styles.Label}>
            Surname
          </label>
          <Input id="lastName" name="lastName" placeholder="surname" />
        </FormItem>

        <FormItem name="startingYear">
          <label htmlFor="startingYear" className={styles.Label}>
            Starting year
          </label>
          <DatePicker
            name="startingYear"
            id="startingYear"
            picker="year"
            disabledDate={disabledStartDate}
          />
        </FormItem>

        <FormItem name="lastEvaluationDate">
          <label htmlFor="lastEvaluationDate" className={styles.Label}>
            Evaluation date
          </label>
          <DatePicker
            name="lastEvaluationDate"
            id="lastEvaluationDate"
            disabledDate={disabledEvaluationDate}
          />
        </FormItem>

        <FormItem name="projectName">
          <label htmlFor="projectName" className={styles.Label}>
            Project name
          </label>
          <Input
            id="projectName"
            name="projectName"
            placeholder="Project name"
          />
        </FormItem>

        <FormItem name="tags">
          <label htmlFor="tags" className={styles.Label}>
            Tags
          </label>
          <Field name="tags">
            {({ field }: FieldProps<string[]>) => <Tags {...field} />}
          </Field>
        </FormItem>

        <FormItem name="level">
          <label htmlFor="level" className={styles.Label}>
            Level
          </label>
          <Select name="level">
            {Array.from(seniorityMap.keys()).map((key) => (
              <Select.Option key={key} value={key}>
                {seniorityMap.get(key)}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <FormItem name="position">
          <label htmlFor="position" className={styles.Label}>
            Position
          </label>
          <Select name="position">
            {Array.from(employeePositionMap.keys()).map((key) => (
              <Select.Option key={key} value={key}>
                {employeePositionMap.get(key)}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <FormItem name="photo">
          <label htmlFor="photo" className={styles.Label}>
            Photo
          </label>
          <Field name="photo">
            {({ field }: FieldProps<string>) => <PhotoPicker {...field} />}
          </Field>
        </FormItem>
        <SubmitButton onClick={() => !submitted && setSubmitted(true)}>
          Submit
        </SubmitButton>
      </Form>
    </Formik>
  );
};

function isIEmployee(object: any): object is IEmployee {
  return (
    Object.values(SeniorityLevel).includes(object.level) &&
    Object.values(EmployeePosition).includes(object.position)
  );
}
