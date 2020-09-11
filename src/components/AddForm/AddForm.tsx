import React, {useState, useEffect} from 'react';
import {Field, FieldProps, Form, Formik, FormikHelpers} from 'formik';
import {DatePicker, FormItem, Input, Select, SubmitButton} from 'formik-antd';
import { notification } from 'antd';
import * as yup from 'yup';
import moment from 'moment';

import {Tags} from '../Tags/Tags';
import {PhotoPicker} from "../PhotoPicker/PhotoPicker";
import {EmployeesSvc} from "../../services/EmployeesSvc";
import {EmployeePosition, employeePositionMap, IEmployee, SeniorityLevel, seniorityMap} from "../../models/employee";
import styles from './AddForm.module.scss';

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

export interface IAddForm {
  id: string
}

export const AddForm: React.FC<IAddForm> = ({id}) => {
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
  const [initialValuesWithId, setInitialValuesWithId] = useState(initialValues);

  useEffect(()=>{
    if (id) {
      (async () => {
        const data = await EmployeesSvc.getEmployee(id);
        console.log(data);
        setInitialValuesWithId(data);
      })()
    }
  },[])

  const disabledStartDate = (current: any) => {
    return current && current > moment().endOf("day");
  };

  const disabledEvaluationDate = (current: any) => {
    return current && current > moment().startOf("day");
  };

  const handleSubmit = async (employee: IEmployee) => {
    if (id) {
      try {
        console.log('edit')
        const data = await EmployeesSvc.editEmployee(employee, id);
        if (data) {
          notification.open({
            message: 'Edited employee'
          });
        }
      } catch (e) {
        console.log('error')
      }
    } else {
      try {
        console.log('add')
        const data = await EmployeesSvc.addEmployee(employee);
        console.log('add form ', data);
        notification.open({
          message: 'Added new employee'
        });
      } catch (e) {
        console.log('error')
      }
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={id ? initialValuesWithId : initialValues}
      validationSchema={AddSchema}
      validateOnChange={submitted}
      validateOnBlur={submitted}
      onSubmit={(
        values: IEmployee,
        { setSubmitting }: FormikHelpers<IEmployee>
      ) => {
        setFormValues(values);
        setSubmitting(false);
        handleSubmit(values);
      }}
    >
      {(props) => {
        // console.log(props);
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

            <label htmlFor="tags" className={styles.Label}>
              Tags
            </label>
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
            <SubmitButton onClick={()=> !submitted && setSubmitted(true)}>Submit</SubmitButton >
          </Form>
        );
      }}
    </Formik>
  );
};
