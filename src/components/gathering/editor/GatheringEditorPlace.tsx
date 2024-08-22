import { Modal } from "@/components/common/modal/Modal";
import { ModalState } from "@/types/ModalState";
import { useFormContext } from "react-hook-form";
import GatheringPlaceModal from "../modal/GatheringPlaceModal";

interface IGatheringEditorPlace {
  modalState: ModalState;
}
const GatheringEditorPlace = ({modalState}: IGatheringEditorPlace) => {
  const formContext = useFormContext();
  return (
    <div className={"flex items-center gap-x-[1.75rem]"}>
      <div className={"relative w-[2.625rem] flex-shrink-0"}>
        <span className={"w-[3.5rem] text-lg font-semibold"}>장소</span>
        <span className="absolute top-[-.5rem] text-lg text-main">*</span>
      </div>
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          className={`h-[3.25rem] w-[11.875rem] overflow-hidden text-ellipsis whitespace-nowrap rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] ${
            formContext.formState.errors.placeName
              ? "outline-red-500"
              : formContext.getValues("placeName")
                ? "outline-main"
                : "outline-[#E3E3E3]"
          }`}
        >
          {formContext.getValues("placeName") || "장소명을 입력하세요."}
        </button>
        {formContext.formState.errors.placeName && (
          <span className="absolute bottom-[-16px] left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.placeName.message as String}
          </span>
        )}
      </div>
      <Modal isOpen={modalState.isOpen} onClose={() => modalState.closeModal()}>
        <GatheringPlaceModal closeModal={() => modalState.closeModal()} />
      </Modal>
    </div>
  );
};
export default GatheringEditorPlace