import React from "react";

const CartCard = ({
  image,
  title,
  seller,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  return (
    <div className="flex items-start border-b border-gray-200 py-4">
      
      <input
        type="checkbox"
        className="h-5 w-5 mt-2 mr-4 accent-theme1 "
      />
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
          <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
            Limited time deal
          </span>
        </div>
      </div>

    
      <div className="ml-4 text-right flex flex-col ">
        <div className=" ml-10 flex items-center border rounded-md w-fit">
          <button
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
            onClick={onDecrease}>
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
            onClick={onIncrease}>
            +
          </button>
        </div>

        
        <div className="mt-2 text-sm text-gray-500 mr-10">
          <button
            className=" text-red-600 hover:text-red-800"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <div className="mt-2 text-sm text-blue-500 hover:text-blue-700">
          See more like this | Share
        </div>
      </div>
    </div>
  );
};

export default CartCard;
