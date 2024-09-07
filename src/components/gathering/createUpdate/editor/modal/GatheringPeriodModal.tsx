import "@/styles/reactDataRange.css";
import { add, format } from "date-fns";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useFormContext } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
interface IGatheringPeriodModalProps {
  closeModal: () => void;
}

const GatheringPeriodModal = (props: IGatheringPeriodModalProps) => {
  const formContext = useFormContext();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [calendarDate, setCalendarDate] = useState([
    {
      startDate: formContext.getValues("scheduleStartDate")
        ? new Date(formContext.getValues("scheduleStartDate"))
        : new Date(),
      endDate: formContext.getValues("scheduleEndDate")
        ? new Date(formContext.getValues("scheduleEndDate"))
        : new Date(),
      key: "selection",
    },
  ]);

  const handleResize = useDebouncedCallback(() => {
    setWindowWidth(window.innerWidth);
  }, 16);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const submitHandler = () => {
    let _dateTime =
      format(new Date(calendarDate[0].startDate), "yyyy-MM-dd") +
      " " +
      (formContext.getValues("scheduleStartDate")
        ? format(new Date(formContext.getValues("scheduleStartDate")), "HH:mm")
        : "12:00");

    formContext.setValue("scheduleStartDate", _dateTime);
    if (calendarDate[0].startDate == calendarDate[0].endDate) {
      formContext.setValue(
        "scheduleEndDate",
        format(new Date(calendarDate[0].startDate), "yyyy-MM-dd") +
          " " +
          "23:59",
      );
    } else {
      formContext.setValue(
        "scheduleEndDate",
        format(new Date(calendarDate[0].endDate), "yyyy-MM-dd") + " " + "23:59",
      );
    }
    formContext.watch();
    formContext.trigger("scheduleStartDate");
    formContext.trigger("scheduleEndDate");
    props.closeModal();
  };

  return (
    <div
      className={
        "scrollbar-hide relative h-full max-h-[50rem] w-[calc(100vw-1rem)] overflow-y-scroll rounded-2xl bg-white p-[1rem] max-[799px]:max-w-[25rem] min-[800px]:max-h-[36rem] min-[800px]:w-[49rem]"
      }
    >
      <button
        className="absolute right-[1rem] top-[1.5rem]"
        onClick={() => props.closeModal()}
      >
        <Image
          src={"/close-icon.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      <h2
        className={
          "mt-[2rem] h-[2rem] text-2xl font-bold text-black "
        }
      >
        날짜 선택
      </h2>
      <div className={"flex flex-col items-center gap-[1.875rem]"}>
        <div className="relative">
          <DateRangePicker
            onChange={(rangesByKey: RangeKeyDict) => {
              const selection = rangesByKey.selection;
              if (
                selection.startDate?.getFullYear() !=
                  selection.endDate?.getFullYear() ||
                selection.startDate?.getMonth() != selection.endDate?.getMonth()
              ) {
                setMonth(selection.startDate!.getMonth() + 1);
                setYear(selection.startDate!.getFullYear());
              }
              setCalendarDate([
                {
                  startDate: selection.startDate as Date,
                  endDate: selection.endDate as Date,
                  key: "selection",
                },
              ]);
            }}
            minDate={
              formContext.getValues("deadline")
                ? new Date(formContext.getValues("deadline"))
                : new Date()
            }
            maxDate={add(new Date(), { years: 1 })}
            showDateDisplay={false}
            months={2}
            ranges={calendarDate}
            locale={ko}
            direction={windowWidth > 799 ? "horizontal" : "vertical"}
            rangeColors={["#00B488", "#F2FAF7"]}
            color={"#ff0000"}
            onShownDateChange={(e) => {
              setMonth(e.getMonth() + 1);
              setYear(e.getFullYear());
            }}
          />
          <div
            className={
              "absolute left-[50%] top-6 translate-x-[-50%] font-semibold min-[800px]:left-[25%]"
            }
          >
            {year}.{month}
          </div>
          <div
            className={
              "absolute left-[50%] top-[calc(50%+46px)] translate-x-[-50%] font-semibold min-[800px]:left-[75%] min-[800px]:top-6"
            }
          >
            {year + Math.floor((month + 1) / 12)}.{(month % 12) + 1}
          </div>
        </div>
        <div className={"flex w-full justify-center gap-[1rem]"}>
          <button
            className={
              "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
            }
            onClick={() => submitHandler()}
          >
            <span> {format(calendarDate[0].startDate, "yy-MM-dd")} </span>
            <span>{format(calendarDate[0].startDate, "yy-MM-dd") && "~"}</span>
            <span> {format(calendarDate[0].endDate, "yy-MM-dd")} </span>
            <span className={"pl-[.5rem] text-[1.1rem]"}> 적용하기 </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default GatheringPeriodModal;