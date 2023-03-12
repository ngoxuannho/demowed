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
          <div className="title">Cửa Hàng </div>
          <li>
            <Link to={"/shop"}>Tất Cả Sản Phẩm</Link>
          </li>
          <li>
            <Link to={"/shop"}>Snr Phẩm Bán Chạy</Link>
          </li>
          <li>
            <Link to={"/shop"}>Sản Phẩm Mới</Link>
          </li>
          <li>
            <Link to={"/shop"}>Sản Phẩm đi học</Link>
          </li>
        </ul>
      </MyCol>
      <MyCol xs={12} sm={12}  md={6} lg={5} >
        <ul className="unavailable">
          <div className="title">Hổ trợ </div>
          <li>Size</li>
          <li>Thủ Tục Thanh Toán</li>
          <li>Đổi trả hàng</li>
          <li>Mua Hàng</li>
        </ul>
      </MyCol>
      <MyCol xs={12} lg={5} md={6} sm={12}>
        <ul className="unavailable">
          <div className="title">Về chúng tôi</div>
          <li>Thông Tin</li>
          <li>Liên Hệ </li>
          <li>GiớI thiệu</li>
          <li>GiớI thiệu</li>
        </ul>
      </MyCol>
      <MyCol xs={12} lg={5} md={6} sm={12}>
        <ul className="contact">
          <div className="title">Liên Lạc</div>
          <li>SĐT 0999999999</li>
          <li>Email: nhoga@gmail.com</li>
          <li className="media">youtube</li>
          <li className="media">facebook</li>
          <li className="media">githut</li>
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
  "https://png.pngtree.com/template/20191218/ourlarge/pngtree-modern-logos-for-sneakers-can-be-used-for-store-logos-or-image_340676.jpg";
