import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Breadcrumb, Col, Row, Skeleton, Spin } from "antd";
import { useGetProductQuery } from "../../slices/sneakersApi";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { accent } from "../../rootStyledComponents";
import Rating from "../../components/Rating";
import SizeSelector from "./SizeSelector";
import AddCartBar from "./AddCartBar";
import Options from "./Options";
import { useDispatch } from "react-redux";
import { addToCartSlice } from "../../slices/cartSlice";
import { ResultAntd } from "../../components/Result";

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
  const dispatch = useDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [colorSelected, setColorSelected] = useState<string>("");
  const [qty, setQty] = useState<number>(1);
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
  console.log(error);
  return (
    <>
      {error ? (
        <ResultAntd />
      ) : (
        <Wrapper>
          <StyledBreadCrumb>{breadcrumbItems}</StyledBreadCrumb>
          <MySpin spinning={isLoading}>
            {" "}
            <Row gutter={[20, 16]}>
              <Col md={{ span: 12 }} sm={{ span: 24 }}>
                <StyledImageGallery
                  items={[
                    {
                      original: images?.imageUrl,
                      thumbnail: images?.thumbUrl,
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
                  <div className="title">{productName}</div>
                  <div className="price">$ {qtyPrice}</div>
                  <div className="description">
                  Thiết kế của giày đã đa dạng và phong phú vô cùng theo thời gian, văn hoá và mục đích sbmkdụng. Ngoài ra thời trang cũng chi phối nhiều yếu tố thiết kế, chẳng hạn như giày có gót rất cao (giày cao gót) hay có gót phẳng (giày thể thao). Giày dép hiện đại rất khác nhau về mục đích sử dụng, phong cách và giá thành. Dép đơn giản có thể rất mỏng và chỉ bao gồm một dây duy nhất trong khi giày thời trang hiện đại có thể được làm từ các vật liệu rất tốn kém, kết cấu phức tạp và giá hàng ngàn đôla một đôi. Các loại giày khác cho các mục đích sử dụng khác như giày leo núi hay giày trượt tuyết,...
                  </div>
                  <div className="review">
                    <Rating className="rating" />
                    <div className="count">10000 đánh giá</div>
                  </div>
                  <Options
                    colorSelected={colorSelected}
                    colorway={colorway}
                    handleChange={setColorSelected}
                  />
                  <SizeSelector
                    selectedSize={selectedSize}
                    onClick={clickSetSize}
                    sizeMap={sizeMap}
                  />
                  <AddCartBar
                    linkDisabled={false}
                    addToCart={() =>
                      dispatch(
                        addToCartSlice({
                          id: product?.id,
                          thumbImg: images.thumbUrl,
                          name: product?.name,
                          options: colorSelected,
                          qty: qty,
                          size: selectedSize,
                          price: price,
                          colorway: colorway,
                        })
                      )
                    }
                    qty={qty}
                    clickDecrement={clickDecrement}
                    clickIncrement={clickIncrement}
                  />
                </ProductHolder>
              </Col>
            </Row>
          </MySpin>
        </Wrapper>
      )}
    </>
  );
};

export const StyledBreadCrumb = styled(Breadcrumb)`
  margin-top: 8px;
  margin-bottom: 52px;
  padding: 4px 12px;
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
  margin-bottom: 52px;
`;

const MySpin = styled(Spin)`
  height: 100vh;
`;
