import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import SwiperSlider from '../SwiperSlider/SwiperSlider';
import InfoCards from '../InfoCards/InfoCards';

const Home = () => {
    return (
        <div>
            <SwiperSlider></SwiperSlider>
            <InfoCards></InfoCards>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;