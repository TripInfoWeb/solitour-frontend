import { useState } from "react";

interface FAQ {
  topic: string;
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    topic: "정보 서비스",
    question: "",
    answer:
      "",
  },
  {
    topic: "모임 서비스",
    question: "",
    answer:
      "",
  },
  {
    topic: "여행일기 서비스",
    question: "",
    answer:
      "",
  },
  {
    topic: "회원",
    question: "회원탈퇴는 어떻게 하나요?",
    answer:
      "우측 상단 프로필 이미지(마이페이지) - 프로필 이미지 우측 하단 설정 아이콘 - 페이지 우측 하단 '회원탈퇴'를 클릭하시면 됩니다.",
  },
];

const SupportFAQList = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const handleToggle = (topic: string) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  return (
    <div className="flex w-full flex-col border-t-2 border-t-black">
      {Array.from(new Set(faqData.map((faq) => faq.topic))).map((topic) => (
        <div
          key={topic}
          className="flex w-full flex-col border-b-2 border-b-gray3 px-5"
        >
          <button
            className="grid h-[4.625rem] w-full grid-cols-[6.0625rem_auto] items-center rounded-md"
            onClick={() => handleToggle(topic)}
          >
            <div className={"text-start font-bold text-main"}> Q </div>
            <div className={"text-start text-lg font-bold"}> {topic} </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col ${
              expandedTopic === topic ? "max-h-screen py-2 gap-y-2" : "max-h-0"
            }`}
          >
            {faqData
              .filter((faq) => faq.topic === topic)
              .map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg"
                >
                  <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupportFAQList;