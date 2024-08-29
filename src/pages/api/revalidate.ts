import { NextApiRequest, NextApiResponse } from "next";

//* On-demand Revalidation(ISR) : 특정 페이지를 재검증하는 방식
//* 사용자의 행동에 따라서 데이터가 업데이트 된다거나 아니면 특정 조건에 따라서 데이터가 업데이트 되어야 하는 그런 페이지를 정적페이지로 유지하고 싶을 때 이렇게 사용할 수 있다.
//* 이런 ISR방식은 대부분의 케이스들을 커버할 수 있는 가장 강력한 사전렌더링 방식이다. (활발하게 사용되고 있다.)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    res.status(500).send("Revalidating Failed");
  }
}
