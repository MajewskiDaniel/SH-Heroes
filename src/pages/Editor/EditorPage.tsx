import React from "react";
import { AddForm } from "../../components/AddForm/AddForm";
import styles from './EditorPage.module.scss';

const Editor: React.FC = () => {
  return (
    <div className={styles.EditorContainer}>
      <span className={styles.PageTitle}>Add employee</span>
      <AddForm></AddForm>
    </div>

  )
}

export default Editor;
