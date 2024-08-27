//* 페이지별 레이아웃 설정하기
//* 특정 페이지에만 레이아웃 설정 (검색바는 모든 페이지에 존재하지 않음)

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./searchable.layout.module.css";

const SearchableLayout = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const q = router.query.q as string;

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    // 검색어가 없거나, 이전에 검색어랑 같을 때 검색하지 않음
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    onSubmit();
  };

  useEffect(() => {
    if (!q) return;
    setSearch(q || "");
  }, [q]);

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          type="text"
          placeholder="검색어를 입력하세요"
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
};

export default SearchableLayout;
