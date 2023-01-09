/** Option 1c : fetch products on the server side (in getServerSideProps) */
import Head from "next/head";
import { getProducts } from "../../lib/products";

type HomePageProps = {
  products: {
    id: string;
    title: string;
  }[];
};

// ⭐️getServerSideProps will be called every time this page is requested.
// λ <== rambda symbol. :  this page server-side renders at running
// 클라이언트에서 데이터를 호출할때와 같이 항상 최신데이터를 보여주나, 서버는 여전히 프리랜더한 HTML파일을 리턴한다.
// getStaticProps와 비교해서 단점은, 페이지가 런타임에 생성돼서 반응이 더 느릴수 있고,
// 유저가 페이지를 로드하는 매순간 API를 호출해야 하므로 잠재적으로 백엔드에 아주많은 양의 요청을 하게 될수 있고 이는 우리의 앱을 거대하게 만든다.

// Dev 모드 일때는 getStaticProps를 사용하든 getServerSideProps를 사용하든 getStaticProps에서 revalidate옵션을 사용하서 ISR을 하든
// 똑같이 getServerSideProps를 사용한것처럼 페이지를 로드 하는 매순간 서버에서 API를 호출한다.
export async function getServerSideProps() {
  console.log("[HomePage] getServerSideProps()");

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
