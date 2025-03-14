"use client";

import HashSpinner from "@/shared/ui/hashSpinner/HashSpinner";
import { useCommentDeleteModal } from "@/hooks/information/detail/comment/useCommentDeleteModal";

interface CommentDeleteModalProps {
  commentId: number;
  closeModal: () => void;
}

const CommentDeleteModal = ({
  commentId,
  closeModal,
}: CommentDeleteModalProps) => {
  const { loading, handleDeleteClick } = useCommentDeleteModal(commentId);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <HashSpinner loading={loading} />
      <div className="flex h-[10.5rem] w-[19.25rem] flex-col items-center justify-between rounded-xl bg-white px-[1.625rem] pb-6 pt-9 drop-shadow">
        <h1 className="font-medium text-black">댓글을 삭제하시겠습니까?</h1>
        <div className="flex flex-row items-center justify-between gap-2">
          <button
            className="h-[2.75rem] w-[7.75rem] rounded-[1.875rem] bg-main text-sm font-semibold text-white hover:scale-105"
            onClick={() => handleDeleteClick()}
          >
            삭제
          </button>
          <button
            className="h-[2.75rem] w-[7.75rem] rounded-[1.875rem] bg-black text-sm font-semibold text-white hover:scale-105"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentDeleteModal;
