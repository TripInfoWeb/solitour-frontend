import { userResponseDto } from "@/types/UserDto";
import Image from "next/image";
import Link from "next/link";

interface IMyPageHeader {
  userInfo: userResponseDto;
}

const MyPageHeader = ({userInfo}:IMyPageHeader) => {
  return (
    <div className={"flex w-full max-w-[60rem] flex-col pt-[2.5rem]"}>
      <h1 className={"text-3xl font-semibold"}> 마이페이지 </h1>
      <div className={"flex items-center justify-center pb-[5rem] pt-[6.5rem]"}>
        <article className={"flex flex-col items-center"}>
          <div
            className={
              "relative mb-[1rem] aspect-square w-[6.75rem] rounded-[50%] bg-[#F2FAF7] outline outline-[1px] outline-offset-[1px] outline-[#B8EDD9]"
            }
          >
            {/* ? 유저의 썸네일 이미지가 있는지? */}
            {userInfo.userImage?.address ? (
              <Image
                src={userInfo.userImage?.address}
                alt={"user_image"}
                width={108}
                height={108}
                className="rounded-[50%]"
              />
            ) : userInfo.sex == "MALE" ? (
              <Image
                src={"/user_sex_man_default_image.svg"}
                alt={"user_image"}
                width={108}
                height={108}
                className="rounded-[50%]"
              />
            ) : (
              <Image
                src={"/user_sex_woman_default_image.svg"}
                alt={"user_image"}
                width={108}
                height={108}
                className="rounded-[50%]"
              />
            )}
            <Link href="/mypage/profile">
              <div
                className={
                  "absolute bottom-0 right-0 flex aspect-square w-[2.375rem] items-center justify-center rounded-[50%] bg-[#F4F4F4]"
                }
              >
                <div className="relative h-[1.25rem] w-[1.25rem]">
                  <Image
                    src={"/setting-icon.svg"}
                    alt={"setting-icon-image"}
                    fill
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className={"text-2xl font-semibold text-[#111]"}>
            {userInfo.nickname}
          </div>
          <div className={"text-[#666]"}> {userInfo.email} </div>
        </article>
      </div>
    </div>
  );
};
export default MyPageHeader;
