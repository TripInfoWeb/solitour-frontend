import { CiBookmark } from "react-icons/ci";
import ItemTag from "../informations/ItemTag";
import { FaEye, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { CATEGORY_TEXT } from "@/constants/informations/category";
import Image from "next/image";

type MyProps = {
  id: number;
  category: string;
  title: string;
  image: string;
  tags: string[];
};

// todo
const PostItem = ({ id, category, title, image, tags }: MyProps) => {
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
    <div className="relative mx-2 mt-8 flex h-[18.75rem] w-[18.75rem] flex-col justify-between rounded-2xl p-6 duration-300 hover:scale-105">
      <Image
        className="-z-10 rounded-2xl"
        src={image}
        alt={"PostImage"}
        fill={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="flex flex-row items-center justify-between">
        <p
          className={`w-fit rounded-full border-2 px-4 py-1 text-sm font-semibold shadow ${style}`}
        >
          {category}
        </p>
        <div className="cursor-pointer text-white hover:scale-110">
          <CiBookmark size={"2rem"} />
        </div>
      </div>
      <div>
        <Link
          className="font-semibold text-white hover:text-green-200"
          href={`/informations/${CATEGORY_TEXT.get(category)}/${id}`}
        >
          {title}
        </Link>
        <div className="flex flex-row justify-between pt-2">
          <div className="flex flex-row items-center space-x-1">
            {tags.map((tag, index) => (
              <ItemTag key={index} tag={tag} />
            ))}
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row items-center space-x-[0.125rem] text-white">
              <FaEye />
              <p className="text-xs">222K</p>
            </div>
            <div className="flex flex-row items-center space-x-[0.125rem] text-white">
              <FaRegHeart size={"0.75rem"} />
              <p className="text-xs">666M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
