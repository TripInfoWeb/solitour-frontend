"use client";

import { InformationCommentCreateFormSchema } from "@/features/informationComment/model/InformationCommentCreateFormSchema";
import useAuthStore from "@/stores/authStore";
import {
  CreateInformationCommentRequestDto,
  InformationCommentListResponseDto,
} from "@/types/InformationCommentDto";
import { fetchWithAuth } from "@/shared/api/fetchWithAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useCommentList = (informationId: number) => {
  const [isFetching, setIsFetching] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [commentList, setCommentList] =
    useState<InformationCommentListResponseDto>();
  const [page, setPage] = useState(1);
  const { id } = useAuthStore();
  const router = useRouter();
  const methods = useForm<{ comment: string }>({
    resolver: zodResolver(InformationCommentCreateFormSchema),
    defaultValues: { comment: "" },
    mode: "onChange",
  });

  const getCommentList = async () => {
    setIsFetching(true);

    const response = await fetch(
      `/api/informations/comments/${informationId}?page=${page - 1}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    setIsFetching(false);

    if (!response.ok) {
      alert("댓글 조회에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    const result: InformationCommentListResponseDto = await response.json();
    setCommentList(result);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await methods.trigger();
    if (!methods.formState.isValid) {
      methods.trigger();
      return;
    }

    const { comment } = methods.getValues();
    const data: CreateInformationCommentRequestDto = { comment };

    setSubmissionLoading(true);

    const response = await fetchWithAuth(
      `/api/informations/comments/${informationId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );

    setSubmissionLoading(false);

    if (!response.ok) {
      alert("댓글 등록에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    methods.setValue("comment", "");
    methods.watch("comment");
    getCommentList();
  };

  useEffect(() => {
    getCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return {
    isFetching,
    submissionLoading,
    commentList,
    page,
    userId: id,
    router,
    methods,
    getCommentList,
    setPage,
    handleSubmit,
  };
};
