"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  informationId: number;
  closeModal: () => void;
}

const InformationDeleteModalContainer = ({
  informationId,
  closeModal,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onDeleteClick = async () => {
    setLoading(true);

    const response = await fetchWithAuth(`/api/informations/${informationId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("정보 삭제에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    router.replace("/informations/list?page=1&parentCategoryId=1");
    router.refresh();
  };

  const onCancelClick = () => {
    closeModal();
  };

  return (
    <DeleteModal
      loading={loading}
      onDeleteClick={onDeleteClick}
      onCancelClick={onCancelClick}
    />
  );
};

export default InformationDeleteModalContainer;
