/** Option 1b: fetch products on the server side (in getStaticProps) */
// Incremental Static Regeneration
import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/products";

type HomePageProps = {
  products: {
    id: string;
    title: string;
  }[];
};

export async function getStaticProps() {
  console.log("[HomePage] getStaticProps()");

  // Run Backend Code First.
  // Use node-fetch package to fetch [http://localhost:1337/products]
  // return object include key of 'props' and the specific data inside of it.\

  // ⭐️ The Data will Pre-rendered.
  // Incremental Static Regeneration
  // It Only applies when running in Production mode. 프로덕션 모드일때만 적용된다.

  // ❗️1. Learned how to use ISR to re-fetch data at regular intervals as specified by the "revalidate" option.
  // ❗️2. re-fetch data on the server side every time the page is loaded. ==> index-1c

  // 왠만한 상황에서는(데이터를 자주 수정하지 않는다면) getStaticProps를 사용하는 것이 getServerSideProps를 사용하는 것보다 낫다.
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
}

const HomePage: React.FC = ({ products }: HomePageProps) => {
  console.log("[HomePage] render: ", products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-4">
        <h1 className="text-2xl">Next Shop</h1>
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
