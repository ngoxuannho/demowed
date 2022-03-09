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
    <SubMenu>
      {/* <Menu.Item>
        <Link to="#">Best Seller</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="#">New In</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="#">Back in stock</Link>
      </Menu.Item> */}
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <Link to="#">Best Seller</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">New In</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">Back in stock</Link>
            </Menu.Item>
          </Menu>
        }
      >
        <Space align="center">
          <Link to="/shop">Featured</Link>
          <PlusOutlined />
        </Space>
      </Dropdown>
    </SubMenu>
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
        <Dropdown trigger={["click", "hover"]} overlay={menu}>
          <Space style={{ width: "100%" }} align={"center"}>
            <Link style={{ fontSize: "16px", color: `${accent}` }} to="/shop">
              Shop All
            </Link>{" "}
            <DownOutlined />
          </Space>
        </Dropdown>
      </Drawer>
      <MainNavLinks>
        <Wrapper className="shop">
          <MainNavLink to={"shop"}>Shop</MainNavLink>
          {/* {display && <Icon onClick={toggleDropdowns} />} */}
        </Wrapper>
        {/* {displayDropdowns && (
          <Dropdown>
            <div className="mask"></div>
            <FtDropdown>
              <Title to={"#"}>Featured</Title>
              <DownOutlined as={Icon} onClick={toggle} />
            </FtDropdown>
            <List ref={activeRef}>
              <Item>
                <NavLink to={"#"}>Best Seller</NavLink>
              </Item>
              <Item>
                <NavLink to={"#"}>New In</NavLink>
              </Item>
              <Item>
                <NavLink to={"#"}>Back In Stock</NavLink>
              </Item>
            </List>
          </Dropdown>
        )} */}
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
  /* @media (min-width: 769px) {
    ${MainNavLink}:first-of-type:hover ~ & {
      opacity: 1;
      transform: translateX(0%) translateY(0%);
      transition: opacity 0.8s, transform 0.4s;
      pointer-events: all;
    }
  } */
`;
const Icon = styled(PlusOutlined)`
  width: 16px;
  @media (min-width: 769px) {
    display: none;
  }
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
const Title = styled(Link)`
  display: block;
  padding: 0.1rem 1.25rem;
  margin: 0rem 0.15rem;
  font-size: 1.15em;
  font-weight: 200;
  margin-bottom: 1em;
  pointer-events: none;
  opacity: 0;
  :hover {
    opacity: 1 !important;
  }
  @media (max-width: 768px) {
    opacity: 0.6 !important;
    pointer-events: all;
    margin-bottom: 0.2em;
  }
`;
const List = styled.ul`
  padding: 0 28px;
  margin: 0;
  pointer-events: none;
  opacity: 0;
  height: 0;
  padding-bottom: 12px;

  &.active {
    height: 50px !important;
    opacity: 1;
    pointer-events: all;
    transition: opacity 0.5s, height 0.4s !important;
  }
`;
const Item = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FtDropdown = styled.div`
  display: flex;
  justify-content: space-between;
  &,
  & + ${List} {
    @media (min-width: 769px) {
      display: none;
    }
  }
`;

// const Dropdown = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   background-color: red;
// `;
