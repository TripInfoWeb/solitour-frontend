"use client";

import { ModalTemplate } from "@/shared/ui/modal";
import {
  add,
  compareAsc,
  format,
  isAfter,
  isBefore,
  isValid,
  subDays,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { Calendar } from "react-date-range";
import { useFormContext } from "react-hook-form";
import { GatheringForm } from "../model/gatheringForm";

interface GatheringDeadlineModalProps {
  closeModal: () => void;
}

export const GatheringDeadlineModal = ({
  closeModal,
}: GatheringDeadlineModalProps) => {
  const formContext = useFormContext<GatheringForm>();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [deadlineDate, setDeadlineDate] = useState<Date>(
    formContext.getValues("deadline")
      ? new Date(formContext.getValues("deadline"))
      : new Date(),
  );
  const scheduleStartDate = formContext.getValues("scheduleStartDate");
  const handleDateSelect = (date: Date) => {
    setDeadlineDate(date);
  };

  const submitHandler = () => {
    const deadline = format(deadlineDate, "yyyy-MM-dd 23:59");
    formContext.setValue("deadline", deadline);
    formContext.watch();
    formContext.trigger("deadline");
    closeModal();
  };

  // maxDate를 결정하는 함수
  const getMaxDate = () => {
    const today = new Date();
    // 현재날짜에서 +1년되는 날짜
    const oneYearFromToday = add(today, { years: 1 });

    if (scheduleStartDate) {
      const scheduleDate = new Date(scheduleStartDate);
      // 날짜가 유효한지 확인
      if (isValid(scheduleDate)) {
        return compareAsc(new Date(scheduleStartDate), oneYearFromToday) < 1
          ? new Date(scheduleStartDate)
          : oneYearFromToday;
      }
    }

    // scheduleStartDate가 없거나 유효하지 않으면 1년 후 날짜를 반환
    return oneYearFromToday;
  };

  return (
    <ModalTemplate
      className="max-h-152 w-[calc(100vw-1rem)] max-w-100"
      closeModal={closeModal}
    >
      <h2 className="mt-8 h-8 text-2xl font-bold text-black">
        모임 마감일 선택
      </h2>
      <section className="flex flex-col items-center gap-7.5">
        <div className="relative">
          <Calendar
            date={deadlineDate}
            onChange={handleDateSelect}
            minDate={new Date()}
            maxDate={subDays(getMaxDate(), 1)} // 동적으로 계산된 maxDate를 전달
            locale={ko}
            color={"#00B488"}
            onShownDateChange={(e) => {
              setMonth(e.getMonth() + 1);
              setYear(e.getFullYear());
            }}
          />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 font-semibold">
            {year}.{month}
          </div>
        </div>
      </section>
      <div className="flex w-full justify-center pt-4">
        <button
          className="bg-main disabled:bg-gray1 h-13.5 min-w-74.5 rounded-[1.75rem] px-14 py-4 text-white"
          onClick={() => submitHandler()}
          disabled={
            !(
              isAfter(new Date(deadlineDate), subDays(new Date(), 1)) &&
              isBefore(new Date(deadlineDate), getMaxDate())
            )
          }
        >
          {format(new Date(deadlineDate), "yyyy년 MM월 dd일")} 적용하기
        </button>
      </div>
    </ModalTemplate>
  );
};
