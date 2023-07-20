import React, { useEffect } from 'react';
import processor_image from '../../../../assets/About_Us/Processor.jpg'
import Button from '../../../LittleComponents/primaryButton/PrimaryButton';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
    useEffect(()=>{
        AOS.init();
    },[])
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src={processor_image} className="lg:w-1/2 rounded-lg shadow-2xl" data-aos="fade-right" data-aos-delay="50" data-aos-duration="1000" data-aos-once="true"/>
                <div className='ml-4'>
                    <h1 className="text-5xl bg-gradient-to-r from-blue-500  to-white text-transparent bg-clip-text font-extrabold">About Us</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;