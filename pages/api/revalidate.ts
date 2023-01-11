import { NextApiRequest, NextApiResponse } from "next";
/**
 * on-demand revalidation : 정적 생성된 페이지라도 실시간으로 업데이트 된 페이지를 제공할 수 있다. ❗️next v.12.2부터 안정화버전이므로 확인 필수
 * CMS를 사용했을때 Webhook을 생성해서 해당 주소와 맞는 api route를 만든 후 해당 파일에 함수 생성하여 export 한다.
 *
 */

async function handleRevalidate(req: NextApiRequest, res: NextApiResponse) {
  console.log("/api/revalidate received : ", req.body);
  const event = req.body;
  if (event.model === "product") {
    const id = event.entry.id;
    await Promise.all([res.revalidate("/"), res.revalidate(`/products/${id}`)]);

    console.log(`revalidate product ${id}`);
  }
  res.status(204).end();
}

export default handleRevalidate;
