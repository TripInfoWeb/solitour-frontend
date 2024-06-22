import { useEffect, useState } from "react";

type MyProps = {
  address: string; // 주소
  placeId: number; // 장소 id 값
};

const KakaoMapContainer = ({ address, placeId }: MyProps) => {
  const [loading, isLoading] = useState<boolean>(true);

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        isLoading(false);

        // id가 "map"인 요소에 지도를 생성한다.
        const container = document.getElementById("map");
        const options = {
          // 지도 좌표값 설정
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),

          // 줌 레벨을 3으로 설정
          level: 3,

          // 지도를 생성할때 지도 이동 및 확대/축소를 막기 위해 draggable: false 옵션을 추가.
          draggable: false,
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);

        // 주소-좌표 변환 객체 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다.
        geocoder.addressSearch(address, (result: any, status: any) => {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );

            // 결과값으로 받은 위치를 마커로 표시합니다.
            const marker = new window.kakao.maps.Marker({
              // 마커가 표시될 지도
              map: map,

              // 마커가 표시될 위치
              position: coords,

              // 마커에 hover시 나타날 title
              //title: title,
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다.
            map.setCenter(coords);
          }
        });
      });
    }
  }, [address]);

  // 지도를 담을 영역
  // 반드시 width, height 값을 지정해야 지도가 출력된다.
  // 최상위 태그에 id 값을 지정해야 함.
  return (
    <a
      id="map"
      className={`${loading ? "animate-pulse" : ""} h-48 w-full rounded-2xl border-2 bg-slate-200`}
      href={`https://map.kakao.com/link/map/${placeId}`}
      target="_blank"
    />
  );
};

export default KakaoMapContainer;
