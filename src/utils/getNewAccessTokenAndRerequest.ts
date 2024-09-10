import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function getNewAccessToken(refreshToken: RequestCookie): Promise<string | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/oauth2/token/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `${refreshToken.name}=${refreshToken.value}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("리프레시 토큰을 사용한 액세스 토큰 갱신 실패");
    }
    const accessToken = response.headers.get("set-cookie");
    return accessToken;
  } catch (error) {
    console.error("액세스 토큰 갱신 중 오류 발생:", error);
    return null;
  }
}

interface IFetchWithTokenRefreshSSR {
  accessToken: RequestCookie | undefined;
  refreshToken: RequestCookie | undefined;
  url: string;
  method?: string;
  cache?: RequestCache;
  contentType?: string;
}

export async function fetchWithTokenRefreshSSR({
  accessToken,
  refreshToken,
  url,
  method,
  cache,
  contentType,
}: IFetchWithTokenRefreshSSR) {

  let response = await fetch(url, {
    method: method || "GET",
    headers: {
      "Content-Type": contentType || "application/json",
      Cookie: `${accessToken?.name}=${accessToken?.value}`,
    },
    cache: cache || "no-store",
  });

  if (response.status === 401 && refreshToken) {
    const newAccessToken = await getNewAccessToken(refreshToken);

    if (newAccessToken) {
      // 새로 발급받은 액세스 토큰으로 다시 요청
      response = await fetch(url, {
        method: method || "GET",
        headers: {
          "Content-Type": contentType || "application/json",
          Cookie: `access_token=${newAccessToken}`,
        },
        cache: cache || "no-store",
      });
    } else {
      throw new Error("새로운 액세스 토큰 발급 실패");
    }
  }

  if (response.status == 403) {
    throw new Error("접근 권한이 없음");
  }

  if (response.status == 404) {
    throw new Error("잘못된 경로 요청");
  }

  if (response.status == 405) {
    throw new Error("잘못된 메소드 타입");
  }

  if (response.status == 409) {
    throw new Error("중복된 데이터로 요청에 실패");
  }

  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }

  return await response.json();
}