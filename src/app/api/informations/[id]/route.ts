import { NextRequest } from "next/server";

/**
 * 정보 글 가져오기
 *
 * 이 API는 정보 글 수정 목적으로 데이터를
 * 클라이언트 사이드에서 요청할 때 사용됩니다.
 *
 * 정보 상세 페이지에서 데이터를 가져올 때
 * 사용되지 않습니다.
 *
 * @param request
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/${params.id}`,
    {
      method: "GET",
      next: { revalidate: 60, tags: [`getInformation/${params.id}`] },
    },
  );

  return response;
}
