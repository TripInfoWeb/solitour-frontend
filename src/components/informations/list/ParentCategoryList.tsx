import { CategoryResponseDto } from "@/types/CategoryDto";
import Link from "next/link";

interface Props {
  categories: CategoryResponseDto[];
  categoryId: number;
}

const ParentCategoryList = ({ categories, categoryId }: Props) => {
  return (
    <div className="mt-[5.5rem] flex w-[60rem] flex-row items-center justify-between border-b-[0.0625rem] pb-[0.375rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)] dark:border-slate-200">
      <nav className="w-fit">
        <ul className="flex flex-row items-center gap-9">
          {categories.map((category, index) => (
            <Link
              key={index}
              className={
                `${
                  category.id === categoryId
                    ? "border-b-2 border-main pb-[0.375rem] font-bold text-main"
                    : "text-gray1 dark:text-slate-400"
                }` +
                " " +
                "hover:main"
              }
              href={`/informations/parent-category/${category.id}?page=1`}
            >
              {category.name}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ParentCategoryList;
