import Image from "next/image";
import AddressModalContainer from "@/containers/diary/write/AddressModalContainer";
import DateRangeModalContainer from "@/containers/diary/write/DateRangeModalContainer";
import { useDiaryEditorStoreType } from "@/store/diaryEditorStore";
import dynamic from "next/dynamic";
import QuillEditorSkeleton from "@/components/skeleton/common/QuillEditorSkeleton";
import { FormEvent } from "react";

const QuillEditorContainer = dynamic(
  () => import("@/containers/diary/write/QuillEditorContainer"),
  {
    ssr: false,
    loading: () => <QuillEditorSkeleton />,
  },
);

interface Props {
  text: string;
  diaryEditorStore: useDiaryEditorStoreType;
  dateRangeModal: boolean;
  addressModal: boolean;
  loading: boolean;
  showDateRangeModal: () => void;
  closeDateRangeModal: () => void;
  showAddressModal: () => void;
  closeAddressModal: () => void;
  setCurrentDay: (day: number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const DiaryEditor = ({
  text,
  diaryEditorStore,
  dateRangeModal,
  addressModal,
  loading,
  showDateRangeModal,
  closeDateRangeModal,
  showAddressModal,
  closeAddressModal,
  setCurrentDay,
  onSubmit,
}: Props) => {
  return (
    <form className="flex w-full flex-col" onSubmit={(e) => onSubmit(e)}>
      {dateRangeModal && (
        <DateRangeModalContainer closeModal={closeDateRangeModal} />
      )}
      {addressModal && <AddressModalContainer closeModal={closeAddressModal} />}
      <h1 className="text-[1.75rem] font-bold text-black dark:text-slate-200">
        {`일기 ${text}하기`}
      </h1>
      <p className="mt-6 text-gray1 dark:text-slate-400">
        새로운 <span className="text-main">경험을 기록</span>하고 나만의
        추억카드를 만들어보세요!
      </p>
      <div className="mt-[4.6875rem] flex h-[3.3125rem] flex-row items-center gap-[0.625rem]">
        <h2 className="w-[2.625rem] text-lg font-semibold text-black dark:text-slate-200">
          제목<span className="text-main">*</span>
        </h2>
        <input
          className="h-full flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-sm outline-none hover:border-main"
          type="text"
          name="title"
          placeholder="제목을 입력하세요."
          required={true}
          value={diaryEditorStore.title}
          maxLength={50}
          onChange={(e) =>
            diaryEditorStore.setDiaryEditor({ title: e.target.value })
          }
        />
      </div>
      <div className="mt-10 flex flex-row items-center gap-40 max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-10">
        <div className="flex h-[3.3125rem] flex-row items-center gap-[0.625rem] max-[1024px]:w-full">
          <h2 className="w-[2.625rem] text-lg font-semibold text-black dark:text-slate-200">
            날짜<span className="text-main">*</span>
          </h2>
          <button
            className={`${diaryEditorStore.startDate ? "text-black" : "text-gray2"} h-[3.3125rem] w-[21.75rem] flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-start text-sm hover:border-main`}
            type="button"
            onClick={() => showDateRangeModal()}
          >
            {diaryEditorStore.startDate !== null &&
            diaryEditorStore.endDate !== null ? (
              <p>{`${diaryEditorStore.startDate.toLocaleDateString("ko-KR")} ~ ${diaryEditorStore.endDate?.toLocaleDateString("ko-KR")}`}</p>
            ) : (
              <div className="flex flex-row items-center gap-2">
                {"YYYY.MM.DD"}
                <Image
                  src={"/calendar-icon.svg"}
                  alt={"calendar-icon"}
                  width={16}
                  height={16}
                />
              </div>
            )}
          </button>
        </div>
        {diaryEditorStore.days > 0 && (
          <div className="flex h-[3.3125rem] flex-grow flex-row items-center gap-[0.625rem] max-[1024px]:w-full">
            <h2 className="w-[2.625rem] text-lg font-semibold text-black dark:text-slate-200">
              지역<span className="text-main">*</span>
            </h2>
            <button
              className={`${diaryEditorStore.address[diaryEditorStore.currentDay - 1] === "" ? "text-gray2" : "text-black"} h-full flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-start text-sm outline-none hover:border-main`}
              type="button"
              onClick={() => showAddressModal()}
            >
              {diaryEditorStore.address[diaryEditorStore.currentDay - 1] === ""
                ? "지역명을 입력하세요."
                : diaryEditorStore.address[diaryEditorStore.currentDay - 1]}
            </button>
          </div>
        )}
      </div>
      {diaryEditorStore.days > 0 && (
        <div className="mt-14 flex h-6 w-full flex-row items-center gap-14 overflow-x-auto">
          <Image
            className="hidden dark:block"
            src="/day-text-dark-mode.svg"
            alt="day-text"
            width={41}
            height={25}
          />
          <Image
            className="dark:hidden"
            src="/day-text.svg"
            alt="day-text"
            width={41}
            height={25}
          />
          {Array.from(
            { length: diaryEditorStore.days },
            (_, index) => index + 1,
          ).map((value) => (
            <button
              key={value}
              className={`${value === diaryEditorStore.currentDay ? "text-main" : "text-gray2"} font-semibold hover:text-main`}
              onClick={() => setCurrentDay(value)}
            >
              {value}
            </button>
          ))}
        </div>
      )}
      {diaryEditorStore.days > 0 && (
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border-[0.0625rem] border-gray3 pb-[0.875rem] pt-6">
          <h2 className="pl-6 text-lg font-semibold text-black dark:text-slate-200">
            {`하루 기분은 어땠나요? (Day ${diaryEditorStore.currentDay})`}
          </h2>
          <div className="flex flex-wrap items-center">
            {["최고", "좋아", "무난", "슬퍼", "화나"].map((value, index) => (
              <button
                key={index + 1}
                className={`${diaryEditorStore.moodLevels[diaryEditorStore.currentDay - 1] === index + 1 ? "bg-[#F2FAF7] text-main" : "text-gray1"} flex h-[5.75rem] w-[6.5rem] flex-col items-center justify-between py-[0.5625rem] text-[0.9375rem] hover:bg-[#F2FAF7] hover:text-main dark:text-slate-400`}
                onClick={() =>
                  diaryEditorStore.changeMoodLevel(
                    diaryEditorStore.currentDay - 1,
                    index + 1,
                  )
                }
              >
                <div className="relative h-10 w-8">
                  <Image
                    src={`/mood-icon${index + 1}.svg`}
                    alt="mood-icon"
                    fill={true}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p>{value}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {diaryEditorStore.days > 0 && <QuillEditorContainer />}
      <button
        className={`${diaryEditorStore.days > 0 ? "bg-main hover:scale-105" : "cursor-not-allowed bg-gray1"} mb-[5.3125rem] mt-10 flex h-[2.625rem] w-[9.625rem] items-center justify-center self-end rounded-full text-[0.9375rem] text-white`}
        type="submit"
        // onClick={() => onSubmit()}
        disabled={diaryEditorStore.days === 0 || loading}
      >
        {loading ? (
          <div className="flex flex-row items-center gap-3">
            <Image
              className="animate-spin"
              src="/loading-icon.png"
              alt="loading-icon"
              width={20}
              height={20}
            />
            <p>{`${text} 중...`}</p>
          </div>
        ) : (
          <p>{`일기 ${text}하기`}</p>
        )}
      </button>
    </form>
  );
};

export default DiaryEditor;
