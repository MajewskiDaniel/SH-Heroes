import React, {useState, useRef} from "react";
import { Input } from 'antd';
import { Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './Tags.module.scss';

export interface ITags {
  propsSetTags: (tags:string[]) => void
}

export const Tags: React.FC<ITags> = ({propsSetTags}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible,  setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const inputEl = useRef(null);


  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
    propsSetTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const  handleInputConfirm = () => {
    let newTags = tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
    }
    setTags(newTags);
    propsSetTags(newTags);
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

  const tagChild = tags.map(forMap);

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
