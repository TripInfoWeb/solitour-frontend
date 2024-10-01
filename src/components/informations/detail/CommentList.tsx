import CommentItem from "./CommentItem";

const CommentList = () => {
  return (
    <div className="mt-20 flex w-full flex-col border-t border-t-gray1">
      <h2 className="mt-[2.125rem] text-2xl font-bold">
        댓글 <span className="text-main">0</span>
      </h2>
      <div className="mt-6 flex h-[2.75rem] flex-row items-center gap-6">
        <input
          className="flex h-full w-full rounded-3xl border px-6 text-sm outline-none hover:border-main focus:border-main active:border-main"
          type="text"
          placeholder="자유롭게 소통을 해보세요."
        />
        <button className="h-full min-w-[7.75rem] rounded-3xl bg-black text-white hover:scale-105">
          등록하기
        </button>
      </div>
      <div className="mt-7 flex flex-col gap-4">
        <CommentItem />
        <CommentItem />
      </div>
    </div>
  );
};

export default CommentList;
