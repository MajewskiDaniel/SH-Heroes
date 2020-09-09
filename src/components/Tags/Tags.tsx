import React, {useState, useRef} from "react";
import { Input } from 'antd';
import { Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './Tags.module.scss';
import {FieldInputProps} from "formik";


export interface ITags extends FieldInputProps<string[]>{
}

export const Tags: React.FC<ITags> = ({onChange, value, name}) => {

  const [inputVisible,  setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const inputEl = useRef(null);


  const handleClose = (removedTag: string) => {
    const newTags = value.filter(tag => tag !== removedTag);

    onChange({ target: { name, value: newTags }});
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const  handleInputConfirm = () => {
    let newTags = value;
    if (inputValue && value.indexOf(inputValue) === -1) {
      newTags = [...value, inputValue];
    }
    onChange({ target: { name, value: newTags }});

    setInputValue('');
    setInputVisible(false);
  };

  const forMap = (tag: any) => {
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
         <Tag
           closable
           color="cyan"
           onClose={(e: any) => {
             e.preventDefault();
             handleClose(tag);
           }}
         >
        # {tag}
      </Tag>
      </span>
    );
  };

  const tagChild = value.map(forMap);

    return (
      <>
        <div style={{ margin: 16 }}>
          <div>
            {tagChild}
          </div>
        </div>
        {inputVisible && (
          <Input
            ref={inputEl}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={showInput} className="site-tag-plus">
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    );
}
