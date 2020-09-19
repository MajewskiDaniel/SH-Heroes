import React, {PropsWithChildren} from 'react';
import {IEmployee, ISkill} from '../../models/employee';
import {TableFirstRow} from "../TableFirstRow/TableFirstRow";

import styles from './RowDisplayTotal.module.scss';

export interface IRowDisplayTotal {
  employees: IEmployee[],
  skills: ISkill[]
}

export interface IDinamic {
  [key: string]: number
}

export const RowDisplayTotal: React.FC<PropsWithChildren<IRowDisplayTotal>> = ({employees, skills }) => {
  // const total = [... skills?.map(({_id}) => {
  //   return employees?.reduce((sum: number, employee) => {
  //     const occurred = employee.skills?.find( ({skill}) => skill._id === _id);
  //     return occurred ? sum+=1 : sum;
  //   }, 0);
  // })];

  const total: IDinamic = {};
  const totalSkillLevel: IDinamic = {};

  skills?.forEach((skill) => {
    if( skill._id ) {
      total[skill._id] = 0;
      totalSkillLevel[skill._id] = 0;
    };
  });

  employees?.forEach(({skills}) =>{
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
