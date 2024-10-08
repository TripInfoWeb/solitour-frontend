import { useDragScrollType } from "@/hooks/useDragScroll";
import Link from "next/link";

interface Props {
  titles: string[];
  description: string;
  scrollHook: useDragScrollType;
  children: React.ReactNode;
  path: string;
}

const ListTemplate = ({
  titles,
  description,
  scrollHook,
  children,
  path,
}: Props) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center justify-between max-[744px]:justify-center">
        <div className="flex flex-col gap-2 max-[744px]:w-full">
          <div className="flex flex-row items-center justify-between gap-1">
            <h2 className="flex flex-row items-center gap-2 text-2xl font-bold text-black max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-0">
              <p>{titles[0]}</p>
              <p>
                <span className="text-main">{titles[1]}</span> {titles[2]}
              </p>
            </h2>
            <Link
              className="hidden h-[2.3125rem] w-[5.8125rem] items-center justify-center rounded-full border-[0.0625rem] border-gray3 text-gray1 hover:border-main hover:bg-main hover:text-white max-[744px]:flex"
              href={path}
            >
              전체보기
            </Link>
          </div>
          <p className="text-sm font-medium text-gray1">{description}</p>
        </div>
        <Link
          className="flex h-[2.3125rem] w-[5.8125rem] items-center justify-center rounded-full border-[0.0625rem] border-gray3 text-gray1 hover:border-main hover:bg-main hover:text-white max-[744px]:hidden"
          href={path}
        >
          전체보기
        </Link>
      </div>
      <div
        className="overflow-x-auto"
        ref={scrollHook.listRef}
        onMouseDown={(e) => {
          e.preventDefault();
          scrollHook.onDragStart(e);
        }}
        onMouseMove={scrollHook.onDragMove}
        onMouseUp={scrollHook.onDragEnd}
        onMouseLeave={scrollHook.onDragEnd}
        onTouchStart={scrollHook.onTouchStart}
        onTouchMove={scrollHook.onTouchMove}
        onTouchEnd={scrollHook.onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default ListTemplate;
