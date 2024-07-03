import { InformationRequestDto } from "@/types/InformationDto";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// 정보 글 작성
// TODO: 수정 필요, multipart 방식
export async function POST(request: NextRequest) {
  try {
    //const data = (await request.json()) as InformationRequestDto;

    try {
    } catch (e) {}

    // 외부 API 호출
    /*
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/information/write`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        cache: "no-store",
      },
    );
  
    // 외부 API의 응답을 JSON 형식으로 변환
    const data = await response.json();
    */

    // Revalidate the cache for the list page and redirect the user.
    // TODO: 수정 필요
    revalidateTag("getInformationList");
    redirect("/");

    /*
    return new Response(
      JSON.stringify({ title: "1", content: "2", tips: ["3", "4"] }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    */
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to write data." }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
