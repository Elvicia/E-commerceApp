import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Product,
  Products,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Wishlist
} from "./containers";
import { Navbar } from "./components";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { useState, createContext } from "react";

//context
const UserContext = createContext();

export { UserContext };

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <UserContext.Provider value={{ cartDetails: { cart, setCart }, wishlistDetails: { wishlist, setWishlist } }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </UserContext.Provider>
      </ScrollToTop>
      <Toaster />
    </BrowserRouter>
  );
}


export default App;
