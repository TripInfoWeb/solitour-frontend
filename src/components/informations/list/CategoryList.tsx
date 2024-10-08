import { CategoryResponseDto } from "@/types/CategoryDto";
import ParentCategoryList from "./ParentCategoryList";
import InformationSearchContainer from "@/containers/informations/list/InformationSearchContainer";
import ChildCategoryListContainer from "@/containers/informations/list/ChildCategoryListContainer";

async function getCategoryList() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
    method: "GET",
    next: { revalidate: 60, tags: ["getCategoryList"] },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<CategoryResponseDto[]>;
}

interface Props {
  parentCategoryId: number;
  childCategoryId: number;
}

const CategoryList = async ({ parentCategoryId, childCategoryId }: Props) => {
  const categories = await getCategoryList();

  return (
    <div className="mt-6 flex w-full flex-col gap-6">
      <ParentCategoryList
        categories={categories}
        parentCategoryId={parentCategoryId}
      />
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col-reverse max-[1024px]:items-start max-[1024px]:space-y-6 max-[1024px]:space-y-reverse">
        <ChildCategoryListContainer
          categories={categories}
          parentCategoryId={parentCategoryId}
          childCategoryId={childCategoryId}
        />
        <InformationSearchContainer />
      </div>
    </div>
  );
};

export default CategoryList;
