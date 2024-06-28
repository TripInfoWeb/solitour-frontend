import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { v4 as uuid } from "uuid";

const GatheringContent = () => {
  const formContext = useFormContext();
  const [tags, setTags] = useState<string[]>([]);
  const inputTagRef = useRef<HTMLInputElement>(null);
  // 태그 클릭해서 지울때
  const deleteTagHandler = (tagName: string) => {
    setTags((prev) => prev.filter((i: string) => i != tagName));
  };

  // 태그 입력시 ,나 Enter로 태그블록 만들어 주는 기능
  const onChangeInputTagHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      const tempTag = (inputTagRef.current as any).value + "";
      if (tempTag == "") return;
      setTags((prev) => Array.from(new Set([...prev, tempTag])));
      (inputTagRef.current as any).value = "";
      formContext.setValue("hashtag", Array.from(new Set([...tags, tempTag])));
    } else if (e.key === ",") {
      const tempTag =
        (inputTagRef.current as any).value.substring(
          0,
          (inputTagRef.current as any).value.length - 1,
        ) + "";
      if (tempTag == "") return;
      setTags((prev) => Array.from(new Set([...prev, tempTag])));
      (inputTagRef.current as any).value = "";
      formContext.setValue("hashtag", Array.from(new Set([...tags, tempTag])));
    }
  };

  return (
    <>
      <article className={"flex flex-col gap-[2rem]"}>
        <div className={"flex w-full items-center gap-x-[2rem]"}>
          <div className={"relative w-[7rem] flex-shrink-0"}>
            <span className={"w-[3.5rem] text-lg font-semibold"}>제목</span>
            <span className="absolute top-[-.5rem] text-lg text-main">*</span>
          </div>
          <input
            placeholder="제목을 입력하세요"
            className="h-[3.25rem] w-full rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            {...formContext.register("title")}
          />
        </div>
        <textarea
          className={
            "min-h-[17.5rem] resize-none rounded-[1rem] p-[1.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
          }
          placeholder={
            "어떤 모임을 만들어볼까요? 모임 정보 및 목표를 작성해 새로운 솔리들과 함께해보세요."
          }
          {...formContext.register("content")}
          onChange={(e) => {
            formContext.setValue("content", e.target.value);
            formContext.watch();
          }}
          maxLength={500}
        />
        <div className={"flex w-full justify-end"}>
          <span
            className={`${formContext.getValues("content").length >= 500 && "text-red-600"}`}
          >
            {formContext.getValues("content").length} / 500
          </span>
        </div>
      </article>
      <article className={"flex flex-col gap-[2rem]"}>
        <div className={"flex w-full items-center gap-x-[2rem]"}>
          <div className={"relative w-[7rem] flex-shrink-0"}>
            <span className={"w-[3.5rem] text-lg font-semibold"}>해시태그</span>
          </div>
          <input
            placeholder="#해시태그로 키워드를 써보세요!"
            className="h-[3.25rem] w-full rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            onKeyUp={onChangeInputTagHandler}
            ref={inputTagRef}
          />
        </div>
        <div>
          <span className="px-2 text-sm text-gray-400">
            (엔터를 입력하면 태그로 추가됩니다. 태그 클릭시 제거)
          </span>
        </div>
        <div
          className={
            "flex min-h-[5rem] flex-wrap gap-[.25rem] rounded-[1rem] p-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
          }
        >
          {tags?.map((i: string) => (
            <button
              key={uuid()}
              className={
                "flex h-[3rem] min-w-[5rem] items-center justify-center gap-[.125rem] rounded-lg bg-main px-1 text-white"
              }
              onClick={() => deleteTagHandler(i)}
            >
              <span> # </span>
              <span> {i} </span>
            </button>
          ))}
        </div>
      </article>
    </>
  );
};
export default GatheringContent
