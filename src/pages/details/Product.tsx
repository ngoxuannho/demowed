import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Breadcrumb, Col, Row } from "antd";
import { useGetProductQuery } from "../../slices/sneakersApi";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { accent } from "../../rootStyledComponents";
import Rating from "../../components/Rating";
import SizeSelector from "./SizeSelector";
import AddCartBar from "./AddCartBar";
import {addToCart} from "../../utils/addToCart"
import Options from "./Options";

interface BreadCrumbNameMap {
  [key: string]: any;
}

interface ImgsProps {
  small?: string;
  thumbnail?: string;
  original?: string;
}


export const sizeMap = [...Array(11)].map((_el, index: number) => {
  return 36 + index;
});

export default () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [colorSelected, setColorSelected] = useState<string>();
  const [qty, setQty] = useState<any>(1);
  const [selectedSize, setSelectedSize] = useState(sizeMap[0]);
  const [qtyPrice, setQtyPrice] = useState<number>();

  const { id } = useParams();
  const location = useLocation();
  const { data, isLoading, error } = useGetProductQuery(id);
  const product = data?.results[0];
  const productName = product?.title;
  const price = product?.retailPrice;
  const colorway = product?.colorway.split("/");
  const images = data?.results[0]?.media;
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbNameMap = ["Shop All", `${productName}`];
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[index]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 678) setIsSmallScreen(true);
      else setIsSmallScreen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallScreen]);

  useEffect(() => {
    data && setQtyPrice(price);
    data && setColorSelected(colorway[0]);
  }, [data]); // product default values

  useEffect(() => {
    setQtyPrice(price * qty);
  }, [qty]);

  const clickSetSize = (size: number): void => {
    setSelectedSize(size);
  };

  const clickIncrement = () => {
    if (qty == 10) return;
    setQty(qty + 1);
  };
  const clickDecrement = () => {
    if (qty == 1) return;
    setQty(qty - 1);
  };


  return (
    <>
      {data && (
        <Wrapper>
          <StyledBreadCrumb>{breadcrumbItems}</StyledBreadCrumb>
          <Row gutter={[16, 16]}>
            <Col md={{ span: 12 }} sm={{ span: 24 }}>
              <StyledImageGallery
                items={[
                  {
                    original: images?.imageUrl,
                    thumbnail: images?.thumbUrl,
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
                <div className="title">{productName}</div>
                <div className="price">$ {qtyPrice}</div>
                <div className="description">
                  It's our bestselling boot - but upgraded. Be anywhere and do
                  anything, in a boot that does it all. The Z is made with a
                  water resistant upper, extra warm lining and grippy rubber
                  sole. Featuring an inside zip that makes it easy to slip them
                  on-and-off for life on the go. And the best part - each pair
                  is 100% vegan and made with 95% natural and recycled
                  materials.
                </div>
                <div className="review">
                  <Rating className="rating" />
                  <div className="count">14 reviews</div>
                </div>
                <Options colorSelected={colorSelected} colorway={colorway} handleChange={setColorSelected} />
                <SizeSelector
                  selectedSize={selectedSize}
                  onClick={clickSetSize}
                  sizeMap={sizeMap}
                />
                <AddCartBar
                linkDisabled={false}
                  addToCart={() =>
                    addToCart({
                      id: product?.id,
                      options: colorSelected,
                      qty: qty,
                      size: selectedSize,
                    })
                  }
                  qty={qty}
                  clickDecrement={clickDecrement}
                  clickIncrement={clickIncrement}
                />
              </ProductHolder>
            </Col>
          </Row>
        </Wrapper>
      )}
    </>
  );
};

const StyledBreadCrumb = styled(Breadcrumb)`
  margin-top: 8px;
  margin-bottom: 52px;
  padding: 4px 4px;
  background-color: #efefef;
`;

const StyledImageGallery = styled(ImageGallery)`
  img.image-gallery-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    overflow: hidden;
  }
`;

export const ProductHolder = styled.div`
  @media (max-width: 800px) {
    padding: 0 12px !important;
  }
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  font-size: 16px;
  font-weight: 200px;
  line-height: 20px;
  padding-right: 8px;
  & > .title {
    font-size: 24px;
    line-height: 43.8px;
    color: ${accent};
    font-weight: 700;
  }
  .price {
    font-size: 42px;
    color: ${accent};
    font-weight: 500px;
  }
  .description {
  }
  .review {
    span {
      font-weight: 100;
    }
    .rating {
      margin-bottom: 8px;
    }
  }
`;


const Wrapper = styled.div`
  overflow-x: hidden;
`;
