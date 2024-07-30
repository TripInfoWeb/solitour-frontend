/**
 * 정보 등록/정보 수정 결과 Dto
 */
export interface InformationRegisterResponseDto {
  id: number;
}

// 정보 목록 조회 결과 Dto
export interface InformationListResponseDto {
  totalPages: number;
  content: Array<{
    informationId: number;
    title: string;
    zoneCategoryParentName: string;
    zoneCategoryChildName: string;
    viewCount: number;
    isBookMark: boolean;
    thumbNailImage: string;
    likeCount: number;
  }>;
}

/**
 * 정보 상세 조회 결과 dto
 */
export interface InformationDetailDto {
  title: string;
  address: string;
  createdDate: Date;
  viewCount: number;
  content: string;
  tip: string;
  userPostingResponse: { id: number; name: string };
  tagResponses: Array<Readonly<{ name: string }>>;
  placeResponse: {
    searchId: number;
    name: string;
    xaxis: number;
    yaxis: number;
    address: string;
  };
  zoneCategoryResponse: {
    parentZoneCategory: {
      parentZoneCategory: null;
      name: string;
    };
    name: string;
  };
  imageResponses: Array<Readonly<{ imageStatus: string; address: string }>>;
  likeCount: number;
}

/**
 * 정보 Top 5 조회 결과 dto
 */
export interface TopInformationResponseDto {
  id: number;
  title: string;
}

export interface BestInformationResponseDto {
  informationId: number; // 정보 아이디
  title: string; // 제목
  zoneCategoryParentName: string; // 부모 지역 카테고리 이름
  zoneCategoryChildName: string; // 자식 지역 카테고리 이름
  parentCategoryName: string; // 부모 카테고리 이름
  viewCount: number; // 조회수
  isBookMark: boolean; // 북마크 했는지 여부
  thumbNailImage: string; // 썸네일 이미지 주소
  likeCount: number; // 좋아요 수
}
