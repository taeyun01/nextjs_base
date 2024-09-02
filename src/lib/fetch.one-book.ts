import { BookData } from "@/types/types";

export const fetchOneBook = async (id: number): Promise<BookData | null> => {
  const url = `https://onebito-books-server.vercel.app/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
