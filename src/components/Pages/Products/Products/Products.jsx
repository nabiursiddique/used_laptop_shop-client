import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ProductsCard from './ProductsCard';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';
import BookNowModal from '../BookNowModal/BookNowModal';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [bookProduct, setBookProduct] = useState(null);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // React query for fetching
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('https://used-laptop-shop-server.vercel.app/products');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    })



    //booking modal close handle
    const closeModal = () => {
        setBookProduct(null);
    }

    // handleBooking function for bookingNowModal
    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const productId = form.productId.value;
        const productName = form.productName.value;
        const sellerName = form.sellerName.value;
        const sellerEmail = form.sellerEmail.value;
        const sellerPhone = form.sellerPhone.value;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const productPrice = form.productPrice.value;
        const meetingLocation = form.meetingLocation.value;
        const buyerNumber = form.buyerNumber.value;

        const bookingInfo = {
            productId,
            productName,
            sellerName,
            sellerEmail,
            sellerPhone,
            buyerName,
            buyerEmail,
            productPrice,
            meetingLocation,
            buyerNumber
        }
        setBookProduct(null);

        // saving booking information in the db
        fetch('https://used-laptop-shop-server.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Booking Successful");
                    refetch();
                    navigate('/dashboard/myOrders');
                } else {
                    toast.error("Booking is not successful");
                }
            });


        // updating product status to booked = true
        fetch(`https://used-laptop-shop-server.vercel.app/booking/${productId}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ booked: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                }
            })

        form.reset();
    }

    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div>
            <div>
                <h1 className='text-4xl text-center my-6 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>All Products</h1>
                {/* Search products bar */}
                <form className='flex lg:justify-end justify-center lg:mr-6'>
                    <div className="form-control w-full max-w-xs">
                        <input
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type="text"
                            placeholder="Search Product"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                </form>
                {
                    products.length > 0 ?
                        <div className='m-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 my-10'>
                            {
                                products.filter((product) => {
                                    return search === '' ?
                                        product
                                        :
                                        product.productName.toLowerCase().includes(search)
                                }).toReversed().map((product, ind) => <ProductsCard
                                    key={ind}
                                    product={product}
                                    setBookProduct={setBookProduct}
                                ></ProductsCard>
                                )
                            }
                        </div>
                        :
                        <div className='h-[500px] flex justify-center items-center'>
                            <div className='text-center'>
                                <h1 className='animate-fade-up animate-once animate-duration-[1500ms] animate-ease-linear text-5xl uppercase font-bold  bg-gradient-to-r from-red-600  to-red-400 text-transparent bg-clip-text'>Sorry</h1>
                                <h1 className='text-4xl mt-5 uppercase font-bold animate-fade-up animate-once animate-duration-[1500ms] animate-ease-linear  bg-gradient-to-r from-red-600  to-red-400 text-transparent bg-clip-text'> currently no product is availabe!</h1>
                            </div>
                        </div>
                }
            </div>
            {
                bookProduct &&
                <BookNowModal
                    bookProduct={bookProduct}
                    handleBooking={handleBooking}
                    closeModal={closeModal}
                ></BookNowModal>
            }
        </div>
    );
};

export default Products;