import styled from "styled-components";
import { useEffect, useState } from "react";
import { Modal, Row, Col } from "antd";
import ImageGallery from "react-image-gallery";
import SizeSelector from "../details/SizeSelector";
import addCartBar from "../details/AddCartBar";
import { ProductHolder, sizeMap } from "../details/Product";
import Options from "../details/Options";
import AddCartBar from "../details/AddCartBar";
import { addToCart } from "../../utils/addToCart";
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
    <Modal onOk={onOk} onCancel={onCancel} visible={visible} width={1000}>
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
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/02_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_c6367af4-64da-42fb-b754-affedbaf5360_1280x.jpg?v=1636413353",
                thumbnail:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/02_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_c6367af4-64da-42fb-b754-affedbaf5360_200x.jpg?v=1636413353",
              },
              {
                thumbnail:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/2021_Footwear_Walking_Boots_Women_Vegan_Sustainable3_200x.jpg?v=1636589360",
                original:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/2021_Footwear_Walking_Boots_Women_Vegan_Sustainable3_1280x.jpg?v=1636589360",
              },
              {
                thumbnail:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/06_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_8a0775c6-b229-4851-a877-446e98a00eee_200x.jpg?v=1636413353",
                original:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/06_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_8a0775c6-b229-4851-a877-446e98a00eee_1280x.jpg?v=1636413353",
              },
              {
                thumbnail:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/01_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_eca28d21-c9b9-4402-8ccf-574850b6917d_200x.jpg?v=1636413353",
                original:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/01_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_eca28d21-c9b9-4402-8ccf-574850b6917d_1280x.jpg?v=1636413353",
              },
              {
                thumbnail:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/05_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_f7fd2ef0-0a07-445f-be58-29203ffc1a8d_200x.jpg?v=1636413352",
                original:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/05_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_f7fd2ef0-0a07-445f-be58-29203ffc1a8d_1280x.jpg?v=1636413352",
              },
              {
                thumbnail:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/03_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_43f0804b-140a-4e81-b8e6-3423e7154405_200x.jpg?v=1636413353",
                original:
                  "https://cdn.shopify.com/s/files/1/0665/2889/products/03_TheWeekendBootZ_Grey_Sustainble_Vegan_2000x2000_43f0804b-140a-4e81-b8e6-3423e7154405_1280x.jpg?v=1636413353",
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
            <div className="price">$ {priceQty}</div>
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
                      price: price
                    })
                  )
                }
              >
                Add to Cart
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
