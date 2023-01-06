/** Option 2 : fetch products on the client side (in useEffect) */
import Head from "next/head";
import { useEffect, useState } from "react";
import { getProduct } from "../lib/products";

const HomePage: React.FC = () => {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    const p = getProduct().then(setProduct);
    // const p = getProduct().then(products => setProduct(products))
  }, []);

  /**
   * 클라이언트 사이드에서 fetching을 하면 CMS API가 public에 접근이 가능해야한다.
   * 서버사이드에서는 넥스트 앱을 실행시킬때(run) CMS API가 서버로 부터 접근이 가능하면 된다.
   * 그리고 이것이 정적사이트라면 오직 빌드타임에만 접근 가능하면 된다.
   *
   * 클라이언트 사이드에서 API를 호출했을 경우 모든 데이터를 리턴해야 하지만
   * 서버사이드에서 호출했을 경우에는 더 적은 필요한 데이터만 리턴하면 된다.
   *
   * 반대로 클라이언트 사이드의 이점은 =>
   * 브라우저에서 바로 데이터를 패칭하게 되면 최신의 데이터를 화면에 노출할 가능성이 높아진다.
   * 반면에 서버사이드로 데이터 패칭을 하여 화면 렌더링을 하게 되면 최신이 아닌 데이터를 보여줄 확률이 높다.
   * ======> 따라서 Incremental Static Regeneration
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
