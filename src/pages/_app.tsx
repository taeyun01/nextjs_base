import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

//* 리액트에 있었던 App컴포넌트랑 동일 (root컴포넌트에 존재하는 app)
//* Next의 App컴포넌트도 root컴포넌트의 역할을 한다.
//* 즉, 모든 페이지 역할을 하는 컴포넌트들의 부모 컴포넌트가 된다.

//? Component는 현재 페이지 역할을 할 컴포넌트를 받는거라고 생각하면 됨.
//? pageProps는 Component에 전달될 페이지의 props들을 모두 객체로 보관.
//* 즉, 넥스트에서는 어떤 페이지를 렌더링 하던간에 App컴포넌트 밑에 page역할을 하는 컴포넌트가 렌더링 된다.
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test");
  };

  return (
    <>
      <header>
        <Link href="/">홈</Link> &nbsp;
        <Link href="/search">검색</Link> &nbsp;
        <Link href="/book/1">북1</Link> &nbsp;
        <div>
          <button onClick={onClickButton}>/test페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
