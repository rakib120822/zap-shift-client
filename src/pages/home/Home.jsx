import React from "react";
import Banner from "./banner/Banner";

import DeliverCard from "../../component/delivery/DeliverCard";
import ServiceSection from "./serviceSection/ServiceSection";
import Brands from "./brands/Brands";
import Reviews from "./reviews/Reviews";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

function Home() {
  return (
    <div>
      <section className="mt-9">
        <Banner />
      </section>

      {/* how_it_works_section */}
      <section className="my-[100px]">
        <h3 className="text-3xl font-extrabold mb-8">How it Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <DeliverCard title={"Booking Pick & Drop"} />
          <DeliverCard title={"Cash On Delivery"} />
          <DeliverCard title={"Delivery Hub"} />
          <DeliverCard title={"Booking SME & Corporate"} />
        </div>
      </section>

      {/* services_section */}
      <ServiceSection />

      {/* brands_section */}
      <section className="mb-[100px] ">
        <h1 className="text-secondary font-bold text-center mb-10 text-2xl">
          We've helped thousands of sales teams
        </h1>
        <Brands />
      </section>

      {/* review_section */}
      <section className="mb-[100px]">
        <Reviews reviewsPromise={reviewsPromise} />
      </section>
    </div>
  );
}

export default Home;
