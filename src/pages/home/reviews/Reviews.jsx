import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import ReviewCard from "./ReviewCard";
import customerTopIcon from "../../../assets/customer-top.png";

function Reviews({ reviewsPromise }) {
  const reviews = use(reviewsPromise);

  return (
    <div className="mb-[100px] ">
      <div className="mb-5 flex flex-col gap-5">
        <img src={customerTopIcon} className="max-w-50 mx-auto"/>
        <div className="text-center">
          <h2 className="text-secondary text-4xl font-extrabold mb-1">
            What our customers are sayings
          </h2>
          <p className="text-primary-content ">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
      </div>
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: "50%",
          depth: 100,
          modifier: 1,
          scale: 0.85,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="my-Swiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Reviews;
