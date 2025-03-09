import { cn } from "@/lib/utils";

interface DividerProps {
  text?: string;
  className?: string;
  direction?: "horizontal" | "vertical";
}

const Divider = ({ text, direction, className }: DividerProps) => {
  return (
    <div className="flex items-center my-4">
      {direction === "horizontal" ? (
        <>
          <div className={cn("border-t-[1px]", "border-t", "border-gray-300", className)} />
          {text && <span className="px-3 text-gray-500">{text}</span>}
          <div className={cn("flex-1", "border-t", "border-gray-300", className)} />
        </>
      ) : (
        <div className={cn("border-l-[1px]", "h-[10px]", "border-gray-300", className)} />
      )}
    </div>
  );
};

export default Divider;
