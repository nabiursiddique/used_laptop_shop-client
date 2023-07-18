import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const productInfo = useLoaderData();
    const navigation = useNavigation();
    const { productPrice, productName} = productInfo;
    if(navigation.state === 'loading'){
        return <LoadingAnimation></LoadingAnimation>
    }
    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>Make Payment</h2>
            <hr />

            <h3 className='text-center text-2xl font-bold mt-5'>Payment for {productName}</h3>
            <p className='text-center font-bold text-xl'>Please pay: <span className='text-blue-500'>{productPrice}৳</span></p>

            <div className='w-96 mx-auto mt-5 text-center'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        productInfo={productInfo}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;