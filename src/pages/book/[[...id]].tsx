import { useRouter } from "next/router";

//* URL 파라미터를 사용해서 동적경로에 대응하기
//* [id] : 경로뒤에 하나의 id가 올 수 있음  localhost:3000/book/100
//* [...id] : 경로뒤에 여러개의 id가 연달아 올 수 있음  localhost:3000/book/100/201/303
//* catch all segment : 경로 구간(123/345/23...)을 다 잡아채겠다는 의미로 불린다
//? 하지만 인덱스 경로가 없는 localhost:3000/book 에서는 오류가 발생한다. (404)
//? localhost:3000/book 해당 url뒤에 어떤 경로가 나오든 안나오든 모두다 범용적으로 대응 하고 싶다면, => 파일이름 [[...id]] 대괄호로 한번더 감싸면됨
//? [[...id]] => Optional Catch All Segments 라고 표현한다.
//? 이렇게 하면 인덱스 경로가 없어도 오류가 발생하지 않는다. /book/~~~ 어떤 경로가 들어오든 안들어오든 처리가능하다.

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id); // catch all segment를 하면 id값이 배열 형태로 저장이 된다.

  return <h1>북 {id}</h1>;
};

export default Page;
