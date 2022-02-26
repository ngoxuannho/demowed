
import { Link } from "react-router-dom";
import {
  baseFontSize,
  height,
} from "../../rootStyledComponents";
import styled from "styled-components";
import MainNavLinkHolders from "./MainNavLinkHolders";
import { SearchOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
const logoUrl =
  "https://cdn.shopify.com/s/files/1/0665/2889/files/Thesus_A_W_Wordmark_Forest_Green_2cca776c-1727-4416-868a-fa72e7359f08.png?v=1635783797";

const Logo = styled.img`
  max-width: min(195px, 100%);
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left center;
`;

const Nav = styled.nav`
  height: 100%;
`;

const Header = styled.header`
  position: relative;
  padding: 0 ${baseFontSize};
  height: ${height};
  min-height: max(${height}, 4em);
`;

const HeaderIcons = styled.div`
  display: flex;
  * {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 4px;
  }
  @media (max-width: 768px) {
    & > *:first-of-type {
      display: none;
    }
  }
`;

const Dflex = styled.div`
  display: flex;
`;

export default () => {
  return (
    <>
      <Header className="fg-reg d-flex align-items-center justify-content-between">
        <Link
          className=" order-md-1 order-2  "
          style={{ maxWidth: "min(195px, 100%)" }}
          to="/"
        >
          <Logo src={logoUrl} alt="the sus" />
        </Link>
        <Nav className="d-flex order-md-2 order-1">
          <MainNavLinkHolders  />
        </Nav>
        <HeaderIcons className="order-md-3 order-3  ">
        <UserOutlined/>
          <SearchOutlined/>
          <ShoppingOutlined />
        </HeaderIcons>
      </Header>
    </>
  );
};
