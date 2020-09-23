import React, {PropsWithChildren, useEffect, useState} from 'react';
import { IEmployee, ISkill } from '../../models/employee';
import {TableFirstRow} from "../TableFirstRow/TableFirstRow";
import {IDynamic} from "../SkillMatrixTable/SkillMatrixTable";

export interface IRowDisplayTotal {
  total: IDynamic,
  totalSkillLevel: IDynamic
}

export const RowDisplayTotal: React.FC<PropsWithChildren<IRowDisplayTotal>> = ({total, totalSkillLevel }) => {

  return (
    <>
      <TableFirstRow skillMatch={total}>Trained</TableFirstRow>
      <TableFirstRow skillMatch={totalSkillLevel}>Total skill level</TableFirstRow>
    </>
  );
}
