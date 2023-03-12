import { Menu } from "antd";
import { message } from "antd";

interface iFilterMenu {
  onClick: any;
}

export default ({onClick}:iFilterMenu) => {
  return (
    <Menu onClick={onClick}>
     <Menu.Item key="Default">Filter</Menu.Item>
      <Menu.Item key="A-Z">Từ: A-Z</Menu.Item>
      <Menu.Item key="Z-A">Từ: Z-A</Menu.Item>
      <Menu.Item key="High-Low">Giá: Thấp-Cao</Menu.Item>
      <Menu.Item key="Low-High">Giá: Cao-Thấp</Menu.Item>
      <Menu.Item key="Latest">Sản Phẩm: Mới-Cũ</Menu.Item>
      <Menu.Item key="Oldest">Sản Phẩm: Cũ-Mới</Menu.Item>
    </Menu>
  );
};
