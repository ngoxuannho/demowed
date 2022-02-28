import { iCart } from "../../utils/addToCart";
import { Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState, useEffect } from "react";
import InputNumber from "../InputNumber";
import { accent } from "../../rootStyledComponents";
import { useDispatch } from "react-redux";
import { addToCartSlice } from "../../slices/cartSlice";

interface iCartDrawerItem {
  cartItem: iCart;
  delProduct: () => void;
}

export default ({ cartItem, delProduct }: iCartDrawerItem) => {
  const [qty, setQty] = useState<number>(cartItem.qty);
  const [price, setPrice] = useState<number>(cartItem.price * qty);
  const dispatch = useDispatch();
  useEffect(() => {
    setPrice(qty * cartItem.price);
  }, [qty]);
  const clickIncrement = (): void => {
    if (qty > 9) return;
    const updateQty = { ...cartItem, qty: qty + 1 };
    setQty(qty + 1);
    dispatch(addToCartSlice(updateQty));
  };
  const clickDecrement = (): void => {
    if (qty < 2) return;
    const updateQty = { ...cartItem, qty: qty - 1 };
    setQty(qty - 1);
    dispatch(addToCartSlice(updateQty));
  };
  return (
    <Wrapper gutter={16} align={"middle"}>
      <Col className="thumbImgHolder" span={6}>
        <ThumbImgHolder>
          <img src={cartItem.thumbImg} alt={cartItem.name} />
        </ThumbImgHolder>
      </Col>
      <Col span={16} className="productInfo">
        <div className="name">{cartItem.name}</div>
        <div className="price">$ {price}</div>

        <CartDrawerInputNumber
          qty={qty}
          clickIncrement={clickIncrement}
          clickDecrement={clickDecrement}
        />
      </Col>
      <Col className="bin" span={2}>
        <DeleteOutlined onClick={delProduct} />
      </Col>
    </Wrapper>
  );
};

const ThumbImgHolder = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Wrapper = styled(Row)`
  font-size: 1em;
  .productInfo {
    margin: 12px 0;
    .price {
      font-size: 1.3em;
      color: ${accent};
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
  .bin svg {
    font-size: 1.2em;
  }
`;

const CartDrawerInputNumber = styled(InputNumber)`
  &.input-holder {
    padding: 4px 20px !important;
    background-color: red;
  }
`;

const Options = styled.div<{ cartDrawer: boolean }>`
  display: flex;
  .color {
    display: ${({ cartDrawer }) => cartDrawer && "none"};
  }
  .size {
    display: ${({ cartDrawer }) => cartDrawer && "none"};
  }
`;
