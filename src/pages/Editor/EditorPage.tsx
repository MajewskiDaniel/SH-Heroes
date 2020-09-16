import React from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { AddForm } from "../../components/AddForm/AddForm";
import { LeftCircleOutlined } from '@ant-design/icons';
import styles from './EditorPage.module.scss';
import {SkillForm} from "../../components/SkillForm/SkillForm";

export interface IEditor {
}

const Editor: React.FC<IEditor> = () => {
  let { url } = useRouteMatch();
  let { id } = useParams();
  const history = useHistory();

  if(id) {
    return (
      <div className={styles.EditorContainer}>
        <span className={styles.PageTitle}>
          <LeftCircleOutlined className={styles.Arrow} onClick={() => history.goBack()}/>
          { url.includes("/skill")  ? "Edit skill" : "Edit employee" }
        </span>
        { url.includes("/skill")  ? <SkillForm id={id}></SkillForm> : <AddForm id={id}></AddForm> }
      </div>
    )
  } else {
    return (
      <div className={styles.EditorContainer}>
        <span className={styles.PageTitle}>
          <LeftCircleOutlined className={styles.Arrow} onClick={() => history.goBack()}/>
          { url.includes("/skill")  ? "Add skill" : "Add employee" }
        </span>
        { url.includes("/skill")  ? <SkillForm id={id}></SkillForm> : <AddForm id={id}></AddForm> }
      </div>
    )
  }
}

export default Editor;
