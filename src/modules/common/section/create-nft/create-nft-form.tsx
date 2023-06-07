import {
  DatePicker,
  type DatePickerProps,
  Form,
  Input,
  Radio,
  type RadioChangeEvent,
  Button,
} from "antd";
import React, { useState } from "react";
import UploadInput from "../../components/inputs/upload";

interface IInitialFormData {
  title: string;
  description: string;
  endAt: number | null;
  price: number | null;
  minimumBid: number | null;
  method: string;
  nftImageUrl: string;
}

const CreateNftForm = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const [uploadUrl, setUploadUrl] = useState<string>("");
  const [method, setMethod] = useState("listing");
  const [desc, setDesc] = useState("");

  const onChange = (e: RadioChangeEvent) => {
    setMethod(e.target.value as string);
  };

  const dateOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const initialFormData: IInitialFormData = {
    title: "",
    description: desc,
    endAt: null,
    minimumBid: null,
    price: null,
    method: method,
    nftImageUrl: uploadUrl,
  };

  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values = await form.validateFields();
    console.log(values);
  };

  return (
    <section className="layout-container my-10 md:my-20 flex justify-center">
      <div className="w-full md:w-[80%] lg:w-[60%]">
        <Form autoComplete="on" form={form}>
          <h1 className="mb-2 text-base font-bold text-[#0D3B54]">
            Select Method
          </h1>
          <Form.Item
            name="method"
            initialValue={initialFormData.method}
            rules={[
              {
                required: true,
                message: "method is required.",
              },
            ]}
          >
            <Radio.Group onChange={onChange} value={method}>
              <Radio value="listing">
                <p className="m-0 p-0 text-base">Listing</p>
              </Radio>
              <Radio value="auction">
                <p className="m-0 p-0 text-base">Auction</p>
              </Radio>
            </Radio.Group>
          </Form.Item>
          {method == "listing" ? (
            <>
              <h1 className="mb-2 text-base font-bold text-[#0D3B54]">Price</h1>
              <Form.Item
                initialValue={initialFormData.price}
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Price is required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter price for one item (USDC)"
                  className="input"
                  type="number"
                  name="price"
                  step="1"
                  id="price"
                />
              </Form.Item>
            </>
          ) : (
            <>
              <h1 className="mb-2 text-base font-bold text-[#0D3B54]">
                Minimum Bid
              </h1>
              <Form.Item
                name="minimumBid"
                initialValue={initialFormData.minimumBid}
                rules={[
                  {
                    required: true,
                    message: "Minimum bid is required.",
                  },
                ]}
              >
                <Input
                  placeholder="Enter minimum bid"
                  className="input"
                  type="number"
                  name="minimumBid"
                  step="1"
                  id="minimumBid"
                />
              </Form.Item>
              <h1 className="mb-2 text-base font-bold text-[#0D3B54]">
                Expiration date
              </h1>
              <Form.Item
                name="endAt"
                initialValue={initialFormData.endAt}
                rules={[
                  {
                    required: true,
                    message: "Expiration date is required.",
                  },
                ]}
              >
                <DatePicker onChange={dateOnChange} />
              </Form.Item>
            </>
          )}

          <h1 className="mb-2 text-base font-bold text-[#0D3B54]">Title</h1>
          <Form.Item
            initialValue={initialFormData.title}
            name="title"
            rules={[
              {
                required: true,
                message: "Title is required",
              },
            ]}
          >
            <Input
              placeholder="Enter title"
              className="input"
              type="text"
              name="title"
              id="title"
            />
          </Form.Item>
          <h1 className="mb-2 text-base font-bold text-[#0D3B54]">
            Description
          </h1>
          <Form.Item
            initialValue={initialFormData.description}
            name="description"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <TextArea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter Description"
              autoSize={{ minRows: 3, maxRows: 5 }}
              name="description"
              id="description"
            />
          </Form.Item>
          <h1 className="mb-3 text-base font-bold text-[#0D3B54]">
            Upload file
          </h1>
          <Form.Item
            name="nftImageUrl"
            initialValue={initialFormData.nftImageUrl}
            rules={[
              {
                required: true,
                message: "Upload is required.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value !== "" || getFieldValue("nftImageUrl") !== "") {
                    return Promise.resolve();
                  }
                  return Promise.reject("");
                },
              }),
            ]}
          >
            <UploadInput
              onChange={(data) => {
                setUploadUrl(data);
              }}
            />
          </Form.Item>

          <div className="navbar mt-10 w-full">
            <Button
              onClick={handleClick as unknown as VoidFunction}
              className="w-full"
            >
              Create Nft
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default CreateNftForm;
