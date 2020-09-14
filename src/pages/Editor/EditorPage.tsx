import React from "react";
import { useParams } from "react-router-dom";
import { AddForm } from "../../components/AddForm/AddForm";
import styles from './EditorPage.module.scss';

export interface IEditor {
}

const Editor: React.FC<IEditor> = () => {
  let { id } = useParams();
  return (
    <div className={styles.EditorContainer}>
      <span className={styles.PageTitle}>Add employee</span>
      <AddForm id={id}></AddForm>
    </div>

  )
}

export default Editor;
