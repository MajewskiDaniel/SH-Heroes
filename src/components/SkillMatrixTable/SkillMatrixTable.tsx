import React, {useEffect, useMemo, useState} from "react";
import {Drawer, Checkbox, Slider, Dropdown, Menu, Tag, Select } from 'antd';
import { SettingOutlined  } from '@ant-design/icons';
import moment from 'moment';

import { TableHeader } from "../TableHeader/TableHeader";
import { RowDisplayTotal } from "../RowDisplayTotal/RowDisplayTotal";
import { TableRow } from "../TableRow/TableRow";
import styles from "./SkillMatrixTable.module.scss";
import {IEmployee, ISkill, SeniorityLevel, seniorityMap, skillLevelMap} from "../../models/employee";
import { Skills } from "../../services/SkillFetch";
import { EmployeeFetch } from  "../../services/EmployeeFetch";
import {allSkillsInCategory} from "../../services/Utils";
import {CustomTagProps, SingleType} from "rc-select/lib/interface/generator";


export interface ISkillMatrixTable {
}

export interface IDynamic {
  [key: string]: number
}

export interface ISortOptions {
  skills: string[],
  experience: number,
  seniorityLevel: SeniorityLevel | null,
  tags: string[]
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

export const SkillMatrixTable: React.FC<ISkillMatrixTable> = () => {
  const [employees, setEmployees] = useState<ISkillMatirxEmployee[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [oldSkills, setOldSkills] = useState<ISkill[]>([]);
  const [visible, setVisible] = useState(false);
  const [sortOptions, setSortOptions] = useState<ISortOptions>({skills: [], experience: 0, seniorityLevel: null, tags: []});
  const [filteredEmployees, setFilteredEmployees] = useState<ISkillMatirxEmployee[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [totalEmployees, setTotalEmployees] = useState<IDynamic>({});
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

    employees?.forEach((empl) => {
      empl.skills?.forEach(({skill, skillLevel}) => {
        const actual = skills.find( s => s._id === skill );
        if(actual) {
          totalSkillLevelHelper[skill] += skillLevel;
          if(skillLevel >= 1) {
            totalHelper[skill] += 1
          }
        }
      })
    });

    setTotalEmployees(totalHelper);
    setTotalSkillLevel(totalSkillLevelHelper);
  }, [skills, employees])

  const fetchEmployees = async () => {
    try {
      const data = await EmployeeFetch.getEmployee();
      // data.forEach(( empl: ISkillMatirxEmployee) => empl.disable = false);
      setEmployees(data);
      let tags = data.reduce(( acc: string[], empl: IEmployee ) =>  empl.tags ? [...acc, ...empl.tags] : acc, []);
      tags = Array.from(new Set(tags));
      setTags(tags);
    } catch (e) {
      console.log(e);
    }
  }

  const fetchSkills = async () => {
    try {
      const data = await Skills.getSkills();
      setSkills(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await fetchEmployees();
        const skillData = await Skills.getSkills();

        const catData = await Skills.getCategories();

        const sorted = catData?.reduce((acc: ISkill[], cat: string) =>  [...acc, ...allSkillsInCategory(cat, skillData.skills)], []);

        setOldSkills(skillData.skills)
        setSkills(sorted);
      } catch (e) {
        console.log(e)
      }
    })();
  },[]);

  useMemo(() => {
    let results = [...employees];
    if(sortOptions.skills.length > 0) {
      const elem = sortOptions.skills.map( sortOptionSkill => results.filter(empl =>
        empl.skills?.find( skill => skill.skill === sortOptionSkill)));
      results = Array.from(new Set(elem.flat()));
    }
    if(sortOptions.experience) {
      results = results.filter( empl => {
        const start = moment(empl.startingYear);
        const exp = moment().diff(start, "year");
        return exp === sortOptions.experience;
      })
    }
    if(sortOptions.seniorityLevel || sortOptions.seniorityLevel === 0) {
      results = results.filter( empl => empl.level === sortOptions.seniorityLevel );
    }
    if(sortOptions.tags.length > 0) {
      const elem = sortOptions.tags.map(( sortOptionTag) => results.filter(empl =>
        empl.tags?.find( tag => tag === sortOptionTag)));
      results = Array.from(new Set(elem.flat()));
    }

    setFilteredEmployees(results);
  }, [employees, sortOptions]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onCheckboxClick = (skill: ISkill) => {
    let newSkills = [...sortOptions.skills];
    const occurred = newSkills.find( setSkill => setSkill === skill._id);
    newSkills = occurred ? [... sortOptions.skills?.filter(( setSkill => setSkill !== skill._id))] : [...newSkills, skill._id!]
    setSortOptions({...sortOptions, skills: newSkills});
  }

  const handleSliderChange = (value: number) => {
    setSortOptions({...sortOptions, experience: value})
  }

  const handleLevelClick = (key: React.ReactText) => {
    setSortOptions({...sortOptions, seniorityLevel: Number(key)})
  }

  const handleSelect = (key: SingleType<string | number | LabeledValue>) => {
    let newTags = [...sortOptions.tags];
    newTags = [...newTags, key as string];
    setSortOptions({...sortOptions, tags: newTags});
  }

  const handleDeselect = (key: SingleType<string | number | LabeledValue>) => {
    let newTags = [... sortOptions.tags?.filter(( setTag => setTag !== key ))];
    setSortOptions({...sortOptions, tags: newTags});
  }

  const toggleEnable = (id: string) => {
    let newEmpl = [...employees];
    newEmpl.map( empl => empl._id === id? empl.disable = !empl.disable : empl);
    setEmployees(newEmpl);
  }

  const menu = (
    <Menu>
      {Array.from(skillLevelMap.keys()).map((key) => (
        <Menu.Item key={key} onClick={(e) => handleLevelClick(e.key)} danger={sortOptions.seniorityLevel===key}>
          {seniorityMap.get(key)}
        </Menu.Item>
      ))}
      <Menu.Item key={null} onClick={(e) => handleLevelClick(e.key)} >
        Clear
      </Menu.Item>
    </Menu>
  );

  const marks = {
    0: '0',
    2: '2',
    4: '4',
    6: '6',
    8: '8',
    10: '10',
    12: '12',
    14: '14',
    16: '16'
  };

  return (
    <div className={styles.Container}>
      <SettingOutlined type="primary" onClick={showDrawer} className={styles.Cog}/>
      <Drawer
        title="Filter"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div>Skills</div>
        {
          skills.map(skill => <Checkbox onChange={() => onCheckboxClick(skill)} className={styles.Checkbox} checked={sortOptions.skills?.includes(skill._id!)}>{skill.skillName}</Checkbox>)
        }
        <label htmlFor="exp">Experience</label>
        <Slider id="exp" min={0} max={10} onChange={handleSliderChange} value={sortOptions.experience} marks={marks} />
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={ (e) => e.preventDefault() }>
            Seniority level
          </a>
        </Dropdown>
        <div>Tags</div>
        <Select
          mode="multiple"
          showArrow
          tagRender={(props: CustomTagProps): React.ReactElement => {
            const onTagClose = () => {
              let newTags = [...sortOptions.tags];
              newTags = newTags.filter( tag => tag !== props.value)
              setSortOptions({...sortOptions, tags: newTags})
              props.onClose()
            }
            return (
              <Tag color="cyan" closable={props.closable} onClose={onTagClose} style={{ marginRight: 3 }}>
                {props.label}
              </Tag>
            )
          }}
          className={styles.TagSelect}
          options={tags.map( tag => ({value: tag}))}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
        />,
      </Drawer>
      <table className={styles.Table}>
        <TableHeader skills={oldSkills}></TableHeader>
        <tbody>
          <RowDisplayTotal total={totalEmployees} totalSkillLevel={totalSkillLevel}></RowDisplayTotal>
          { filteredEmployees?.map( (employee) => (
            <TableRow employee={employee} skills={skills} reload={fetchEmployees} toggleEnable={toggleEnable}></TableRow>
          ))}
        </tbody>
      </table>
    </div>
  )
}
