import React, { useState } from "react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { DatePicker, FormItem, Input, Select, SubmitButton } from "formik-antd";
import * as yup from "yup";
import moment from "moment";

import { Tags } from "../Tags/Tags";
import { PhotoPicker } from "../PhotoPicker/PhotoPicker";
import { EmployeesSvc } from "../../services/EmployeesSvc";
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
  level: yup.mixed().required(),
  position: yup.mixed().required(),
  photo: yup.string().required(),
});

export const AddForm: React.FC = () => {
  const initialValues: IEmployee = {
    firstName: "",
    lastName: "",
    startingYear: "",
    lastEvaluationDate: "",
    projectName: "",
    tags: [],
    level: SeniorityLevel.JUNIOR,
    position: EmployeePosition.SOFTWARE_DEV,
    photo: "",
  };

  const [formValues, setFormValues] = useState<IEmployee>(initialValues);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const disabledStartDate = (current: any) => {
    return current && current > moment().endOf("day");
  };

  const disabledEvaluationDate = (current: any) => {
    return current && current > moment().startOf("day");
  };
  console.log(EmployeesSvc.getEmployee());

  const setFlag = (count: number) => {
    if (submitted) return;
    if (count > 0) {
      setSubmitted(true);
      console.log("SET STATE");
    }
  };

  const handleSubmit = async (employee: IEmployee) => {
    // console.log(EmployeesSvc.url)
    // setSubmitted(true)
    // console.log('submit', submitted)

    try {
      const data = await EmployeesSvc.addEmployee(employee);
      console.log("add form ", data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddSchema}
      validateOnChange={submitted}
      validateOnBlur={submitted}
      onSubmit={(
        values: IEmployee,
        { setSubmitting }: FormikHelpers<IEmployee>
      ) => {
        console.log("submitting");
        setFormValues(values);
        setSubmitting(false);
        handleSubmit(values);
      }}
    >
      {(props) => {
        // !submitted && setFlag(props.submitCount);
        console.log(props);

        return (
          <Form className={styles.Form}>
            <label htmlFor="firstName" className={styles.Label}>
              Name
            </label>
            <FormItem
              name="firstName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input id="firstName" name="firstName" placeholder="name" />
            </FormItem>

            <label htmlFor="lastName" className={styles.Label}>
              Surname
            </label>
            <FormItem name="lastName">
              <Input id="lastName" name="lastName" placeholder="surname" />
            </FormItem>

            <label htmlFor="startingYear" className={styles.Label}>
              Starting year
            </label>
            <FormItem name="startingYear">
              <DatePicker
                name="startingYear"
                id="startingYear"
                picker="year"
                disabledDate={disabledStartDate}
              />
            </FormItem>

            <label htmlFor="lastEvaluationDate" className={styles.Label}>
              Evaluation date
            </label>
            <FormItem name="lastEvaluationDate">
              <DatePicker
                name="lastEvaluationDate"
                id="lastEvaluationDate"
                disabledDate={disabledEvaluationDate}
              />
            </FormItem>

            <label htmlFor="projectName" className={styles.Label}>
              Project name
            </label>
            <FormItem name="projectName">
              <Input
                id="projectName"
                name="projectName"
                placeholder="Project name"
              />
            </FormItem>

            <FormItem name="tags">
              <Field name="tags">
                {({ field }: FieldProps<string[]>) => <Tags {...field} />}
              </Field>
            </FormItem>

            <label htmlFor="level" className={styles.Label}>
              Level
            </label>
            <FormItem name="level">
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

            <label htmlFor="photo" className={styles.Label}>
              Photo
            </label>
            <FormItem name="photo">
              <Field name="photo">
                {({ field }: FieldProps<string>) => <PhotoPicker {...field} />}
              </Field>
            </FormItem>
            <SubmitButton onClick={() => setSubmitted(true)}>
              Submit
            </SubmitButton>
          </Form>
        );
      }}
    </Formik>
  );
};
