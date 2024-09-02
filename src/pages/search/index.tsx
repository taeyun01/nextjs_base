import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import BookItem from "@/components/book-item";
import { fetchBooks } from "@/lib/fetch-books";
import { useEffect, useState } from "react";
import { BookData } from "@/types/types";
import Head from "next/head";

//* context의 매개변수에는 현재 브라우저로 부터 받은 요청에 대한 모든 정보가 다 포함돼있음
// export const getStaticProps = async (
//   // export const getServerSideProps = async (
//   context: GetStaticPropsContext
// ) => {
//   //? GetStaticPropsContext에서 query프로퍼티는 없다. 이유는 getStaticProps는 빌드 타임ㅇ에 딱 한번만 실행되기 때문에 빌드 타임에는 쿼리스트링을 알수가 없다.
//   //? 빌드 타임에는 어떤 쿼리스트링이 들어올지 모르기 떄문에 SSG방식에선 쿼리스트링을 꺼내올 수 없다. 다른 방법?? 없다.. 못한다.
//   //? 그래도 동작시키길 원한다면 현재의 쿼리스트링을 꺼내와 해당 값을 기준으로 검색데이터를 불러오는 기준을 사전 렌더링이후에 즉 getStaticProps가 끝나고 나서 Page역할을 하는 클라이언트 측에서 처리해야한다.
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: {
//       books,
//     },
//   };
// };

const Page = () => {
  //* 빌드 타임에는 데이터를 미리 볼러올 수 없는 페이지가 있다면 클라이언트에서 처리하기 (리액트에서 처리하는 거랑 같음)
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      // 검색결과를 불러오는 로직
      fetchSearchResult();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>책 추천 - 검색결과</title>
        <meta property="og:image" content="./thumbnail.png" />
        <meta property="og:title" content="책 추천 - 검색결과" />
        <meta
          property="og:description"
          content="책 추천 사이트에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
};

export default Page;

//* 페이지별로 레이아웃 적용하기
Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
