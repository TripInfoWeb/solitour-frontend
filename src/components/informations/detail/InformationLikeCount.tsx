import HashSpinner from "@/components/common/HashSpinner";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  clickable: boolean;
  loading: boolean;
  likeCount: number;
  isLiked: boolean;
  onLikesClick: () => void;
}

const InformationLikeCount = ({
  clickable,
  loading,
  likeCount,
  isLiked,
  onLikesClick,
}: Props) => {
  if (!clickable) {
    return (
      <div className="flex flex-row items-center gap-1 text-gray2">
        <FaRegHeart size={"0.8rem"} />
        <p className="text-xs">{likeCount}</p>
      </div>
    );
  }

  return (
    <div>
      <HashSpinner loading={loading} />
      <button
        className={`${isLiked ? "text-[#F85E5E]" : "text-gray2"} flex flex-row items-center gap-1 hover:text-[#F85E5E]`}
        type="button"
        onClick={() => onLikesClick()}
      >
        {isLiked ? <FaHeart size={"0.8rem"} /> : <FaRegHeart size={"0.8rem"} />}
        <p className="text-xs">{likeCount}</p>
      </button>
    </div>
  );
};

export default InformationLikeCount;
