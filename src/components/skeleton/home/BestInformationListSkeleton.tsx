import InformationItemSkeleton from "../common/InformationItemSkeleton";

const BestInformationListSkeleton = () => {
  return (
    <div className="mt-6 flex w-fit flex-wrap items-center justify-center gap-4 p-1 max-[744px]:flex-row max-[744px]:flex-nowrap">
      {[1, 2, 3, 4, 5, 6].map((value) => (
        <InformationItemSkeleton key={value} />
      ))}
    </div>
  );
};

export default BestInformationListSkeleton;
