import React, {useState, useEffect} from 'react';
import {Field, FieldProps, Form, Formik, FormikHelpers, FormikProps} from 'formik';
import {FormItem, Input, Select, SubmitButton} from 'formik-antd';
import { notification, Divider, Input as InputAnt } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import * as yup from 'yup';

import {ISkill, SkillWeight, skillWeightMap} from "../../models/employee";
import styles from './SkillForm.module.scss';
import {FormikErrors, FormikState} from "formik/dist/types";
import { SkillSvc } from "../../services/EmployeesSvc";

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

type OmitAB = Omit<ISkill, "skillWeight">;

interface IFormSkill extends OmitAB {
  skillWeight: SkillWeight | string
}

export interface ISkillForm {
  id: string
}

export const SkillForm: React.FC<ISkillForm> = ({id}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [initialValuesWithId, setInitialValuesWithId] = useState<IFormSkill>(INITIAL_VALUES);
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
    if (id) {
      fetchSkill(id);
    }
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  }

  const addCategory = async() => {
    const occurrence = categories.find(cat => cat === newCategory);
    if (!occurrence) {
      await setCategories([...categories, newCategory]);
    }
    setNewCategory("");
  }

  const onEnter = async (props: any) => {
    await addCategory();
    props.setFieldValue('skillCategory', newCategory);
  }

  const handleSubmit = async (values: IFormSkill | ISkill, handlers: {
    setSubmitting: (isSubmitting: boolean) => void,
    setStatus: (status?: any) => void,
    resetForm:  (nextState?: any) => void;
    // (nextState?: Partial<FormikState<Values>>) => void;
  }) => {
    if (isInstanceOfISkill(values)) {
      try {
        const resp = id ? await SkillSvc.editSkill(values) : await SkillSvc.addSkill(values);
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
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={ id ? initialValuesWithId : INITIAL_VALUES}
      validationSchema={SkillSchema}
      validateOnChange={submitted}
      validateOnBlur={submitted}
      onSubmit={handleSubmit}>
      { (props) => {
        return (
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
                      <PlusOutlined /> Add item
                    </a>
                  </div>
                </div>
              )}>
                {categories.map((category, index) => (
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
        )
      }}
    </Formik>
  )
}

function isInstanceOfISkill (object: any): object is ISkill {
  return Object.values(SkillWeight).includes(object.skillWeight); //write category
}
