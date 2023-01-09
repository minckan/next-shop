/** Option 2 : fetch products on the client side (in useEffect) */
// from an internal API route
import Head from "next/head";
import { useEffect, useState } from "react";
import { getProducts } from "../../lib/products";

const HomePage: React.FC = () => {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    // 호스트와 포트를 적을 필요는 없다.자동으로 이 페이지와 같은 서버주소를 셋팅한다.
    (async () => {
      const response = await fetch("/api/products");
      const products = await response.json();
      setProduct(products);
    })();
  }, []);

  /**
   * 위와 같은 방식으로 할때 이점
   * - content-length 사이즈가 10/1 정도로 줄수 있다 (호출하는 컨텐츠의 양에 따라 달라짐.)
   */

  console.log("[HomePage] render: ", products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-4">
        <h1 className="text-2xl">Next Shop</h1>
        <ul>
          {products.length > 0 &&
            products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
