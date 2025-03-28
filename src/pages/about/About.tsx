import React, { lazy, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import aboutStyle from "./about.module.scss";
import { resume } from "@/api/home";
import { Resume } from "@/api/type";
import { useTranslation } from "react-i18next";
interface SkeletonProps {
  content?: string[];
  type?: string;
}

const About = () => {
  useTranslation(); // 翻译后自动触发更新
  const offlineData = {
    basic: ["姓名：董亮", "职业: Web前端工程师", "居住地址：上海市浦东新区"],
    skills: [
      "JavaScript",
      "Vue",
      "React",
      "TypeScript",
      "Git",
      "Webpack",
      "Node.js",
      "微信小程序",
    ],
    hobbies: [
      "1. 探索前沿Web技术，也热衷于UI和动效；",
      "2. 关注一些喜欢研究前端技术的博主，拓展更多经验；",
      "3. 业余时间喜欢跑步，打羽毛球，玩游戏。",
    ],
    experience: [
      "1. 2020年在蓝生信息科技有限公司负责云智慧医疗系统项目的前端开发工作；",
      "2. 2022年在上海安赛瑞实业有限公司负责供应链管理系统项目的前端开发工作；",
      "3. 2024年在玑脉（上海）数据技术有限公司负责纺纱智能管理系统项目的前端开发工作。",
    ],
    contacts: [
      "微信：xiaoyaohull",
      "邮箱：dongliang142857@gmail.com",
      "GitHub：https://github.com/Shiner-D",
      "CSDN：https://blog.csdn.net/weixin_46880889",
    ],
  };

  const [content, setContent] = useState<Resume>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await resume();
        console.log(res);
        if (res.code === 200) {
          const data = res.data;
          setContent(data);
        }
      } catch (error) {
        setContent(offlineData);
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const Skeleton = ({ content, type }: SkeletonProps) => (
    <div className={`w-full h-screen `}>
      <div className="w-full h-full min-h-[6rem] text-[12px] p-[8px] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-[#010c35] group-hover/bento:-translate-y-2 group-hover/bento:shadow-xl">
        <div
          className={`${type === "technology" ? "flex flex-wrap gap-2" : ""}`}
        >
          {content && type !== "technology"
            ? content.map((item, i) => (
              <p className="text-sm/7 text-stone-900 font-normal" key={i}>
                {item}
              </p>
            ))
            : content.map((it, idx) => (
              <p
                className="text-sm/7 text-stone-900 font-normal w-[30%]"
                key={idx}
              >
                {it}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
  const items = [
    {
      title: $t("resume.title"),
      description: "",
      header: <Skeleton content={content?.basic || []} type="resume" />,
      // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: $t("technologyStack"),
      description: "",
      header: <Skeleton content={content?.skills || []} type="technology" />,
      // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: $t("hobby"),
      description: "",
      header: <Skeleton content={content?.hobbies || []} type="hobby" />,
      // icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: $t("experience"),
      description: "",
      header: <Skeleton content={content?.experience || []} type="project" />,
      // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: $t("contact.title"),
      description: "",
      header: <Skeleton content={content?.contacts || []} type="contact" />,
      // icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
  ];

  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <div className={`w-full h-full flex flex-col ${aboutStyle.about}`}>
      <div className="flex justify-center h-[40px] my-[40px]">
        <span
          className="cursor-default text-white text-[26px] !font-Ceyyt"
          style={{ fontFamily: "Ceyyt, sans-serif" }}
          onClick={handleClick}
        >
          {$t("about_title")}
        </span>
      </div>
      <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden max-h-screen">
        <BentoGrid className="max-w-6xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              // icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default About;
