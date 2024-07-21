import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// TODO
const Pagination = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-3 p-12 text-sm text-gray1 dark:text-slate-200">
      <div className="cursor-pointer font-medium text-gray2 hover:text-main">
        <IoIosArrowBack size={"1rem"} />
      </div>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full bg-main text-white hover:text-main"
        href="/informations/list/parent-category/1?page=1"
      >
        1
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full hover:text-main"
        href="/informations/list/parent-category/1?page=2"
      >
        2
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full hover:text-main"
        href="/informations/list/parent-category/1?page=3"
      >
        3
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full hover:text-main"
        href="/informations/list/parent-category/1?page=4"
      >
        4
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full hover:text-main"
        href="/informations/list/parent-category/1?page=5"
      >
        5
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full hover:text-main"
        href="/informations/list/parent-category/1?page=6"
      >
        6
      </Link>
      <div className="cursor-pointer font-medium text-gray2 hover:text-main">
        <IoIosArrowForward size={"1rem"} />
      </div>
    </div>
  );
};

export default Pagination;
