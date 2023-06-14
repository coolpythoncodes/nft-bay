import React, { useState } from "react";
import { type UploadChangeParam } from "antd/lib/upload/interface";
import { Button, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface UploadFile {
  uid: string;
  name: string;
  status?: string;
  url?: string;
  thumbUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}

interface UploadFormProps {
  onChange: (data: string) => void;
}

const UploadInput = ({ onChange }: UploadFormProps) => {
  // const [file, setFile] = useState<UploadFile | File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (info: UploadChangeParam<UploadFile>) => {
    // setFile(info.file.originFileObj as File);
    onChange(info.file.originFileObj);
  };

  return (
    <Spin spinning={loading}>
      <Upload
        name="NftImageUrl"
        accept=".jpg,.jpeg,.png"
        maxCount={1}
        onChange={handleFileChange}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Spin>
  );
};

export default UploadInput;
