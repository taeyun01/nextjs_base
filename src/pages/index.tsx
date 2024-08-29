// 임포트로 css파일을 불러와 사용하면 충돌이 있을수 있기 때문에 오류가 뜬다.
// 넥스트 에서는 CSS Module을 사용하여 충돌을 방지한다. (className을 각각 유니크하게 생성해준다.)
// import "./index.css";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css"; //? 파일을 index.css에서 index.module.css로 변경하면 끝
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { useEffect } from "react";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { fetchBooks } from "@/lib/fetch-books";
import { fetchRandomBooks } from "@/lib/fetch-random-books";

//* Next에서 약속된 이름의 함수를 만들어서 내보내면 해당 페이지는 SSR,SSG을 수행하는 페이지로 인식한다.

//* SSG(정적 사이트 생성) : SSR의 단점을 해결하는 사전 렌더링 방식, 빌드 타임에 페이지를 미리 사전렌더링 해둠
//* SSG장점 : 사전 렌더링이 많은 시간이 소요되는 페이지라도 사용자의 요청에는 애무 빠른속도로 응답 가능.
//* SSG단점 : 매번 똑같은 페이지만 응답함. 최신데이터 반영은 어렵다. (빌드 타임 이후에는 다시는 페이지를 새롭게 생성하지 않음.)
// SSG
export const getStaticProps = async () => {
  // export const getServerSideProps = async () => { // SSR
  // const allBooks = await fetchBooks(); // 모든 도서 데이터 가져오기
  // const recoBooks = await fetchRandomBooks(); // 랜덤 도서 데이터 가져오기

  console.log("인덱스 페이지"); // SSG방식을 확인하려먼 빌드 후 확인

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
    //* ISR(Incremental Static Regeneration) : 일정시간을 주기적으로 페이지를 재생성하는 방식, 되도록이면 가장 추천하는 방식
    //* 가장 강력한 사전 렌더링 방식
    revalidate: 3, // 3초 후 재검증, 즉 페이지 재생성
    // 그럼 이제 3초 마다 랜덤 도서 데이터가 바뀌는 것을 확인할 수 있다.
  };
};
// SSG방식쓸 때 Props타입도 바꿔줘야 함
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
