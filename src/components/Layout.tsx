import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/styles/layout.module.css'
import NavBar from '@/pages/navBar/NavBar';
import Loading from "@/components/customUi/Loading/BeanEater/Loading";

gsap.registerPlugin(ScrollTrigger);
// export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
export const Layout = () => {


  return (
    <div className="min-h-screen">

      <NavBar></NavBar>
      <main className="max-w-lvw mx-auto px-0 sm:px-0 lg:px-0 pt-0 h-dvh">
        <Suspense fallback={<Loading></Loading>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
