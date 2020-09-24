import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Checkbox, Slider, Dropdown, Menu, Tag, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import classNames from 'classnames';

import { TableHeader } from "../TableHeader/TableHeader";
import { RowDisplayTotal } from "../RowDisplayTotal/RowDisplayTotal";
import { TableRow } from "../TableRow/TableRow";
import styles from "./SkillMatrixTable.module.scss";
import {IEmployee, ISkill, SeniorityLevel, seniorityMap, skillLevelMap,} from "../../models/employee";
import { Skills } from "../../services/SkillFetch";
import { EmployeeFetch } from "../../services/EmployeeFetch";
import { allSkillsInCategory } from "../../services/Utils";
import { CustomTagProps, SingleType } from "rc-select/lib/interface/generator";
import {useFilter} from "../../hooks/useFilter";
import {useCountSkills} from "../../hooks/useCountSkills";

export interface IDynamic {
  [key: string]: number;
}

export interface ISortOptions {
  skills: string[];
  experience: number;
  seniorityLevel: SeniorityLevel | null;
  tags: string[];
}

export type RawValue = string | number;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export interface ISkillMatirxEmployee extends IEmployee {
  disable: boolean
}

export const SkillMatrixTable: React.FC = () => {
  const [employees, setEmployees] = useState<ISkillMatirxEmployee[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [oldSkills, setOldSkills] = useState<ISkill[]>([]);
  const [visible, setVisible] = useState(false);
  const [sortOptions, setSortOptions] = useState<ISortOptions>({
    skills: [],
    experience: 0,
    seniorityLevel: null,
    tags: [],
  });
  const [filteredEmployees] = useFilter(employees, sortOptions);
  const [tags, setTags] = useState<string[]>([]);
  const {totalEmployees, totalSkillLevel, employeesCoverage} = useCountSkills(skills, employees);
  const [disabledIds, setDisabledIds] = useState<string[]>([])

  const sortEmployees = (employees: ISkillMatirxEmployee[]) => {
    return employees.sort((empl: ISkillMatirxEmployee) => empl.disable ? 1 : -1);
  }

  const fetchEmployees = async () => {
    try {
      let data = await EmployeeFetch.getEmployee();
      data.forEach(( empl: ISkillMatirxEmployee) => {
        disabledIds.find(id => id === empl._id) ? empl.disable = true : empl.disable = false;
      });
      data = sortEmployees(data);
      setEmployees(data);

      let tags = data.reduce((acc: string[], empl: IEmployee) => empl.tags ? [...acc, ...empl.tags] : acc, []);
      tags = Array.from(new Set(tags));
      setTags(tags);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchEmployees();
        const skillData = await Skills.getSkills();

        const catData = await Skills.getCategories();

        const sorted = catData?.reduce((acc: ISkill[], cat: string) => [...acc, ...allSkillsInCategory(cat, skillData.skills),], []);

        setOldSkills(skillData.skills);
        setSkills(sorted);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onCheckboxClick = (skill: ISkill) => {
    let newSkills = [...sortOptions.skills];
    const occurred = newSkills.find((setSkill) => setSkill === skill._id);
    newSkills = occurred ? [...sortOptions.skills?.filter((setSkill) => setSkill !== skill._id)]
      : [...newSkills, skill._id!];
    setSortOptions({ ...sortOptions, skills: newSkills });
  };

  const handleSliderChange = (value: number) => {
    setSortOptions({ ...sortOptions, experience: value });
  };

  const handleLevelClick = (key: React.ReactText) => {
    setSortOptions({ ...sortOptions, seniorityLevel: Number(key) });
  };

  const handleSelect = (key: SingleType<string | number | LabeledValue>) => {
    let newTags = [...sortOptions.tags];
    newTags = [...newTags, key as string];
    setSortOptions({ ...sortOptions, tags: newTags });
  };

  const handleDeselect = (key: SingleType<string | number | LabeledValue>) => {
    let newTags = [...sortOptions.tags?.filter((setTag) => setTag !== key)];
    setSortOptions({ ...sortOptions, tags: newTags });
  };

  const toggleEnable = (id: string) => {
    let newEmpl = [...employees];
    newEmpl.filter( empl => {
      if(empl._id === id) {
        if( empl.disable ) {
          let ids = disabledIds.filter( disId => disId !== id);
          setDisabledIds(ids)
        } else {
          setDisabledIds([...disabledIds, id]);
        }
        return empl.disable = !empl.disable;
      } else {
        return empl;
      }
    });
    newEmpl = sortEmployees(newEmpl);
    setEmployees(newEmpl);
  }

  const menu = (
    <Menu>
      {Array.from(skillLevelMap.keys()).map((key) => (
        <Menu.Item
          key={key}
          onClick={(e) => handleLevelClick(e.key)}
          danger={sortOptions.seniorityLevel === key}
        >
          {seniorityMap.get(key)}
        </Menu.Item>
      ))}
      <Menu.Item key={null} onClick={(e) => handleLevelClick(e.key)}>
        Clear
      </Menu.Item>
    </Menu>
  );

  const marks = {
    0: '0',
    5: '5',
    10: '10',
    15: '15',
  };

  return (
    <div className={styles.Container}>
      <SettingOutlined
        type="primary"
        onClick={showDrawer}
        className={styles.Cog}
      />
      <Drawer
        title="Filter"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className={styles.Label}>Skills</div>
        {skills.map((skill) => (
          <Checkbox
            onChange={() => onCheckboxClick(skill)}
            className={styles.Checkbox}
            checked={sortOptions.skills?.includes(skill._id!)}
          >
            {skill.skillName}
          </Checkbox>
        ))}
        <label className={styles.Label} htmlFor="exp">Experience</label>
        <Slider
          id="exp"
          min={0}
          max={16}
          onChange={handleSliderChange}
          value={sortOptions.experience}
          marks={marks}
        />
        <Dropdown overlay={menu} trigger={["click"]} className={styles.Label}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Seniority level
          </a>
        </Dropdown>
        <div className={styles.Label}>Tags</div>
        <Select
          mode="multiple"
          showArrow
          tagRender={(props: CustomTagProps): React.ReactElement => {
            const onTagClose = () => {
              let newTags = [...sortOptions.tags];
              newTags = newTags.filter((tag) => tag !== props.value);
              setSortOptions({ ...sortOptions, tags: newTags });
              props.onClose();
            };
            return (
              <Tag
                color="cyan"
                closable={props.closable}
                onClose={onTagClose}
                style={{ marginRight: 3 }}
              >
                {props.label}
              </Tag>
            );
          }}
          className={classNames(styles.TagSelect, styles.Label)}
          options={tags.map((tag) => ({ value: tag }))}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
        />
        ,
      </Drawer>
      <table className={styles.Table}>
        <TableHeader
          skills={oldSkills}
          totalSkillLevel={totalSkillLevel}
          employeesCoverage={employeesCoverage}
        ></TableHeader>
        <tbody>
          <RowDisplayTotal
            total={totalEmployees}
            totalSkillLevel={totalSkillLevel}
          ></RowDisplayTotal>
          {filteredEmployees?.map((employee: ISkillMatirxEmployee) => (
            <TableRow
              employee={employee}
              skills={skills}
              reload={fetchEmployees}
            toggleEnable={toggleEnable}></TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};
