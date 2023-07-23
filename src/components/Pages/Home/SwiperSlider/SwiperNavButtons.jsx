import React from 'react';
import { useSwiper } from 'swiper/react';

const SwiperNavButtons = () => {
    const swiper = useSwiper()
    return (
        <div className='absolute lg:flex md:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20 hidden'>
            <button className="btn btn-circle" onClick={()=>swiper.slidePrev()}>❮</button>
            <button className="btn btn-circle" onClick={()=>swiper.slideNext()}>❯</button>
        </div>
    );
};

export default SwiperNavButtons;