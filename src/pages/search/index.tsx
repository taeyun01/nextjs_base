import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  console.log(router);
  const { q } = router.query; // 쿼리스트링 꺼내기

  return <div>검색 {q}</div>;
};

export default Page;
