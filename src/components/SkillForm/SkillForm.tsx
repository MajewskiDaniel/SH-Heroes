import React, {useState, useEffect} from 'react';
import {Field, FieldProps, Form, Formik, FormikHelpers, FormikProps} from 'formik';
import {DatePicker, FormItem, Input, Select, SubmitButton} from 'formik-antd';
import { notification, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import * as yup from 'yup';

import {Tags} from '../Tags/Tags';
import {PhotoPicker} from "../PhotoPicker/PhotoPicker";
import {EmployeesSvc} from "../../services/EmployeesSvc";
import {EmployeePosition, employeePositionMap, IEmployee, SeniorityLevel, seniorityMap} from "../../models/employee";
import styles from './SkillForm.module.scss';
import {FormikErrors, FormikState} from "formik/dist/types";
import {IAddForm} from "../AddForm/AddForm";

const SkillSchema = yup.object().shape({
  name: yup.string().required("Required"),
  category: yup.array().required("Required"),
  skillWeight: yup.array().required("Required"),
});

const INITIAL_VALUES = {
  name: "",
  category: [],
  skillWeight: "",
};

export interface ISkillForm {
  id: string
}

export const SkillForm: React.FC<ISkillForm> = ({id}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [initialValuesWithId, setInitialValuesWithId] = useState(INITIAL_VALUES);
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  const onInputAddCategoryChange = () => {

  }

  const addCategory = () => {

  }



  const handleSubmit = () => {

    history.push("/skill-list");
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={INITIAL_VALUES}
      validationSchema={SkillSchema}
      validateOnChange={submitted}
      validateOnBlur={submitted}
      onSubmit={handleSubmit}>
      { (props) => {
        return (
          <Form className={styles.Form}>
            <FormItem name="name" label="Name" className={styles.Label}>
              <Input name="name" placeholder="name"></Input>
            </FormItem>
            <FormItem name="category" label="Category" className={styles.Label}>
              <Select name="category" >
                {categories.map((category, index) => (
                  <Select.Option key={index} value={category}>
                    {category}
                  </Select.Option>
                ))}
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                  <Input style={{ flex: 'auto' }}  name="addCategory" />
                  <a
                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                    onClick={addCategory}
                  >
                    <PlusOutlined /> Add item
                  </a>
                </div>
              </Select>
            </FormItem>
            <FormItem name="skillWeight" label="Skill weight" className={styles.Label}>
              <Select name="skillWeight">
                {/*{Array.from(seniorityMap.keys()).map((key) => (*/}
                {/*  <Select.Option key={key} value={key}>*/}
                {/*    {seniorityMap.get(key)}*/}
                {/*  </Select.Option>*/}
                {/*))}*/}
              </Select>
            </FormItem>
            <SubmitButton onClick={()=> !submitted && setSubmitted(true)}>Submit</SubmitButton >
          </Form>
        )
      }}
    </Formik>
  )
}
