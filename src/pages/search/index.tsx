import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import BookItem from "@/components/book-item";
import books from "@/mock/books.json";

const Page = () => {
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
