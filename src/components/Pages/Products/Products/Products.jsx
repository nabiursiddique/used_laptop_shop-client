import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ProductsCard from './ProductsCard';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';
import BookNowModal from '../BookNowModal/BookNowModal';

const Products = () => {
    const [bookProduct, setBookProduct] = useState(null);

    // React query for fetching
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/product');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    })
    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }
    return (
        <div>
            <div>
                <h1 className='text-3xl text-center my-6 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>All Products</h1>
                {
                    products.length > 0 ?
                        <div className='m-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 my-10'>
                            {
                                products.map((product, ind) => <ProductsCard
                                    key={ind}
                                    product={product}
                                    setBookProduct={setBookProduct}
                                ></ProductsCard>)
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
                ></BookNowModal>
            }
        </div>
    );
};

export default Products;