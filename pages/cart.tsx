import { useEffect, useState } from "react";
import Page from "../components/Page";
import { fetchJson } from "../lib/api";
import { getCartItems } from "../lib/cart";

// export async function getStaticProps() {}

function CartPage() {
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const cartItems = await fetchJson("/api/cart");
        setCartList(cartItems);
      } catch (error) {
        console.log("[CartPage] getStaticProps ERROR!!!:", error);
      }
    })();
  }, []);

  return (
    <Page title="Cart">
      {
        <ul>
          {cartList &&
            cartList.map((item) => (
              <li key={item.id}>
                <p>{item.title}</p>
                <p>{item.price}</p>
                <button className="text-cyan-600">delete</button>
              </li>
            ))}
        </ul>
      }
    </Page>
  );
}

export default CartPage;
