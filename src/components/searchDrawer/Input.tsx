import { Input, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useLayoutEffect } from "react";
interface iProps {
  focus: boolean;
}
export default ({ focus }: iProps) => {
  const inputRef = useRef<any>(null);
  inputRef && inputRef.current?.focus();
  useEffect(() => {
    inputRef && inputRef.current?.focus();
  }, [focus]);
  return (
    <Form>
      <Input
        ref={inputRef}
        bordered={false}
        prefix={<SearchOutlined />}
        placeholder="Converse ..."
      />
    </Form>
  );
};
