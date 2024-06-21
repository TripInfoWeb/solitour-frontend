import { CATEGORY_TEXT } from "@/constants/informations/category";
import Image from "next/image";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";

type MyProps = {
  id: number;
  category: string;
  title: string;
  image: string;
};

// todo
const InformationItem = ({ id, category, title, image }: MyProps) => {
  let style = "";
  switch (category) {
    case "맛집":
      style = "border-[#FFDDEF] bg-[#FFF2F9] text-[#C5006A]";
      break;
    case "숙박":
      style = "border-[#BEEDEA] bg-[#E7FFFB] text-[#009CBE]";
      break;
    case "액티비티":
      style = "border-[#DDE5FF] bg-[#F2F6FF] text-[#0036C2]";
      break;
    default:
      break;
  }

  return (
    <div className="relative flex h-[19rem] w-[19rem] flex-col justify-between rounded-2xl outline outline-2 outline-gray3 duration-300 hover:outline-main">
      <Image
        className="-z-10 rounded-[0.875rem]"
        src={image}
        alt={"PostImage"}
        fill={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="rounded-0 flex flex-row items-center justify-between px-5 pt-5">
        <p
          className={`w-fit rounded-full border-2 px-4 py-[0.375rem] text-xs font-semibold shadow ${style}`}
        >
          {category}
        </p>
        <div className="cursor-pointer text-white hover:scale-110">
          <CiBookmark size={"2rem"} />
        </div>
      </div>
      <div className="flex h-28 flex-col justify-between bg-white px-5 py-4">
        <Link
          className="p-1 font-bold hover:text-main"
          href={`/informations/${CATEGORY_TEXT[category]}/${id}`}
        >
          {title}
        </Link>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1 text-gray1">
            <Image
              src="/location-icon.svg"
              alt="location-icon.svg"
              width={10}
              height={10}
            />
            <p className="text-xs font-medium">제주특별자치도, 제주시</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-1 text-gray2">
              <FaRegHeart size={"0.8rem"} />
              <p className="text-xs">666M</p>
            </div>
            <div className="flex flex-row items-center gap-1 text-gray2">
              <Image
                src="/eyes-icon.svg"
                alt="eyes-icon.svg"
                width={15}
                height={15}
              />
              <p className="text-xs">222K</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationItem;
