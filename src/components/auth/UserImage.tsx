import Image from "next/image";

interface UserImageProps {
  userImageAddress: string;
  userSex?: string | null;
  size: number;
  addressStyle?: string;
  defaultStyle?: string;
}

const UserImage = ({
  userImageAddress,
  size,
  addressStyle = "rounded-[50%] border-[0.03125rem] border-[#B8EDD9] bg-lightGreen",
}: UserImageProps) => {
  return userImageAddress ? (
    <Image
      src={userImageAddress}
      alt="user_image"
      width={size}
      height={size}
      className={`${addressStyle}`}
    />
  ) : (
    <div>null</div>
  );
};
export default UserImage;
