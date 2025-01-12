import React from "react";
import { FaStar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    return (
        <div className="border-b border-gray-300 p-4 w-full">
            {/* User Info */}
            <div className="flex items-center gap-2">
                <FaUserCircle size={20} className="text-gray-700"/>
                <span className="font-semibold text-gray-950">{review.username}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-2">
                <div className="flex text-yellow-500 mr-2">
                    {Array(review.rating)
                        .fill()
                        .map((_, i) => (
                            <FaStar key={i} />
                        ))}
                </div>
                <span className="font-semibold">{review.rating}</span>
            </div>

            <p className="text-sm text-gray-500 mb-1">
                Reviewed in {review.location} on {review.date}
            </p>
            <p className="text-sm text-gray-500 mb-2">Size: {review.size}</p>

            {/* Review Comment */}
            <p className="text-gray-950 mb-3">{review.comment}</p>


            <p className="text-sm text-gray-500 mb-2">
                {review.helpfulCount} people found this helpful
            </p>
            <div className="flex gap-4">
                <button className="px-3 py-0.5 text-sm bg-gray-50 text-gray-700 border-2  border-gray-500 rounded-3xl  hover:bg-gray-100">
                    Helpful
                </button>
                <button className="  text-sm text-gray-700 border rounded hover:underline">
                    Report
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;
