import React, {useState} from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Input, DatePicker, Select, SubmitButton  } from 'formik-antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { Tags } from '../Tags/Tags';
import { EmployeeLevel, IEmployee } from "../../models/employee";
import styles from './AddForm.module.scss';

export const AddForm: React.FC = () => {
  const initialValues: IEmployee = {
    firstname: "",
    lastName: "",
    startingYear: "",
    evaluationDate: "",
    projectName: "",
    tags: [],
    level: EmployeeLevel.Junior,
    position: "software developer",
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
      onSubmit={(
        values: IEmployee,
        { setSubmitting }: FormikHelpers<IEmployee>
      ) => {
        const newValues = {...values, tags: tagsValues};
        setFormValues(newValues);
        alert(JSON.stringify(newValues, null, 2));
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
          <option value={EmployeeLevel.Junior}>Junior</option>
          <option value={EmployeeLevel.Mid}>Mid</option>
          <option value={EmployeeLevel.Senior}>Senior</option>
        </Select>

        <label htmlFor="position" className={styles.Label}>Position</label>
        <Select  name="position" >
          <option value="software developer">software developer</option>
          <option value="QA">QA</option>
          <option value="project manager">project manager</option>
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
