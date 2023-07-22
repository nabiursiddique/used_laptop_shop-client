import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ productInfo }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const { productPrice, buyerName, buyerEmail, productId } = productInfo;
    const navigate = useNavigate();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [productPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError('')
        }

        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email:buyerEmail,

                    },
                },
            },
        );
        if(confirmError){
            setCardError(confirmError.message);
            return;
        }
        if(paymentIntent.status == "succeeded"){
            // Store payment info in the database
            const payment={
                productPrice,
                transactionId: paymentIntent.id,
                buyerEmail,
                productId:productId
            }
            fetch('http://localhost:5000/payments',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data =>{
                if(data.insertedId){
                    toast.success("Your payment is successful");
                    setSuccess('Congrats! your payment is completed');
                    setTransactionId(paymentIntent.id);
                    navigate('/dashboard/myOrders');
                }
            })
        }
        setProcessing(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#3f70bf',
                                '::placeholder': {
                                    color: '#4882e0',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn bg-sky-400 btn-sm mt-5 hover:bg-blue-400 text-white' type="submit" 
                disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div> 
                    <p className='text-green-500 mt-5'>{success}</p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;