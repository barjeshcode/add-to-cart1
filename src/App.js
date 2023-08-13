import React, { useState, useEffect } from 'react';
import { products } from './Pages/data';
import { navData } from './Pages/data';
import { countries } from './Pages/SearchData';
import './App.css';
import Slider from './Pages/Slider';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact  from  './Pages/Contact';
import Footer from './Pages/Footer';
import  Banner  from './components/Banner';
import Login from './components/Login';
import Header from './components/Header';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



function App() {

  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cartItems, setCartItems] = useState(storedCart);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (cartItemId) => {
    const updatedCart = cartItems.filter(item => item.cartItemId !== cartItemId);
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const calculateCartItemCount = () => {
    return cartItems.length;
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const filteredNavData = navData.filter(product =>
    product.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.text.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="App">
      <div className="cart">
        <div className='main'>
        <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
        </div>
        <div className='search-button'>
        <div className='main-search-card'>
        <i class="fa fa-search"></i>
      <input
        type="text"
        placeholder="search here"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      </div>
      {countries.filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (
          val.first_name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        ) {
          return val;
        }
      }).map((val, key) => {
        return (
          <div className="user" key={key}>
            <p>{val.first_name}</p>
          </div>
        );
      })}
    </div>
  <Login/>
        
        <div className='main-cart1-start'>
          <h2 onClick={toggleVisibility}><i className="fa fa-shopping-cart"></i></h2>
          <p className='zero-start'>{calculateCartItemCount()}</p>
          {isVisible && 
            <div className='vissual'>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.cartItemId} className="cart-item">
                    <span>{item.name} - ${item.price}</span>
                    <button onClick={() => removeFromCart(item.cartItemId)} className='delete-her'>DEL</button>
                  </li>
                ))}
              </ul>
              <p>Total: ${calculateTotal()}</p>
            </div>}
        </div>
      </div>
      <Banner/>
      <Slider/>
      <div className="product-list">
        {filteredNavData.map((product) => (
          <div key={product.id} className="product">
            <img src={product.url} alt='Product'/>
            <h3>{product.text}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart({ ...product, cartItemId: Date.now() })}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <img src={product.url} alt='Product'/>
            <h3>{product.text}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart({ ...product, cartItemId: Date.now() })}>Add to Cart</button>
          </div>
        ))}
      </div>
      <Footer/>
     
    </div>
  );
}

export default App;
