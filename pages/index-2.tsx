/** Option 2 : fetch products on the client side (in useEffect) */
import Head from "next/head";
import { useEffect } from "react";

const products = [
  { id: 1, title: "First Product" },
  { id: 2, title: "Second Product" },
  { id: 3, title: "Third Product" },
];

const HomePage: React.FC = () => {
  useEffect(() => {
    // fetch data
  }, []);
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
