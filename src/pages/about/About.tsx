import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { resume } from "@/api/home";
import { Resume } from "@/api/type";
import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

interface SkeletonProps {
  content?: string[];
  type?: string;
}

const About = () => {

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
        console.error(error);
      }
    }
    fetchData();
  }, [])
  const Skeleton = ({ content, type }: SkeletonProps) => (
    <div className="w-full h-full min-h-[6rem] text-[12px] p-[8px] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-[#010c35] group-hover/bento:-translate-y-2 group-hover/bento:shadow-xl">
      <div className={`${type === "technology" ? "flex flex-wrap gap-2" : ""}`}>
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
  );
  const items = [
    {
      title: "个人简介",
      description: "",
      header: <Skeleton content={content?.basic || []} type="resume" />,
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "技术栈",
      description: "",
      header: <Skeleton content={content?.skills || []} type="technology" />,
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "兴趣爱好",
      description: "",
      header: <Skeleton content={content?.hobbies || []} type="hobby" />,
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "项目与经验",
      description: "",
      header: <Skeleton content={content?.experience || []} type="project" />,
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "联系方式",
      description: "",
      header: <Skeleton content={content?.contacts || []} type="contact" />,
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
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
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center h-[40px] my-[40px]">
        <span
          className="cursor-default !font-Ceyyt"
          style={{ fontFamily: "Ceyyt, sans-serif" }}
          onClick={handleClick}
        >
          我的信息
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
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default About;
