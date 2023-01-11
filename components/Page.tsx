import Head from "next/head";
import NavBar from "./NavBar";

function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} | Next Shop</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="px-6 py-4">
        <h1 className="text-2xl">{title}</h1>
        {children}
      </main>
    </>
  );
}

export default Page;
