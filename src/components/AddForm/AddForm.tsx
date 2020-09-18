import React, {useState, useEffect} from 'react';
import {Field, FieldProps, Form, Formik, FormikHelpers, FormikProps} from 'formik';
import {DatePicker, FormItem, Input, Select, SubmitButton} from 'formik-antd';
import { notification } from 'antd';
import * as yup from 'yup';
import moment from 'moment';
import { useHistory } from "react-router-dom";

import {Tags} from '../Tags/Tags';
import {PhotoPicker} from "../PhotoPicker/PhotoPicker";
import {EmployeesSvc} from "../../services/EmployeesSvc";
import {EmployeePosition, employeePositionMap, IEmployee, SeniorityLevel, seniorityMap} from "../../models/employee";
import styles from './AddForm.module.scss';
import {FormikErrors, FormikState} from "formik/dist/types";

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

const INITIAL_VALUES: FormIEmployee = {
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

type OmitAB = Omit<IEmployee, "level"|"position">;

interface FormIEmployee extends OmitAB {
  level: SeniorityLevel | "",
  position: EmployeePosition | ""
}

export interface IAddForm {
  id: string
}

export const AddForm: React.FC<IAddForm> = ({id}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [initialValuesWithId, setInitialValuesWithId] = useState<FormIEmployee>(INITIAL_VALUES);
  const history = useHistory();

  const fetchUser = async (id: string) => {
    try {
      const data = await EmployeesSvc.getEmployee(id);
      setInitialValuesWithId(data);
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(()=>{
    if (id) {
      fetchUser(id)
    }
  },[])

  const disabledStartDate = (current: moment.Moment) => {
    return current && current > moment().endOf("day");
  };

  const disabledEvaluationDate = (current: moment.Moment) => {
    return current && current > moment().startOf("day");
  };

  const handleSubmit = async (values: FormIEmployee | IEmployee, handlers: {
    setSubmitting: (isSubmitting: boolean) => void,
    setStatus: (status?: any) => void,
    resetForm:  (nextState?: any) => void;
    // (nextState?: Partial<FormikState<Values>>) => void;
  })  => {
    if (isInstanceOfIEmployee(values)) {
      try {
        const data = id ? await EmployeesSvc.editEmployee(values as IEmployee, id)
          : await EmployeesSvc.addEmployee(values as IEmployee);
        notification['success']({
          message: 'Success',
          description:
            id ? 'Edited employee' : 'Added employee',
        });
        id && await fetchUser(id);
        id ? handlers.resetForm(initialValuesWithId) : handlers.resetForm(INITIAL_VALUES);
        handlers.setStatus({success: true});
        history.push("/employee-list");
      } catch (e) {
        console.log(e);
        notification['error']({
          message: 'Error',
          description:
            id ? 'Employee not edited' : 'Employee not added',
        });
        handlers.setStatus({success: false});
        handlers.setSubmitting(false);
      }
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
      {(props) => {
        // console.log(props);
        return (
          <Form className={styles.Form}>
            <FormItem name="firstName">
              <label htmlFor="firstName" className={styles.Label}>Name</label>
              <Input id="firstName" name="firstName" placeholder="name" />
            </FormItem>

            <FormItem name="lastName">
              <label htmlFor="lastName" className={styles.Label}>Surname</label>
              <Input id="lastName" name="lastName" placeholder="surname" />
            </FormItem>

            <FormItem name="startingYear">
              <label htmlFor="startingYear" className={styles.Label}>Starting year</label>
              <DatePicker
                name="startingYear"
                id="startingYear"
                picker="year"
                disabledDate={disabledStartDate} />
            </FormItem>

            <FormItem name="lastEvaluationDate">
              <label htmlFor="lastEvaluationDate" className={styles.Label}>Evaluation date</label>
              <DatePicker
                name="lastEvaluationDate"
                id="lastEvaluationDate"
                disabledDate={disabledEvaluationDate} />
            </FormItem>

            <FormItem name="projectName">
              <label htmlFor="projectName" className={styles.Label}>Project name</label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="Project name" />
            </FormItem>

            <FormItem name="tags">
              <label htmlFor="tags" className={styles.Label}>Tags</label>
              <Field name="tags">
                {({ field }: FieldProps<string[]>) => <Tags {...field} />}
              </Field>
            </FormItem>

            <FormItem name="level">
              <label htmlFor="level" className={styles.Label}>Level</label>
              <Select name="level">
                {Array.from(seniorityMap.keys()).map((key) => (
                  <Select.Option key={key} value={key}>
                    {seniorityMap.get(key)}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>

            <FormItem name="position">
              <label htmlFor="position" className={styles.Label}>Position</label>
              <Select name="position">
                {Array.from(employeePositionMap.keys()).map((key) => (
                  <Select.Option key={key} value={key}>
                    {employeePositionMap.get(key)}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>

            <FormItem name="photo">
              <label htmlFor="photo" className={styles.Label}>Photo</label>
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

function isInstanceOfIEmployee (object: any): object is IEmployee {
  return Object.values(SeniorityLevel).includes(object.level) && Object.values(EmployeePosition).includes(object.position);
}
