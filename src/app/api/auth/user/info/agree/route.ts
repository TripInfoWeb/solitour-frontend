import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const access_cookie = request.cookies.get("access_token");
  if (!access_cookie) {
    const refresh_cookie = request.cookies.get("refresh_token");
    if (!refresh_cookie) {
      // 리프레시 토큰이 없으므로 요청 중단
      return new NextResponse("Refresh token not found", { status: 403 });
    }
    // 리프레시 토큰으로 재발급 받아 재요청 보내기 위한 응답
    return new NextResponse("Refresh token not found", { status: 401 });
  }

  const requestData = await request.json();

  // 사용자 정보 조회 API
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/users/info/agree`,
    {
      method: "PUT",
      headers: {
        Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
      cache: "no-store",
    },
  );

  if (response.ok) {
    return response;
  }

  return new NextResponse("서버 에러", {
    status: 500,
  });
}
