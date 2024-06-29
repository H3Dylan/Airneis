import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import Cube from '../assets/cube.webp'
import Vector from '../assets/vector.jpg'
import Carousel1 from '../assets/carousel1.jpg'
import { Scrollbar } from 'swiper/modules';
import 'swiper/css/scrollbar';

const Carousel = () => {
	return (
		<Swiper
			spaceBetween={50}
			slidesPerView={1}
			onSlideChange={() => console.log("slide change")}
			onSwiper={(swiper) => console.log(swiper)}
            pagination={true}
            scrollbar={{
                hide: false,
            }}
            modules={[Scrollbar]}
            className="w-full lg:w-4/5 h-64 lg:h-96 mt-12 lg:rounded-xl max-w-5xl"
		>
			<SwiperSlide className="flex justify-center items-center">
                <img src={Vector} alt="" className="w-full h-full object-cover" />
            </SwiperSlide>
			<SwiperSlide className="flex justify-center items-center">
                <img src={Carousel1} alt="" className="block w-full h-full object-cover" />
            </SwiperSlide>
		</Swiper>
	);
};

export default Carousel;
