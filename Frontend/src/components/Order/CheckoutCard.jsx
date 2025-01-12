import React from 'react'

function CheckoutCard({image,
    title,
    seller,
    price,
    quantity}) {
    return (
        <div>
            <div className="flex items-start border-b border-gray-200 py-2">
                <img
                    src={image}
                    alt={title}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                />


                <div className="flex-grow">
                    <h2 className="text-lg font-medium text-gray-800">{title}</h2>
                    <p className="text-gray-500 text-sm">
                        Sold by <span className="text-blue-500">{seller}</span>
                    </p>
                    <div className="flex items-center mt-2">
                        <span className="text-red-500 font-semibold text-xl">₹{price}</span>
                    </div>
                </div>
                <span className="px-4">{quantity}</span>
            </div>
        </div>
    )
}

export default CheckoutCard
