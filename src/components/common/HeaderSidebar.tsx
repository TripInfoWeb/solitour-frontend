import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  signedIn: boolean;
  hoverNum: number;
  animationFlag: boolean;
  setHoverNum: Dispatch<SetStateAction<number>>;
  logoutHandler: () => void;
  onClose: () => void;
  closeWithFadeOut: () => Promise<void>;
}

const HeaderSidebar = ({
  signedIn,
  hoverNum,
  animationFlag,
  setHoverNum,
  logoutHandler,
  onClose,
  closeWithFadeOut,
}: Props) => {
  return (
    <aside
      onClick={closeWithFadeOut}
      className={`${animationFlag ? "animate-sidebarFadeOut" : "animate-sidebarFadeIn"} fixed left-0 top-0 z-50 flex h-[200%] w-full flex-row justify-end bg-black/25`}
    >
      <nav className="flex h-fit max-h-[calc(100vh-1rem)] w-[20.375rem] flex-col gap-4 overflow-y-scroll rounded-b-lg bg-white p-4 pb-6">
        <div className="flex h-10 w-full items-center justify-end">
          <MdClose
            className="cursor-pointer text-gray2 hover:text-main"
            size={"2.5rem"}
            onClick={() => closeWithFadeOut}
          />
        </div>
        <div className="flex flex-col text-xl">
          <Link
            className="flex h-[5rem] flex-row items-center gap-4 pl-[3.75rem] hover:text-main"
            href="/"
            onClick={onClose}
            onMouseEnter={() => setHoverNum(1)}
            onMouseLeave={() => setHoverNum(0)}
            onTouchStart={() => setHoverNum(1)}
          >
            {hoverNum === 1 ? (
              <Image
                className="aspect-square"
                src="/icons/home-green-icon.svg"
                alt="home-green-icon"
                width={22}
                height={22}
              />
            ) : (
              <Image
                className="aspect-square"
                src="/icons/home-empty-icon.svg"
                alt="home-empty-icon"
                width={22}
                height={22}
              />
            )}
            <p className="pl-[0.125rem]">홈</p>
          </Link>
          <Link
            className="flex h-[5rem] flex-row items-center gap-4 pl-[3.75rem] hover:text-main"
            href="/informations/list?page=1&parentCategoryId=1"
            onClick={onClose}
            onMouseEnter={() => setHoverNum(2)}
            onMouseLeave={() => setHoverNum(0)}
            onTouchStart={() => setHoverNum(2)}
          >
            {hoverNum === 2 ? (
              <Image
                className="aspect-square"
                src="/icons/information-green-icon.svg"
                alt="information-green-icon"
                width={24}
                height={24}
              />
            ) : (
              <Image
                className="aspect-square"
                src="/icons/information-empty-icon.svg"
                alt="information-empty-icon"
                width={24}
                height={24}
              />
            )}
            <p>여행 정보</p>
          </Link>
          <Link
            className="flex h-[5rem] flex-row items-center gap-4 pl-[3.75rem] hover:text-main"
            href="/gathering"
            onClick={onClose}
            onMouseEnter={() => setHoverNum(3)}
            onMouseLeave={() => setHoverNum(0)}
            onTouchStart={() => setHoverNum(3)}
          >
            {hoverNum === 3 ? (
              <Image
                className="aspect-square"
                src="/icons/gathering-green-icon.svg"
                alt="gathering-green-icon"
                width={24}
                height={24}
              />
            ) : (
              <Image
                className="aspect-square"
                src="/icons/gathering-empty-icon.svg"
                alt="gathering-empty-icon"
                width={24}
                height={24}
              />
            )}
            <p>모임 정보</p>
          </Link>
          <Link
            className="flex h-[5rem] flex-row items-center gap-4 pl-[3.75rem] hover:text-main"
            href="/diary/list?page=1"
            onClick={onClose}
            onMouseEnter={() => setHoverNum(4)}
            onMouseLeave={() => setHoverNum(0)}
            onTouchStart={() => setHoverNum(4)}
          >
            {hoverNum === 4 ? (
              <Image
                className="aspect-square"
                src="/icons/diary-green-icon.svg"
                alt="diary-green-icon"
                width={24}
                height={24}
              />
            ) : (
              <Image
                className="aspect-square"
                src="/icons/diary-empty-icon.svg"
                alt="diary-empty-icon"
                width={24}
                height={24}
              />
            )}
            <p>여행일기</p>
          </Link>
          <Link
            className="flex h-[5rem] flex-row items-center gap-4 pl-[3.75rem] hover:text-main"
            href="/support?menu=about"
            onClick={onClose}
            onMouseEnter={() => setHoverNum(5)}
            onMouseLeave={() => setHoverNum(0)}
            onTouchStart={() => setHoverNum(5)}
          >
            {hoverNum === 5 ? (
              <Image
                className="aspect-square"
                src="/icons/support-green-icon.svg"
                alt="support-green-icon"
                width={24}
                height={24}
              />
            ) : (
              <Image
                className="aspect-square"
                src="/icons/support-empty-icon.svg"
                alt="support-empty-icon"
                width={24}
                height={24}
              />
            )}
            <p>고객지원</p>
          </Link>
          {signedIn ? (
            <div className="flex flex-col">
              <Link
                className="flex h-[5rem] flex-row items-center gap-4 pl-[3.75rem] hover:text-main"
                href="/mypage?mainCategory=정보&category=owner"
                onClick={onClose}
                onMouseEnter={() => setHoverNum(6)}
                onMouseLeave={() => setHoverNum(0)}
                onTouchStart={() => setHoverNum(6)}
              >
                {hoverNum === 6 ? (
                  <Image
                    className="aspect-square"
                    src="/icons/mypage-green-icon.svg"
                    alt="mypage-green-icon"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    className="aspect-square"
                    src="/icons/mypage-empty-icon.svg"
                    alt="mypage-empty-icon"
                    width={24}
                    height={24}
                  />
                )}
                <p>마이페이지</p>
              </Link>
              <button
                className="flex h-[5rem] flex-row items-center gap-4 pl-[3.75rem] hover:text-main"
                onClick={logoutHandler}
                onMouseEnter={() => setHoverNum(7)}
                onMouseLeave={() => setHoverNum(0)}
                onTouchStart={() => setHoverNum(7)}
              >
                {hoverNum === 7 ? (
                  <Image
                    className="aspect-square"
                    src="/icons/logout-green-icon.svg"
                    alt="logout-green-icon"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    className="aspect-square"
                    src="/icons/logout-empty-icon.svg"
                    alt="logout-empty-icon"
                    width={24}
                    height={24}
                  />
                )}
                <p>로그아웃</p>
              </button>
            </div>
          ) : (
            <Link
              className="flex h-[5rem] flex-row items-center gap-4 pl-[3.75rem] hover:text-main"
              href="/auth/signin"
              onClick={onClose}
              onMouseEnter={() => setHoverNum(7)}
              onMouseLeave={() => setHoverNum(0)}
              onTouchStart={() => setHoverNum(7)}
            >
              {hoverNum === 7 ? (
                <Image
                  className="aspect-square"
                  src="/icons/signin-green-icon.svg"
                  alt="signin-green-icon"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  className="aspect-square"
                  src="/icons/signin-empty-icon.svg"
                  alt="signin-empty-icon"
                  width={24}
                  height={24}
                />
              )}
              <p>로그인</p>
            </Link>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default HeaderSidebar;
