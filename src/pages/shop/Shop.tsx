import Hero from "../../components/hero/Hero";
import styled from "styled-components";
import { ProductsList } from"./ProductsList"

const HeroShop = styled(Hero)`
  min-height: 450px;
  background-image: url("https://cdn.shopify.com/s/files/1/0665/2889/files/2021_WeekendBoot__Women__Vegan_Sustainable2_992x.jpg?v=1641415254,992w");
  .btn {
    display: none !important;
  }
`;
export default () => {
  return (
    <>
      <HeroShop text={null} header={"Shop All"} /> <ProductsList />
      </>
  );
};
