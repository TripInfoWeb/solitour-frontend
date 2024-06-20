import MeetingItem from "../common/MeetingItem";

const RecommendationList = () => {
  // TODO
  const data: {
    id: number;
    category: string;
    bookmark: boolean;
    title: string;
    username: string;
    date: Date;
    location: string;
    time: string;
    image: string;
    current: number;
    total: number;
    qualification: string;
    likes: number;
    views: number;
  } = {
    id: 1,
    category: "활동",
    bookmark: true,
    title: "동해 서핑 투게더",
    username: "waver",
    date: new Date(),
    location: "강원, 동해시",
    time: "08:00",
    image: "/dataImage2.svg",
    current: 1,
    total: 6,
    qualification: "(30대, 성별 상관없음)",
    likes: 52,
    views: 102,
  };
  return (
    <div className="my-20 w-[60rem] max-[1024px]:w-[90%]">
      <h2 className="text-2xl font-bold text-black">추천 여행 정보</h2>
      <div className="flex flex-wrap items-center justify-around">
        {[1, 2, 3,4,5,6].map((_, index) => (
          <MeetingItem
            key={index}
            id={index + 1}
            category={data.category}
            bookmark={data.bookmark}
            title={data.title}
            username={data.username}
            date={data.date}
            location={data.location}
            time={data.time}
            image={data.image}
            current={data.current}
            total={data.total}
            qualification={data.qualification}
            likes={data.likes}
            views={data.views}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
