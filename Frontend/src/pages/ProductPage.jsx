import React, { useState, useEffect } from "react";
import ProductCard from "../components/Products/ProductCard";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: [],
    color: "",
    minPrice: 0,
    maxPrice: Infinity,
  });
  const [brands, setBrands] = useState([]);
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchQuery = queryParams.get('search') || ''; 

        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);

        const response = await fetch(`http://localhost:5000/products/getproducts?${params.toString()}`);
        const data = await response.json();

        setAllProducts(data);

        if (Array.isArray(data)) {
          setAllProducts(data);
    
          const uniqueBrands = Array.from(new Set(data.map((product) => product.companyName))).filter(Boolean);
          setBrands(uniqueBrands);
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prevFilters) => {
        const newBrands = checked
          ? [...prevFilters.brand, value]
          : prevFilters.brand.filter((brand) => brand !== value);

        return {
          ...prevFilters,
          brand: newBrands,
        };
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: name === "minPrice" || name === "maxPrice" ? Number(value) : value,
      }));
    }
  };

  const filteredProducts = Array.isArray(allProducts)
  ? allProducts.filter((product) => {
      const matchesBrand =
        filters.brand && filters.brand.length > 0
          ? filters.brand.includes(product.companyName)
          : true;

      const matchesColor =
        filters.color && product.color
          ? product.color.toLowerCase() === filters.color.toLowerCase()
          : true;

      const matchesPrice =
        filters.minPrice && filters.maxPrice
          ? product.price >= filters.minPrice && product.price <= filters.maxPrice
          : true;

      return matchesBrand && matchesColor && matchesPrice;
    })
  : []; 


  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen border-gray-200 border-t-2">
        <aside className="w-full lg:w-1/6 bg-white shadow p-4 border-r border-gray-200">
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Brand Filter */}
          <div className="mb-4">
            <h3 className="text-base font-medium text-gray-700 mb-2">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    name="brand"
                    value={brand}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="ml-2 text-sm text-gray-700 hover:text-theme"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="mb-4">
            <h3 className="text-base font-medium text-gray-700 mb-2">Color</h3>
            <select
              name="color"
              onChange={handleFilterChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="">All Colors</option>
              <option value="brown">Brown</option>
              <option value="white">White</option>
              <option value="gray">Gray</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                onChange={handleFilterChange}
                className="w-1/2 border-gray-300 rounded-md shadow-sm"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                onChange={handleFilterChange}
                className="w-1/2 border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </aside>

        {/* Products */}
        <main className="w-full lg:w-5/6 p-4 bg-white">
          <h2 className="text-2xl font-bold">Results</h2>
          <p className="text-gray-600 text-sm mb-3">
            Check each product page for other buying options. Price and other details may vary based on product size and colour.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <ProductCard product={product} />
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
