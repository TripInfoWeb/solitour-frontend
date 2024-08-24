import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

// 정보 글 작성
export async function POST(request: NextRequest) {
  const cookie = request.cookies.get("access_token");
  const formData = await request.formData();

  // Back-end API 호출
  const response = await fetch(`${process.env.BACKEND_URL}/api/informations`, {
    method: "POST",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
    body: formData,
    cache: "no-store",
  });

  // Revalidate the cache
  revalidatePath("/informations", "layout");
  return response;
}
