import Image from "next/image";
import { RefObject } from "react";
import { MdClose } from "react-icons/md";

type MyProps = {
  index: number;
  image: string;
  imageRef: RefObject<HTMLInputElement>;
  onUploadButtonClicked: () => void;
  previewImage: () => void;
  onRemove: (index: number) => void;
};

const ImageUploadItem = ({
  index,
  image,
  imageRef,
  onUploadButtonClicked,
  previewImage,
  onRemove,
}: MyProps) => {
  if (image !== "") {
    return (
      <div className="relative flex h-[9.375rem] w-40 cursor-pointer flex-row justify-end rounded-xl border-2 p-2 hover:border-main">
        <MdClose
          className="cursor-pointer rounded-full bg-main p-1 text-white hover:scale-110"
          size={"1.75rem"}
          onClick={() => onRemove(index)}
        />
        <Image
          className="-z-10 rounded-[0.625rem]"
          src={image}
          alt={"image"}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <button
      className="flex h-[9.375rem] w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 hover:border-main"
      type="button"
      onClick={onUploadButtonClicked}
      disabled={index >= 12}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-main text-xl text-main">
        +
      </div>
      <p className="pb-[0.375rem] pt-3 text-xs font-semibold text-gray1">
        사진 추가
      </p>
      <p className="text-xs font-semibold text-gray2">{index}/12</p>
      <input
        className="hidden"
        type="file"
        id="photo"
        name="photo"
        accept=".png, .jpeg, .jpg"
        onChange={previewImage}
        ref={imageRef}
      />
    </button>
  );
};

export default ImageUploadItem;
