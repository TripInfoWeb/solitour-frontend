import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="mt-auto flex h-fit w-full flex-row items-center justify-center bg-neutral-100 px-4">
      <div className="flex w-[60rem] flex-col gap-4 px-4 py-8">
        <Link className="relative h-8 w-[5.75rem]" href="/">
          <Image
            src={"/common/solitour-logo.svg"}
            alt={"/background"}
            fill={true}
            style={{
              objectFit: "contain",
            }}
          />
        </Link>
        <div className="text-sm font-medium text-gray1">
          <p>솔리투어는 혼자 여행에 유용한 정보와 모임을 제공합니다.</p>
          <p>
            일상 속의 휴식이 필요한 사람, 나를 위한 시간이 필요한 사람, 새로운
            여정을 위한 모든 사람
          </p>
          <p>솔리투어에서 새로운 나를 찾아보세요.</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Link
            className="flex h-[2.625rem] w-[7.5rem] items-center justify-center rounded-3xl bg-black text-sm font-medium text-white hover:scale-105"
            href="/informations/list?page=1&parentCategoryId=1"
          >
            둘러보기
          </Link>
          <div className="flex w-fit flex-row items-center gap-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 hover:scale-105">
              <RiKakaoTalkFill size={"1.5rem"} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 hover:scale-105">
              <FcGoogle size={"1.5rem"} />
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between pt-8 max-[744px]:flex-col-reverse max-[744px]:gap-4">
          <p className="text-xs font-medium text-gray1">
            Copyright Solitour. All rights reserved
          </p>
          <nav>
            <ul className="flex flex-row items-center gap-9 text-sm font-medium text-gray1">
              <li>
                <Link
                  className="hover:text-main"
                  href="/support?menu=terms#terms-of-service"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-main"
                  href="/support?menu=terms#privacy-policy"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link className="hover:text-main" href="/support?menu=about">
                  서비스소개
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
