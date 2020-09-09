import React, {useState} from 'react';
import {Upload} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {FieldInputProps} from "formik";

export interface IPhotoPicker extends FieldInputProps<string>{
}

export const PhotoPicker: React.FC<IPhotoPicker> = ({onChange, value, name}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setLoading(false);
        onChange({ target: { name, value: imageUrl }});
      });
    };
    }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="photo"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {value ? <img src={value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    console.log('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.log('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M;
}