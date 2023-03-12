import styled from "styled-components";
import { useEffect, useState } from "react";
import { Modal, Row, Col } from "antd";
import ImageGallery from "react-image-gallery";
import SizeSelector from "../details/SizeSelector";
import addCartBar from "../details/AddCartBar";
import { ProductHolder, sizeMap } from "../details/Product";
import Options from "../details/Options";
import AddCartBar from "../details/AddCartBar";
import {  iCart } from "../../utils/addToCart";
import { StyledBtn } from "../details/AddCartBar";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCartSlice } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/rootReducer";
interface ModalProps {
  id: number;
  imgUrl: string;
  thumbUrl?: string;
  isSmallScreen?: boolean;
  name: string;
  price: number;
  colorway: string[];
  [key: string]: any;
}
export default ({
  id,
  imgUrl,
  thumbUrl,
  isSmallScreen,
  colorway,
  name,
  price,
  visible,
  onOk,
  onCancel,
}: ModalProps) => {
  const [selectedColor, setSelectedColor] = useState(colorway[0]);
  const [selectedSize, setSelectedSize] = useState(sizeMap[0]);
  const [qty, setQty] = useState(1);
  const [priceQty, setPriceQty] = useState(price);
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state);
  useEffect(() => {
    const index = cart.findIndex((item: iCart) => item.id == id);
    if (index >= 0) {
      const item = cart[index];
      setSelectedSize(item.size);
      setSelectedColor(item.options);
      setQty(item.qty);
    }
  }, [cart]);
  useEffect(() => {
    setPriceQty(qty * price);
  }, [qty]);
  const clickIncrement = () => {
    if (qty == 10) return;
    setQty(qty + 1);
  };
  const clickDecrement = () => {
    if (qty == 1) return;
    setQty(qty - 1);
  };
  return (
    <Modal footer={null} onOk={onOk} onCancel={onCancel} visible={visible} width={1000}>
      <Row gutter={[16, 16]}>
        <Col md={{ span: 12 }} sm={{ span: 24 }}>
          <ImageGallery
            items={[
              {
                original: imgUrl,
                thumbnail: thumbUrl,
              },
              {
                original:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
                thumbnail:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
              },
              {
                original:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
                thumbnail:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
              },{
                original:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
                thumbnail:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
              },{
                original:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
                thumbnail:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
              },{
                original:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
                thumbnail:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
              },{
                original:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
                thumbnail:
                  "https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg",
              },
            ]}
            thumbnailPosition={isSmallScreen ? "bottom" : "left"}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
          />
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 24 }}>
          <ProductHolder>
            <div className="title">{name}</div>
            <div className="price">$ {price}</div>
            <Options
              colorway={colorway}
              colorSelected={selectedColor}
              handleChange={setSelectedColor}
            />
            <SizeSelector
              selectedSize={selectedSize}
              onClick={setSelectedSize}
              sizeMap={sizeMap}
            />
            <AddCartBar
              linkDisabled={true}
              qty={qty}
              clickIncrement={clickIncrement}
              clickDecrement={clickDecrement}
            >
              <StyledBtn
                size="large"
                block={true}
                shape="round"
                icon={<ShoppingCartOutlined />}
                onClick={() =>
                  dispatch(
                    addToCartSlice({
                      id: id,
                      options: selectedColor,
                      thumbImg: thumbUrl,
                      name: name,
                      qty: qty,
                      size: selectedSize,
                      price: price,
                      colorway: colorway,
                    })
                  )
                }
              >
                Thêm Vào giỏ
              </StyledBtn>
            </AddCartBar>
          </ProductHolder>
        </Col>
      </Row>
    </Modal>
  );
};

const ModalCartBar = styled(AddCartBar)`
  a {
    display: none;
  }
`;

const Title = styled.div``;
const Price = styled.div``;
