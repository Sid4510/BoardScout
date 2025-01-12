
import React, { useState } from 'react';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('discount', discount);
        formData.append('category', category);
        formData.append('companyName', companyName);


        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch('http://localhost:5000/products/addProduct', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                alert('Product added successfully!');
                setProductName('');
                setCompanyName('');
                setDescription('');
                setPrice('');
                setStock('');
                setDiscount('');
                setCategory('');
                setImages([]);
            } else {
                alert('Failed to add product: ' + data.message);
            }
        } catch (err) {
            console.error('Error adding product:', err);
            alert('An error occurred while adding the product.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="text-3xl font-extrabold text-theme">
                <p>BuyKaro.</p>
            </div>
            <h1 className="text-3xl font-bold mb-6">Add Product</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 w-3/5 mx-10 flex gap-10 "
            >
                <div className="w-2/3">

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        ></textarea>
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    {/* Stock */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Stock
                        </label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                </div>
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Company Name
                        </label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Discount (%) (Optional)
                        </label>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home</option>
                            <option value="books">Books</option>
                            <option value="sports">Sports</option>
                            <option value="toys">Toys</option>
                            <option value="health&personalcare">Health & Personal Care</option>
                            <option value="fresh">Fresh</option>
                            <option value="giftcards">Giftcards</option>
                        </select>
                    </div>


                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Product Images
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:py-2 file:px-4 file:bg-gray-100 file:rounded file:border-0 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
                        />
                        {images.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative border rounded-lg overflow-hidden">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Preview ${index}`}
                                            className="object-cover h-24 w-full"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-theme text-white py-2 px-4 rounded-md hover:bg-theme1"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;

