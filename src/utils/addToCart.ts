import { message } from "antd";
interface CartProps {
  id?: number;
  thumbImg?: string;
  options?: string;
  qty?: number;
  size?: number;
  name?: string;
}

export const addToCart = (product: CartProps) => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    const parse = JSON.parse(cart);
    if (parse.some((cartProduct: CartProps) => cartProduct.id === product.id)) {
      const newParse = parse.filter(
        (cartProduct: CartProps) => cartProduct.id !== product.id
      );
      localStorage.setItem("cart", JSON.stringify([...newParse, product]));
      message.success("Cart updated");
      // if product exist update it
    } else {
      localStorage.setItem("cart", JSON.stringify([...parse, product])); // else add product
      message.success("Product added");
    }
  } else {
    localStorage.setItem("cart", JSON.stringify([product]));
    message.success("🎉💥🎉 First Item    🥳🥳");
  }
};
