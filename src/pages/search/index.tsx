import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import BookItem from "@/components/book-item";
import books from "@/mock/books.json";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchBooks } from "@/lib/fetch-books";

//* context의 매개변수에는 현재 브라우저로 부터 받은 요청에 대한 모든 정보가 다 포함돼있음
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  console.log(context);
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: {
      books,
    },
  };
};

const Page = ({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default Page;

//* 페이지별로 레이아웃 적용하기
Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
