import React from 'react';

const SliderItem = ({slide}) => {
    const{id,image,prev,next,message,shortMessage}=slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full sliderImage">
            <img src={image} className="w-full" />
            
            <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5  top-1/2 z-10">
                <div className='border p-10 rounded border-white'>
                    <h1 className='text-white text-center lg:text-5xl md:text-4xl sm:text-4xl text-2xl'>{message}</h1>
                    <p className='text-center text-white lg:text-lg md:text-xs text-xs mt-3'>{shortMessage}</p>
                </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
                <a href={`#slide${prev}`} className="btn btn-circle">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>
        </div>
    );
};

export default SliderItem;