import { RootState } from "../../slices/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import { iCart } from "../../utils/addToCart";
import CartDrawerItem from "./CartDrawerItem";
import { delFromCartSlice } from "../../slices/cartSlice";
import { List } from "antd";
import FooterCartDrawer from "./FooterCartDrawer";

interface iCartDrawer {
  onClose: () => void;
  visible: boolean;
}

export default ({ onClose, visible }: iCartDrawer) => {
  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  return (
    <Drawer
      title="Your Cart"
      placement="right"
      onClose={onClose}
      visible={visible}
      footer={<FooterCartDrawer />}
    >
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item: iCart) => (
          <List.Item>
            <CartDrawerItem
              key={item.id}
              cartItem={item}
              delProduct={() => dispatch(delFromCartSlice(item))}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};
