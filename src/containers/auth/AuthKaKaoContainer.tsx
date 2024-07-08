"use client";

import AuthLoading from "@/components/auth/AuthLoading";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const AuthKaKaoContainer = () => {
  const router = useRouter();

    useEffect(() => {
        const _queryStringObject = UrlQueryStringToObject<{
          [key: string]: string;
        }>(window.location.href);
        const kakaoLogin = async () => {
          try {
            const response = await fetch(
              `${process.env.BACKEND_URL}/api/auth/oauth2/login?type=kakao&redirectUrl=${process.env.KAKAO_REDIRECT_URL}
              &code=${_queryStringObject?.code}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                  "Access-Control-Allow-Origin": "*",
                },
                credentials: "include",
              },
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const res = await response.json();
            console.log(res);
            // res.accessToken 받아서 사용자 정보 받아오고 홈으로 이동
            router.push("/");
          } catch (error) {
            console.error(
              "로그인 실패",
              error,
            );
            router.push("/auth/signin")
          }
        };

        kakaoLogin();
    }, []);
  
  return <AuthLoading />
};

export default AuthKaKaoContainer;