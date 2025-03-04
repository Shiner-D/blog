import React, { useRef, useEffect, useState } from "react";
import homePage from "./styles/homePage.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./home/Home";
import Blog from "./blog/Blog";
import BookShelf from "./bookshelf/BookShelf";
import About from "./about/About";
interface ExtendedHTMLElement extends HTMLElement {
  container: HTMLElement | null;
}

const HomePage = () => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sections = [
    { id: "home", title: "home", color: "#FF5733", component: Home },
    { id: "blog", title: "blog", color: "#33FF57", component: Blog },
    { id: "book", title: "book", color: "#3357FF", component: BookShelf },
    { id: "about", title: "about", color: "#FF33A6", component: About },
  ];
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const getRatio = (el: HTMLElement) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);
    gsap.utils.toArray<ExtendedHTMLElement>("section").forEach((section, i) => {
      console.log(getRatio(section));
      const bg = section.querySelector(`.${homePage.container}`);
      gsap.fromTo(
        bg,
        {
          backgroundPosition: () =>
            i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px",
        },
        {
          backgroundPosition: () =>
            `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }, []);

  return (
    <div>
      {sections.map(({ id, component: Component, title }) => (
        <section
          key={id}
          id={id}
          ref={(el) => {
            if (el) sectionRefs.current[id] = el;
          }}
          className="h-screen flex text-white text-4xl font-bold"
        >
          <>
            <div className={`${homePage[title]} ${homePage.container}`}></div>
            <Component />
          </>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
