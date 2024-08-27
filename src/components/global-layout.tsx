//* 글로벌 레이아웃 설정
//* 모든 페이지에 공통으로 적용되는 레이아웃을 설정하는 컴포넌트

import Link from "next/link";
import style from "./global-layout.module.css";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">📚책 추천</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @youtaeyun</footer>
    </div>
  );
};

export default GlobalLayout;
