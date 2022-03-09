import { Link } from "react-router-dom";
import styled from "styled-components";
import { Row, Col as ColBs } from "react-bootstrap";
import { accent } from "../../rootStyledComponents";
import Featured from "./FeaturedList";

const Title = styled.p`
  font-size: 1.15em;
  font-weight: 500;
  margin: 0;
  margin-bottom: 1em;
`;

const NavLink = styled(Link)`
  font-size: 0.97em;
  margin-bottom: 0.85em;
  opacity: 0.8;
  :hover {
    color: ${accent};
  }
`;

export const SubHeader = styled.div`
  position: absolute;
  font-family: "geometrix";
  padding: 16px 24px;
  width: 100%;
  left: 0;
  background-color: white;
  transform: translateX(0%) translateY(10%);
  max-height: 70vh;
  overflow: auto;
  padding: 1.5rem 1rem;
  top: 99%;
  opacity: 0;
  pointer-events: none;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  z-index: 10 !important;

  :hover {
    transform: translateX(0%) translateY(-0%);
    opacity: 1;
    pointer-events: all;
  }
`;
const Brand = styled.div`
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  column-gap: 2.5rem;
`;

const MyRow = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 12rem;
  @media (max-width: 1200px) {
    column-gap: 6rem;
  }
`;

export default ({ className }: { className: any }) => {
  return (
    <SubHeader className={className}>
      <MyRow className="d-flex justify-content-center">
        <Featured className="mb-3" />
        <Brand className="brand">
          <Title className="me-auto">Popular Brand</Title>
          <LinkWrapper>
            <div>
              <ul>
                <li>
                  <NavLink to={"shop/?search=adidas"}>Adidas</NavLink>
                </li>
                <li>
                  <NavLink to={"shop/?search=nike"}>Nike</NavLink>
                </li>
                <li>
                  <NavLink to={"shop/?search=converse"}>Converse</NavLink>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <NavLink to={"/shop"}>Dr.Martin</NavLink>
                </li>
                <li>
                  <NavLink to={"/shop"}>New Balance</NavLink>
                </li>
                <li>
                  <NavLink to={"/shop"}>Asis</NavLink>
                </li>
              </ul>
            </div>
          </LinkWrapper>
        </Brand>
      </MyRow>
    </SubHeader>
  );
};
