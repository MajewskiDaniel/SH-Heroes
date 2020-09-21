import React, {PropsWithChildren} from 'react';
import { IEmployee, ISkill } from '../../models/employee';
import {TableFirstRow} from "../TableFirstRow/TableFirstRow";

export interface IRowDisplayTotal {
  employees: IEmployee[],
  skills: ISkill[]
}

export interface IDynamic {
  [key: string]: number
}

export const RowDisplayTotal: React.FC<PropsWithChildren<IRowDisplayTotal>> = ({employees, skills }) => {
  const total: IDynamic = {};
  const totalSkillLevel: IDynamic = {};

  skills?.forEach((skill) => {
    if( skill._id ) {
      total[skill._id] = 0;
      totalSkillLevel[skill._id] = 0;
    };
  });

  employees?.forEach(({skills}) => {
    skills?.forEach(({skill, skillLevel}) => {
      totalSkillLevel[skill._id!] += skillLevel;
      if(skillLevel >= 3) {
        total[skill._id!] += 1
      }
    })
  });

  return (
    <>
      <TableFirstRow skillMatch={total}>Trained</TableFirstRow>
      <TableFirstRow skillMatch={totalSkillLevel}>Total skill level</TableFirstRow>
    </>
  );
}
