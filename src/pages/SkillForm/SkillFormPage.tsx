import React from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { LeftCircleOutlined } from '@ant-design/icons';
import styles from './SkillForm.module.scss';
import {SkillForm as Form} from '../../components/SkillForm/SkillForm';

export interface ISkillForm {
}

const SkillForm: React.FC<ISkillForm> = () => {
  const { id } = useParams();
  const history = useHistory();

  if(id) {
    return (
      <div className={styles.EditorContainer}>
        <span className={styles.PageTitle}>
          <LeftCircleOutlined className={styles.Arrow} onClick={() => history.goBack()}/>
          "Edit skill"
        </span>
        <Form id={id}></Form>
      </div>
    )
  } else {
    return (
      <div className={styles.EditorContainer}>
        <span className={styles.PageTitle}>
          <LeftCircleOutlined className={styles.Arrow} onClick={() => history.goBack()}/>
          "Add skill"
        </span>
        <Form id={id}></Form>
      </div>
    )
  }
}

export default SkillForm;
