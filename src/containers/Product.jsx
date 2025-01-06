import React, { useEffect, useState, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import toast from "react-hot-toast";
import { UserContext } from "../App";

const Product = () => {
  const { id } = useParams();
  const { wishlist, setWishlist } = useContext(UserContext).wishlistDetails;
  const { cart, setCart } = useContext(UserContext).cartDetails; // Get cart from context

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add product to the cart
  const addProduct = (product) => {
    const existingCart = [...cart]; // Make a copy of the cart
    const productExists = existingCart.find((item) => item.id === product.id);

    if (productExists) {
      // If the product already exists in the cart, update the quantity
      productExists.qty += 1;
    } else {
      // Otherwise, add the new product with a quantity of 1
      existingCart.push({ ...product, qty: 1 });
    }

    setCart(existingCart); // Update the cart state with the new list
    toast.success("Item added to Cart!");
  };

  // Add product to wishlist with login check
  const addToWishlist = (product) => {
    const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in

    if (!user) {
      toast.error("Please login to add items to your wishlist!");
      return;
    }

    const existingWishList = wishlist;
    const productExists = existingWishList.find((item) => item.id === product.id);

    if (!productExists) {
      existingWishList.push(product);
      setWishlist(existingWishList);
      toast.success("Item added to Wishlist!");
    } else {
      toast.error("Item is already in your Wishlist");
    }
  };

  // Fetch product details and similar products
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        // Fetch product details
        const productResponse = await fetch(`https://fakestoreapi.com/products/${id}`);
        const productData = await productResponse.json();
        setProduct(productData);

        // Fetch similar products
        const similarProductsResponse = await fetch(`https://fakestoreapi.com/products/category/${productData.category}`);
        const similarProductsData = await similarProductsResponse.json();
        setSimilarProducts(similarProductsData);

      } catch (error) {
        console.error("Error fetching product data", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const LoadingSkeleton = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={product.image}
            alt={product.title}
            width="400px"
            height="400px"
          />
        </div>
        <div className="col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead">
            {product.rating && product.rating.rate} <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 my-4">
          ₹{Math.round(product.price * 85.0).toLocaleString("en-IN")}
          </h3>
          <p className="lead">{product.description}</p>
          <button className="btn btn-outline-dark" onClick={() => addProduct(product)}>
            Add to Cart
          </button>
          <button className="btn btn-outline-warning mx-3" onClick={() => addToWishlist(product)}>
            Add to Wishlist
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const LoadingSimilarProducts = () => (
    <div className="my-4 py-4">
      <div className="d-flex">
        <div className="mx-4">
          <Skeleton height={400} width={250} />
        </div>
        <div className="mx-4">
          <Skeleton height={400} width={250} />
        </div>
        <div className="mx-4">
          <Skeleton height={400} width={250} />
        </div>
        <div className="mx-4">
          <Skeleton height={400} width={250} />
        </div>
      </div>
    </div>
  );

  const ShowSimilarProducts = () => (
    <div className="py-4 my-4">
      <div className="d-flex">
        {similarProducts.map((item) => (
          <div key={item.id} className="card mx-4 text-center">
            <img
              className="card-img-top p-3"
              src={item.image}
              alt="Card"
              height={300}
              width={300}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
              <div className="card-body">
                <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                  Buy Now
                </Link>
                <button className="btn btn-dark m-1" onClick={() => addProduct(item)}>
                  Add to Cart
                </button>
                <button className="btn btn-warning m-1" onClick={() => addToWishlist(item)}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="row">{loading ? <LoadingSkeleton /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>You may also like</h2>
            <Marquee pauseOnHover={true} speed={50}>
              {loading ? <LoadingSimilarProducts /> : <ShowSimilarProducts />}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
