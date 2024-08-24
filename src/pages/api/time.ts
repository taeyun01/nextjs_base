import type { NextApiRequest, NextApiResponse } from "next";

//* API Routes : API를 구축할 수 있게 해주는 기능. (JSON형태로 데이터를 반환함)
//* ~/api/time 경로에 api를 요청하면 현재 시간을 반환하는 함수를 작성해보자.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.status(200).json({ time: date.toLocaleString() });
}
