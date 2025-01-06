import React, { useContext } from "react";
import { UserContext } from "../App"; // Import UserContext
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { wishlist, setWishlist } = useContext(UserContext).wishlistDetails;

  // Remove item from wishlist
  const removeItemFromWishlist = (product) => {
    const newWishList = wishlist.filter((x) => x.id !== product.id);
    setWishlist(newWishList);
    toast.success("Item removed from wishlist!");
  };

  const ShowWishlist = () => {
    return (
      <div className="container py-5">
        <div className="row">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid rounded-start"
                        style={{
                          width: "100%",
                          height: "150px", 
                          objectFit: "cover", 
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text text-muted">
                          ₹{Math.round(item.price * 85).toLocaleString("en-IN")}
                        </p>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeItemFromWishlist(item)}
                        >
                          <i className="fa fa-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">Your Wishlist is Empty</h4>
              <Link to="/" className="btn btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container my-3 py-3">
      <h1 className="text-center">Wishlist</h1>
      <hr />
      <ShowWishlist />
    </div>
  );
};

export default Wishlist;
