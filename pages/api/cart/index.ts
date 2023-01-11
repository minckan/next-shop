import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { getCartItems } from "../../../lib/cart";
async function GetCart(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end();
    return;
  }

  try {
    const cartList = await getCartItems(jwt);
    res.status(200).json(cartList);
  } catch (error) {
    res.status(401).end();
  }
}

export default GetCart;
