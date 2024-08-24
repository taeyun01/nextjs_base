// 임포트로 css파일을 불러와 사용하면 충돌이 있을수 있기 때문에 오류가 뜬다.
// 넥스트 에서는 CSS Module을 사용하여 충돌을 방지한다. (className을 각각 유니크하게 생성해준다.)
// import "./index.css";
import style from "./index.module.css"; //? 파일을 index.css에서 index.module.css로 변경하면 끝

//* App컴포넌트를 제외하고는 CSS Module을 활용해야 한다.
export default function Home() {
  return (
    <>
      {/* //? css파일에서 작성한 className을 설정해 주면 됨 */}
      <h1 className={style.h1}>인덱스</h1>
      <h2 className={style.h2}>인덱스</h2>
    </>
  );
}
