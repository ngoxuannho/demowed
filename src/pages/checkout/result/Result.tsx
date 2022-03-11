import { Result, Button, List } from "antd";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { delAll } from "../../../slices/cartSlice";
import SubTitle from "./SubTitle";
import styled from "styled-components";
import { accent } from "../../../rootStyledComponents";

export default () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useLayoutEffect(() => {
    console.log(location);
    dispatch(delAll());
  }, [location]);
  return (
    <Result
      status={"success"}
      title="Successfully make an order"
      subTitle={<SubTitle />}
      extra={
        <Link to={"/shop"}>
          <StyledBtn size="large" type="primary" shape="round">
            Back to Shop{" "}
          </StyledBtn>
        </Link>
      }
    />
  );
};
const StyledBtn = styled(Button)`
span {
  color: white;
}
`; 
