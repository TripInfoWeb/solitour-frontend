"use client";

import HeaderSidebar from "@/components/common/HeaderSidebar";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

const HeaderSidebarContainer = ({ onClose }: Props) => {
  const [hoverNum, setHoverNum] = useState<number>(0);
  const { id, initialize } = useAuthStore();
  const router = useRouter();

  const logoutHandler = async () => {
    // api로 로그아웃 요청해서 쿠키제거
    initialize();
    await fetch("/api/auth/logout", { method: "POST" });
    onClose();
    router.push("/");
    router.refresh();
  };

  return (
    <HeaderSidebar
      signedIn={Number(id) > 0}
      hoverNum={hoverNum}
      setHoverNum={setHoverNum}
      logoutHandler={logoutHandler}
      onClose={onClose}
    />
  );
};

export default HeaderSidebarContainer;
