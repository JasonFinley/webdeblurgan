"use client"
import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { App, message, Upload } from 'antd';
import {
  InboxOutlined,
  FileOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Dragger } = Upload;

const ItemRender = (originNode, file, fileList, actions) => {
    // 狀態對應顏色與 icon
    let color = '#333';
    let IconBefore = FileOutlined;
    let IconAfter = null;

    if (file.status === 'uploading') {
      color = '#faad14';
      IconBefore = LoadingOutlined;
    } else if (file.status === 'done') {
      color = '#52c41a';
      IconBefore = CheckCircleOutlined;
      IconAfter = DeleteOutlined;
    } else if (file.status === 'error') {
      color = '#ff4d4f';
      IconBefore = CloseCircleOutlined;
      IconAfter = DeleteOutlined;
    }

    const Before = <IconBefore style={{ color, marginRight: 6 }} />;
    const After = IconAfter && (
        <IconAfter
          style={{ color: '#999', marginLeft: 8, cursor: 'pointer' }}
          onClick={actions.remove}
        />
    );

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 4,
          padding: '4px 8px',
          borderRadius: 4,
          background: '#2e2c2cff',
        }}
      >
        <div>
          {Before}
          <span style={{ color }}>{file.name}</span>
        </div>
        {After}
      </div>
    );
}

const AntdUpload = ({setUploadFileObj}) => {

  const { message } = App.useApp(); // ✅ 改這裡
  const [fileList, setFileList] = useState([]); // 僅保存一個檔案

  // 🔧 Cloudinary 設定（請改成你的值）
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;       // 例如：clearify
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET; // 在 Cloudinary console 建立的 unsigned preset 名稱

  const props = {
    name: 'file',
    size: 'large',
    accept: ".png,.jpg,.jpeg",
    multiple: false,
    maxCount: 1,
    fileList: fileList,

    // ✅ 指定 Cloudinary 上傳端點
    action: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    // ✅ 指定上傳時附帶的參數（Cloudinary 需要）
    data: {
      upload_preset: uploadPreset,
    },
    
    itemRender: ItemRender,

    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上傳圖片！');
        return Upload.LIST_IGNORE;
      }
      const isLt4M = file.size / 1024 / 1024 < 10; // Cloudinary 允許到約100MB
      if (!isLt4M) {
        message.error('圖片需小於 10MB！');
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {

      let newFileList = info.fileList.slice(-1); // ✅ 僅保留最後一個
      setFileList(newFileList);

      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // ✅ Cloudinary 回傳 response
        const response = info.file.response;
        const imageUrl = response?.secure_url;
        message.success(`${info.file.name} 上傳成功`);
        console.log('Cloudinary 回傳資料:', response);
        console.log('圖片網址:', imageUrl);
        setUploadFileObj({
          created_at: response.created_at,
          asset_id: response.asset_id,
          format: response.format,
          public_id: response.public_id,
          version: response.version,
          url: response.secure_url,
          width: response.width,
          height: response.height,
          name: response.original_filename,
        })
      } else if (status === 'error') {
        message.error(`${info.file.name} 上傳失敗`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="text-white">點擊或拖曳檔案到此上傳</p>
      <p className="text-white">
        支援單張上傳，禁止上傳公司機密或非法內容。
      </p>
    </Dragger>
  )
}

export default AntdUpload;