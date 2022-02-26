import styled from "styled-components";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import { ReactNode, useState } from "react";
import { accent, lightGrey } from "../../rootStyledComponents";
import { Link } from "react-router-dom";

export default ({
  qty,
  clickIncrement,
  clickDecrement,
  addToCart,
  children,
  linkDisabled,
}: {
  children?: JSX.Element;
  qty: number;
  clickIncrement: any;
  clickDecrement: any;
  addToCart?: any;
  linkDisabled: boolean;
}) => {
  return (
    <CartBarWrapper>
      <InputHolder>
        <MinusOutlined onClick={clickDecrement} />
        <StyledInputNumber
          value={qty}
          min={1}
          max={10}
          defaultValue={1}
          size="small"
          controls={false}
          bordered={false}
          readOnly={true}
        />
        <PlusOutlined onClick={clickIncrement} />
      </InputHolder>
      {!linkDisabled && (
        <Link className="link" to={"/"}>
          <StyledBtn
            onClick={addToCart}
            size="large"
            block={true}
            shape="round"
            icon={<ShoppingCartOutlined />}
          >
            Add to cart
          </StyledBtn>
        </Link>
      )}
      {children}
    </CartBarWrapper>
  );
};

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

const CartBarWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: row;
  .link {
    display: block;
    width: 100%;
  }
  .ant-btn {
    background-color: ${accent};
    border: none;
    :hover {
      background-color: #000;
      border: none;
    }
    span {
      color: ${lightGrey};
      font-size: 16px;
      vertical-align: middle;
    }
    span:first-of-type {
      font-size: 1.4em;
      margin-right: 4px;
    }
  }

  @media (max-width: 678px) {
    flex-direction: column;
    ${InputHolder} {
      width: 100%;
    }
  }
`;

export const StyledBtn = styled(Button)`
  background-color: ${accent};
  border: none;
  :hover {
    background-color: #000;
    border: none;
  }
  span {
    color: ${lightGrey};
    font-size: 16px;
    vertical-align: middle;
  }
  span:first-of-type {
    font-size: 1.4em;
    margin-right: 4px;
  }
`;
