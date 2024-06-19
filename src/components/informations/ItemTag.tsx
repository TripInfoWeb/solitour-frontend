type MyProps = {
  tag: string;
  borderColor?: string;
  textColor?: string;
};

const ItemTag = ({
  tag,
  borderColor = "border-white",
  textColor = "text-white",
}: MyProps) => {
  return (
    <div className={`rounded-full border-[0.0625rem] ${borderColor}`}>
      <p className={`px-2 py-1 text-[0.6rem] font-medium ${textColor}`}>
        #{tag}
      </p>
    </div>
  );
};

export default ItemTag;
