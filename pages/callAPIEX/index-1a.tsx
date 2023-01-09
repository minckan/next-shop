/** Option 1a : fetch products on the server side (in getStaticProps) */
import Head from "next/head";
import { getProducts } from "../../lib/products";

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
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
