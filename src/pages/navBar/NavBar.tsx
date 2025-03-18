import React, { startTransition } from "react";
import { toast } from "react-hot-toast";
import Divider from "@/components/customUi/Divider";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DATA, Icons } from "./config";

const NavBar = () => {
  const whiteList = ['WxChat', 'Github'];
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, value: string) => {
    e.preventDefault();
    if (!whiteList.includes(value)) {
      startTransition(() => {
        navigate(`/?section=${value}`);
      })
      return;
    }
    if (value === 'WxChat') {
      navigator.clipboard.writeText('微信号: xiaoyaohull');
      toast.success("复制成功");
      return;
    }
    window.open(DATA.conact.social[value].url, "_blank");
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
            <AnimatedTooltip content={item.label} hoverKey={item.label}>
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
            <AnimatedTooltip content={name} hoverKey={name}>
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
            <AnimatedTooltip content={name} hoverKey={name}>
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
    </div>
  );
};

export default NavBar;
