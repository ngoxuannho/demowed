import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  List,
  Badge,
} from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/rootReducer";
import { iCart } from "../../utils/addToCart";
import {
  backgroundGrey,
  borderBlack,
  btnGrey,
  coolBlack,
  lightGrey,
  subText,
} from "../../rootStyledComponents";
import { useRef } from "react";
import FloatingLabel from "../../components/floatingLabel/FloatingLabel";
const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const shipping = 3;

export default () => {
  const { cart } = useSelector((state: RootState) => state);
  const imgRef = useRef<any>(null);
  const [imgWidth, setImgWidth] = useState(imgRef.current?.offsetWidth);
  const [couponValue, setCouponValue] = useState<string | undefined>();
  const [form] = Form.useForm();
  useLayoutEffect(() => {
    setTimeout(() => {
      setImgWidth(imgRef.current?.offsetWidth);
    }, 0.1);
    window.addEventListener("resize", () => {
      setImgWidth(imgRef.current?.offsetWidth);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setImgWidth(imgRef.current?.offsetWidth);
      });
  }, []);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: any) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  const total = cart.reduce(
    (accumulator, current) => accumulator + current.price * current.qty,
    0
  );
  return (
    <Container gutter={[40, 40]}>
      <Col lg={12}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          {/* <Form.Item
            name="residence"
            label="Habitual Residence"
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select your habitual residence!",
              },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item> */}

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || typeof getFieldValue("phone") == "number" ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "Please enter number"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          {/* <Form.Item
            name="donation"
            label="Donation"
            rules={[
              {
                required: true,
                message: "Please input donation amount!",
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item> */}

          {/* <Form.Item
            name="website"
            label="Website"
            rules={[
              {
                required: true,
                message: "Please input website!",
              },
            ]}
          >
            <AutoComplete
              options={websiteOptions}
              onChange={onWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          </Form.Item> */}

          <Form.Item
            name="intro"
            label="Intro"
            rules={[
              {
                required: true,
                message: "Please input Intro",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          {/* <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item> */}

          <Form.Item
            label="Captcha"
            extra="We must make sure that your are a human."
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please input the captcha you got!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <BackgroundWrapper lg={12}>
        <CartItemHolder lg={15}>
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item: iCart) => (
              <List.Item>
                <Row align="middle" gutter={[24, 0]}>
                  <ImgWrapper imgWidth={imgWidth} ref={imgRef} lg={3}>
                    <Badge size="small" count={item.qty}>
                      <img src={item.thumbImg} alt={item.name} />
                    </Badge>
                  </ImgWrapper>
                  <Col className="name-holder" span={18}>
                    <div className="name main-txt">{item.name}</div>
                    <div className="size sub-txt">{item.size}</div>
                  </Col>
                  <Col lg={3} className="price main-txt">
                    $ {item.qty * item.price}
                  </Col>
                </Row>
              </List.Item>
            )}
          />
          <Coupon>
            <FloatingLabel
              label="Gift card or discount code"
              value={couponValue}
            >
              <Input
                value={couponValue}
                onChange={(e) => setCouponValue(e.target.value)}
                className="input"
              />
            </FloatingLabel>
            <Button className="btn bd-rad-8" size="large">
              Apply
            </Button>
          </Coupon>
          <Subtotal className="main-txt">
            <div className="subtotal">
              <span className="sub-txt">Subtotal</span>
              <span>$ {total}</span>
            </div>
            <div className="shipping">
              <span className="sub-txt">Shipping</span>
              <span>$ {shipping}</span>
            </div>
          </Subtotal>
          <Total>
            <div className="total main-txt">Total</div>
            <div className="total-value">
              <span className="prefix sub-txt">USD</span>
              <span className="value">${total + shipping}</span>
            </div>
          </Total>
        </CartItemHolder>
      </BackgroundWrapper>
    </Container>
  );
};

const Total = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  .total {
    font-size: 16px !important;
  }
  .total-value {
    display: flex;
    align-items: center;
  }
  .total-value .value {
    margin-left: 6px;
    font-size: 18px;
    color: ${coolBlack};
  }
`;

const Subtotal = styled.div`
  padding: 20px 0;
  border-bottom: ${borderBlack};
  > :last-child {
    margin-top: 4px;
  }
  .subtotal,
  .shipping {
    display: flex;
    justify-content: space-between;
  }
`;

const Coupon = styled.div`
  padding: 20px 0;
  display: flex;
  column-gap: 16px;
  align-items: center;
  border-bottom: ${borderBlack};
  .btn {
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${btnGrey};
    span {
      color: white !important;
      font-weight: 100;
    }
    :hover {
      border-color: unset;
      opacity: 0.8;
    }
  }

  /* Force update ant style */
  .ant-input {
    padding: 16px 12px 4px 11px;
    width: 100%;
  }

  .ant-select .ant-select-selector {
    padding: 16px 10px 4px 11px;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding: 16px 10px 4px 11px;
    height: 48px;
  }

  .ant-select-single .ant-select-selector .ant-select-selection-search {
    top: 16px;
  }
`;
const CartItemHolder = styled(Col)`
  padding-top: 56px;
  padding-left: 44px;
  background-color: inherit;
  padding-bottom: 8px;
  > :first-child {
    border-bottom: ${borderBlack};
    border-width: 2px;
    padding: 8px;
  }
  .price {
    display: flex;
    justify-content: end;
    padding: unset !important;
  }
`;
const ImgWrapper = styled(Col)<{ imgWidth: number }>`
  border: ${borderBlack};
  border-radius: 8%;
  width: 100%;
  height: ${({ imgWidth }) => `${imgWidth}px`};
  display: flex;
  align-items: center;
  /* padding: 0 4px; */
  background-color: white;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const BackgroundWrapper = styled(Col)`
  background-color: ${backgroundGrey};
  box-shadow: 1px 0 0 #e1e1e1 inset;
`;
const Container = styled(Row)`
  overflow-x: hidden;
  line-height: 18.4px;
  .main-txt {
    font-size: 14px;
    color: ${coolBlack};
  }
  .sub-txt {
    font-size: 12px;
    color: ${subText};
  }
  .bd-rad-8 {
    border-radius: 8%;
  }
`;
