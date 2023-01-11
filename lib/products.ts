import { fetchJson } from "./api";

const { CMS_URL } = process.env;

export async function getProducts() {
  const products = await fetchJson(`${CMS_URL}/products`);
  //   return products.map(stripProduct)
  return products.map((product) => stripProduct(product)); // Same
}

export async function getProduct(slug: string) {
  const product = await fetchJson(`${CMS_URL}/products/${slug}`);
  return stripProduct(product);
}

export function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: "$" + product.price.toFixed(2),
    pictureUrl: CMS_URL + product.picture.url,
  };
}
