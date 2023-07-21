import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import SwiperSlider from '../SwiperSlider/SwiperSlider';
import InfoCards from '../InfoCards/InfoCards';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <SwiperSlider></SwiperSlider>
            <InfoCards></InfoCards>
            <AboutUs></AboutUs>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;