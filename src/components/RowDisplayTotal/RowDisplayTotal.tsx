import React, {PropsWithChildren, useEffect, useState} from 'react';
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
  const [total, setTotal] = useState<IDynamic>({});
  const [totalSkillLevel, setTotalSkillLevel] = useState<IDynamic>({});

  useEffect(() => {
    const totalHelper: IDynamic = {};
    const totalSkillLevelHelper: IDynamic = {};

    skills?.forEach((skill) => {
      if( skill._id ) {
        totalHelper[skill._id] = 0;
        totalSkillLevelHelper[skill._id] = 0;
      };
    });

    employees?.forEach(({skills}) => {
      skills?.forEach(({skill, skillLevel}) => {
        totalSkillLevelHelper[skill._id!] += skillLevel;
        if(skillLevel >= 3) {
          totalHelper[skill._id!] += 1
        }
      })
    });

    setTotal(totalHelper);
    setTotalSkillLevel(totalSkillLevelHelper);
  }, [skills])



  return (
    <>
      <TableFirstRow skillMatch={total}>Trained</TableFirstRow>
      <TableFirstRow skillMatch={totalSkillLevel}>Total skill level</TableFirstRow>
    </>
  );
}
