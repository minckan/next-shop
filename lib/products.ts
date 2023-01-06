function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
  };
}

export async function getProduct() {
  const response = await fetch("http://localhost:1337/products");
  const products = await response.json();

  //   return products.map(stripProduct)
  return products.map((product) => stripProduct(product)); // Same
}
