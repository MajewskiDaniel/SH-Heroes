import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { LeftCircleOutlined } from '@ant-design/icons';
import {SkillForm as Form} from '../../components/SkillForm/SkillForm';
import styles from './SkillForm.module.scss';

export interface ISkillForm {
}

export const SkillFormPage: React.FC<ISkillForm> = () => {
  const { id } = useParams();
  const history = useHistory();

  return (
    <div className={styles.EditorContainer}>
      <span className={styles.PageTitle}>
        <LeftCircleOutlined className={styles.Arrow} onClick={() => history.goBack()}/>
        {id ? "Edit skill" : "Add skill"}
      </span>
      <Form id={id}></Form>
    </div>
  )
}

