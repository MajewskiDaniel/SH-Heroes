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
  skillCategory: [""],
  skillWeight: "",
};

type OmitAB = Omit<ISkill, "skillCategory"|"skillWeight">;

interface IFormSkill extends OmitAB {
  skillCategory: string[],
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
    setCategories(["HSE", "Finance", "Logistics"]);
  }

  const fetchSkill = async (id: number) => {
    // const data = await EmployeesSvc.getEmployee(id);
    // if (data && !Array.isArray(data)) {
    //   setInitialValuesWithId(data);
    // }
  }

  useEffect(() => {
    fetchCategories();
    // if (id) {
    //   fetchSkill();
    // }
  }, []);

  const onInputAddCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  }

  const addCategory = () => {
    setCategories([...categories, newCategory]);
    setNewCategory("");
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
      initialValues={INITIAL_VALUES}
      validationSchema={SkillSchema}
      validateOnChange={submitted}
      validateOnBlur={submitted}
      onSubmit={handleSubmit}>
      { (props) => {
        return (
          <Form className={styles.Form}>
            <FormItem name="skillName" >
              <label htmlFor="firstName" className={styles.Label}>Name</label>
              <Input id="skillName" name="skillName" placeholder="name"></Input>
            </FormItem>
            <FormItem name="skillCategory" >
              <label htmlFor="skillCategory" className={styles.Label}>Category</label>
              <Select id="skillCategory" name="skillCategory" dropdownRender={(children: React.ReactNode) => (
                <div>
                  {children}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                    <InputAnt style={{ flex: 'auto' }}  onChange={onInputAddCategoryChange} value={newCategory}/>
                    <a
                      style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                      onClick={addCategory}
                    >
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
