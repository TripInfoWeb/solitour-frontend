"use client";

import { AddUserInformationFormSchema } from "@/lib/zod/schema/AddUserInformationFormSchema";
import useAuthStore from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useAuthKakao = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const methods = useForm({
    resolver: zodResolver(AddUserInformationFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      sex: "",
      isCheckTerm: false,
      isCheckPrivacy: false,
    },
    mode: "onChange",
  });

  // 액세스 토큰을 이용해서 사용자 정보 조회
  const getUserInfo = async () => {
    const userDataResponse = await fetch("/api/auth/user");
    if (userDataResponse.status == 200) {
      const userData = await userDataResponse.json();
      setUser(userData);
      router.push("/");
    } else {
      throw new Error("Failed to fetch user data");
    }
  };

  const handleSubmit = async (isAgree: boolean) => {
    setLoading(true);

    /* eslint-disable indent */
    const requestData = isAgree
      ? {
          name: methods.getValues("name"),
          age: methods.getValues("age"),
          sex: methods.getValues("sex"),
          termConditionAgreement: methods.getValues("isCheckTerm"),
          privacyPolicyAgreement: methods.getValues("isCheckPrivacy"),
        }
      : {
          termConditionAgreement: methods.getValues("isCheckTerm"),
          privacyPolicyAgreement: methods.getValues("isCheckPrivacy"),
        };
    /* eslint-enable indent */

    try {
      const response = await fetch(
        isAgree ? "/api/auth/user/info/agree" : "/api/auth/user/info/disagree",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      await getUserInfo();
    } catch (error) {
      router.push("/auth/signin");
    }
  };

  const handleHomeButtonClick = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  // 숫자만 입력되게 필터링
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    methods.setValue("age", Number(value));
    methods.trigger();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `/api/auth/kakao/getToken?code=${searchParams.get("code")}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to login");
        }

        const data = await response.json();

        if (data === "PENDING") {
          setLoading(false);
          return;
        }

        await getUserInfo();
      } catch (error) {
        router.push("/auth/signin");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    methods,
    handleSubmit,
    handleInputChange,
    handleHomeButtonClick,
  };
};
