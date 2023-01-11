import { NextApiResponse, NextApiRequest } from "next";
import { fetchJson } from "../../lib/api";
import cookie from "cookie";

const { CMS_URL } = process.env;

async function handlerLogin(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;

  try {
    const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });

    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api", // api 라우트 에서만 쿠키를 읽겠다는 설정
          httpOnly: true,
          // expires 옵션을 셋팅안하면 session cookie가 된다. => 유저가 브라우저를 닫을때 까지만 쿠키를 유지함.
        })
      )
      .json({
        id: user.id,
        name: user.username,
      });
  } catch (error) {
    res.status(401).end();
  }
}

export default handlerLogin;
