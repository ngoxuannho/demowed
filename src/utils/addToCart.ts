import { message } from "antd";
export interface iCart {
  id: number;
  thumbImg?: string;
  options: string | undefined;
  qty: number;
  size: number;
  name?: string;
  price: number;
}

export const addToCart = (product: iCart) => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    const parse = JSON.parse(cart);
    const productAlreadyExisted = parse.some((cartProduct: iCart) => {
      return cartProduct.id === product.id;
    });
    if (productAlreadyExisted) {
      const newParse = parse.filter(
        (cartProduct: iCart) => cartProduct.id !== product.id
      );
      const updatedCart = [...newParse, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
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
