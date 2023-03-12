import { Col, Row, Skeleton, Spin } from "antd";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  useGetByNameQuery,
  useGetProductsQuery,
  useLazyGetByNameQuery,
  useLazyGetProductsQuery,
} from "../../slices/sneakersApi";
import { Products } from "./Products";
import FilterBar from "./FilterBar";
import { useSearchParams } from "react-router-dom";
import { sort } from "../../utils/sort";
import { search } from "../../utils/search";
import { ResultAntd } from "../../components/Result";

interface Sneakers {
  [key: string]: any;
}

export const ProductsList = () => {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand") || "";
  const [data] = useLazyGetProductsQuery();
  const { isLoading, error } = useGetProductsQuery();
  const [products, setProduct] = useState<any>(undefined);
  const [sortedResults, setSortedResults] = useState<any>();
  const [listLayout, setListLayout] = useState(false);
  const sortOrder = searchParams.get("sort") || "";
  const searchValue = searchParams.get("search") || "";
  const sortData = sort(products, sortOrder);
  useEffect(() => {
    data()
      .unwrap()
      .then((data) => {
        searchValue
          ? setProduct(data.results.filter(search(searchValue)))
          : setProduct(data.results);
      });
  }, [searchValue]);
  useEffect(() => {
    setSortedResults(sortData);
  }, [products]);
  useMemo(() => {
    setSortedResults(sortData);
  }, [sortOrder]);
  console.log(isLoading);
  return (
    <Container className="mb-5">
      <FilterBar
        selectBlockLayout={() => setListLayout(false)}
        selectListLayout={() => setListLayout(true)}
      />
      <Spin spinning={isLoading}>
        <Row
          justify="center"
          gutter={[
            { lg: 40, md: 40, xs: 0 },
            { sm: 16, md: 20 },
          ]}
        >
          {isLoading ? (
            Array(12)
              .fill(null)
              .map((e: any, index: number) => (
                <Col
                  sm={listLayout ? { span: 24 } : { span: 24 }}
                  md={listLayout ? { span: 24 } : { span: 8 }}
                  xs={24}
                  key={index}
                >
                  <Skeleton />
                </Col>
              ))
          ) : error ? (
            <ResultAntd />
          ) : (
            sortedResults?.map(
              ({ id, name, retailPrice, media, colorway }: Sneakers) => (
                <Col
                  sm={listLayout ? { span: 24 } : { span: 24 }}
                  md={listLayout ? { span: 24 } : { span: 6 }}
                  xs={24}
                  key={id}
                >
                  <Products
                    to={`${id}`}
                    img={
                      "https://salt.tikicdn.com/ts/tmp/7a/4e/04/3aa0ff94437ecdb5b6a3829af97fc7f7.jpg"
                    }
                    imgSecondary={media.smallImageUrl}
                    title={name}
                    price={retailPrice}
                    description={
                      "QUANG ANH SHOP KÍNH CHÀO QUÝ KHÁCH * MẪU GIÀY SNEAKER MỚI ĐÃ CÓ MẶT TẠI QUANG ANH SHOP, HÀNG BAO CHUẨN, BAO ĐẸP* SHOP CHUYÊN GIÀY SNEAKER NAM CAO CẤP* ..."
                    }
                    listLayout={listLayout}
                    colorway={colorway.split("/")}
                    id={id}
                  />
                </Col>
              )
            )
          )}
        </Row>
      </Spin>
    </Container>
  );
};
