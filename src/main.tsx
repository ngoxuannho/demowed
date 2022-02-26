import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyled } from "./global.css";
import { Provider } from "react-redux";
import { storeData } from "./slices/index";
import Product from "./pages/details/Product";  

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeData}>
      <GlobalStyled />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="shop" element={<Shop />}></Route>
            <Route path="shop/:id" element={<Product />}></Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
