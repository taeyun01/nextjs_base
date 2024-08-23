import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  console.log(router);
  const { q } = router.query; // 쿼리스트링 꺼내기

  return <h1>검색 {q}</h1>;
};

export default Page;
