import React, {useState} from 'react';
import {Upload} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export interface IPhotoPicker {
  onLoad: (url: string)=>void
}

export const PhotoPicker: React.FC<IPhotoPicker> = ({ onLoad }) => {
  const [photo, setPhoto] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setPhoto(imageUrl);
        setLoading(false);
        onLoad(imageUrl);
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
      {photo ? <img src={photo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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
    // message.error('You can only upload JPG/PNG file!');
    console.log('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    // message.error('Image must smaller than 2MB!');
    console.log('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M;
}
