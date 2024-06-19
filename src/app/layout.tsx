import Footer from "@/components/common/Footer";
import FloatingButtonContainer from "@/containers/common/FloatingButtonContainer";
import HeaderContainer from "@/containers/common/HeaderContainer";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Solitour | %s",
    default: "Solitour - 새로운 나를 찾는 여행",
  },
  description: "Solitour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <HeaderContainer />
        {children}
        <Footer />
        <FloatingButtonContainer />
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
