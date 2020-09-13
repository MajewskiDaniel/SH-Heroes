import React, { useState, useRef} from "react";
import { Input, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {FieldInputProps} from "formik";

export interface ITags extends FieldInputProps<string[]>{
}

export const Tags: React.FC<ITags> = ({onChange, value, name}) => {
  const [inputVisible,  setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const showInput = async () => {
    await setInputVisible(true);
    const node = inputRef.current;
    if(node){
      node.focus();
    }
  }

  const handleClose = (removedTag: string) => {
    const newTags = value.filter(tag => tag !== removedTag);
    onChange({ target: { name, value: newTags }});
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

  return (
    <>
      <div style={{ margin: 16 }}>
        { value.map( (tag: string) => (
          <span key={tag} style={{ display: 'inline-block' }}>
            <Tag closable color="blue"
                 onClose={(e: React.ChangeEvent<HTMLInputElement>) => handleClose(tag)} >
              # {tag}
            </Tag>
          </span>
        ))}
      </div>
      {inputVisible && (
        <Input
          ref={inputRef as React.RefObject<any>}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm} />
          )}
      {!inputVisible && (
        <Tag onClick={showInput} className="site-tag-plus">
          <PlusOutlined /> New Tag
        </Tag>
      )}
      </>
  );
}
