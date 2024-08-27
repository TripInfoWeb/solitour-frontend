import { SETTING_MODAL_SEX } from "@/constants/gathering/GatheringConstant";
import GatheringApplicantListContainer from "@/containers/gathering/GatheringApplicantListContainer";
import GatheringSupportManagementContainer from "@/containers/gathering/GatheringSupportManagementContainer";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { ModalState } from "@/types/ModalState";
import { convertNumberToShortForm } from "@/utils/convertNumberToShortForm";
import { format } from "date-fns";
import { ko } from 'date-fns/locale';
import Image from "next/image";
import Link from "next/link";
import GatheringLike from "../../containers/gathering/GatheringLikeContainer";
import GatheringKakaoMap from "./GatheringKakaoMap";
import GatheringUpdateDeleteButtonComponent from "./GatheringUpdateDeleteButtonComponent";
import GatheringDeleteModalContainer from "./modal/GatheringDeleteModalContainer";

interface IGatheringViewer {
  data: GatheringDetailResponseDto;
  postId: number;
  modalState: ModalState;
}

const GatheringViewer = ({ data, postId, modalState }: IGatheringViewer) => {

  return (
    <div className={"flex w-full max-w-[60rem] flex-col"}>
      {modalState.isOpen && (
        <GatheringDeleteModalContainer
          closeModal={() => modalState.closeModal()}
        />
      )}
      {/* 제일 상단 */}
      <div className="flex gap-[.25rem] text-[.625rem] text-gray2">
        <div className="text-gray1">
          <Link href={"/"}>
            <Image
              src={"/home-icon.svg"}
              alt={"home-icon-image"}
              width={10}
              height={10}
            />
          </Link>
        </div>
        <div> {">"} </div>
        <div>
          <Link href={"/gathering"}> 모임 </Link>
        </div>
        <div> {">"} </div>
        <div className={"font-bold text-gray1"}> 모임 상세 </div>
      </div>
      {/* 제목 부분 */}
      <article className="h-[11.375rem] w-full px-[.25rem] pb-[2.25rem] pt-[2.375rem]">
        {/* 제목, 신청 버튼 */}
        <div className="flex w-full items-end justify-between">
          <h1 className={"h-[3.125rem] text-3xl font-semibold"}>
            {data.title}
          </h1>
          <GatheringSupportManagementContainer postUserId={data.userPostingResponse.id} />
        </div>
        {/* 프로필 이미지, 닉네임, 좋아요, 조회수 */}
        <div className="mt-[0.375rem] flex h-[3.25rem] w-full justify-between">
          <div className={"flex items-center gap-x-3"}>
            <Image
              src={"/user_sex_man_default_image.svg"}
              alt={"sex-default-icon-image"}
              width={52}
              height={52}
              className="rounded-[50%] bg-[#F2FAF7]"
            />
            <div className="flex flex-col gap-y-[0.125rem]">
              <div className="text-xs font-semibold text-black">
                {data.userPostingResponse.name}
              </div>
              <div className="w-[4rem] text-xs text-gray1">
                {data.createdAt.substring(0, 10)}
              </div>
            </div>
          </div>
          <div className="flex w-full items-end justify-end text-xs font-medium text-gray2">
            <div className="flex flex-row items-center space-x-3">
              <div className="mb-[.25rem] flex flex-row items-center gap-2 text-gray2">
                <GatheringLike
                  likes={data.likeCount}
                  isLike={data.isLike}
                  gatheringId={postId}
                />
                <div className="flex items-center gap-1 text-sm text-gray2">
                  <Image
                    src="/eyes-icon.svg"
                    alt="eyes-icon"
                    width={16}
                    height={16}
                  />
                  <p>{convertNumberToShortForm(data.viewCount)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      {/* 제한 부분 */}
      <article className="grid grid-cols-1 gap-y-[1rem] border-y-[1px] border-[#d9d9d9] p-[1.25rem] text-sm sm:grid-cols-[320px_auto] min-[800px]:grid-cols-2">
        <div className="flex gap-x-3">
          <Image
            src={"/calendar-icon.svg"}
            alt={"calendar-icon-image"}
            width={10}
            height={10}
          />
          <div>
            {format(
              new Date(data.scheduleStartDate),
              "yyyy-MM-dd HH:mm (EE) ~ ",
              { locale: ko },
            )}
            {data.scheduleEndDate &&
              format(new Date(data.scheduleEndDate), "yyyy-MM-dd HH:mm (EE)", {
                locale: ko,
              })}
          </div>
        </div>
        <div className="flex gap-x-3">
          <Image
            src={"/location-icon.svg"}
            alt={"location-icon-image"}
            width={10}
            height={10}
          />
          <div>
            {data.zoneCategoryResponse.parentZoneCategory?.name} {","}
            {data.zoneCategoryResponse.name}
          </div>
        </div>
        <div className="flex gap-x-3">
          <Image
            src={"/people-icon.svg"}
            alt={"people-icon-image"}
            width={10}
            height={10}
          />
          <div>
            <span
              className={`${data.nowPersonCount == data.personCount && "text-[#ff0000]"}`}
            >
              <span
                className={`text-main ${data.nowPersonCount / data.personCount > 0.5 && "text-[#FC9F3A]"} ${data.nowPersonCount == data.personCount && "text-[#ff0000]"}`}
              >
                {data.nowPersonCount}
              </span>
              / {data.personCount}
            </span>
            <span className="text-gray2">
              {"(" +
                (new Date().getFullYear() - data.startAge) +
                "세 ~ " +
                (new Date().getFullYear() - data.endAge) +
                "세 ," +
                SETTING_MODAL_SEX[data.allowedSex] +
                ")"}
            </span>
          </div>
        </div>
        <div className="flex gap-x-3">
          <Image
            src={"/clock-icon.svg"}
            alt={"clock-icon-image"}
            width={10}
            height={10}
          />
          <div> {format(new Date(data.scheduleStartDate), "HH:mm")} </div>
        </div>
      </article>
      {/* 내용 부분 */}
      <div className={"my-[1rem] flex gap-1 text-gray1"}>
        <Image
          src={"/gathering/green_pin.svg"}
          alt={"clock-icon-image"}
          width={16}
          height={16}
        />
        모집 마감일:
        {format(new Date(data.deadline), "yyyy-MM-dd HH:mm(EE) 까지", {
          locale: ko,
        })}
      </div>
      <div className="mb-[1.25rem] whitespace-pre-wrap pt-[2rem]">
        {data.content}
      </div>
      {data.tagResponses?.length > 0 && (
        <div className={"mb-[2.625rem] flex gap-x-[.25rem] text-sm"}>
          {data.tagResponses?.map((i) => (
            <div
              key={i.name}
              className="max-w-max rounded-xl px-[.5rem] py-[.25rem] text-main outline outline-[1px] outline-offset-[-1px] outline-main"
            >
              {"#"}
              {i.name}
            </div>
          ))}
        </div>
      )}
      {/* 지도 부분 */}
      <div className="h-[19.875rem] w-full">
        <GatheringKakaoMap {...data.placeResponse} />
      </div>
      <GatheringApplicantListContainer postUserId={data.userPostingResponse.id} applicants={data.gatheringApplicantsResponses} />
      <GatheringUpdateDeleteButtonComponent
        userId={data.userPostingResponse.id}
        updateHref={`/gathering/edit/${postId}`}
        deleteHandler={() => modalState.openModal()}
      />
    </div>
  );
};
export default GatheringViewer;
