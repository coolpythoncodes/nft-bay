import { Button, Form, Input, Modal } from "antd";
import { type ChangeEvent, useState } from "react";

interface IProps {
  showBidModal: boolean;
  onComplete: () => void;
  title: string;
  amount: number;
  noOfNft: number;
}

const BidModal = ({
  showBidModal,
  onComplete,
  title,
  amount,
  noOfNft,
}: IProps) => {
  const [form] = Form.useForm();

  const [payOutAmount, setpayOutAmount] = useState<number>(1);
  const [bid, setbid] = useState<number | null>(null);

  const initialFormData = {
    payOutAmount: payOutAmount,
    bidAmount: bid,
  };

  const cost = amount * payOutAmount;
  const serviceCharge = cost * 0.025;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    if (value > noOfNft) {
      setpayOutAmount(noOfNft);
    } else {
      setpayOutAmount(value);
    }
  };

  const handleCheckOut = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values = await form.validateFields();
    console.log(values);
  };

  return (
    <Modal
      title="Place a bid"
      open={showBidModal}
      onCancel={onComplete}
      footer={null}
    >
      <div>
        <div className="mt-5">
          <p className="text-lg text-[#15324395] mb-2">
            You are about to place a bid on&nbsp;
            <span className="font-bold capitalize text-[#0D3B54]">{title}</span>
          </p>
        </div>
        <Form autoComplete="on" form={form}>
          <h1 className="font-bold text-[#0D3B54] text-base">Your bid USDC</h1>
          <div>
            <Form.Item
              initialValue={initialFormData.bidAmount}
              name="bidAmount"
              rules={[
                {
                  required: true,
                  message: "Your bid is required",
                },
              ]}
            >
              <Input
                placeholder="Amount"
                className="input"
                type="number"
                name="bidAmount"
                step="1"
                id="bidAmount"
                onChange={(e) => setbid(e.target.valueAsNumber)}
              />
            </Form.Item>
            <h1 className="font-bold text-[#0D3B54] text-base">Enter quantity, {noOfNft} Available</h1>
            <Form.Item
              initialValue={initialFormData.payOutAmount}
              name="payOutAmount"
              rules={[
                {
                  required: true,
                  message: "Number of Nft is required",
                },
              ]}
            >
              <Input
                placeholder="Amount"
                className="input"
                type="number"
                name="payOutAmount"
                max={noOfNft}
                min={0}
                step="1"
                id="payOutAmount"
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>

          <div>
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[#15324395] text-base">Your bidding balance</p>
                <p className="font-bold text-[#0D3B54] text-base">0.013325 &nbsp;USDC</p>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[#15324395] text-base">Your balance</p>
                <p className="font-bold text-[#0D3B54] text-base">10.67856 &nbsp;USDC</p>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[#15324395] text-base">Service fee 2.5%</p>
                <p className="font-bold text-[#0D3B54] text-base">{serviceCharge} &nbsp;USDC</p>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[#15324395] text-base">You will pay</p>
                <p className="font-bold text-[#0D3B54] text-base">{cost + serviceCharge} &nbsp;USDC</p>
              </div>
              <div className="mt-10 block md:flex items-center justify-between">
                <div className="navbar w-full md:w-[45%]">
                  <Button
                    onClick={handleCheckOut as unknown as VoidFunction}
                    className="w-full"
                  >
                    Place a bid
                  </Button>
                </div>
                <Button
                  className="btn-pok-2 w-full text-base font-normal capitalize md:w-[45%] mt-5 md:mt-0"
                >
                  Mint
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default BidModal;
