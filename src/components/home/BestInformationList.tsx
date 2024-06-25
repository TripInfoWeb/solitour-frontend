import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import InformationItem from "../common/InformationItem";
import Link from "next/link";

const BestInformationList = () => {
  // TODO
  const data: {
    category: string;
    title: string;
    image: string;
  }[] = [
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
    },
    {
      category: "숙박",
      title: "다양한 프로그램이 있는 제주 월정리 게하",
      image: "/PostImage2.svg",
    },
    {
      category: "액티비티",
      title: "혼자 놀기 초보도 가능한 국립현대미술관",
      image: "/PostImage3.svg",
    },
    {
      category: "맛집",
      title: "커피와 프렌치토스트가 맛있는 재즈카페 시노라 북촌점",
      image: "/PostImage.svg",
    },
    {
      category: "숙박",
      title: "다양한 프로그램이 있는 제주 월정리 게하",
      image: "/PostImage2.svg",
    },
    {
      category: "액티비티",
      title: "혼자 놀기 초보도 가능한 국립현대미술관",
      image: "/PostImage3.svg",
    },
  ];

  return (
    <div className="mt-20 w-[60rem] max-[1024px]:w-[90%]">
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-black max-[768px]:text-xl">
            고민을 덜어줄, <span className="text-main">BEST</span> 여행 정보
          </h2>
          <p className="text-sm font-medium text-gray1 max-[768px]:text-xs">
            솔리투어에서 인기 여행 정보를 확인해보세요!
          </p>
        </div>
        <Link
          className="flex h-[2.3125rem] w-[5.8125rem] items-center justify-center rounded-full border-2 border-gray3 text-gray1 hover:border-main hover:bg-main hover:text-white"
          href="/informations/restaurant?subCategory=all"
        >
          전체보기
        </Link>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {data.map((post, index) => (
          <InformationItem
            key={index}
            id={index + 1}
            category={post.category}
            title={post.title}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BestInformationList;
