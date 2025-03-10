import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const Demo = React.lazy(() => import("../components/customUi/Loading/BeanEater/Loading"));

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 默认显示 Homepage,index 关键字让 Homepage 在 / 默认显示。 */}
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path="demo" element={<Demo></Demo>}></Route>
        </Route>
      </Routes>
    );
};

export default AppRoutes;