import { BookData } from "@/types/types";

//* fetchBooks()를 확장해서 검색 기능도 사용할 수 있도록 만들기
export const fetchBooks = async (q?: string): Promise<BookData[]> => {
  let url = `https://onebito-books-server.vercel.app/book`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
