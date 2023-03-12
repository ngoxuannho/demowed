import { Outlet, useLocation } from "react-router-dom";
import { Row, Col, Breadcrumb } from "antd";
import styled from "styled-components";
import CartCheckOut from "./CartCheckOut";
import { coolBlack, subText } from "../../rootStyledComponents";
import { Link } from "react-router-dom";
import { StyledBreadCrumb } from "../details/Product";
import { Content } from "antd/lib/layout/layout";
import { Container as ContainerBS } from "react-bootstrap";

export default () => {
  const location = useLocation();
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
    <Content>
      <Container>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Link to="/" className="ps-3">
            <Logo src={logoUrl} alt="the sus" />
          </Link>
          <StyledBreadCrumb>{breadcrumbItems}</StyledBreadCrumb>
          <ContainerBS>
            <Outlet />
          </ContainerBS>
        </Col>
        <CartCheckOut />
      </Container>
    </Content>
  );
};

const logoUrl =
  "https://shopgiaythethaogiare.com/wp-content/uploads/2020/03/AnChuongShoes-02.png";

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

