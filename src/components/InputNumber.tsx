import { InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { accent } from "../rootStyledComponents";

interface iInputNumber {
qty: number,
clickDecrement: () => void,
clickIncrement: () => void,
}

export default ({qty, clickDecrement, clickIncrement} : iInputNumber) => {
  return (
    <InputHolder className="input-holder">
      <MinusOutlined onClick={() => clickDecrement()} />
      <StyledInputNumber
        value={qty}
        min={1}
        max={10}
        defaultValue={qty}
        size="small"
        controls={false}
        bordered={false}
        readOnly={true}
      />
      <PlusOutlined onClick={() => clickIncrement()} />
    </InputHolder>
  );
};

const InputHolder = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6.4px 20px;
  width: fit-content;
  border: 1px solid ${accent};
  border-radius: 5px;
  span {
    cursor: pointer;
    font-size: 12px;
    align-self: center;
  }
`;

const StyledInputNumber = styled(InputNumber)`
  & {
    display: flex;
    align-items: center;
  }
  input {
    text-align: center;
    width: 100%;
  }
`;
