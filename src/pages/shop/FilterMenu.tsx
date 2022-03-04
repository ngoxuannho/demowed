import { Menu } from "antd";
import { message } from "antd";

interface iFilterMenu {
  onClick: any;
}

export default ({onClick}:iFilterMenu) => {
  return (
    <Menu onClick={onClick}>
      <Menu.Item key="Default">Filter</Menu.Item>
      <Menu.Item key="A-Z">Name: A-Z</Menu.Item>
      <Menu.Item key="Z-A">Name: Z-A</Menu.Item>
      <Menu.Item key="High-Low">Price: High-Low</Menu.Item>
      <Menu.Item key="Low-High">Price: Low-High</Menu.Item>
      <Menu.Item key="Latest">Release: New-Old</Menu.Item>
      <Menu.Item key="Oldest">Release: Old-New</Menu.Item>
    </Menu>
  );
};
