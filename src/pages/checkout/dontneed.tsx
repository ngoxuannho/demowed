import  { useEffect, useState, useLayoutEffect } from "react";
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
  message,
} from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
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
import { addToUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

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

type ValidateStatus = Parameters<typeof Form.Item>[0]["validateStatus"];

interface iPhoneStatus {
  validateStatus: ValidateStatus;
  errorMsg: string | null;
}

export default () => {
  const { cart } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);
  const imgRef = useRef<any>(null);
  const [imgWidth, setImgWidth] = useState(imgRef.current?.offsetWidth);
  const [couponValue, setCouponValue] = useState<string | undefined>();
  const [geoData, setGeoData] = useState<{}[]>([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [phoneStatus, setPhoneStatus] = useState<iPhoneStatus>({
  //   validateStatus: "success",
  //   errorMsg: null,
  // });

  // function validatePhone(number: number): iPhoneStatus {
  //   if (number === 10) {
  //     return {
  //       validateStatus: "success",
  //       errorMsg: null,
  //     };
  //   }
  //   return {
  //     validateStatus: "error",
  //     errorMsg: "Phone number must have 10 numbers",
  //   };
  // }

  useLayoutEffect(() => {
    setTimeout(() => {
      setImgWidth(imgRef.current?.offsetWidth);
    }, 100);
    window.addEventListener("resize", () => {
      setImgWidth(imgRef.current?.offsetWidth);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setImgWidth(imgRef.current?.offsetWidth);
      });
  }, []); // create square

  const onFinish = (values: any) => {
    // message.success("Chechout successful !");
    dispatch(addToUser(values));
    if (cart.length == 0) return message.error("Your cart is empty !");
    else {
      console.log("Received values of form: ", values);
      message.success("Chechout successful !");
      navigate("/checkout/order-info");
    }
  };
  const total = cart.reduce(
    (accumulator, current) => accumulator + current.price * current.qty,
    0
  );
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://provinces.open-api.vn/api/?depth=3");
      const json: {}[] = await data.json();
      const datamap = json.map<{
        value: string;
        label: string;
        children: [];
      }>((item: any) => {
        return {
          value: item.codename,
          label: item.name,
          children: item.districts.map((item: any) => ({
            value: item.codename,
            label: item.name,
            children: item.wards.map((item: any) => ({
              value: item.short_codename,
              label: item.name,
            })),
          })),
        };
      });
      setGeoData(datamap);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <Container gutter={[40, 40]}>
      <FormWrapper lg={12} md={24}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          size="large"
          initialValues={user}
          scrollToFirstError
          validateTrigger="onSubmit"
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
           <Input/>
          </Form.Item>

          <Form.Item
            name={"firstName"}
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"lastName"}
            label="Last Name"
            rules={[{ required: true, message: "Please input your last name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"address"}
            label="Address"
            rules={[{ required: true, message: "Please input your address" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"apartment"}
            label="Apartment, suite, etc, ..."
            requiredMark="optional"
          >
            <Input />
          </Form.Item>

          <Form.Item
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
            <Cascader options={geoData && geoData} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            tooltip="In case we need to contact you about your orders"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              () => ({
                validator(_, value) {
                  if (
                    !value ||
                    (typeof value == "number" && value?.toString().length == 9)
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Phone must have 10 numbers")
                  );
                },
              }),
            ]}
          >
            <InputNumber
              onChange={() => console.log(form.getFieldValue("phone")?.length)}
              addonBefore={"+84"}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item name="request" label="Request" requiredMark="optional">
            <Input.TextArea showCount maxLength={100} />
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
      </FormWrapper>
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

const FormWrapper = styled(Col)`
  padding-top: 56px;
  padding-right: 20px;
`;

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
  @media (min-width: 678px) {
    height: calc(100vh -105px);
  }
  height: calc(100vh - 105px);
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
