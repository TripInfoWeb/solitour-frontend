import DiaryList from "@/components/diary/DiaryList";
import DiaryListSkeleton from "@/components/skeleton/diary/DiaryListSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "여행일기",
  description: "Solitour 여행일기 페이지",
};

export default function page() {
  return (
    <div className="flex flex-col items-center py-4">
      <Suspense fallback={<DiaryListSkeleton />}>
        <DiaryList />
      </Suspense>
    </div>
  );
}
