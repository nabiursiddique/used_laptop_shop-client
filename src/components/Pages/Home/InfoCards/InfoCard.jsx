import React from 'react';

const InfoCard = ({ card }) => {
    const { name, description, icon, bgClass } = card;
    return (
        <div className={`card card-side px-5 py-5 shadow-lg ${bgClass}`}>
        <figure>
            <img src={icon} alt="Movie" />
        </figure>
        <div className="card-body">
            <h2 className="text-xl font-bold">{name}</h2>
            <p>{description}</p>
        </div>
    </div>
    );
};

export default InfoCard;