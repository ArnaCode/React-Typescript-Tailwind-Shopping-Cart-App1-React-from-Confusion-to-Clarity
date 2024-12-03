import { useState } from "react";
import Cart from "./components/Cart";
import Header from "./components/Header";
import ProductsList from "./components/ProductsList";

export default function App() {
  const [cartItems, setCartItems] = useState<
    { id: number; name: string; price: number; quantity: number }[]
  >([]);

  function addToCart(product: { id: number; name: string; price: number }) {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [{ ...product, quantity: 1 }, ...prevCartItems];
      }
    });
  }

  function increaseQuantity(productId: number) {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  }

  function decreaseQuantity(productId: number) {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }
  function removeFromCart(productId: number) {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== productId);
    });
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="flex flex-col gap-4 text-white p-6">
      <Header totalItems={totalItems} />

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <ProductsList addToCartProp={addToCart} />
        <Cart
          cartItems={cartItems}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      </div>
    </main>
  );
}
