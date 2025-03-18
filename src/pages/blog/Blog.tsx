import React, { useEffect, useState } from "react";
import { articles } from "@/api/home";
import { ArticlesResponse, Articles } from "@/api/type";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import "./blog.module.css";

const Blog: React.FC = () => {
  const offlineData = [
    {
      title: "JavaScript事件流探索",
      description:
        "事件流描述的是从页面接收到事件时，事件在页面中的传播过程。事件流包括三个阶段：捕获阶段、目标阶段和冒泡阶段。",
      link: "https://blog.csdn.net/weixin_46880889/article/details/127004485",
    },
    {
      title: "JavaScript事件处理程序探索",
      description:
        "响应某个事件的函数，即事件处理程序。事件处理程序是一个函数，当某个事件发生时，该函数将被调用。",
      link: "https://blog.csdn.net/weixin_46880889/article/details/127010721",
    },
    {
      title: "JavaScript事件对象探索",
      description:
        "在触发DOM上的事件时，会自动创建一个事件对象，该对象包含了与事件相关的各种信息。包含导致事件的DOM元素、事件的类型以及其他与特定事件相关的信息。",
      link: "https://blog.csdn.net/weixin_46880889/article/details/127049386",
    },
    {
      title: "JavaScript事件委托探索",
      description:
        "利用事件冒泡的特性，我们可以通过给父元素添加事件监听器，来处理子元素上的事件。减少事件处理程序数量，提高性能。",
      link: "https://blog.csdn.net/weixin_46880889/article/details/127083994",
    },
    {
      title: "JavaScript数据扁平化与反扁平化",
      description:
        "数据扁平化是指将嵌套的数据结构扁平化为一维数组，以便于存储和操作。数据反扁平化则是将一维数组转换为嵌套的数据结构，以便于阅读和理解。",
      link: "https://blog.csdn.net/weixin_46880889/article/details/127127151",
    },
    {
      title: "JavaScript内存泄漏、垃圾回收和闭包的关系",
      description:
        "垃圾回收算法会自动删除不再使用的对象，从而释放内存。大量的对象无法被垃圾收集就会引发内存泄漏。闭包是内存泄漏的来源。",
      link: "https://blog.csdn.net/weixin_46880889/article/details/139980505",
    },
  ];

  const [projects, setProjects] = useState<Articles[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await articles();
        if (res.code === 200) {
          const data: ArticlesResponse = res.data;
          const projectData = data.list;
          setProjects(projectData);
        }
      } catch (error) {
        setProjects(offlineData);
      }

    };
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto h-full px-8">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-[40px]">
        <VelocityScroll
          numRows={1}
          defaultVelocity={1}
          // style={{ fontFamily: "Ceyyt" }}
          className="md:text-5xl text-base font-Ceyyt"
        >
          每次记录都是成长伏笔
        </VelocityScroll>
      </div>
      <HoverEffect items={projects} className="bg-white/0 pt-[20px]" />
    </div>
  );
};

export default Blog;
