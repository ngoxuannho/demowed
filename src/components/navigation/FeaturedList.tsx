import styled from "styled-components";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { accent } from "../../rootStyledComponents";
import { PlusOutlined } from "@ant-design/icons";

const Title = styled(Link)`
  display: block;
  font-size: 1.15em;
  font-weight: 500;
  margin-bottom: 1em;
`;
export const NavLink = styled(Link)`
  font-weight: 200;
  font-size: 0.97em;
  margin-bottom: 0.85em;
  opacity: 0.8;
  :hover {
    color: ${accent};
    opacity: 1;
  }
`;
const Wrapper = styled.div`
  display: block;
`;
const List = styled.ul`
  padding: 0;
  margin: 0;
`;
const Item = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const PlusIcon = styled(PlusOutlined)`
  display: none;
  @media (max-width: 768px) {
    display: inline-block;
  }
`;

export default ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <Title to={"shop"}>Giày </Title>
      <List>
        <Item>
          <NavLink to={"#"}>Giày bán chạy</NavLink>
        </Item>
        <Item>
          <NavLink to={"#"}>Giày Mới</NavLink>
        </Item>
        <Item>
          <NavLink to={"#"}>Giày cũ</NavLink>
        </Item>
      </List>
    </div>
  );
};
