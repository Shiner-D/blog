import { Outlet } from 'react-router-dom';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/styles/layout.module.css'
import NavBar from '@/pages/navBar/NavBar';

gsap.registerPlugin(ScrollTrigger);
// export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
export const Layout = () => {


  return (
    <div className="min-h-screen">
      {/* <nav className="fixed top-0 left-0 bg-yellow-950/85 shadow-[0_4px_10px_rgba(255,255,255,0.5)] w-full z-10 p-4 flex justify-center gap-6 z-50">
        {sections.map(({ id, title }) => (
          <a
            key={id}
            href={`#${id}`}
            className="px-4 text-lg font-semibold text-[#ebedff] hover:text-[#e1d0a3] transition"
          >
            {title}
          </a>
        ))}
      </nav> */}

      <NavBar></NavBar>
      <main className="max-w-lvw mx-auto px-0 sm:px-0 lg:px-0 py-8 pt-0 h-dvh">
        <Outlet />
      </main>
    </div>
  );
};
