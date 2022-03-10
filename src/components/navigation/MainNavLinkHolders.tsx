import styled from "styled-components";
import SubHeader from "./SubHeader";
import { baseFontSize, accent } from "../../rootStyledComponents";

import { useRef, useState, useEffect } from "react";
import { NavLink } from "./FeaturedList";
import { Link } from "react-router-dom";
import {
  DownOutlined,
  EllipsisOutlined,
  HomeFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { Drawer, Menu, Space, Dropdown } from "antd";

const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.ItemGroup title={<Link to="/shop">Featured</Link>}>
      <Menu.Item>
        <Link to="#">Best Seller</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="#">New In</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="#">Back in stock</Link>
      </Menu.Item>
    </Menu.ItemGroup>
    <Menu.Divider />
    <Menu.Item title={"Value"} disabled>
      Value
    </Menu.Item>
  </Menu>
);

export default () => {
  const [display, setDisplay] = useState(false);
  const [displayDropdowns, setDisplayDropdowns] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  // const activeRef = useRef<any>(null);
  // const toggleDisplay = () => setDisplay(!display);
  // const toggleDropdowns = () => setDisplayDropdowns(!displayDropdowns);
  // const ref = useRef<any>();
  // useEffect(() => {
  //   const checkIfClickedOutside = (e: any) => {
  //     if (display && ref.current && !ref.current.contains(e.target)) {
  //       setDisplay(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // }, [display]);
  // const toggle = () => {
  //   const element = activeRef?.current.classList;
  //   element.toggle("active");
  // };
  return (
    <>
      <CollapseIcon onClick={showDrawer} />
      {/* <MainNavLinks ref={ref} display={display}> */}
      <Drawer visible={visible} placement="left" onClose={onClose}>
        <Menu style={{border: "none"}} onSelect={onClose} mode="inline">
          <SubMenu  title={<Link to="/shop">Shop All</Link>}>
            <SubMenu title={<Link to="/shop">Featured</Link>}>
              <Menu.Item>
                <Link to="#">Best Seller</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#">New In</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#">Back in stock</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu  title={<Link to="/shop">Brand</Link>}>
              <Menu.Item>
                <Link to="/shop?search=adidas">Adidas</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="shop?search=nike">Nike</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="shop?search=converse">Converse</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <Menu.Item title={"Value"} disabled>
            Value
          </Menu.Item>
        </Menu>
      </Drawer>
      <MainNavLinks>
        <Wrapper className="shop">
          <MainNavLink to={"shop"}>Shop</MainNavLink>
        </Wrapper>
        <MainNavLink className="values" to={"#"}>
          Values
        </MainNavLink>
        <SubHeaderStyled />
      </MainNavLinks>
    </>
  );
};

const MainNavLink = styled(Link)`
  font-size: ${baseFontSize};
  color: ${accent};
  padding: 0.1rem 1.25rem;
  margin: 0rem 0.15rem;
  :hover {
    color: ${accent};
    opacity: 1 !important;
  }
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
  &.values {
    cursor: not-allowed;
  }
`;

interface StyledProps {
  display?: boolean;
}

const MainNavLinks = styled.div<StyledProps>`
  display: flex;
  height: 100%;
  align-items: center;
  :hover ${MainNavLink} {
    opacity: 0.6;
    transition: opacity 1s;
  }
  @media (max-width: 768px) {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: unset;
    padding: 16px;
    top: 0;
    left: 0;
    width: calc(100vw - 5rem);
    height: 100vh;
    background-color: white;
    display: ${({ display }): string => (display ? "flex" : "none")};
  }
`;

const SubHeaderStyled: any = styled(SubHeader)`
`;
const Wrapper = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (min-width: 769px) {
    display: flex;
    height: 100%;
    > :first-child {
      align-self: center;
    }
    :hover ~ ${SubHeaderStyled} {
      opacity: 1;
      transform: translateX(0%) translateY(0%);
      transition: opacity 0.6s, transform 0.3s;
      pointer-events: all;
    }
  }
`;
const CollapseIcon = styled(HomeFilled)`
  display: none;
  width: 48px;
  font-size: 1.2em;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-self: center;
  }
`;

