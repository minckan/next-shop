import { fetchJson } from "./api";

const { CMS_URL } = process.env;

export async function getCartItems(jwt: string) {
  const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  });
  return stripCartItem(cartItems);
}

export async function addCartItem() {}

function stripCartItem(cartItems) {
  const itemList = [];
  cartItems.forEach((item) => {
    itemList.push({
      id: item.id,
      title: item.product.title,
      description: item.product.description,
      price: "$" + item.product.price.toFixed(2),
      pictureUrl: CMS_URL + item.product.picture.formats.thumbnail.url,
      quantity: item.quantity,
    });
  });
  return itemList;
}
