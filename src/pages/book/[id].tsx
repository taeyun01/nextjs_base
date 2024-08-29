import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import { fetchOneBook } from "@/lib/fetch.one-book";
import { useRouter } from "next/router";
//* URL 파라미터를 사용해서 동적경로에 대응하기
//* [id] : 경로뒤에 하나의 id가 올 수 있음  localhost:3000/book/100
//* [...id] : 경로뒤에 여러개의 id가 연달아 올 수 있음  localhost:3000/book/100/201/303
//* catch all segment : 경로 구간(123/345/23...)을 다 잡아채겠다는 의미로 불린다
//? 하지만 인덱스 경로가 없는 localhost:3000/book 에서는 오류가 발생한다. (404)
//? localhost:3000/book 해당 url뒤에 어떤 경로가 나오든 안나오든 모두다 범용적으로 대응 하고 싶다면, => 파일이름 [[...id]] 대괄호로 한번더 감싸면됨
//? [[...id]] => Optional Catch All Segments 라고 표현한다.
//? 이렇게 하면 인덱스 경로가 없어도 오류가 발생하지 않는다. /book/~~~ 어떤 경로가 들어오든 안들어오든 처리가능하다.

const mockData = {
  id: 1,
  title: "한 입 크기로 잘라 먹는 리액트",
  subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
  description:
    "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
  author: "이정환",
  publisher: "프로그래밍인사이트",
  coverImgUrl:
    "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg",
};

//* 동적인 경로에 SSG 적용하기 (getStaticPaths()가 필수)
//* 상세페이지 같은 동적페이지나 모든 도서의 id를 불러오기 어렵다면 fallback: "blocking" 사용 (또는 새로운 데이터(새로운 book)가 계속 추가되어야 하는 상황에도 사용 가능
//* fallback: "blocking"을 사용해 첫번째 요청 때에는 SSR방식으로 페이지를 새롭게 생성해서 신규데이터를 반영하고, 그 다음부터는 SSG방식으로 저장된 페이지를 매우 빠르게 반환하도록 만들 수 있다.
export const getStaticPaths = async () => {
  return {
    //* 동적인 경로에 SSG를 적용하려먼 반드시 사전렌더링이 진행되기 전에 이 페이지에 존재하는 모든 경로들을 직접 설정하는 과정을 먼저 진행해줘야 한다. (getStaticPaths()로 설정)
    //* 다음 3개의 페이지가 존재할 수 있음을 먼저 설정해줘야한다.
    paths: [
      { params: { id: "1" } }, // 프레임워크 상 id는 문자열만 가능하다.
      { params: { id: "2" } }, // book/2에 접속하면 사전에 만들어둔 book/2.html을 바로 반환해준다.
      { params: { id: "3" } }, // book/3에 접속하면 사전에 만들어둔 book/3.html을 바로 반환해준다.
    ],
    // fallback: false, // path에 설정하지 않는 경로는 모두 404페이지 반환
    // fallback: "blocking", // SSR방식으로 실시간 페이지 생성(사전 렌더링)
    fallback: true, // blocking처럼 SSR방식으로 실시간으로 페이지를 생성하지만 이때 페이지의 생성을 끝까지 기다렸다가 응답하는게 아닌 그냥 데이터가 없는 폴백상태의 페이지부터 반환해주고 그 뒤에 데이터가 들어오면 보내주는 방식.
    // paths사용하지 않은 경로로 요청이 들어왔을 때, Props가 존재하지 않는 상태의 페이지를 먼저 사전렌더링 해서 브라우저에 보내준다.
  };
};

//* SSG 방식으로 변경하기
export const getStaticProps = async (context: GetStaticPropsContext) => {
  //* 해당 페이지는 무조건 url파라미터가 있어야 하기 때문에 !단언을 해준다. (undefined가 아니라는 의미)
  const id = context.params!.id;
  console.log(id);
  const book = await fetchOneBook(Number(id));

  // 아래 "문제가 발생헀습니다. 다시 시도해주세요" 대신 404 페이지르 리다이렉트 하고 싶을 때
  if (!book) return { notFound: true };

  return {
    props: {
      book,
    },
  };
};

const Page = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  // 데이터가 페칭중일 때
  if (router.isFallback) return "로딩중 입니다.";
  // 데이터 로딩이 끝났는데도 문제가 발생했을 때
  if (!book) return "문제가 발생헀습니다. 다시 시도해주세요!";

  //* book은 null값일 수 있으므로 위에서 예외 처리
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subtitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
};

export default Page;
