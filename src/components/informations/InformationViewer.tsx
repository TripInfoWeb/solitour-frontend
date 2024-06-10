import { MdLocationOn } from "react-icons/md";
import ItemTag from "./ItemTag";
import Image from "next/image";
import PagePath from "./PagePath";
import { MouseEvent, RefObject, TouchEvent } from "react";
import { CiMap } from "react-icons/ci";

type MyProps = {
  category: string;
  id: number;
  listRef: RefObject<HTMLDivElement>;
  onDragStart: (e: MouseEvent<HTMLDivElement>) => void;
  onDragMove: (e: MouseEvent<HTMLDivElement>) => void;
  onDragEnd: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;
};

// TODO
const InformationViewer = ({
  category,
  id,
  listRef,
  onDragStart,
  onDragMove,
  onDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: MyProps) => {
  //const info = await fetch("")
  const info = {
    title: "책과 공간이 매력적인 선릉역 테라로사",
    username: "하몽",
    date: new Date().toLocaleDateString(),
    location: "서울, 강남구",
    body: "선릉역과 삼성역 사이에 있는 테라로사 포스코센터점입니다. 제가 갔을 땐 사람이 많아도 공간이 워낙 넓어서 좋았어요! 책도 구경하고 핸드드립 커피가 있어 여유롭게 시간을 보낼 수 있어요. 도심 속에서 이런 대형카페에서 뷰도 감상하고 시간을 보내고 싶은신 분들에게 추천합니다!",
    tags: ["북카페", "뷰맛집", "핸드드립"],
    tips: ["대형카페로 책도 읽고 카공하기 좋아요", "2시간 주차가 가능해요"],
    mainImage: "/PostImage.svg",
    subImages: [
      "/restaurant1.svg",
      "/restaurant2.svg",
      "/restaurant3.svg",
      "/restaurant4.svg",
    ],
  };

  return (
    <div className="w-[60rem] max-[1024px]:w-[90%]">
      <PagePath category={`${category}`} />
      <div className="flex flex-row items-center justify-between overflow-x-hidden max-[1024px]:flex-col">
        <div className="w-[29.375rem] max-[1024px]:w-full">
          <div className="relative h-[26.0625rem] w-full">
            <Image
              className="rounded-2xl"
              src={info.mainImage}
              alt={"/background"}
              fill={true}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div
            className="flex flex-row items-center space-x-[0.875rem] overflow-x-hidden pt-[0.875rem]"
            ref={listRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {info.subImages.map((image, index) => (
              <Image
                key={index}
                className="rounded-lg"
                src={image}
                alt={"/background"}
                width={107}
                height={107}
              />
            ))}
          </div>
        </div>
        <div className="flex h-fit w-[29.375rem] flex-col justify-center rounded-2xl pl-[2.875rem] max-[1024px]:w-full max-[1024px]:pl-0 max-[1024px]:pt-8">
          <h1 className="text-2xl font-bold">{info.title}</h1>
          <div className="flex flex-row items-center space-x-2 py-4">
            <div className="h-12 w-12 rounded-full bg-gray3"></div>
            <div className="space-y-1">
              <p className="text-xs font-semibold">{info.username}</p>
              <p className="text-xs text-gray1">{info.date}</p>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-1 py-[1.125rem]">
            <MdLocationOn className="text-main" size={"1.25rem"} />
            <p className="text-xs font-semibold text-gray1">{info.location}</p>
          </div>
          <p className="py-4 font-semibold text-gray1">{info.body}</p>
          <div className="flex flex-row items-center space-x-1 pb-[2.6875rem]">
            {info.tags.map((tag, index) => (
              <ItemTag
                key={index}
                tag={tag}
                borderColor="border-main"
                textColor="text-main"
              />
            ))}
          </div>
          <div className="space-y-3 border-y-2 border-gray3 p-5">
            <div className="text-lg font-bold text-black">
              생생한 혼플 <span className="text-main">TIP</span>
            </div>
            {info.tips.map((tip, index) => (
              <li key={index} className="ml-6 marker:text-main">
                {tip}
              </li>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20 flex h-40 flex-col items-center justify-center bg-neutral-100">
        <CiMap size={"2rem"} />
        지도 링크
      </div>
    </div>
  );
};

export default InformationViewer;
