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
        <Input />
      </Form.Item>

      <Form.Item
        name={"firstName"}
        label="First Name"
        rules={[{ required: true, message: "Please input your first name" }]}
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

              return Promise.reject(new Error("Phone must have 10 numbers"));
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
          Checkout
        </Button>
      </Form.Item>
    </Form>
  );
};
