import { Html, Head, Main, NextScript } from "next/document";

//* Document 페이지의 역할은 모든 페이지에 공통적으로 적용되어야 하는 Next의 html코드를 설정하는 컴포넌트
//* 리액트의 index.html 파일과 같은 역할
//* 모든 페이지에 다 적용을 해야하는 메타태그를 설정하거나 폰트를 불러오거나, 글로벌 스타일을 적용하는 등의 역할을 함
export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
