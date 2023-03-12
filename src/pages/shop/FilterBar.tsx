import { AppstoreFilled, ProfileFilled, FilterFilled } from "@ant-design/icons";
import { Menu, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { MouseEventHandler } from "react";
import { useSearchParams } from "react-router-dom";
import FilterMenu from "./FilterMenu";

export default ({
  selectBlockLayout,
  selectListLayout,
}: {
  selectBlockLayout: MouseEventHandler<HTMLSpanElement>;
  selectListLayout: MouseEventHandler<HTMLSpanElement>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onClick = ({ key }: { key: string }) => {
    message.info(`Filter ${key}`);
    const allSearchParams = Object.fromEntries([...searchParams]);
    setSearchParams({...allSearchParams,sort: key.toLowerCase()});
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="Default">Filter</Menu.Item>
      <Menu.Item key="A-Z">Từ: A-Z</Menu.Item>
      <Menu.Item key="Z-A">Từ: Z-A</Menu.Item>
      <Menu.Item key="High-Low">Giá: Thấp-Cao</Menu.Item>
      <Menu.Item key="Low-High">Giá: Cao-Thấp</Menu.Item>
      <Menu.Item key="Latest">Sản Phẩm: Mới-Cũ</Menu.Item>
      <Menu.Item key="Oldest">Sản Phẩm: Cũ-Mới</Menu.Item>
    </Menu>
  )
  return (
    <FilterBar>
      <AppstoreFilled onClick={selectBlockLayout} />
      <ProfileFilled onClick={selectListLayout} />
      <Dropdown overlay={menu} placement={"bottomRight"}>
        <span
          className="ant-dropdown-link d-flex align-items-center"
          onClick={(e) => e.preventDefault()}
        >
          <span className="text me-5">Lọc</span> <DownOutlined />
        </span>
      </Dropdown>
    </FilterBar>
  );
};

const FilterBar = styled.div`
  margin: 32px 0;
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 16px;

  & > span {
    font-size: 1.3em;
    cursor: pointer;
  }

  .text {
    font-weight: 200;
  }
`;
