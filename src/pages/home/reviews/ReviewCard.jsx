import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

function ReviewCard({ review }) {
  const { userName, review: testimonial, user_photoURL, ratings } = review;
  return (
    <div className="max-w-md mx-auto bg-white  rounded-2xl p-6 flex flex-col gap-4">
      {/* Quote Icon */}
      <div className="text-primary text-3xl">
        <FaQuoteLeft />
      </div>

      {/* Testimonial text */}
      <p className="text-base">{testimonial}</p>

      {/* Author info */}
      <div className="flex items-center gap-4 mt-4">
        <img
          src={user_photoURL}
          alt="Author"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-bold text-gray-900">{userName}</h3>
          <p className="text-sm text-gray-500">rating : {ratings}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
