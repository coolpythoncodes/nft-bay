import {
  DatePicker,
  type DatePickerProps,
  Form,
  Input,
  Radio,
  type RadioChangeEvent,
  Button,
  message,
} from "antd";
import React, { useState } from "react";
import UploadInput from "../../components/inputs/upload";
import { NFTStorage } from "nft.storage";
import { env } from "~/env.mjs";
import {
  useNftMarketPlace1GetListingPriceFee,
  useNftMarketPlaceCreateNftToken,
  
  usePrepareNftMarketPlaceCreateNftToken,
} from "~/generated";
import { toWei } from "~/utils/helper";
import { nftMarketPlaceAbi, nftMarketPlaceAddress } from "~/utils/data";
import { useContractRead } from "wagmi";

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

  const [metaUrl, setMetaUrl] = useState<string>("")
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const [method, setMethod] = useState("listing");
  const [desc, setDesc] = useState("");
  const client = new NFTStorage({ token: env.NEXT_PUBLIC_NFT_STORAGE_API_KEY });

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

  // const {data:listingFee,error,} = useNftMarketPlace1GetListingPriceFee(
  // )
  const { data:listingFee, error, isLoading } = useContractRead({
    address: nftMarketPlaceAddress,
    abi: nftMarketPlaceAbi.abi,
    functionName: 'getListingPriceFee',
  })
  console.log("listingFeee", listingFee);
  console.log("error", error);

//   const { config } = usePrepareNftMarketPlaceCreateNftToken({
//     args: [
//       metaUrl,
//       toWei(form.getFieldValue("price")),
//       form.getFieldValue("method") === "listing",
//       form.getFieldValue("method") === "auction",
//       form.getFieldValue("endAt"),
//     ],
// value:parse()
//   });
  // const { isLoading, data, isSuccess, writeAsync } =
  //   useNftMarketPlaceCreateNftToken(config);

  // if (data) {
  //   JSON.stringify(data);
  // }

  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values = await form.validateFields();

    const nftMetaData = await client.store({
      name: values.title,
      description: values.description,
      image: values.nftImageUrl,
    });
    setMetaUrl(nftMetaData.url)
    // const res = await writeAsync?.({

    // })
    // console.log("res", res?.hash);
    // const res = await writeAsync({
      // args: [
      //   nftMetaData.url,
      //   toWei(values.price),
      //   values.method === "listing",
      //   values.method === "auction",
      //   values.endAt,
      // ],
    // });
    // useNftMarketPlaceCreateNftToken
    console.log("nftMetaData url", nftMetaData.url);
  };

  return (
    <section className="layout-container my-10 flex justify-center md:my-20">
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
                  placeholder="Enter price for one item"
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
              // disabled={isLoading}
              // loading={isLoading}
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
