"use client";

import { Notice } from "@/entities/notice";
import { Breadcrumbs } from "@/shared/ui/breadcrumb";
import { format } from "date-fns";

const NOTICE_DETAIL_BREADCRUMB_PATH = (id: number) => [
  { label: "고객지원", href: "/support" },
  { label: "공지사항", href: "/support?menu=notice" },
  { label: `${id}`, href: "" },
];

interface SupportNoticeDetailProps {
  data: Notice;
}

const SupportNoticeDetail = ({ data }: SupportNoticeDetailProps) => {
  const categoryStyles: { [key: string]: string } = {
    이벤트: "bg-green-100 text-green-800",
    공지: "bg-blue-100 text-blue-800",
    점검: "bg-yellow-100 text-yellow-800",
    기타: "bg-gray-100 text-gray-800",
  };

  return (
    <div className={"flex w-full flex-col"}>
      <Breadcrumbs categories={NOTICE_DETAIL_BREADCRUMB_PATH(data.id)} />
      <div className="mb-8 flex min-h-[calc(100vh-160px)] w-full flex-col rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
        {/* 카테고리 및 날짜 */}
        <div className="mb-6 flex items-center justify-between">
          <div
            className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${categoryStyles[data.categoryName]}`}
          >
            {data.categoryName}
          </div>

          <div className="text-sm text-gray-600">
            {format(new Date(data.createdAt), "yyyy-MM-dd")}
          </div>
        </div>

        {/* 제목 */}
        <div className="mb-4 text-3xl font-extrabold text-gray-900">
          {data.title}
        </div>

        <hr className="my-4 border-t-2 border-gray-300" />

        {/* 본문 내용 */}
        <p
          className="py-4 font-medium break-words text-black"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </div>
  );
};

export default SupportNoticeDetail;
