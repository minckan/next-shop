import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { fetchJson } from "../../../lib/api";

const { CMS_URL } = process.env;

async function AddCart(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const path = req.url.split("/");
  const productId = path[path.length - 1];

  try {
    const response = await fetchJson(`${CMS_URL}/cart-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${jwt}`,
      },
      body: JSON.stringify({
        product: Number(productId),
        quantity: 1,
      }),
    });

    console.log("[AddCart] response:", response);
    res.status(200).json({});
  } catch (error) {
    console.log("[AddCart] Error:", error);
    res.status(401).end();
  }
}

export default AddCart;
