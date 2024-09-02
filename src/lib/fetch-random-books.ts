import { BookData } from "@/types/types";

export const fetchRandomBooks = async (): Promise<BookData[]> => {
  const url = `https://onebito-books-server.vercel.app/book/random`;

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
