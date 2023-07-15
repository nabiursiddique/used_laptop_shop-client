import React from 'react';
import processor_image from '../../../../assets/About_Us/Processor.jpg'
import Button from '../../../LittleComponents/primaryButton/PrimaryButton';

const AboutUs = () => {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src={processor_image} className="lg:w-1/2 rounded-lg shadow-2xl animate-fade-right animate-once animate-delay-[1000ms]" />
                <div className='ml-4'>
                    <h1 className="text-5xl font-bold">About Us</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;