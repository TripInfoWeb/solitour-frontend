import { LOCATION } from "@/constants/informations/location";
import { MdClose } from "react-icons/md";

interface Props {
  closeModal: () => void;
}

const InformationFilterModal = ({ closeModal }: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-80 flex-col rounded-xl bg-white p-6 dark:bg-slate-800">
        <div className="flex flex-row items-center justify-end">
          <MdClose
            className="cursor-pointer text-gray2 hover:text-main dark:text-slate-400"
            size={"2.5rem"}
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col gap-4 px-5 pb-2">
          <h3 className="text-lg font-bold text-black dark:text-slate-400">
            지역별
          </h3>
          <div className="flex flex-wrap items-start gap-2 font-medium text-gray1 dark:text-slate-400">
            {LOCATION.map((location, index) => (
              <button
                key={index}
                className="rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105 hover:text-main dark:border-slate-400 dark:bg-slate-600"
                type="button"
              >
                {location}
              </button>
            ))}
          </div>
          <button
            className="h-11 w-full rounded-full bg-main text-[0.9375rem] text-white hover:scale-105"
            type="button"
          >
            필터 적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationFilterModal;
