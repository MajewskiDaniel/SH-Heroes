import React, {useState, useEffect, useCallback} from 'react';
import { useHistory } from "react-router-dom";
import {Form, Formik, FormikProps} from 'formik';
import { FormikState } from "formik/dist/types";
import { FormItem, Input, Select, SubmitButton } from 'formik-antd';
import { notification, Divider, Input as InputAnt } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as yup from 'yup';

import { ISkill, SkillWeight, skillWeightMap } from "../../models/employee";
import { SkillSvc } from "../../services/EmployeesSvc";

import styles from './SkillForm.module.scss';

const SkillSchema = yup.object().shape({
  skillName: yup.string().required("Required"),
  skillCategory: yup.string().required("Required"),
  skillWeight: yup.string().required("Required"),
});

const INITIAL_VALUES = {
  skillName: "",
  skillCategory: "",
  skillWeight: "",
};

interface ISkillFormExtends extends Omit<ISkill, "skillWeight"> {
  skillWeight: SkillWeight | string
}

export interface ISkillForm {
  id: string
}

export const SkillForm: React.FC<ISkillForm> = ({id}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [initialValuesWithId, setInitialValuesWithId] = useState<ISkillFormExtends>(INITIAL_VALUES);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const history = useHistory();

  const fetchCategories = async () => {
    try {
      const cat = await SkillSvc.getCategories();
      setCategories(cat);
    } catch (e) {
      console.log(e);
    }
  }

  const fetchSkill = async (id: string) => {
    try {
      const data = await SkillSvc.getSkill(id);
      setInitialValuesWithId(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCategories();
    id && fetchSkill(id);
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  }

  const addCategory = async() => {
    const occurrence = categories.find(cat => cat === newCategory);
    if (!occurrence) {
      setCategories([...categories, newCategory]);
    }
    setNewCategory("");
  }

  const onEnter = async (props: FormikProps<ISkill | ISkillForm>) => {
    await addCategory();
    props.setFieldValue('skillCategory', newCategory);
  }

  const renderForm = useCallback((props) =>
      <Form className={styles.Form}>
        <FormItem name="skillName" >
          <label htmlFor="skillName" className={styles.Label}>Name</label>
          <Input id="skillName" name="skillName" placeholder="name"></Input>
        </FormItem>
        <FormItem name="skillCategory" >
          <label htmlFor="skillCategory" className={styles.Label}>Category</label>
          <Select id="skillCategory" name="skillCategory" dropdownRender={(children: React.ReactNode) => (
            <div>
              {children}
              <Divider className={styles.Divider} />
              <div className={styles.Container}>
                <InputAnt className={styles.Input}  onChange={onInputChange} value={newCategory} onPressEnter={()=>onEnter(props)}/>
                <a className={styles.Link} onClick={addCategory} >
                  <PlusOutlined /> Add category
                </a>
              </div>
            </div>
          )}>
            {categories?.map((category, index) => (
              <Select.Option key={index} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem name="skillWeight" >
          <label htmlFor="skillWeight" className={styles.Label}>Skill weight</label>
          <Select id="skillWeight" name="skillWeight">
            {Array.from(skillWeightMap.keys()).map((key) => (
              <Select.Option key={key} value={key}>
                {skillWeightMap.get(key)}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <SubmitButton onClick={()=> !submitted && setSubmitted(true)}>Submit</SubmitButton >
      </Form>
    ,[newCategory, categories, initialValuesWithId, submitted])

  const handleSubmit = async (values: ISkillFormExtends | ISkill, handlers: {
    setSubmitting: (isSubmitting: boolean) => void,
    setStatus: (status?: any) => void,
    resetForm:  (nextState?: Partial<FormikState<ISkillFormExtends | ISkill>>) => void;
  }) => {
    try {
      if (! isISkill(values)) throw new Error('Wrong data type');
      id ? await SkillSvc.editSkill(values) : await SkillSvc.addSkill(values);
      notification['success']({
        message: 'Success',
        description:
          id ? `Skill ${values.skillName} has been successfully edited` : `Skill ${values.skillName} has been successfully saved`,
      });
      handlers.setStatus({success: true});
      handlers.resetForm();
      history.push("/skill-list");
    } catch (e) {
      console.log(e.message);
      notification['error']({
        message: 'Error',
        description:
          id ? `Skill ${values.skillName} not edited` : `Skill ${values.skillName} not saved`,
      });
    }
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={ id ? initialValuesWithId : INITIAL_VALUES}
      validationSchema={SkillSchema}
      validateOnChange={submitted}
      validateOnBlur={submitted}
      onSubmit={handleSubmit}
    >
      {renderForm}
    </Formik>
  )
}

function isISkill (object: any): object is ISkill {
  return Object.values(SkillWeight).includes(object.skillWeight)
    && typeof(object.skillCategory) === "string"
    && typeof(object.skillName) === "string";
}
