import { useFormContext } from "react-hook-form";

interface IGatheringEditorContent {

}
const GatheringEditorContent = (props: IGatheringEditorContent) => {
  const formContext = useFormContext();
  return (
    <article className={"flex w-full flex-col gap-[2rem]"}>
      <div className="relative w-full">
        <textarea
          className={`min-h-[17.5rem] w-full resize-none rounded-[1rem] p-6 outline outline-[1px] outline-offset-[-1px] ${
            formContext.formState.errors.content
              ? "outline-red-500"
              // : formContext.getValues("content")
              //   ? "outline-main"
                : "outline-[#E3E3E3]"
          }`}
          placeholder={
            "어떤 모임을 만들어볼까요? 모임 정보 및 목표를 작성해 새로운 솔리들과 함께해보세요."
          }
          {...formContext.register("content")}
          onChange={(e) => {
            formContext.setValue("content", e.target.value);
            formContext.trigger("content");
          }}
          maxLength={500}
        />
        {formContext.formState.errors.content && (
          <span className="absolute bottom-[-16px] left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.content.message as String}
          </span>
        )}
      </div>
      <div className={"flex w-full justify-end"}>
        <span
          className={`${formContext.getValues("content").length >= 500 && "text-red-600"}`}
        >
          {formContext.getValues("content").length} / 500
        </span>
      </div>
    </article>
  );
};
export default GatheringEditorContent