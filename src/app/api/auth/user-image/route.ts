import { NextRequest, NextResponse } from "next/server";

// 사용자 이미지 삭제 API
export async function DELETE(request: NextRequest) {
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

  const response = await fetch(`${process.env.BACKEND_URL}/api/user-image`, {
    method: "DELETE",
    headers: {
      Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return new NextResponse(`${response.statusText}`, { status: response.status });
  }

    return await response.json();
}