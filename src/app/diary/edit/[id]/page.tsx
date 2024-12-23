import Breadcrumbs from "@/components/common/Breadcrumb";
import DiaryEditorContainer from "@/containers/diary/edit/DiaryEditorContainer";
import { GetDiaryResponseDto } from "@/types/DiaryDto";
import { cookies } from "next/headers";

async function getDiary(id: number) {
  const cookie = cookies().get("access_token");
  const response = await fetch(`${process.env.BACKEND_URL}/api/diary/${id}`, {
    method: "GET",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
    next: { revalidate: 60, tags: [`getDiary/${id}`] },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<GetDiaryResponseDto>;
}

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props) {
  const diaryId = Number(id);
  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw new Error("Not Found");
  }

  return {
    title: `일기 수정하기 - ${diaryId}`,
    description: "Solitour의 여행 일기 수정 페이지",
  };
}

export default async function page({ params: { id } }: Props) {
  const diaryId = Number(id);
  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw new Error("Not Found");
  }

  const data = await getDiary(diaryId);

  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumbs
        categories={[
          { label: "여행 일기", href: "/diary/list?page=1" },
          { label: "일기 수정하기", href: "" },
        ]}
      />
      <DiaryEditorContainer diaryData={data} />
    </div>
  );
}
