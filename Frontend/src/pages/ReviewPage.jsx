import React from 'react';
import ReviewCard from '../components/Review/ReviewCard';

const ReviewList = () => {
    const reviews = [
        {
            username: 'Nitin Sharma',
            userImage: 'https://via.placeholder.com/40',
            rating: 5,
            location: 'India',
            date: '19 November 2024',
            size: '9 UK',
            comment: 'Very good product 👍',
            helpfulCount: 2,
        },
        {
            username: 'Ankita Roy',
            userImage: 'https://via.placeholder.com/40',
            rating: 4,
            location: 'India',
            date: '15 November 2024',
            size: '8 UK',
            comment: 'Comfortable and affordable.',
            helpfulCount: 5,
        },
    ];

    const ratings = [
        { stars: 5, count: 1490, percentage: 51 },
        { stars: 4, count: 853, percentage: 29 },
        { stars: 3, count: 146, percentage: 5 },
        { stars: 2, count: 117, percentage: 4 },
        { stars: 1, count: 316, percentage: 12 },
    ];


    const totalRatings = ratings.reduce((acc, rating) => acc + rating.count, 0);
    const averageRating = (
        ratings.reduce((acc, rating) => acc + rating.stars * rating.count, 0) /
        totalRatings
    ).toFixed(1);
    return (
        <div className='mx-20 '>
            <div className="h-[2px] w-full bg-gray-300 rounded-xl my-10"></div>
            <div className='flex gap-10'>
                <div className='w-1/3'>
                    <div className="border border-gray-300 p-4 rounded-md w-full">
                    
                        <h2 className="text-lg font-bold mb-3">Customer reviews</h2>
                        <div className="flex items-center mb-2">
                            <span className="text-yellow-500 text-lg mr-1">⭐</span>
                            <span className="text-xl font-bold">{averageRating}</span>
                            <span className="text-gray-600 ml-2">out of 5</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{totalRatings} global ratings</p>

                        {/* Star Ratings Breakdown */}
                        {ratings.map((rating, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <span className="text-sm text-gray-700 w-16">{rating.stars} star</span>
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden mx-2">
                                    <div
                                        className="bg-orange-500 h-full"
                                        style={{ width: `${rating.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-gray-600">{rating.percentage}%</span>
                            </div>
                        ))}

                        <div className="h-[2px] w-full bg-gray-300 rounded-xl mt-5 mb-5"></div>

                        <h3 className="text-lg font-bold mb-2">Review this product</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Share your thoughts with other customers
                        </p>
                        <button className="px-5 bg-theme text-white py-2 border rounded-lg hover:bg-theme1 mx-10">
                            Write a product review
                        </button>
                    </div>

                </div>
                <div className='w-full mb-20'>
                    <h1 className='font-semibold text-2xl'>Top reviews from India</h1>
                    <div className="h-[2px] w-full bg-gray-300 rounded-xl mt-3 mb-5"></div>
                    <div className='w-full' >
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewList;
