import React, { useEffect } from 'react';
import aboutUs from '../../../../assets/About_Us/About section.jpg'
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
                <img src={aboutUs} className="lg:w-1/2 rounded-lg shadow-2xl"/>
                <div className='ml-4' data-aos="fade-down" data-aos-duration="1000" data-aos-once="true">
                    <h2 className="text-5xl bg-gradient-to-r from-blue-500  to-white text-transparent bg-clip-text font-extrabold">About Us</h2>
                    <p className="py-3">We provide the best quality used laptops. Our laptops don't have any kind of scratch or heating issues. We only sell those laptop that are not much used and used carefully.</p>
                    <p className=''><span className='text-blue-400'>Email:</span> nabiursiddique01@gmail.com</p>
                    <p className=''><span className='text-blue-400'>Github:</span> <a className='text-blue-200' target='blank' href="https://github.com/nabiursiddique">Github Repo</a> </p>
                    <p><span className='text-blue-400'>linked In:</span> <a className='text-blue-200' target='blank' href="https://www.linkedin.com/in/nabiur-siddique/">linkedIn Profile</a> </p>
                    <p className='pb-5'><span className='text-blue-400'>Facebook:</span> <a className='text-blue-200' target='blank' href="https://www.facebook.com/nabiur.siddique.official">Facebook Profile</a> </p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;