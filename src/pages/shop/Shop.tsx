import Hero from "../../components/hero/Hero";
import styled from "styled-components";
import { ProductsList } from"./ProductsList"

const HeroShop = styled(Hero)`
  min-height: 450px;
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacenqY0Kh1fXkQGE9KSelc58E0FchE-cRSw&usqp=CAU");
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
