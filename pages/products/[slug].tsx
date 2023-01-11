import Image from "next/image";
import Page from "../../components/Page";
import { ApiError, fetchJson } from "../../lib/api";
import { getProduct, getProducts } from "../../lib/products";

/**
 * getStaticPaths는 빌드타임에 생성되기 때문에 프로덕션 모드에서 새로운 데이터를 추가할 경우 (새로운 상품)
 * 새로운 상품 상세페이지는 다이나믹 라우트에 추가되지 않아 404 페이지가 뜬다.
 */
export async function getStaticPaths() {
  const slugs = await getProducts();
  console.log("[ProductPage] getStaticPaths :", slugs);

  const paths = slugs.map((product) => ({
    params: { slug: String(product.id) },
  }));

  return {
    paths,
    fallback: "blocking", // 요청된 페이지가 존재하지 않을경우 서버에 어떻게 할것인지에 대한 셋팅.
    // true, false, 'blocking' 빌드타임에 생성되지 않은 리스트에 대한 동적 페이지가 생성된다.
  };
}

export async function getStaticProps({ params: { slug } }) {
  try {
    const product = await getProduct(slug);
    console.log("[ProductPage] getStaticProps : ", product);
    return {
      props: product,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return {
        notFound: true,
      };
    }
    throw error;
  }
}

function ProductPage(product) {
  // const user = useUser();
  console.log("[ProductPage] render : ", product);

  const AddToCart = (event) => {
    console.log("[AddToCart]");

    event.preventDefault();
    const response = fetchJson(`/api/cart/${product.id}`);
  };
  return (
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div className="mb-2 lg:mb-0">
          <Image src={product.pictureUrl} width={640} height={480} alt="" />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
          <button className="text-blue-700" onClick={AddToCart}>
            ADD CART
          </button>
        </div>
      </div>
    </Page>
  );
}

export default ProductPage;
