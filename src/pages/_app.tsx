import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

  //? App컴포넌트가 마운트 되고나서 test페이지를 프리페칭 시킨다. 그럼 위 router.push는 Link처럼 동일한 역할을 수행한다.
  //? 명시적으로 프리페칭을 할 수 있다.
  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href="/">홈</Link> &nbsp;
        {/* prefetch={false} 옵션을 주면 프리페칭을 하지 않는다. */}
        <Link href="/search" prefetch={false}>
          검색
        </Link>{" "}
        &nbsp;
        <Link href="/book/1">북1</Link> &nbsp;
        <div>
          <button onClick={onClickButton}>/test페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
