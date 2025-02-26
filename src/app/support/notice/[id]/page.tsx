import SupportNoticeDetail from "@/components/support/SupportNoticeDetail";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "공지사항 상세조회",
  description: "공지사항 상세조회",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchData(id: number) {
  const cookie = (await cookies()).get("access_token");

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/notice/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const {
    id
  } = params;

  const noticeId = Number(id);
  if (noticeId <= 0 || !Number.isSafeInteger(noticeId)) {
    throw Error("Not Found");
  }

  const data = await fetchData(noticeId);

  return <SupportNoticeDetail data={data} />;
}
