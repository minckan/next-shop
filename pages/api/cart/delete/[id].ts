import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { fetchJson } from "../../../../lib/api";

const { CMS_URL } = process.env;

async function DeleteCartItem(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const path = req.url.split("/");
  const productId = path[path.length - 1];

  try {
    const response = fetchJson(`${CMS_URL}/cart-items/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    });
    console.log("[DeleteCartItem]:", response);

    res.status(200).json({});
  } catch (error) {
    res.status(401).end();
  }
}

export default DeleteCartItem;
