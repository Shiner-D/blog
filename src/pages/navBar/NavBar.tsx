import Divider from "@/components/customUi/Divider";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { cn } from "@/lib/utils";
import { DATA, Icons } from "./config";

const NavBar = () => {
  return (
    <div>
      <Dock
        iconMagnification={90}
        iconDistance={80}
        direction="middle"
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
      >
        {DATA.base.map((item) => (
          <DockIcon key={item.label}>
            <a
              href={item.href}
              aria-label={item.label}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-12 rounded-full"
              )}
            >
              <item.icon className="size-4" />
            </a>
          </DockIcon>
        ))}
        <Divider
          direction="vertical"
          className="h-[30px] border-gray-900"
        ></Divider>
        {Object.entries(DATA.navbar.social).map(([name, social]) => (
          <DockIcon key={name}>
            <a
              href={social.url}
              aria-label={social.name}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-12 rounded-full"
              )}
            >
              <social.icon className="size-4" />
            </a>
          </DockIcon>
        ))}
        <Divider
          direction="vertical"
          className="h-[30px] border-gray-900"
        ></Divider>
        {Object.entries(DATA.conact.social).map(([name, social]) => (
          <DockIcon key={name}>
            <a
              href={social.url}
              aria-label={social.name}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-12 rounded-full"
              )}
            >
              <social.icon className="size-4" />
            </a>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
};

export default NavBar;
