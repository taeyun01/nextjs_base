// 임포트로 css파일을 불러와 사용하면 충돌이 있을수 있기 때문에 오류가 뜬다.
// 넥스트 에서는 CSS Module을 사용하여 충돌을 방지한다. (className을 각각 유니크하게 생성해준다.)
// import "./index.css";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css"; //? 파일을 index.css에서 index.module.css로 변경하면 끝
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

//* App컴포넌트를 제외하고는 CSS Module을 활용해야 한다.
export default function Home() {
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
