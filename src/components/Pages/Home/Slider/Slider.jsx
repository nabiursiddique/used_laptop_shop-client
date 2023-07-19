import React from 'react';
import './Slider.css';

import img_1 from '../../../../assets/Laptop_Images/Dell-Laptop-01.jpg'
import img_2 from '../../../../assets/Laptop_Images/HP-01.jpg'
import img_3 from '../../../../assets/Laptop_Images/MacBook-01.jpg'
import img_4 from '../../../../assets/Laptop_Images/MacBook-02.jpg'
import SliderItem from './SliderItem';

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

const Slider = () => {
    return (
        <div>
            <div className="carousel w-full lg:h-screen sm:h-auto rounded-lg shadow-2xl">
                {
                    laptopImages.map((slide,ind) =>
                       <SliderItem
                       key={ind}
                        slide={slide}
                       ></SliderItem>
                    )
                }
            </div>
        </div>
    );
};

export default Slider;