import React, { useState } from 'react';

const AddBillboard = () => {
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [price, setPrice] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [available, setAvailable] = useState(true);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('location', location);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('price', price);
        formData.append('height', height);   
        formData.append('width', width);     
        formData.append('available', available);
        formData.append('description', description);
    
        images.forEach((image) => {
            formData.append('images', image);
        });
    
        try {
            const response = await fetch('http://localhost:5000/api/billboards/addBillboard', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
    
            const data = await response.json();
            if (response.ok) {
                alert('Billboard added successfully!');
                setLocation('');
                setLatitude('');
                setLongitude('');
                setPrice('');
                setHeight('');
                setWidth('');
                setAvailable(true);
                setDescription('');
                setImages([]);
            } else {
                alert('Failed to add billboard: ' + data.message);
            }
        } catch (err) {
            console.error('Error adding billboard:', err);
            alert('An error occurred while adding the billboard.');
        }
    };
    
    const fetchBillboards = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/billboards');
            const data = await response.json();
            
            if (response.ok) {
                setBillboards(data);
            } else {
                alert("Failed to fetch billboards.");
            }
        } catch (error) {
            console.error("Error fetching billboards:", error);
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="text-3xl font-extrabold text-blue-600">
                <p>BoardScout</p>
            </div>
            <h1 className="text-3xl font-bold mb-6">Add Billboard</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-3/5 mx-10 flex gap-10">
                <div className="w-2/3">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Latitude</label>
                            <input type="number" step="0.0001" value={latitude} onChange={(e) => setLatitude(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Longitude</label>
                            <input type="number" step="0.0001" value={longitude} onChange={(e) => setLongitude(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price (₹ per month)</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Height (feet)</label>
                            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Width (feet)</label>
                            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Availability</label>
                        <select value={available} onChange={(e) => setAvailable(e.target.value === "true")} required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                            <option value="true">Available</option>
                            <option value="false">Rented</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"></textarea>
                    </div>
                </div>
                <div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Billboard Images</label>
                        <input type="file" multiple onChange={handleImageUpload} className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:py-2 file:px-4 file:bg-gray-100 file:rounded file:border-0 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-theme1">
                        Add Billboard
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBillboard;
