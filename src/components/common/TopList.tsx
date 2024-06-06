import Link from "next/link";

type MyProps = {
  title: string;
};

const TopList = ({ title }: MyProps) => {
  return (
    <div className="-mt-16 flex h-fit w-[960px] flex-col justify-center rounded-2xl bg-white px-20 py-16 shadow shadow-[#CCECE2] max-[1024px]:w-[90%] max-[1024px]:px-8">
      <h2 className="mb-9 border-b-2 border-neutral-200 pb-3 text-2xl font-semibold">
        {`${title} 정보 `}
        <span className="font-bold text-main">Top 5</span>
      </h2>
      <div className="flex flex-row justify-between max-[1024px]:flex-col max-[1024px]:space-x-0 max-[1024px]:space-y-6">
        <ol className="w-[390px] space-y-6 max-[1024px]:w-full">
          <li className="flex flex-row items-center">
            <p className="w-6 font-bold text-main">1.</p>
            <Link
              className="text-gray1 w-96 overflow-hidden text-ellipsis whitespace-nowrap text-sm hover:text-main max-[1024px]:w-full"
              href="/"
            >
              서촌 분위기 있는 혼술 카페 여기 있어! 서촌 분위기 있는 혼술 카페
              여기 있어!
            </Link>
          </li>
          <li className="flex flex-row items-center">
            <p className="w-6 font-bold text-main">2.</p>
            <Link
              className="text-gray1 w-96 overflow-hidden text-ellipsis whitespace-nowrap text-sm hover:text-main max-[1024px]:w-full"
              href="/"
            >
              커피와 프렌치토스트가 맛있는 재즈 카페 시노라 북촌점
            </Link>
          </li>
          <li className="flex flex-row items-center">
            <p className="w-6 font-bold text-main">3.</p>
            <Link
              className="text-gray1 w-96 overflow-hidden text-ellipsis whitespace-nowrap text-sm hover:text-main max-[1024px]:w-full"
              href="/"
            >
              서촌 분위기 있는 혼술 카페 여기 있어!
            </Link>
          </li>
        </ol>
        <ol className="w-[390px] space-y-6 max-[1024px]:w-full">
          <li className="flex flex-row items-center">
            <p className="w-6 font-bold text-main">4.</p>
            <Link
              className="text-gray1 w-96 overflow-hidden text-ellipsis whitespace-nowrap text-sm hover:text-main max-[1024px]:w-full"
              href="/"
            >
              서촌 분위기 있는 혼술 카페 여기 있어!
            </Link>
          </li>
          <li className="flex flex-row items-center">
            <p className="w-6 font-bold text-main">5.</p>
            <Link
              className="text-gray1 w-96 overflow-hidden text-ellipsis whitespace-nowrap text-sm hover:text-main max-[1024px]:w-full"
              href="/"
            >
              서촌 분위기 있는 혼술 카페 여기 있어!
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TopList;
