import DeleteIcon from "@/components/common/icons/DeleteIcon";
import EditIcon from "@/components/common/icons/EditIcon";
import sanitizeOption from "@/constants/common/sanitizeOption";
import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import DiaryDeleteModalContainer from "@/containers/diary/detail/DiaryDeleteModalContainer";
import { GetDiaryResponseDto } from "@/types/DiaryDto";
import Image from "next/image";
import Link from "next/link";
import { TiLocation } from "react-icons/ti";
import sanitizeHtml from "sanitize-html";

interface Props {
  data: GetDiaryResponseDto;
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const DiaryViewer = ({ data, modalVisible, openModal, closeModal }: Props) => {
  return (
    <div className="flex w-full flex-col items-start">
      {modalVisible && (
        <DiaryDeleteModalContainer
          diaryId={data.diaryContentResponse.diaryId}
          closeModal={closeModal}
        />
      )}
      <div className="relative mt-[5.5rem] h-20 w-16">
        <Image
          src={`/diary/mood-icon${FEELING_STATUS[data.diaryContentResponse.diaryDayContentResponses.diaryDayContentDetail[0].feelingStatus]}.svg`}
          alt="mood-icon"
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
      <h1 className="mt-12 text-[1.75rem] font-bold">
        {data.diaryContentResponse.title}
      </h1>
      <div className="mt-6 flex w-full flex-row items-center justify-between text-lg text-gray1">
        <p>
          {new Date(
            new Date(data.diaryContentResponse.startDatetime).getTime() +
              (1000 * 60 * 60 * 24 - 1),
          ).toLocaleDateString("ko-KR")}
        </p>
        <div className="flex flex-row items-center gap-1">
          <TiLocation className="text-main" size={"1.3rem"} />
          <p>
            {
              data.diaryContentResponse.diaryDayContentResponses
                .diaryDayContentDetail[0].place
            }
          </p>
        </div>
      </div>
      <div
        className="diaryViewerContent mt-16"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(
            data.diaryContentResponse.diaryDayContentResponses
              .diaryDayContentDetail[0].content,
            sanitizeOption,
          ),
        }}
      />
      <div className="mb-32 mt-6 flex w-full flex-row items-center justify-end gap-3 text-sm">
        <Link
          className="flex flex-row items-center gap-1 stroke-gray2 text-sm text-gray1 hover:stroke-main hover:text-main"
          href={`/diary/edit/${data.diaryContentResponse.diaryId}`}
        >
          <EditIcon />
          수정
        </Link>
        <button
          className="flex flex-row items-center gap-1 fill-gray2 stroke-gray2 text-sm text-gray1 hover:fill-main hover:stroke-main hover:text-main"
          onClick={() => openModal()}
        >
          <DeleteIcon className="fill-inherit" />
          삭제
        </button>
      </div>
    </div>
  );
};

export default DiaryViewer;
