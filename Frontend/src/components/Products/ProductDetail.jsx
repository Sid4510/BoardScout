import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import ReviewList from "../../pages/ReviewPage";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("UserID");
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId: id, quantity }),
      });
      if (response.ok) {
        setIsAddedToCart(true);
      }
      else {
        navigate("/login");
        alert("Login to add products to your cart");
        console.error("Failed to add to cart:", await response.json());
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      const userId = localStorage.getItem("UserID");
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId: id, quantity }),
      });

      if (response.ok) {
        setIsAddedToCart(true);
        navigate("/cart");
      } else {
        console.error("Failed to add to cart:", await response.json());
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-white mx-10">
        <div className="flex gap-8">
          <div className="flex gap-4 p-4 bg-white shadow-sm rounded h-fit">
            <div className="flex flex-col gap-2 h-fit bg-gray-400">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer rounded bg-gray-300 ${selectedImage === index ? "ring-2 ring-theme" : ""
                    }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>


            <div className="flex-1 w-[400px] h-[400px] bg-gray-300">
              <img
                src={product.images[selectedImage]}
                alt={`Product ${selectedImage + 1}`}
                className="w-[400px] h-[400px] rounded"
              />
            </div>
          </div>

          <div className="space-y-4 w-[500px]">
            <h1 className="text-2xl font-semibold text-gray-800">{product.productName}</h1>
            <p className="text-yellow-500">
              {product.ratings} ⭐ ({product.reviews.length} reviews)
            </p>

            <div className="h-[2px] w-full bg-gray-300 rounded-xl"></div>

            <div>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
                {product.discount > 0 && (
                  <>
                    <p className="text-gray-500 line-through">₹{product.price + product.discount}</p>
                    <p className="text-sm text-red-600">
                      {Math.round((product.discount / (product.price + product.discount)) * 100)}% OFF
                    </p>
                  </>
                )}
              </div>
              <p className="text-sm">Inclusive of all taxes</p>
            </div>

            <div>
              <p>Delivery:</p>
              <p className="text-gray-500 text-sm">{product.category}</p>
            </div>
            <p className="font-bold text-green-700 ">{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>

            <div className="text-sm">
              <p>{product.description}</p>
              <p>{product.companyName}</p>
            </div>

            <div className="h-[2px] w-full bg-gray-300 rounded-xl"></div>

            <div className="flex justify-center items-center gap-8 p-4">

              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="w-12 h-12 flex justify-center items-center text-2xl bg-gray-200 rounded-full">
                  📦
                </div>
                <p className="text-sm text-gray-700">10 days Return & Exchange</p>
              </div>

              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="w-12 h-12 flex justify-center items-center text-2xl bg-gray-200 rounded-full">
                  💳
                </div>
                <p className="text-sm text-gray-700">Pay on Delivery</p>
              </div>

              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="w-12 h-12 flex justify-center items-center text-2xl bg-gray-200 rounded-full">
                  🚚
                </div>
                <p className="text-sm text-gray-700">Free Delivery</p>
              </div>

              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="w-12 h-12 flex justify-center items-center text-2xl bg-gray-200 rounded-full">
                  🚛
                </div>
                <p className="text-sm text-gray-700">Buykaro Delivered</p>
              </div>

              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="w-12 h-12 flex justify-center items-center text-2xl bg-gray-200 rounded-full">
                  🔒
                </div>
                <p className="text-sm text-gray-700">Secure transaction</p>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="border-2 border-gray-300 w-64 p-5 flex flex-col gap-2 h-fit">
            <p className="text-2xl font-bold">₹{product.price}</p>

            <div>
              <p>Delivery:</p>
              <p className="text-gray-500 text-sm">{product.deliveryInfo || "Standard delivery"}</p>
            </div>

            <div className="h-[2px] w-full bg-gray-300 rounded-xl mt-2"></div>

            <div className="flex mt-2">
              <div className="flex flex-col">
                <p className="text-sm flex items-center">
                  <MdLocationPin /> Deliver to:
                </p>
                <p className="text-gray-500 text-sm">User's location</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-lg text-green-700">{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <label htmlFor="quantity" className="font-medium">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="p-2 border border-gray-400 bg-gray-100 rounded w-full hover:bg-gray-200"
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={handleAddToCart}
                className={`px-4 py-2 w-full transition duration-500 rounded-lg ${isAddedToCart ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-300 hover:bg-yellow-600"
                  }`}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="px-4 py-2 bg-orange-400 w-full transition duration-500 rounded-lg hover:bg-orange-600">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReviewList />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
