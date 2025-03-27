import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { MorphingText } from "@/components/magicui/morphing-text";
import homeStyle from "./home.module.css";
import { info } from "@/api/home";
import { useTranslation } from "react-i18next";
import { off } from "process";

interface CardInfo {
  author: string;
  hobby: string;
  job: string;
  signature: string;
}

const Home: React.FC = () => {
  const [nezaiJ, setNezaiJ] = useState<string>("");
  const [nezaiD, setNezaiD] = useState<string>("");
  const [infos, setInfos] = useState<CardInfo>({} as CardInfo);
  const [title, setTitle] = useState<string[]>([]);
  const [baIcon, setBaIcon] = useState<string>("");

  useTranslation();
  const offTitle = [
    "折木泛舟",
    "专注于构建优雅、高效的 Web 应用",
    "热爱将设计与技术结合",
    "创造令人愉悦的用户体验",
  ]
  // [
  //   "Carving Paths Sailing Dreams",
  //   "Focused on building elegant and efficient web applications",
  //   "Passionate about combining design with technology",
  //   "Creating delightful user experiences",
  // ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await info();
        const resData = res.data;
        if (res.code === 200) {
          const { title, ...rest } = resData;
          const titleArr = title.split(",");
          setTitle(titleArr);
          setInfos(rest);
        }
      } catch (error) {
        setTitle(offTitle);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    import("@/assets/images/nezai5.jpg").then((module) => {
      setNezaiJ(module.default);
    });
    import("@/assets/images/nezai3.png").then((module) => {
      setNezaiD(module.default);
    });
    import("../../../public/baIcon.png").then((module) => {
      setBaIcon(module.default);
    });
  }, []);

  return (
    <div className={`w-full ${homeStyle.home}`}>
      <div className="relative flex h-screen w-full flex-col justify-center overflow-hidden max-h-screen">
        <MorphingText
          texts={title}
          className="lg:text-[2.8rem] mt-[10vh] text-[#fff8f5] !font-Ceyyt"
        />
        <CardContainer className={`inter-var ${homeStyle.home_card}`}>
          <CardBody className="bg-gradient-to-bl from-[#F1D7BD] to-[#2D1811] relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem translateZ="200" className="w-full mt-4">
              <img
                src={nezaiJ}
                height="1000"
                width="1000"
                className="h-24 w-24 object-cover rounded-full mx-auto group-hover/card:opacity-0 shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                alt=""
              />
              <img
                src={nezaiD}
                height="1000"
                width="1000"
                className="w-32 object-cover mx-auto opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/card:opacity-100"
                alt="thumbnail"
              />
            </CardItem>
            <CardItem
              translateZ="50"
              className={`text-xl font-bold text-[#CBB1A0] dark:text-white ${homeStyle.font_shadow}`}
            >
              {infos.author || $t("home_name")}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className={`text-[#CBB1A0] text-sm w-full mt-2 dark:text-neutral-300 ${homeStyle.font_shadow}`}
            >
              {$t("job")}： {infos.job || "前端开发者"}
            </CardItem>
            <CardItem
              as="p"
              translateZ="70"
              className={`text-[#CBB1A0] text-sm w-full mt-2 dark:text-neutral-300 ${homeStyle.font_shadow}`}
            >
              {$t("hobby")}：{infos.hobby || "打球、跑步、音乐、动漫"}
            </CardItem>
            <CardItem
              as="p"
              translateZ="80"
              className={`text-[#CBB1A0] text-sm max-w-sm mt-2 dark:text-neutral-300 ${homeStyle.font_shadow}`}
            >
              {$t("signature")}：
              {infos.signature ||
                "最大荣耀不在于从不跌倒，而在于每次跌倒后都能站起来"}
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
      <div className="w-full flex justify-center items-center text-white bg-yellow-950 h-[48px] leading-[48px]">
        <img src={baIcon} className="size-[16px] mr-[8px]" />
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=34170202000759"
          rel="noreferrer"
          target="_blank"
          className="mr-[10px] hover:text-blue-500"
        >
          皖公网安备34170202000759号
        </a>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          皖ICP备2025078884号-1
        </a>
      </div>
    </div>
  );
};

export default Home;
