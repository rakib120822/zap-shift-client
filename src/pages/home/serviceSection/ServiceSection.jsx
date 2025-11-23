import React from "react";
import ServiceCard from "../../../component/serviceCard/ServiceCard";

function ServiceSection() {
  return (
    <section className="bg-secondary mb-[100px] rounded-4xl py-[100px] px-[160px]">
      <div className="text-center">
        <h3 className="font-extrabold text-4xl mb-4 text-white">
          Our Services
        </h3>
        <p className="text-secondary-content mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* grid_section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ServiceCard
          title="Express  & Standard Delivery"
          content="We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
        />
        <ServiceCard
          title="Nationwide Delivery"
          content="We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
        />
        <ServiceCard
          title="Fulfillment Solution"
          content="We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
        />
        <ServiceCard
          title="Cash on Home Delivery"
          content="100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
        />
        <ServiceCard
          title="Corporate Service  Contract In Logistics"
          content="Customized corporate services which includes warehouse and inventory management support."
        />

        <ServiceCard
          title="Parcel Return"
          content="Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
        />
      </div>
    </section>
  );
}

export default ServiceSection;
