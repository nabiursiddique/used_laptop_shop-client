import React, { useEffect } from 'react';
import processor_image from '../../../../assets/About_Us/Processor.jpg'
import Button from '../../../LittleComponents/primaryButton/PrimaryButton';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
    useEffect(()=>{
        AOS.init();
    },[]);
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src={processor_image} className="lg:w-1/2 rounded-lg shadow-2xl"/>
                <div className='ml-4' data-aos="fade-down" data-aos-duration="1000" data-aos-once="true">
                    <h2 className="text-5xl bg-gradient-to-r from-sky-700  to-white text-transparent bg-clip-text font-extrabold">About Us</h2>
                    <p className="py-6">We provide the best quality used laptops. Our laptops don't have any kind of scratch or heating issues. We only sell those laptop that are not much used and used carefully.</p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;