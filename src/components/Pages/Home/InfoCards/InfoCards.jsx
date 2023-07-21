import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../../../assets/Infocard_Images/clock.svg'
import location from '../../../../assets/Infocard_Images/marker.svg'
import phone from '../../../../assets/Infocard_Images/phone.svg'

const InfoCards = () => {
    const cardData = [
        {
            id: 1,
            name: 'All Time Open',
            description: 'We are open 24 hour',
            icon: clock,
            bgClass: 'bg-gradient-to-r from-blue-700 to-blue-300'
        },
        {
            id: 2,
            name: 'Home Delivery',
            description: "Home delivery service accorss the world",
            icon: location,
            bgClass: 'bg-gradient-to-r from-blue-700 to-blue-300'
        },
        {
            id: 3,
            name: 'Customer Support',
            description: '24/7 support for all of our customer',
            icon: phone,
            bgClass: 'bg-gradient-to-r from-blue-700 to-blue-300'
        }
    ]
    return (
        <div className='my-24'>

            <h2 className="text-5xl bg-gradient-to-r from-blue-800 text-center  to-blue-300 text-transparent bg-clip-text font-extrabold mx-auto">Our Services</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mx-5 my-6 text-white'>
                {
                    cardData.map(card => <InfoCard key={card.id} card={card}></InfoCard>)
                }
            </div>
        </div>
    );
};

export default InfoCards;