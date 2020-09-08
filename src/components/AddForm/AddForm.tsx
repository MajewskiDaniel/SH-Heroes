import React, {useState} from 'react';
import {Form, Formik, FormikHelpers} from 'formik';
import {DatePicker, Input, Select, SubmitButton} from 'formik-antd';
import {Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import * as yup from 'yup';

import {Tags} from '../Tags/Tags';
import {EmployeePosition, IEmployee, SeniorityLevel} from "../../models/employee";
import styles from './AddForm.module.scss';

const AddSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  startingYear: yup.string().required(),
  lastEvaluationDate: yup.string().required(),
  tags: yup.array(),
  level: yup.mixed().oneOf(["junior", "mid","senior"]).required(),
  position: yup.mixed().oneOf(["software developer", "project manager", "tester","graphic designer",]).required(),
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
    photo: ""
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<any>('');
  const [formValues, setFormValues] = useState<IEmployee>(initialValues);
  const [tagsValues, setTagsValues] = useState<string[]>([]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const addTags = (newTags: string[]) => {
    setTagsValues(newTags);
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={AddSchema}
      onSubmit={(
        values: IEmployee,
        { setSubmitting }: FormikHelpers<IEmployee>
      ) => {
        const newValues = {...values, tags: tagsValues};
        setFormValues(newValues);
        alert(JSON.stringify(newValues, null, 2));
        console.log()
        setSubmitting(false);
      }}
    >
      <Form className={styles.Form}>
        <label htmlFor="firstname" className={styles.Label}>Name</label>
        <Input id="firstname" name='firstname' placeholder='name' />

        <label htmlFor="lastName" className={styles.Label}>Surname</label>
        <Input id="lastName" name='lastName' placeholder='surname' />

        <label htmlFor="startingYear" className={styles.Label}>Starting year</label>
        <DatePicker name="startingYear" id="startingYear" picker="year"/>

        <label htmlFor="evaluationDate" className={styles.Label}>Evaluation date</label>
        <DatePicker name="evaluationDate" id="evaluationDate" />

        <label htmlFor="projectName" className={styles.Label}>Project name</label>
        <Input id="projectName" name='projectName' placeholder='Project name' />

        <Tags propsSetTags={addTags}></Tags>

        <label htmlFor="level" className={styles.Label}>Level</label>
        <Select name="level">
          <option value={SeniorityLevel.JUNIOR}>Junior</option>
          <option value={SeniorityLevel.MID}>Mid</option>
          <option value={SeniorityLevel.SENIOR}>Senior</option>
        </Select>

        <label htmlFor="position" className={styles.Label}>Position</label>
        <Select  name="position" >
          <option value={EmployeePosition.SOFTWARE_DEV}>Software developer</option>
          <option value={EmployeePosition.GRAPHIC_DESIGNER}>Graphic designer</option>
          <option value={EmployeePosition.PROJECT_MANAGER}>Project manager</option>
          <option value={EmployeePosition.TESTER}>Tester</option>
        </Select>

        <label htmlFor="photo" className={styles.Label}>Photo</label>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action=""
        >
          {initialValues.photo ? <img src={initialValues.photo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <SubmitButton>Submit</SubmitButton >
      </Form>
    </Formik>
  )
};
