import { useState } from "react";

function Toggle() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  function addToCart(item) {
    setCartItems([...cartItems, item]);
    setCartCount(cartCount + 1);
  }

  function removeFromCart(index) {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    setCartCount(cartCount - 1);
  }

  return (
    <div>
       <p>Cart Count: {cartCount}</p>
      {cartItems.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default Toggle
