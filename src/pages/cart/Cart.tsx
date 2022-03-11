import { Container } from "react-bootstrap";
import BreadcrumbCart from "./BreadcrumbCart";
import { PageHeader, Dropdown, Menu, List, Button } from "antd";
import { ButtonLink } from "../../components/Buttons/ButtonLink";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/rootReducer";
import { iCart } from "../../utils/addToCart";
import { DeleteOutlined } from "@ant-design/icons";
import CartItem from "./CartItem";
import FooterCart from "./FooterCart";
import { delAll } from "../../slices/cartSlice";

export default () => {
  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const totalPrice = cart.reduce(
    (accumulator, current) => accumulator + current.price * current.qty,
    0
  );

  return (
    <>
      <BreadcrumbCart />
      <Holder>
        <PageHeader
          className="cart-header"
          onBack={() => window.history.back()}
          title="Your Cart"
          extra={<><BtnLink as={Button} size="large"  shape="round" type="text" danger onClick={() => dispatch(delAll())}>Clear cart</BtnLink><BtnLink to={"/checkout"}>Check Out</BtnLink></>}
          footer={<FooterCart totalPrice={totalPrice} />}
        >
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item: iCart) => (
              <List.Item key={item.id}>
                <CartItem item={item} />
              </List.Item>
            )}
          />
        </PageHeader>
      </Holder>
    </>
  );
};

const BtnLink = styled(ButtonLink)`
  padding: 6px 40px !important;
`;
const Holder = styled(Container)`
.cart-header {
  padding: 52px 24px;
}
  .ant-page-header-heading-title {
    font-size: 28px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  .product-left {
  }
`;
