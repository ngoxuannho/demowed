import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/rootReducer";
import { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { addToUser } from "../../slices/userSlice";
import styled from "styled-components";

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
  style: {
    width: "100%"
  }
};

export default () => {
  const { user } = useSelector((state: RootState) => state);
  const { cart } = useSelector((state: RootState) => state);
  const [geoData, setGeoData] = useState<{}[]>([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
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
            message: "Email Không hợp lệ",
          },
          {
            required: true,
            message: "Vui lòng nhập email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={"firstName"}
        label="First Name"
        rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={"lastName"}
        label="Last Name"
        rules={[{ required: true, message: "Vui lòng nhập họ của bạn" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={"address"}
        label="Address"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ của bạn" }]}
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
            message: "Vui lòng chọn nơi cư trú của bạn!",
          },
        ]}
      >
        <Cascader options={geoData && geoData} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        tooltip="Nhập thông tin liên hệ"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập sđt của bạn",
          },
          () => ({
            validator(_, value) {
              if (
                !value ||
                (typeof value == "number" && value?.toString().length == 9)
              ) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("SĐT gồm 10 số"));
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
        Tôi đồng ý với <a href="">điều khoản</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <SubmitButton style={{color: "white !important"}} type="primary" htmlType="submit">
          Checkout
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

const SubmitButton = styled(Button)`
span {
  color: white ;
}
`;
