import { NextRequest } from "next/server";

// 이미지 업로드
export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get("access_token");
    const formData = await request.formData();

    // TODO: 수정 필요
    const response = await fetch(`${process.env.BACKEND_URL}/api/user-image`, {
      method: "POST",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
