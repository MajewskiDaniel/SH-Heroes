import React from "react";
import { useParams } from "react-router-dom";
import { AddForm } from "../../components/AddForm/AddForm";
import styles from './EditorPage.module.scss';
import {FieldInputProps} from "formik";

export interface IEditor {
}

const Editor: React.FC<IEditor> = () => {
  let { id } = useParams();
  console.log(id)
  return (
    <div className={styles.EditorContainer}>
      <span className={styles.PageTitle}>Add employee</span>
      <AddForm id={id}></AddForm>
    </div>

  )
}

export default Editor;
