import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { AddForm } from "../../components/AddForm/AddForm";
import { LeftCircleOutlined } from '@ant-design/icons';
import styles from './EditorPage.module.scss';
import {SkillForm} from "../../components/SkillForm/SkillForm";

export interface IEditor {
}

const Editor: React.FC<IEditor> = () => {
  let { id } = useParams();
  const history = useHistory();

  return (
    <div className={styles.EditorContainer}>
      <span className={styles.PageTitle}>
        <LeftCircleOutlined className={styles.Arrow} onClick={() => history.goBack()}/>
        {id ? "Edit employee" : "Add employee"}
      </span>
      <AddForm id={id}></AddForm>
    </div>
  )
}

export default Editor;
