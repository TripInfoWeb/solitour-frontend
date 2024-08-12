import "@/styles/reactDataRange.css";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface ICategory {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}
interface IGatheringCategoryModalProps {
  closeModal: () => void;
  categoryList: ICategory[];
}

const GatheringCategoryModal = (props: IGatheringCategoryModalProps) => {
  const formContext = useFormContext();
  const [mainCategoryId, setMainCategoryId] = useState(formContext.getValues("mainCategoryId") || 0);
  const [subCategoryId, setSubCategoryId] = useState(formContext.getValues("subCategoryId") || 0);

  const submitHandler = () => {
    formContext.setValue("mainCategoryId", mainCategoryId);
    formContext.setValue("subCategoryId", subCategoryId);
    formContext.watch();
    formContext.trigger();
    props.closeModal();
  };

  return (
    <div
      className={
        "relative h-full max-h-[44.5rem] w-[calc(100vw-1rem)] max-w-[40rem] overflow-scroll rounded-2xl bg-white px-[1rem] py-[2.875rem] md:p-[2.875rem]"
      }
    >
      <button
        className="absolute right-[1.5rem] top-[1.5rem]"
        onClick={() => props.closeModal()}
      >
        <Image
          src={"/close-icon.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      <div className={"flex flex-col gap-y-[1rem] pt-[2rem]"}>
        <p className={"h-[2rem] text-lg font-bold text-black"}>카테고리 선택</p>
        <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
          {props.categoryList.map((i) => (
            <button
              key={i.id}
              onClick={() => {
                setMainCategoryId(i.id);
              }}
              className={`${mainCategoryId == i.id ? "bg-main text-white" : "text-gray1"} flex h-[2.25rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
            >
              {i.name}
            </button>
          ))}
        </div>
        <p className={"h-[2rem] text-lg font-bold text-black"}>
          서브 카테고리 선택
        </p>
        <div
          className={"flex min-h-[2.5rem] flex-wrap gap-x-[1rem] gap-y-[.5rem]"}
        >
          {mainCategoryId != 0 &&
            props.categoryList.filter(i=>i.id == mainCategoryId)[0].childrenCategories.map((j) => (
              <button
                key={j.id}
                onClick={() => setSubCategoryId(j.id)}
                className={`${subCategoryId == j.id ? "bg-main text-white" : "text-gray1"} flex h-[2.25rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
              >
                {j.name}
              </button>
            ))}
        </div>
      </div>
      <div className={"flex w-full justify-center gap-[1rem] pt-[2rem]"}>
        <button
          className={
            "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
          }
          onClick={() => submitHandler()}
          disabled={subCategoryId == 0 && true}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};
export default GatheringCategoryModal;
