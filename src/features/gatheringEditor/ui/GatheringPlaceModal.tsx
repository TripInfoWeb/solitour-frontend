"use client";

import { ModalTemplate } from "@/shared/ui/modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { GatheringForm } from "../model/gatheringForm";

type PlaceElement = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type PlaceElement1 = {
  address: {
    address_name: string;
    b_code: string;
    h_code: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_h_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
  address_name: string;
  address_type: string;
  road_address: {
    address_name: string;
    building_name: string;
    main_building_no: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    sub_building_no: string;
    underground_yn: string;
    x: string;
    y: string;
    zone_no: string;
  };
  x: string;
  y: string;
};

interface GatheringPlaceModalProps {
  closeModal: () => void;
}

export const GatheringPlaceModal = ({
  closeModal,
}: GatheringPlaceModalProps) => {
  const [menu, setMenu] = useState("search");
  const [keyword, setKeyword] = useState("");
  const [placeCustomName, setPlaceCustomName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [placeData, setPlaceData] = useState<PlaceElement1>();
  const formContext = useFormContext<GatheringForm>();

  const handleSearch = async (keyword: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/gathering/searchPlace?keyword=${encodeURIComponent(keyword)}`,
        {
          credentials: "omit",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data.documents);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSearch = async (address: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/gathering/searchAddress?address=${encodeURIComponent(address)}`,
        {
          credentials: "omit",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data.documents);
    } finally {
      setLoading(false);
    }
  };

  const pickLocation = (element: PlaceElement) => {
    formContext.setValue("placeName", element.place_name);
    formContext.setValue("xAxis", Number(element.x));
    formContext.setValue("yAxis", Number(element.y));
    formContext.setValue("searchId", element.id);
    formContext.setValue("roadAddressName", element.address_name);
    formContext.trigger([
      "placeName",
      "xAxis",
      "yAxis",
      "searchId",
      "roadAddressName",
    ]);
    closeModal();
  };

  const pickAddress = (element: PlaceElement1) => {
    setPlaceData(element);
  };

  const applyAddressHandler = () => {
    formContext.setValue("placeName", placeCustomName);
    formContext.setValue("xAxis", Number(placeData?.x));
    formContext.setValue("yAxis", Number(placeData?.y));
    formContext.setValue("roadAddressName", placeData?.address_name ?? "");
    formContext.setValue("searchId", "");
    formContext.trigger([
      "placeName",
      "xAxis",
      "yAxis",
      "searchId",
      "roadAddressName",
    ]);
    closeModal();
  };

  useEffect(() => {
    if (keyword) {
      if (menu == "search") {
        handleSearch(keyword);
      }
      if (menu == "address") {
        handleAddressSearch(keyword);
      }
    }
  }, [keyword, menu]);

  return (
    <ModalTemplate
      className={[
        menu === "address" ? "max-h-[874px]" : "max-h-[800px]",
        "w-[calc(100vw-1rem)] max-w-[40rem]",
      ].join(" ")}
      closeModal={closeModal}
    >
      <h2 className="mt-8 mb-7.5 h-8 text-2xl font-bold text-black">
        장소 선택
      </h2>
      <section className="flex w-full flex-col items-center gap-[1.875rem]">
        <div className="flex w-full">
          <button
            className={`h-[3rem] w-full px-4 py-[.5rem] ${menu == "search" ? "bg-main text-white" : "text-black outline -outline-offset-1 outline-black"}`}
            onClick={() => {
              setMenu("search");
              setResults([]);
              setKeyword("");
            }}
          >
            검색으로 찾기
          </button>
          <button
            className={`h-[3rem] w-full px-4 py-[.5rem] ${menu == "address" ? "bg-main text-white" : "text-black outline -outline-offset-1 outline-black"}`}
            onClick={() => {
              setMenu("address");
              setResults([]);
              setKeyword("");
            }}
          >
            직접 주소 입력하기
          </button>
        </div>
        <div
          className={`w-full ${menu == "address" ? "h-[30rem]" : "h-[37rem]"}`}
        >
          {menu == "search" && (
            <>
              <article className="flex h-full w-full flex-col rounded-3xl outline -outline-offset-1 outline-[#E3E3E3]">
                <label className="flex h-13 gap-1.5 rounded-[1.5rem_1.5rem_0_1.5rem] px-4 outline -outline-offset-1 outline-[#E3E3E3]">
                  <Image
                    src="/icons/search-icon.svg"
                    alt={"search-icon"}
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="장소나 건물명을 입력해주세요"
                    className={
                      "h-[3rem] w-full bg-transparent focus:outline-hidden"
                    }
                  />
                </label>

                <ul className="flex h-full flex-col gap-2 overflow-scroll px-2 py-4">
                  {loading ? (
                    <p
                      className={
                        "flex h-full w-full items-center justify-center"
                      }
                    >
                      Loading...
                    </p>
                  ) : (
                    <>
                      {results.map((result: PlaceElement, index) => (
                        <li
                          key={index}
                          className="outline-main flex h-[3rem] w-full cursor-pointer flex-col px-2 py-1 hover:rounded-[1rem] hover:outline hover:-outline-offset-1"
                          onClick={() => pickLocation(result)}
                        >
                          <div className={"flex gap-1"}>
                            <Image
                              src="/icons/location-icon.svg"
                              alt="location-icon"
                              width={14}
                              height={14}
                            />
                            <span> {result.place_name} </span>
                          </div>
                          <div className={"text-gray2 text-sm"}>
                            {result.address_name}
                          </div>
                        </li>
                      ))}
                      {results.length == 0 && (
                        <div className={"flex justify-center py-[2rem]"}>
                          결과가 없습니다.
                        </div>
                      )}
                    </>
                  )}
                </ul>
              </article>
            </>
          )}
          {menu == "address" && (
            <>
              <article className="flex h-full w-full flex-col rounded-3xl outline -outline-offset-1 outline-[#E3E3E3]">
                <label className="flex h-13 gap-1.5 rounded-[1.5rem_1.5rem_0_1.5rem] px-4 outline -outline-offset-1 outline-[#E3E3E3]">
                  <Image
                    src="/icons/search-icon.svg"
                    alt={"search-icon"}
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="도로명을 입력해주세요. ex) 올림픽로, 수목원길"
                    className={
                      "h-[3rem] w-full bg-transparent focus:outline-hidden"
                    }
                  />
                </label>
                <ul className="flex h-full flex-col gap-2 overflow-scroll px-2 py-4">
                  {loading ? (
                    <p className="flex h-full w-full items-center justify-center">
                      Loading...
                    </p>
                  ) : (
                    <>
                      <li className="outline-main grid h-[3rem] w-full grid-cols-[auto_8rem] px-2 py-1">
                        <div className="flex items-center justify-center">
                          주소명
                        </div>
                        <div className="grid grid-cols-[3rem_5rem]">
                          <div className="flex items-center justify-center">
                            구분1
                          </div>
                          <div className="flex items-center justify-center">
                            구분2
                          </div>
                        </div>
                      </li>
                      {results
                        .filter(
                          (i: { road_address: { address_name: string } }) =>
                            i?.road_address?.address_name != undefined,
                        )
                        .map((result: PlaceElement1, index) => (
                          <li
                            key={index}
                            className="outline-main grid h-[3rem] w-full cursor-pointer grid-cols-[auto_8rem] px-2 py-1 hover:rounded-[1rem] hover:outline hover:-outline-offset-1"
                            onClick={() => pickAddress(result)}
                          >
                            <div className={"flex items-center gap-1"}>
                              <Image
                                src="/icons/location-icon.svg"
                                alt="location-icon"
                                width={14}
                                height={14}
                              />
                              <div> {result.address_name} </div>
                            </div>
                            <div className="text-gray2 grid grid-cols-[3rem_5rem] text-sm">
                              <div className="flex items-center justify-center">
                                {result?.road_address?.region_1depth_name}
                              </div>
                              <div className="flex items-center justify-center">
                                {result?.road_address?.region_2depth_name}
                              </div>
                            </div>
                          </li>
                        ))}
                      {results.filter(
                        (i: { road_address: { address_name: string } }) =>
                          i?.road_address?.address_name != undefined,
                      ).length == 0 && (
                        <div className="flex justify-center py-[2rem]">
                          결과가 없습니다.
                        </div>
                      )}
                    </>
                  )}
                </ul>
              </article>
            </>
          )}
        </div>
        {menu == "address" && (
          <div className="flex w-full flex-col gap-[1rem]">
            <h3 className="flex items-center gap-[1rem] font-medium text-black">
              <span className="text-lg font-bold text-black">장소명 입력</span>
              <span className="text-gray1">
                {placeData?.road_address.address_name}
              </span>
            </h3>
            <input
              type="text"
              placeholder="장소명을 입력하세요"
              onChange={(e) => setPlaceCustomName(e.target.value)}
              className="h-13 w-full rounded-[1rem] bg-transparent px-4 outline -outline-offset-1 outline-[#E3E3E3]"
            />
            <button
              className="bg-main disabled:bg-gray1 h-[3rem] w-full rounded-[4rem] px-4 py-[.5rem] text-white"
              onClick={() => applyAddressHandler()}
              disabled={
                placeCustomName == "" ||
                placeData?.road_address.address_name == undefined
              }
            >
              장소 적용하기
            </button>
          </div>
        )}
      </section>
    </ModalTemplate>
  );
};
