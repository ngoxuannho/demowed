import styled from "styled-components";
import {ButtonLink} from "../Buttons/ButtonLink";

export const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(
      "https://cdn.shopify.com/s/files/1/0665/2889/files/2021_Indigo_Weekend_Walking_Boots__Women__Vegan_Sustainable_992x.jpg?v=1635455452,992w"
    );
  background-size: cover;
  min-height: 800px;
  background-position: center;
  overflow: hidden;
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
          <HeroBtn to={"/"}>Shop Now</HeroBtn>
        </div>
      </Wrapper>
    </Hero>
  );
};
