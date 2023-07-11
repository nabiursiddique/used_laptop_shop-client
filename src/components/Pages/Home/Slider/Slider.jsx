import React from 'react';
import './Slider.css';

import img_1 from '../../../../assets/Laptop_Images/Dell-Laptop-01.jpg'
import img_2 from '../../../../assets/Laptop_Images/HP-01.jpg'
import img_3 from '../../../../assets/Laptop_Images/MacBook-01.jpg'
import img_4 from '../../../../assets/Laptop_Images/MacBook-02.jpg'


const Slider = () => {
    const laptopImages = [
        {
            id: 1,
            name: "Macbook02",
            image: img_4,
            prev: 4,
            next: 2,
            message: "Almost New Condition",
            shortMessage: "We are providing almost new condition laptops"
        },
        {
            id: 2,
            name: "HP",
            image: img_2,
            prev: 1,
            next: 3,
            message: "Long Lasting Battery",
            shortMessage: "Our laptop runs for a long lasting time"
        },
        {
            id: 3,
            name: "Macbook01",
            image: img_3,
            prev: 2,
            next: 4,
            message: "Without Any Scratch",
            shortMessage: "Our laptops don't have any kind of scratches not even minor scratches"
        },
        {
            id: 4,
            name: 'Dell',
            image: img_1,
            prev: 3,
            next: 1,
            message: "Best Condition Laptops",
            shortMessage: "We are Providing overall best quality laptops"
        },

    ]
    return (
        <div>
            <div className="carousel w-full lg:h-screen sm:h-auto rounded-lg shadow-2xl">
                {
                    laptopImages.map(laptopImage =>
                        <div id={`slide${laptopImage.id}`} className="carousel-item relative w-full sliderImage">
                            <img src={laptopImage.image} className="w-full" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
                                <a href={`#slide${laptopImage.prev}`} className="btn btn-circle">❮</a>
                                <a href={`#slide${laptopImage.next}`} className="btn btn-circle">❯</a>
                            </div>
                            <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5  top-1/2 z-10">
                                <div className='border p-10 rounded border-white'>
                                    <h1 className='text-white text-center lg:text-5xl md:text-4xl sm:text-4xl text-2xl'>{laptopImage.message}</h1>
                                    <p className='text-center text-white lg:text-lg md:text-xs text-xs mt-3'>{laptopImage.shortMessage}</p>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Slider;