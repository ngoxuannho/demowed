import { Row, Col, Input, Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { accent } from "../../rootStyledComponents";

export default ({ totalPrice }: { totalPrice: number }) => {
  return (
    <Wrapper>
      <Col sm={24} lg={12}>
        <Button shape="round" type="text" size="large">
          <StyledLink to="/shop">
            <span>Continue Shopping</span>
          </StyledLink>
        </Button>
      </Col>
      <Col sm={24} lg={6}>
        <Input.TextArea />
      </Col>
      <Col className="total-price d-flex" sm={24} lg={6}>
        <span>GRAND TOTAL:</span>
        <span> ${totalPrice}</span>
      </Col>
    </Wrapper>
  );
};

const StyledLink = styled(Link)`
  font-size: 1em;
  font-weight: 500;
`;
const Wrapper = styled(Row)`
  margin-top: 48px;
  > :first-child {
    @media (max-width: 576px) {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  .total-price {
    justify-content: end;
    > :first-child {
      margin-right: 4px;
    }
    color: ${accent};
    font-size: 1.4em;
    font-weight: 600;
  }
  @media (max-width: 576px) {
    > * {
      width: 100%;
      display: flex;
      justify-content: center !important;
    }
  }
`;
