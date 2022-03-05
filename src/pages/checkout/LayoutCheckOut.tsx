import { Outlet, useLocation } from "react-router-dom";
import { Row, Col, Breadcrumb } from "antd";
import styled from "styled-components";
import CartCheckOut from "./CartCheckOut";
import { coolBlack, subText } from "../../rootStyledComponents";
import { Link } from "react-router-dom";
import { StyledBreadCrumb } from "../details/Product";

export default () => {
    const location = useLocation()
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbNameMap = ["Checkout", `Finish`];
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
  return (
    <Container >
      <Col lg={12} md={24}>
        <Link to="/" className="ps-3">
          <Logo src={logoUrl} alt="the sus" />
        </Link>
        <StyledBreadCrumb>{breadcrumbItems}</StyledBreadCrumb>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </Col>
      <CartCheckOut />
    </Container>
  );
};

const logoUrl =
  "https://cdn.shopify.com/s/files/1/0665/2889/files/Thesus_A_W_Wordmark_Forest_Green_2cca776c-1727-4416-868a-fa72e7359f08.png?v=1635783797";

const Logo = styled.img`
  max-width: min(195px, 100%);
  width: 100%;
  height: 105px;
  object-fit: contain;
  object-position: left center;
`;

const Container = styled(Row)`
  overflow-x: hidden;
  line-height: 18.4px;
  @media (min-width: 768px) {
    height: 100vh;
  }
  .main-txt {
    font-size: 14px;
    color: ${coolBlack};
  }
  .sub-txt {
    font-size: 12px;
    color: ${subText};
  }
  .bd-rad-8 {
    border-radius: 8%;
  }
`;

const Wrapper = styled.div`
padding: 0 20px ;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;
