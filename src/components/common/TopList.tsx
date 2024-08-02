import { TopGatheringResponseDto } from "@/types/GatheringDto";
import { TopInformationResponseDto } from "@/types/InformationDto";

import Link from "next/link";

interface Props {
  title: "여행" | "모임";
}

async function getTopInformationList() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/ranks`,
    {
      method: "GET",
      next: { revalidate: 86400, tags: ["getTopInformationList"] },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error("Failed to fetch data");
  }

  return response.json() as Promise<TopInformationResponseDto[]>;
}

async function getTopGatheringList() {
  /*
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/?????????????????????????`,
    {
      method: "GET",
      next: { revalidate: 3600, tags: ["getTopGatheringList"] },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error("Failed to fetch data");
  }

  return response.json() as Promise<TopGatheringResponseDto[]>;
  */

  return [
    { id: 1, title: "동해 서핑 투게더" },
    { id: 2, title: "강릉 빵지순례 같이 해요!" },
    { id: 3, title: "전시회 좋아하는 사람? 국립현대미술관 같이 가요" },
    { id: 4, title: "퇴근 후 운동할 사람? 인왕산 같이 올라가요!" },
    { id: 5, title: "떡볶이 맛잘알과 함께 전국 떡볶이 투어" },
  ];
}

const TopList = async ({ title }: Props) => {
  const data =
    title === "여행"
      ? await getTopInformationList()
      : await getTopGatheringList();

  return (
    <div className="z-10 -mt-28 flex h-fit w-full flex-col justify-center rounded-2xl bg-white px-24 py-16 shadow shadow-[#CCECE2] max-[1024px]:px-8 max-[1024px]:py-12 dark:bg-slate-800">
      <h2 className="mb-9 border-b-[0.0625rem] border-gray3 pb-3 text-2xl font-semibold text-black dark:border-slate-200 dark:text-slate-200">
        {`${title} 정보 `}
        <span className="font-bold text-main">Top 5</span>
      </h2>
      <div className="w-full max-[1024px]:space-x-0">
        <ol className="grid grid-cols-2 gap-x-4 gap-y-[1.5rem] max-[1024px]:flex max-[1024px]:flex-col">
          {data.map((value, index) => (
            <li
              key={index}
              className={`flex items-center ${index > 2 ? `col-start-2` : `col-start-1`}`}
              style={{ gridRowStart: index > 2 ? index - 2 : index + 1 }}
            >
              <p className="w-6 font-bold text-main">{index + 1}.</p>
              <Link
                className="w-96 truncate text-sm font-medium text-gray1 hover:text-main max-[1024px]:w-full dark:text-slate-400"
                href={`/${title === "여행" ? "informations" : "gathering"}/${value.id}`}
              >
                {value.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TopList;
