import { Row, Col } from "antd";
import { Link as RouterLink } from "react-router-dom";
import { Logo } from "../navigation/Nav";
import styled from "styled-components";
import { accent, secondaryTxt, subText } from "../../rootStyledComponents";
export default () => {
  return (
    <MyRow  gutter={[14,14]} justify="space-between">
      <MyCol lg={4} md={0} sm={0} xs={0}>
        <Link to="/home">
          <Logo src={logoUrl} alt="Logo" />
        </Link>
      </MyCol>
      <MyCol xs={12} sm={12} md={6} lg={5}>
        <ul>
          <div className="title">Our shop</div>
          <li>
            <Link to={"/shop"}>All product</Link>
          </li>
          <li>
            <Link to={"/shop"}>Best Seller</Link>
          </li>
          <li>
            <Link to={"/shop"}>New In</Link>
          </li>
          <li>
            <Link to={"/shop"}>Back in Stock</Link>
          </li>
        </ul>
      </MyCol>
      <MyCol xs={12} sm={12}  md={6} lg={5} >
        <ul className="unavailable">
          <div className="title">Help</div>
          <li>Size Guides</li>
          <li>Shipping Information</li>
          <li>Refund Policy</li>
          <li>Wear, Care and FAQ</li>
        </ul>
      </MyCol>
      <MyCol xs={12} lg={5} md={6} sm={12}>
        <ul className="unavailable">
          <div className="title">About Us</div>
          <li>Values </li>
          <li>Terms of Service</li>
          <li>Contact Us</li>
          <li>We're Hiring</li>
        </ul>
      </MyCol>
      <MyCol xs={12} lg={5} md={6} sm={12}>
        <ul className="contact">
          <div className="title">Get In Touch</div>
          <li>Call us at 0836650374</li>
          <li>Email: singed8@gmail.com</li>
          <li className="media">instagram</li>
          <li className="media">facebook</li>
          <li className="media">pinterest</li>
        </ul>
      </MyCol>
    </MyRow>
  );
};

const Link = styled(RouterLink)`
  :hover {
    color: unset;
  }
`;

const MyRow = styled(Row)`
  background-color: ${accent};
  padding: 32px;
`;
const MyCol = styled(Col)`
  display: flex;
  align-items: center;
  &:first-of-type {
    @media (max-width: 1200px) {
      display: none;
    }
  }
  .title {
    margin-bottom: 16px;
    font-size: 1em;
    color: white;
    font-weight: 600;
  }
  ul {
    padding: 0;
    text-decoration: none;
    color: white;
  }
  li {
    font-size: 0.9em;
    margin-bottom: 12px;
    opacity: 0.7;
    transition: color 0.4s;
    text-transform: capitalize;
    font-weight: 100;
    list-style: none;
    :hover {
      opacity: 1;
    }
  }
  .unavalable li {
    cursor: not-allowed;
  }
  .contact li {
    color: white;
    opacity: 1;
  }
  .media {
    margin-bottom: 4px;
    text-decoration: underline;
  }
`;

const logoUrl =
  "https://cdn.shopify.com/s/files/1/0665/2889/files/Thesus_A_W_Wordmark_White_400x.png?v=1635168580";
