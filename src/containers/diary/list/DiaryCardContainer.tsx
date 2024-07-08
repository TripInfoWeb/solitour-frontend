"use client";

import DiaryCard from "@/components/diary/list/DiaryCard";
import { DiaryResponseDto } from "@/types/DiaryDto";
import { useState } from "react";

interface Props {
  diaryData: DiaryResponseDto;
}

const DiaryCardContainer = ({ diaryData }: Props) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const flip = async () => {
    setFlag(!flag);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setIsFlipped(!isFlipped);
  };

  return (
    <DiaryCard
      diaryData={diaryData}
      flag={flag}
      isFlipped={isFlipped}
      flip={flip}
    />
  );
};

export default DiaryCardContainer;