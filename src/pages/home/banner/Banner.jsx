import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { FaArrowCircleUp } from "react-icons/fa";
function Banner() {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={2000}>
      <div className="relative">
        <img src={bannerImg1} />
        <div className="flex gap-2 absolute bottom-30 left-20">
          <button className="btn bg-primary text-secondary">
            Track Your Parcel
          </button>
          <span className="transform rotate-45 bg-primary rounded-full">
            <FaArrowCircleUp size={40} />
          </span>
          <button className="btn">Be a Rider</button>
        </div>
      </div>
      <div>
        <img src={bannerImg2} />
      </div>
      <div>
        <img src={bannerImg3} />
      </div>
    </Carousel>
  );
}

export default Banner;
