import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";

const Home = React.lazy(() => import("../pages/home/Home"));
const Blog = React.lazy(() => import("../pages/blog/Blog"));
const BookShelf = React.lazy(() => import("../pages/bookshelf/BookShelf"));
const About = React.lazy(() => import("../pages/about/About"));
const Demo = React.lazy(
  () => import("../components/customUi/Loading/BeanEater/Loading")
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 默认显示 Homepage,index 关键字让 Homepage 在 / 默认显示。 */}
        <Route index element={<Home></Home>}></Route>
        <Route path="home" element={<Home></Home>}></Route>
        <Route path="blog" element={<Blog></Blog>}></Route>
        <Route path="bookshelf" element={<BookShelf></BookShelf>}></Route>
        <Route path="about" element={<About></About>}></Route>
        <Route path="demo" element={<Demo></Demo>}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
