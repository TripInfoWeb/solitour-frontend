import { NextRequest, NextResponse } from "next/server";

/**
 * qna 리스트 페이지네이션
 */
export async function GET(request: NextRequest) {
  // 요청에서 access_token을 가져옵니다.
  const access_cookie = request.cookies.get("access_token");

  if (!access_cookie) {
    // access_token이 없으면 refresh_token이 있는지 확인합니다.
    const refresh_cookie = request.cookies.get("refresh_token");
    if (!refresh_cookie) {
      // refresh_token이 없는 경우 요청을 중단하고 403 응답을 보냅니다.
      return new NextResponse("Refresh token not found", { status: 403 });
    }
    // refresh_token만으로는 유효하지 않으므로 401 응답을 보냅니다.
    return new NextResponse("Access token not found", { status: 401 });
  }

  // 요청 URL에서 쿼리 파라미터를 가져옵니다.
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1"; // 페이지가 없으면 기본값으로 1을 사용합니다.

  // 페이지 번호를 0 기반으로 조정합니다.
  const zeroBasedPage = Number(page) - 1;

  // URL을 페이지 번호에 맞게 수정합니다. 페이지 번호가 0보다 큰 경우에만 쿼리 파라미터를 추가합니다.
  const apiUrl = `${process.env.BACKEND_URL}/api/qna${zeroBasedPage > 0 ? `?page=${zeroBasedPage}` : ""}`;

  // 백엔드 API 호출
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
    },
    cache: "no-store",
  });

  return response;
}