// 임포트로 css파일을 불러와 사용하면 충돌이 있을수 있기 때문에 오류가 뜬다.
// 넥스트 에서는 CSS Module을 사용하여 충돌을 방지한다. (className을 각각 유니크하게 생성해준다.)
// import "./index.css";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css"; //? 파일을 index.css에서 index.module.css로 변경하면 끝
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";

//* Next에서 약속된 이름의 함수를 만들어서 내보내면 해당 페이지는 SSR을 수행하는 페이지로 인식한다.
export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  // 브라우저에서 동작하는 함수 같은건 사용불가
  console.log("서바사이드 프롭스");
  const data = "hello";
  return {
    props: {
      data,
    },
  };
};

//* App컴포넌트를 제외하고는 CSS Module을 활용해야 한다.
export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data); //? 서버에서도 한번 실행되고 브라우저애서도 한번 실행되는걸 볼 수 있음.

  //? 어떠한 조건도 없이 window객체를 쓰면 undefined가 나온다.
  //? ssr은 서버에서 한번 브라우저에서 한번 실행되기 때문에 컴포넌트 안에서도 브라우저 객체는 사용불가
  // window.location

  //? 사용하고 싶을때 방법중 하나는 useEffect를 사용하여 마운트되고 나서 실행하면 된다.
  useEffect(() => {
    console.log("클라이언트 사이드");
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

//* getLayout메서드를 호출하고 인수로 어떤 page컴포넌트를 저달하면 해당 page컴포넌트를 이러한 <SearchableLayout></SearchableLayout> 레이아웃으로 묶어서 반환해준다.
//* Home컴포넌트는 함수다. 함수는 객체다. 객체는 속성을 가질 수 있다.
Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
