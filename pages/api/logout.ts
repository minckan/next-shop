import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
function handleLogout(req: NextApiRequest, res: NextApiResponse) {
  res
    .setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        path: "/api",
        expires: new Date(0),
      })
    )
    .status(200)
    .json({});
}

export default handleLogout;
