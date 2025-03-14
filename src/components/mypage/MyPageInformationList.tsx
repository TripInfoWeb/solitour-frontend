"use client";

import CategoryList from "../common/CategoryList";
import { useMyPageInformationList } from "@/hooks/mypage/useMyPageInformationList";
import {
  InformationItem,
  InformationItemSkeleton,
} from "@/features/information";
import { Pagination } from "@/shared/ui/pagination";

const MyPageInformationList = () => {
  const {
    categories,
    activeCategory,
    currentPage,
    elements,
    totalElements,
    isLoading,
    handleCategoryClick,
  } = useMyPageInformationList();

  return (
    <div className="w-full">
      <CategoryList
        categories={categories}
        onClickHandler={handleCategoryClick}
        activeCategory={activeCategory}
      />
      <div className="flex w-full flex-col">
        <div className="mt-6 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
          {
            isLoading
              ? /* eslint-disable indent */
                Array.from({ length: 6 }).map((_, index) => (
                  <InformationItemSkeleton key={index} />
                ))
              : elements.map((value) => (
                  <InformationItem
                    key={value.informationId}
                    informationId={value.informationId}
                    categoryName={value.zoneCategoryParentName}
                    initialIsBookMarked={value.isBookMark}
                    isLike={false}
                    title={value.title}
                    image={value.thumbNailImage}
                    address={
                      value.zoneCategoryParentName +
                      ", " +
                      value.zoneCategoryChildName
                    }
                    likeCount={value.likeCount}
                    viewCount={value.viewCount}
                  />
                ))
            /* eslint-enable indent */
          }
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalElements / 6)}
      />
    </div>
  );
};

export default MyPageInformationList;
