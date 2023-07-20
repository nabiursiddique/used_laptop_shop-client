import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay, EffectFade } from 'swiper/modules';
import '/node_modules/swiper/swiper-bundle.min.css';
import './SwiperSlider.css';

import image1 from '../../../../assets/Laptop_Images/Dell-Laptop-01.jpg'
import image2 from '../../../../assets/Laptop_Images/HP-01.jpg'
import image3 from '../../../../assets/Laptop_Images/MacBook-01.jpg'
import image4 from '../../../../assets/Laptop_Images/MacBook-02.jpg'
import SwiperNavButtons from './SwiperNavButtons';


const SwiperSlider = () => {
    const data = [
        {
            id: 1,
            name: "Macbook02",
            image: image4,
            message: "Almost New Condition",
            shortMessage: "We are providing almost new condition laptops"
        },
        {
            id: 2,
            name: "HP",
            image: image3,
            message: "Long Lasting Battery",
            shortMessage: "Our laptop runs for a long lasting time"
        },
        {
            id: 3,
            name: "Macbook01",
            image: image2,
            message: "Without Any Scratch",
            shortMessage: "Our laptops don't have any kind of scratches not even minor scratches"
        },
        {
            id: 4,
            name: 'Dell',
            image: image1,
            message: "Best Condition Laptops",
            shortMessage: "We are Providing overall best quality laptops"
        },

    ];

    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay, EffectFade]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay
                loop={true}
                effect="fade"
                pagination={{ clickable: true }}
            >
                {data.map((item) => (
                    <SwiperSlide >
                        <div className='lg:h-screen sm:h-auto'>
                            <div className='sliderImage'>
                                <img src={item.image} alt="" />
                            </div>
                            <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5  top-1/2 z-10">
                                <div className='border p-10 rounded border-white'>
                                    <h1 className='text-white text-center lg:text-5xl md:text-4xl sm:text-4xl text-2xl'>{item.message}</h1>
                                    <p className='text-center text-white lg:text-lg md:text-xs text-xs mt-3'>{item.shortMessage}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <SwiperNavButtons></SwiperNavButtons>
            </Swiper>
        </div>
    );
};


export default SwiperSlider;