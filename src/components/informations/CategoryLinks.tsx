import Link from "next/link";

type MyProps = {
  category: string;
};

const CategoryLinks = ({ category }: MyProps) => {
  return (
    <div className="mt-[5.5rem] flex w-[60rem] flex-row items-center justify-between border-b-[0.0625rem] pb-[0.375rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)] dark:border-slate-200">
      <nav className="w-fit">
        <ul className="flex flex-row items-center gap-9">
          <li>
            <Link
              className={
                `${
                  category === "restaurant"
                    ? "border-b-2 border-main pb-[0.375rem] font-bold text-main"
                    : "text-gray1 dark:text-slate-400"
                }` +
                " " +
                "hover:main"
              }
              href="/informations/list/restaurant?subCategory=all"
            >
              맛집
            </Link>
          </li>
          <li>
            <Link
              className={
                `${
                  category === "accommodation"
                    ? "border-b-2 border-main pb-[0.375rem] font-bold text-main"
                    : "text-gray1 dark:text-slate-400"
                }` +
                " " +
                "hover:text-main"
              }
              href="/informations/list/accommodation?subCategory=all"
            >
              숙박
            </Link>
          </li>
          <li>
            <Link
              className={
                `${
                  category === "activity"
                    ? "border-b-2 border-main pb-[0.375rem] font-bold text-main"
                    : "text-gray1 dark:text-slate-400"
                }` +
                " " +
                "hover:text-main"
              }
              href="/informations/list/activity?subCategory=all"
            >
              액티비티
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CategoryLinks;
