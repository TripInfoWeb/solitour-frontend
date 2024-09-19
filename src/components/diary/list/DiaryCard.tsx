import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { motion } from "framer-motion";

interface Props {
  diaryData: {
    diaryId: number;
    title: string;
    titleImage: string;
    startDatetime: Date;
    endDatetime: Date;
    diaryDayContentResponses: {
      diaryDayContentDetail: {
        content: string;
        feelingStatus: string;
        place: string;
      }[];
    };
  };
  flag: boolean;
  isFlipped: boolean;
  flip: () => void;
}

const DiaryCard = ({ diaryData, flag, isFlipped, flip }: Props) => {
  // 뒷면
  if (isFlipped) {
    return (
      <div
        className={`${flag ? "animate-cardFlip" : "animate-cardFlip2"} aspect-[3/4] w-full flex-col overflow-y-hidden rounded-2xl border-[0.0625rem] border-gray3 px-9 py-9 hover:border-main hover:bg-[#F2FAF7] max-[744px]:aspect-auto max-[744px]:h-[29rem]`}
        onClick={() => {
          if (flag) {
            flip();
          }
        }}
      >
        <div className="flex flex-row items-center gap-14">
          <Image
            src="/diary/day-text.svg"
            alt="day-text"
            width={41}
            height={25}
          />
          <p className="font-semibold text-main">1</p>
        </div>
        <div className="mt-[8.75rem] flex flex-col max-[972px]:mt-[5.375rem]">
          <div className="relative h-20 w-16">
            <Image
              src={`/diary/mood-icon${FEELING_STATUS[diaryData.diaryDayContentResponses.diaryDayContentDetail[0].feelingStatus]}.svg`}
              alt="mood-icon"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <Link
            className="mt-12 w-full truncate text-2xl font-bold hover:text-main max-[845px]:mt-5"
            href={`/diary/${diaryData.diaryId}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {diaryData.title}
          </Link>
          <p className="mt-3 text-lg text-gray1">
            {new Date(
              new Date(diaryData.startDatetime).getTime() + 1000 * 60 * 60 * 24,
            ).toLocaleDateString("ko-KR")}
          </p>
          <p className="truncate-vertical mt-6 text-black max-[845px]:mt-3">
            {sanitizeHtml(
              diaryData.diaryDayContentResponses.diaryDayContentDetail[0]
                .content,
              { allowedTags: [] },
            )}
          </p>
        </div>
      </div>
    );
  }

  // 앞면
  return (
    <motion.button
      className={`${flag ? "animate-cardFlip2" : "animate-cardFlip"} relative aspect-[3/4] w-full rounded-2xl border-[0.0625rem] border-gray3 hover:border-main max-[744px]:aspect-auto max-[744px]:h-[29rem] max-[518px]:w-full`}
      onClick={() => {
        if (!flag) {
          flip();
        }
      }}
      initial={{ rotateY: -90 }}
      whileInView={{ rotateY: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <Image
        className="-z-10 rounded-[0.9375rem]"
        src={
          diaryData.titleImage !== ""
            ? diaryData.titleImage
            : `/diary/season${new Date(diaryData.startDatetime).getMonth() + 1}.jpg`
        }
        alt="diary-image"
        fill={true}
        style={{ objectFit: "cover" }}
      />
      <div className="absolute bottom-0 h-[11.5rem] w-full rounded-b-2xl bg-gradient-to-b from-black/0 to-black/50" />
      <div className="absolute bottom-9 left-9 flex flex-col items-start gap-1 pr-9 text-white">
        <h2 className="text-start text-2xl font-bold">{diaryData.title}</h2>
        <p className="text-lg">{`${new Date(new Date(diaryData.startDatetime).getTime() + 1000 * 60 * 60 * 24).toLocaleDateString("ko-KR")}`}</p>
      </div>
    </motion.button>
  );
};

export default DiaryCard;
