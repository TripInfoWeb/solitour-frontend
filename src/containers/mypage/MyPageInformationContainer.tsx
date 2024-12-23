import CategoryList from "@/components/common/CategoryList";
import Pagination from "@/components/common/Pagination";
import MyPageInformationList from "@/components/mypage/MyPageInformationList";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IMyPageInformationContainer {}
// value 변경하지 말것 api주소와 연결되어있음
const categories = [
  {
    name: "내 게시물",
    value: "owner",
  },
  {
    name: "북마크",
    value: "bookmark",
  },
];

interface Information {
  informationId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  viewCount: number;
  isBookMark: boolean;
  thumbNailImage: string;
  likeCount: number;
}

const MyPageInformationContainer = () => {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [elements, setElements] = useState<Information[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page + "");
    url.search = params.toString();
    setCurrentPage(page);
    window.history.pushState({}, "", url.toString());
  };
  const onClickCategoryHandler = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("page");
    params.set("category", value);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
    setActiveCategory(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const category = params.get("category") || "";
    setActiveCategory(category);

    if (searchParams.get("category") != category) {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      const res = await fetchWithAuth(
        `/api/mypage/information?category=${category}&page=${currentPage - 1}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );
      const data = await res.json();
      setElements(data.content);
      setTotalElements(data.page.totalElements);
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams, currentPage]);

  return (
    <div className="w-full">
      <CategoryList
        categories={categories}
        onClickHandler={onClickCategoryHandler}
        activeCategory={activeCategory}
      />
      <MyPageInformationList elements={elements} isLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalElements / 6)}
        pageHandler={pageHandler}
      />
    </div>
  );
};
export default MyPageInformationContainer;
