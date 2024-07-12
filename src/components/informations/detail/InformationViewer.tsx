import ItemTag from "../common/ItemTag";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import KakaoMapLinkContainer from "@/containers/common/KakaoMapLinkContainer";
import ImageViewerContainer from "@/containers/informations/detail/ImageViewerContainer";
import { LuEye } from "react-icons/lu";
import { GoPencil } from "react-icons/go";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { InformationDetailDto } from "@/types/InformationDto";

async function getInformation(id: number) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/${id}`,
    {
      method: "GET",
      next: { revalidate: 1, tags: [`getInformation/${id}`] },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error("Failed to fetch data");
  }

  return response.json() as Promise<InformationDetailDto>;
}

interface Props {
  id: number;
}

// TODO
const InformationViewer = async ({ id }: Props) => {
  const data = await getInformation(id);

  //await new Promise((resolve) => setTimeout(resolve, 3000));

  /*
  const data = {
    id: 1,
    title: "책과 공간이 매력적인 선릉역 테라로사",
    username: "하몽",
    date: new Date().toLocaleDateString(),
    address: "서울 강남구 테헤란로 440 포스코센터 1,2층 (우)06194",
    body: "선릉역과 삼성역 사이에 있는 테라로사 포스코센터점입니다. 제가 갔을 땐 사람이 많아도 공간이 워낙 넓어서 좋았어요! 책도 구경하고 핸드드립 커피가 있어 여유롭게 시간을 보낼 수 있어요. 도심 속에서 이런 대형카페에서 뷰도 감상하고 시간을 보내고 싶은신 분들에게 추천합니다!",
    tags: ["북카페", "뷰맛집", "핸드드립"],
    tips: [
      "대형카페로 책도 읽고 카공하기 좋아요",
      "2시간 주차가 가능해요",
      "사람이 많지만 공간이 워낙 넓고 책도 구경하고 커피가 있어 여유롭게 시간을 보낼 수 있어요.",
    ],
    images: [
      "/PostImage.svg",
      "/restaurant1.svg",
      "/restaurant2.svg",
      "/restaurant3.svg",
      "/restaurant4.svg",
      "/PostImage.svg",
      "/restaurant1.svg",
      "/restaurant2.svg",
      "/restaurant3.svg",
      "/restaurant4.svg",
    ],
    placeName: "테라로사 포스코센터",
    placeId: 1860681564,
  };
  */

  return (
    <div className="w-[60rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex flex-row items-center justify-between overflow-x-hidden max-[1024px]:flex-col">
        <div className="w-full pb-4 lg:hidden">
          <h1 className="text-2xl font-bold dark:text-slate-200">
            {data.title}
          </h1>
          <div className="flex flex-row items-end justify-between py-4">
            <div className="flex flex-row items-center gap-2">
              <Image
                className="rounded-full shadow dark:bg-slate-200"
                src="/user_sex_woman_default_image.svg"
                alt="user_sex_woman_default_image"
                width={48}
                height={48}
              />
              <div className="space-y-1">
                <p className="text-xs font-medium text-black dark:text-slate-400">
                  {data.userPostingResponse.name}
                </p>
                <p className="text-xs text-gray1 dark:text-slate-400">
                  {`${data.createdDate}`}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-1 text-gray2 dark:text-slate-400">
                <FaRegHeart size={"0.8rem"} />
                <p className="text-xs">666M</p>
              </div>
              <div className="flex flex-row items-center gap-1 text-gray2 dark:text-slate-400">
                <LuEye />
                <p className="text-xs">222K</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[34.5rem] w-[29.375rem] max-[1024px]:w-full max-[744px]:h-[27.5625rem]">
          <ImageViewerContainer images={data.imageResponses} />
        </div>
        <div className="flex h-[34.5rem] w-[29.375rem] flex-col overflow-y-auto px-[1.25rem] max-[1024px]:h-fit max-[1024px]:w-full max-[1024px]:px-0 max-[1024px]:pt-8">
          <div className="max-[1024px]:hidden">
            <h1 className="text-2xl font-bold dark:text-slate-200">
              {data.title}
            </h1>
            <div className="flex flex-row items-end justify-between py-4">
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="rounded-full shadow dark:bg-slate-200"
                  src="/user_sex_woman_default_image.svg"
                  alt="user_sex_woman_default_image"
                  width={48}
                  height={48}
                />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-black dark:text-slate-400">
                    {data.userPostingResponse.name}
                  </p>
                  <p className="text-xs text-gray1 dark:text-slate-400">
                    {`${data.createdDate}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-row items-center gap-1 text-gray2 dark:text-slate-400">
                  <FaRegHeart size={"0.8rem"} />
                  <p className="text-xs">666M</p>
                </div>
                <div className="flex flex-row items-center gap-1 text-gray2 dark:text-slate-400">
                  <LuEye />
                  <p className="text-xs">222K</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 py-3">
            <TiLocation className="text-main" size={"1.1rem"} />
            <p className="text-xs font-medium text-gray1 dark:text-slate-400">
              {data.address}
            </p>
          </div>
          <p className="py-4 font-medium text-gray1 dark:text-slate-400">
            {data.content}
          </p>
          <div className="flex flex-row items-center gap-1 pb-8">
            {data.tagResponses.map((tag, index) => (
              <ItemTag
                key={index}
                tag={tag.name}
                borderColor="border-main"
                textColor="text-main"
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 border-y-2 border-gray3 px-6 py-4">
            <div className="text-bold text-lg font-bold dark:text-slate-200">
              생생한 혼플 <span className="text-main">TIP</span>
            </div>
            {data.tip.split(" ").map((tip, index) => (
              <li
                key={index}
                className="ml-6 align-baseline font-medium text-gray1 marker:text-main dark:text-slate-400"
              >
                {tip}
              </li>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20 flex h-48 flex-col">
        <KakaoMapLinkContainer
          placeName={data.placeResponse.name}
          placeId={data.placeResponse.searchId}
        />
      </div>
      <a
        className="-mt-4 flex h-fit w-full flex-col justify-center gap-2 rounded-b-2xl border-x-[0.0625rem] border-b-[0.0625rem] px-6 pb-10 pt-12"
        href={`https://map.kakao.com/link/map/${data.placeResponse.searchId}`}
        target="_blank"
      >
        <h2 className="text-lg font-bold text-black dark:text-slate-200">
          {data.placeResponse.name}
        </h2>
        <div className="flex flex-row items-center gap-1 text-sm text-gray1 dark:text-slate-400">
          <TiLocation />
          <p>{data.address}</p>
        </div>
      </a>
      <div className="mt-6 flex flex-row items-center justify-end gap-3">
        <Link
          className="flex flex-row items-center gap-1 text-sm hover:text-main dark:text-slate-400"
          href={`/informations/edit/${1}`}
        >
          <GoPencil />
          수정
        </Link>
        <button className="flex flex-row items-center gap-1 text-sm hover:text-main dark:text-slate-400">
          <FaRegTrashCan />
          삭제
        </button>
      </div>
    </div>
  );
};

export default InformationViewer;
