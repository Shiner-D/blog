import React, { useState, startTransition, useEffect } from "react";
import { toast } from "react-hot-toast";
import Divider from "@/components/customUi/Divider";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DATA, Icons } from "./config";
import { useTranslation } from "react-i18next";
import { Modal } from "@/components/customUi/dialog/Modal";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChinese, setIsChinese] = useState(false);
  const whiteList = ["Translate", "WeChat", "Github"];
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "en-US";
    if (lang === "en" || lang === "en-US") {
      setIsChinese(false);
    } else {
      setIsChinese(true);
    }
  }, []);

  /**
   * 导航栏按钮点击事件
   * @param e 事件
   * @param value 按钮值
   * @returns
   */
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    value: string
  ) => {
    e.preventDefault();
    if (!whiteList.includes(value)) {
      startTransition(() => {
        navigate(`/${value}`);
      });
      return;
    }
    if (value === "WeChat") {
      navigator.clipboard.writeText("微信号: xiaoyaohull");
      toast.success("复制成功");
      return;
    }
    if (value === "Translate") {
      setIsModalOpen(true);
    }
    window.open(DATA.conact.social[value].url, "_blank");
  };

  /**
   * 切换语言
   */
  const changeLanguage = () => {
    setIsModalOpen(false);
    const lang = localStorage.getItem("i18nextLng") || "en-US";
    if (lang === "en" || lang === "en-US") {
      localStorage.setItem("i18nextLng", "zh");
      i18n.changeLanguage("zh");
      setIsChinese(true);
    } else {
      localStorage.setItem("i18nextLng", "en");
      i18n.changeLanguage("en");
      setIsChinese(false);
    }
  };
  return (
    <div>
      <Dock
        iconMagnification={80}
        iconDistance={60}
        direction="middle"
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
      >
        {DATA.base.map((item) => (
          <DockIcon key={item.label}>
            <AnimatedTooltip content={ $t(item.label)} hoverKey={item.label}>
              <a
                aria-label={item.label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 rounded-full"
                )}
                onClick={(e) => handleClick(e, item.label)}
              >
                <item.icon className="!size-5" />
              </a>
            </AnimatedTooltip>
          </DockIcon>
        ))}
        <Divider
          direction="vertical"
          className="h-[30px] border-gray-900"
        ></Divider>
        {Object.entries(DATA.navbar.social).map(([name, social]) => (
          <DockIcon key={name}>
            <AnimatedTooltip content={$t(name)} hoverKey={name}>
              <a
                aria-label={social.name}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 rounded-full"
                )}
                onClick={(e) => handleClick(e, social.name)}
              >
                <social.icon className="!size-5" />
              </a>
            </AnimatedTooltip>
          </DockIcon>
        ))}
        <Divider
          direction="vertical"
          className="h-[30px] border-gray-900"
        ></Divider>
        {Object.entries(DATA.conact.social).map(([name, social]) => (
          <DockIcon key={name}>
            <AnimatedTooltip content={$t(name)} hoverKey={name}>
              <a
                aria-label={social.name}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 rounded-full"
                )}
                onClick={(e) => handleClick(e, social.name)}
              >
                <social.icon className="!size-5" />
              </a>
            </AnimatedTooltip>
          </DockIcon>
        ))}
      </Dock>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={$t('tip')}
        width="400px"
      >
        <div className="text-center">
          <p>{isChinese ? $t("translateEn") : $t("translateZh")}</p>
          <div className="flex justify-end">
            <button
              className="mt-4 px-4 py-2 bg-zinc-500 text-white rounded hover:bg-zinc-600 mr-[10px]"
              onClick={() => setIsModalOpen(false)}
            >
              {$t("cancel")}
            </button>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={changeLanguage}
            >
              {$t("confirm")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NavBar;
