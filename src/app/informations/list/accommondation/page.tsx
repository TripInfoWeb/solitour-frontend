import CategoryLinks from "@/components/informations/CategoryLinks";
import BannerContainer from "@/containers/common/BannerContainer";
import InformationListContainer from "@/containers/informations/InformationListContainer";
import TopListContainer from "@/containers/informations/TopListContainer";
import { Metadata } from "next";

type MyProps = {
  searchParams: { [key: string]: string | undefined };
};

export const metadata: Metadata = {
  title: "정보 - 숙박",
  description: "Solitour의 정보(탭)",
};

export default function page({ searchParams }: MyProps) {
  return (
    <div className="flex flex-col items-center">
      <CategoryLinks category="숙박" />
      <InformationListContainer
        category="숙박"
        subCategory={searchParams["subCategory"]!}
      />
    </div>
  );
}