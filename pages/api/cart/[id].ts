import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { fetchJson } from "../../../lib/api";

const { CMS_URL } = process.env;

async function AddCart(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
  }

  await fetchJson(`${CMS_URL}/cart-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
    body: JSON.stringify({
      product,
    }),
  });
}

export default AddCart;
