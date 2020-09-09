import React, {useState} from 'react';
import {Form, Formik, FormikHelpers} from 'formik';
import {DatePicker, FormItem, Input, Select, SubmitButton} from 'formik-antd';
import * as yup from 'yup';
import moment from 'moment';

import {Tags} from '../Tags/Tags';
import {PhotoPicker} from "../PhotoPicker/PhotoPicker";
import {EmployeePosition, IEmployee, SeniorityLevel} from "../../models/employee";
import styles from './AddForm.module.scss';

const AddSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  startingYear: yup.string().required('Required'),
  lastEvaluationDate: yup.string().required('Required'),
  tags: yup.array(),
  level: yup.mixed().oneOf(["junior", "mid","senior"]).required(),
  position: yup.mixed().oneOf(["software developer", "project manager", "tester","graphic designer",]).required(),
  photo: yup.string().required()
});

export const AddForm: React.FC = () => {
  const initialValues: IEmployee = {
    firstName: "",
    lastName: "",
    startingYear: "",
    lastEvaluationDate: "",
    projectName: "",
    tags: [],
    level: SeniorityLevel.SENIOR,
    position: EmployeePosition.SOFTWARE_DEV,
    photo: ""
  };

  const [formValues, setFormValues] = useState<IEmployee>(initialValues);
  const [tagsValues, setTagsValues] = useState<string[]>([]);
  const [photoString, setPhotoString] = useState<string>('');

  const addTags = (newTags: string[]) => {
    setTagsValues(newTags);
  };

  const disabledStartDate = (current: any) => {
    return current && current > moment().endOf("day");
  };

  const disabledEvaluationDate = (current: any) => {
    return current && current > moment().startOf("day");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddSchema}
      // validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(
        values: IEmployee,
        { setSubmitting }: FormikHelpers<IEmployee>
      ) => {
        // const newValues = {...values, tags: tagsValues};
        setFormValues(values);
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
      render={(props)=>{
        console.log(props);
        props.submitCount > 0 &&  (props.validateOnBlur = true);
        // props.submitCount > 0 &&  (props.validateOnChange = true);

        return (
        <Form className={styles.Form}>
          <label htmlFor="firstName" className={styles.Label}>Name</label>
          <FormItem name="firstName" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input id="firstName" name='firstName' placeholder='name' />
          </FormItem>

          <label htmlFor="lastName" className={styles.Label}>Surname</label>
          <FormItem name="lastName" >
            <Input id="lastName" name='lastName' placeholder='surname' />
          </FormItem>

          <label htmlFor="startingYear" className={styles.Label}>Starting year</label>
          <FormItem name="startingYear" >
            <DatePicker name="startingYear" id="startingYear" picker="year" disabledDate={disabledStartDate} />
          </FormItem>

          <label htmlFor="lastEvaluationDate" className={styles.Label}>Evaluation date</label>
          <FormItem name="lastEvaluationDate">
            <DatePicker name="lastEvaluationDate" id="lastEvaluationDate" disabledDate={disabledEvaluationDate} />
          </FormItem>

          <label htmlFor="projectName" className={styles.Label}>Project name</label>
          <FormItem name="projectName">
            <Input id="projectName" name='projectName' placeholder='Project name' />
          </FormItem>

          <FormItem name="tags">
            <Tags propsSetTags={(tags)=> {
              props.values.tags = [...tags];
              addTags(tags);
            }}></Tags>
          </FormItem>

          <label htmlFor="level" className={styles.Label}>Level</label>
          <FormItem name="level">
                <Select name="level">
                  <option value={SeniorityLevel.JUNIOR}>Junior</option>
                  <option value={SeniorityLevel.MID}>Mid</option>
                  <option value={SeniorityLevel.SENIOR}>Senior</option>
                </Select>
          </FormItem>

          <FormItem name="position">
                <label htmlFor="position" className={styles.Label}>Position</label>
                <Select  name="position" >
                  <option value={EmployeePosition.SOFTWARE_DEV}>Software developer</option>
                  <option value={EmployeePosition.GRAPHIC_DESIGNER}>Graphic designer</option>
                  <option value={EmployeePosition.PROJECT_MANAGER}>Project manager</option>
                  <option value={EmployeePosition.TESTER}>Tester</option>
                </Select>
          </FormItem>

                <label htmlFor="photo" className={styles.Label}>Photo</label>
          <FormItem name="photo">
            <PhotoPicker onLoad={(url)=>props.values.photo = url} ></PhotoPicker>
          </FormItem>
          <SubmitButton>Submit</SubmitButton >
        </Form>
        )
      }}
    >
    </Formik>

  )
};
