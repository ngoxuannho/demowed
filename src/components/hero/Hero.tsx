import styled from "styled-components";
import { height } from "../../rootStyledComponents";
import { ButtonLink } from "../Buttons/ButtonLink";

export const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(
      "https://a.ipricegroup.com/trends-article/top-3-mau-giay-converse-duoc-cac-ngoi-sao-quoc-te-ua-chuong-medium.jpg"
    );
  background-size: cover;
  min-height: 800px;
  background-position: center;
  overflow: hidden;
  margin-top: ${height}
`;
const Wrapper = styled.div`
  height: fit-content;
  max-height: min-content;
  justify-content: center;
`;
const Text = styled.div`
  text-align: center;
  font-size: 42px;
  color: white;
  text-align: center;
  @media (max-width: 768px) {
  font-size: 23px;
  }
`;
const Header = styled(Text)`
  font-size: 72px;
  @media (max-width: 768px) {
  font-size: 46px;
  }
`;
const SectionHeading = styled.div`
  /* position: relative;
  &::before {
    background: currentColor;
    width: 100%;
    top: 50%;
    height: 2px;
    margin-top: -1px;
    left: 0px;
    position: absolute;
    opacity: 0.1;
  } */
`;
const HeroBtn = styled(ButtonLink)`
  margin-top: 120px;
  @media (max-width: 768px) {
    margin-top: 90px;
  }
`
interface HeroProps {
  img?:string,
  text?: any,
  header?: string,
  className?: any
}

export default ({ img, text, header, className }: HeroProps) => {
  return (
    <Hero className={className}>
      <Wrapper>
        <Text>{text}</Text>
        <SectionHeading>
          <Header>{header}</Header>
        </SectionHeading>
        <div className="d-flex btn justify-content-center">
          <HeroBtn to={"/shop"}>Xem Sản Phẩm</HeroBtn>
        </div>
      </Wrapper>
    </Hero>
  );
};
