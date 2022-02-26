import { Col, Row } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { useGetProductsQuery } from "../../slices/sneakersApi";
import { Products } from "./Products";
import FilterBar from "./FilterBar";
import {addToCart} from "../../utils/addToCart";


interface Sneakers {
  [key: string]: any;
}

export const ProductsList = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [productslistLayout, setProductsListLayout] = useState(false);
  const [listLayout, setListLayout] = useState(false);
  return (
    <Container>
      <FilterBar
        selectBlockLayout={() => setListLayout(false)}
        selectListLayout={() => setListLayout(true)}
      />
      <Row justify="center" gutter={[4, { sm: 4, md: 8 }]}>
        {data?.results?.map(({ id, name, retailPrice, media, colorway }: Sneakers) => (
          <Col
            sm={listLayout ? { span: 24 } : { span: 12 }}
            md={listLayout ? { span: 24 } : { span: 8 }}
            key={id}
          >
            <Products
              to={`${id}`}
              img={"https://cdn.shopify.com/s/files/1/0665/2889/products/2021_Footwear_Walking_Boots_Women_Vegan_Sustainable3_1280x.jpg?v=1636589360"}
              imgSecondary={media.smallImageUrl}
              title={name}
              price={retailPrice}
              description={
                "It's our bestselling boot - but upgraded. Be anywhere and do anything, in a boot that does it all. The Z is made with a water resistant upper, extra warm lining and grippy rubber sole. Featuring an inside zip that makes it easy to slip them on-and-off for life on the go. And the best part - each pair is 100% vegan and made with 95% natural and recycled materials."
              }
              listLayout={listLayout}
              colorway = {colorway.split("/")}
              id={id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
