import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api/axios"; 

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products"); 
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <p className="text-center col-span-full">No products available</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg w-full h-40 object-cover"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-700">₹{product.price}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
            <button
              className="mt-2 px-4 py-2 bg-yellow-400 rounded-lg shadow hover:bg-yellow-500"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}
