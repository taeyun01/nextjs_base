import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode; // book 페이지 처럼 없을 수 있으니 옵셔널하게 설정
};

//* 리액트에 있었던 App컴포넌트랑 동일 (root컴포넌트에 존재하는 app)
//* Next의 App컴포넌트도 root컴포넌트의 역할을 한다.
//* 즉, 모든 페이지 역할을 하는 컴포넌트들의 부모 컴포넌트가 된다.

//? Component는 현재 페이지 역할을 할 컴포넌트를 받는거라고 생각하면 됨.
//? pageProps는 Component에 전달될 페이지의 props들을 모두 객체로 보관.
//* 즉, 넥스트에서는 어떤 페이지를 렌더링 하던간에 App컴포넌트 밑에 page역할을 하는 컴포넌트가 렌더링 된다.
export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page); // 만약 현재 접속한 페이지가 book 및 book/123 페이지여서 getLayout(서치레이아웃)이 없다면 그냥 페이지를 반환하게 된다.

  //* getLayout() 함수에 의해서 페이지역할을 하는 Component가 SearchableLayout으로 감싸진 형태로 렌더링이 된다.
  //* 정리하자면 App컴포넌트는 루트컴포넌트로써 렌더링이 된다. 이 App컴포넌트는 현재 접속 요청이 온 페이지 역할을 하는 컴포넌트 즉, index페이지로 접속 요청이 왔다면
  //* index.tsx에 Home컴포넌트 이러한 컴포넌트 들을 Component Props로 받게 된다.
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
