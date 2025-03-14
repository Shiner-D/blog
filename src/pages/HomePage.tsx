import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import homePage from "./styles/homePage.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "@/components/customUi/Loading/BeanEater/Loading";

const Home = lazy(() => import(/* webpackChunkName: "home" */ "./home/Home"));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ "./blog/Blog"));
const BookShelf = lazy(
  () => import(/* webpackChunkName: "bookshelf" */ "./bookshelf/BookShelf")
);
const About = lazy(
  () => import(/* webpackChunkName: "about" */ "./about/About")
);

interface ExtendedHTMLElement extends HTMLElement {
  container: HTMLElement | null;
}

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get("section"); // 获取URL参数
  useEffect(() => {
    if (sectionId) {
      // 滚动到对应的 section
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [sectionId]);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});

  const sections = [
    { id: "Home", title: "home", color: "#FF5733", component: Home },
    { id: "Blog", title: "blog", color: "#33FF57", component: Blog },
    { id: "BookShelf", title: "book", color: "#3357FF", component: BookShelf },
    { id: "About", title: "about", color: "#FF33A6", component: About },
  ];
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const section = sectionRefs.current[id];
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections((prev) => ({ ...prev, [id]: true }));
                observer.unobserve(section);
              }
            });
          },
          { threshold: 0.01 }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    if (Object.keys(visibleSections).length > 0) {
      const getRatio = (el: HTMLElement) =>
        window.innerHeight / (window.innerHeight + el.offsetHeight);
      gsap.utils
        .toArray<ExtendedHTMLElement>("section")
        .forEach((section, i) => {
          const bg = section.querySelector(`.${homePage.container}`);
          gsap.fromTo(
            bg,
            {
              backgroundPosition: () =>
                i
                  ? `50% ${-window.innerHeight * getRatio(section)}px`
                  : "50% 0px",
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
    }
  }, [visibleSections]);

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
            {visibleSections[id] ? (
              <Suspense fallback={<Loading></Loading>}>
                <Component />
              </Suspense>
            ) : (
              <Loading></Loading>
            )}
          </>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
