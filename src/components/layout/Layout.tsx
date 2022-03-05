import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from "../navigation/Nav";
import Footer from "./Footer";



export default () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer/>
    </>
  );
};
