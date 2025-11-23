import React from "react";
import bookingIcon from "../../assets/bookingIcon.png";

function DeliverCard({ title }) {
  return (
    <div className="card card-dash bg-[#ffffffb3] rounded-3xl shadow-xl">
      <div className="card-body">
        <img src={bookingIcon} className="w-10 h-10" />
        <h2 className="card-title">{title}</h2>
        <p>
          From personal packages to business shipments — we deliver on time,
          every time
        </p>
      </div>
    </div>
  );
}

export default DeliverCard;
