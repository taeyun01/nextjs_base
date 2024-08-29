// 임포트로 css파일을 불러와 사용하면 충돌이 있을수 있기 때문에 오류가 뜬다.
// 넥스트 에서는 CSS Module을 사용하여 충돌을 방지한다. (className을 각각 유니크하게 생성해준다.)
// import "./index.css";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css"; //? 파일을 index.css에서 index.module.css로 변경하면 끝
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import { fetchBooks } from "@/lib/fetch-books";
import { fetchRandomBooks } from "@/lib/fetch-random-books";

//* Next에서 약속된 이름의 함수를 만들어서 내보내면 해당 페이지는 SSR을 수행하는 페이지로 인식한다.
export const getServerSideProps = async () => {
  // const allBooks = await fetchBooks(); // 모든 도서 데이터 가져오기
  // const recoBooks = await fetchRandomBooks(); // 랜덤 도서 데이터 가져오기

  //* 두개의 비동기 함수를 동시에(병렬로) 실행하고 모든 데이터를 가져온다.
  //* 병렬로 API요청이 동시에 일어나기 때문에 좀 더 빨리 페이지가 렌더링 된다.
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

//* App컴포넌트를 제외하고는 CSS Module을 활용해야 한다.
export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
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
