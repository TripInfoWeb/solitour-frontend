import { CategoryResponseDto } from "@/types/CategoryDto";
import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

async function getCategoryList() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
    method: "GET",
    next: { revalidate: 60, tags: ["getCategoryList"] },
  });

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error("Failed to fetch data");
  }

  return response.json() as Promise<Array<CategoryResponseDto>>;
}

interface Props {
  parentCategory: number;
  categoryId: number;
  setParentCategory: Dispatch<SetStateAction<number>>;
  setCategoryId: (categoryId: number) => void;
  onCancel: () => void;
  onSave: () => void;
}

const CategoryModal = async ({
  parentCategory,
  categoryId,
  setParentCategory,
  setCategoryId,
  onCancel,
  onSave,
}: Props) => {
  const categories = await getCategoryList();

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-[31.25rem] flex-col gap-8 rounded-xl bg-white p-8 max-[560px]:w-[90%] dark:bg-slate-800">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-medium text-black dark:text-slate-200">
              카테고리 선택
            </h3>
            <MdClose
              className="cursor-pointer text-gray2 hover:text-main dark:text-slate-400"
              size={"2.5rem"}
              onClick={onCancel}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={
                  `${parentCategory === category.id ? "border-main bg-main font-black text-white" : "text-gray1 dark:bg-slate-600 dark:text-slate-400"}` +
                  "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
                }
                type="button"
                onClick={() => setParentCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {parentCategory !== 0 && (
            <h3 className="text-lg font-medium text-black dark:text-slate-200">
              소분류 선택
            </h3>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {categories
              .find((category) => parentCategory === category.id)
              ?.childrenCategories?.map((category, index) => (
                <button
                  key={index}
                  className={
                    `${categoryId === category.id ? "border-main bg-main text-white" : "text-gray1 dark:bg-slate-600 dark:text-slate-400"}` +
                    "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
                  }
                  type="button"
                  onClick={() => setCategoryId(category.id)}
                >
                  {category.name}
                </button>
              ))}
          </div>
          <div
            className={`${parentCategory !== 0 || categoryId !== 0 ? "hidden" : ""} flex w-full flex-row items-center justify-center py-4`}
          >
            <button
              className="h-11 w-[9.5rem] rounded-full bg-main font-medium text-white shadow hover:scale-105"
              type="button"
              onClick={onSave}
            >
              적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
