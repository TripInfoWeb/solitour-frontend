"use client";

import useToastifyStore from "@/stores/toastifyStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useModalState from "../../shared/lib/hooks/useModalState";
import useGatheringStore from "@/stores/gatheringStore";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";

export const useGatheringViewer = (data: GatheringDetailResponseDto) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const toastifyStore = useToastifyStore();
  const modalState = useModalState();
  const gatheringStore = useGatheringStore();

  const handleDeleteClick = async () => {
    setLoading(true);

    const response = await fetch(`/api/gathering?id=${params.id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "모임 삭제에 실패했습니다.",
      });
      setLoading(false);
      modalState.closeModal();
      return;
      // throw new Error(response.statusText);
    }

    router.replace("/gathering");
    router.refresh();
  };

  useEffect(() => {
    gatheringStore.setGathering({
      currentParticipants: data.nowPersonCount,
      gatheringApplicantsResponses: data.gatheringApplicantsResponses,
      isFinish: data.isFinish,
      deadline: data.deadline,
      personCount: data.personCount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    modalState,
    currentParticipants: gatheringStore.currentParticipants,
    handleDeleteClick,
  };
};
