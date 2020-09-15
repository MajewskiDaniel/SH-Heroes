import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { AddForm } from "../../components/AddForm/AddForm";
import styles from './EditorPage.module.scss';
import {SkillForm} from "../../components/SkillForm/SkillForm";

export interface IEditor {
}

const Editor: React.FC<IEditor> = () => {
  let { url } = useRouteMatch();
  let { id } = useParams();
  if(id) {
    return (
      <div className={styles.EditorContainer}>
        <span className={styles.PageTitle}>{ url.includes("/skill")  ? "Edit skill" : "Edit employee" }</span>
        { url.includes("/skill")  ? <SkillForm id={id}></SkillForm> : <AddForm id={id}></AddForm> }
      </div>
    )
  } else {
    return (
      <div className={styles.EditorContainer}>
        <span className={styles.PageTitle}>{ url.includes("/skill")  ? "Add skill" : "Add employee" }</span>
        { url.includes("/skill")  ? <SkillForm id={id}></SkillForm> : <AddForm id={id}></AddForm> }
      </div>
    )
  }
}

export default Editor;
