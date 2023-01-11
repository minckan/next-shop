import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { fetchJson } from "../../lib/api";

const { CMS_URL } = process.env;

async function handleUser(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const user = await fetchJson(`${CMS_URL}/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (error) {
    /**
     * 보통은 1) 토큰이 유효하지 않아 요청이 실패한 경우와 2) 네트워크 오류가 있었을 수 있는 다른 경우를 대응해야한다. (해당 코드에서는 X)
     */
    res.status(401).end();
  }
}

export default handleUser;

/**
 * 응답을 캐싱하여 API 요청을 제한할 수 있다.
 */
