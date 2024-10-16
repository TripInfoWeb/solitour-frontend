import { GatheringRecommend } from "@/types/GatheringDto";
import GatheringItemHome from "../common/GatheringItemHome";
import LottieNotFound from "../common/lottie/LottieNotFound";
import { cookies } from "next/headers";

async function getNewGatheringList() {
  const cookie = cookies().get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/gatherings/home`,
    {
      method: "GET",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

const NewGatheringList = async () => {
  const elements: GatheringRecommend[] = await getNewGatheringList();

  if (elements.length === 0) {
    return (
      <div className="flex w-full flex-col items-center pb-12">
        <LottieNotFound text={"모임을 작성해 보세요."} />
      </div>
    );
  }

  return (
    <div className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:flex max-[744px]:w-fit">
      {elements?.map((data, index) => (
        <GatheringItemHome key={index} data={data} />
      ))}
    </div>
  );
};

export default NewGatheringList;
