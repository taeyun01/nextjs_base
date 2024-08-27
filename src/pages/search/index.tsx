import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  console.log(router);
  const { q } = router.query; // 쿼리스트링 꺼내기

  return <h1>검색 {q}</h1>;
};

export default Page;

//* 페이지별로 레이아웃 적용하기
Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
