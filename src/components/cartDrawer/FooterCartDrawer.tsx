import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/rootReducer";
import { accent } from "../../rootStyledComponents";
import { ButtonLink } from "../Buttons/ButtonLink";
import { Button } from "antd";
import { Link } from "react-router-dom";
export default ({onClose} : {onClose: () => void}) => {
  const { cart } = useSelector((state: RootState) => state);
  const total = cart.reduce<number>((accumulator, current) => {
    return accumulator + current.price * current.qty;
  }, 0);

  return (
    <Wrapper>
      <div className="total-price">
        Total Price:
        <div className="value ms-auto">$ {total}</div>
      </div>
      <Buttons>
        <Button onClick={onClose} className="antd-btn" type="text" shape="round">
          <Link  to="/cart">
            <u  >View Cart</u>
          </Link>
        </Button>
        <ButtonLink onClick={onClose} to="/checkout">Check Out</ButtonLink>
      </Buttons>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .total-price {
    display: flex;
    font-size: 1.5em;
    margin: 16px 0;
    .value {
      color: ${accent};
      font-weight: 700;
    }
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  ${ButtonLink} {
    padding: 6px 8px;
  }
  .antd-btn {
    padding: 6px 8px;
    font-size: 16px;
    color: ${accent};
  }
`;
