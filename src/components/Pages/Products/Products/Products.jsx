import React from 'react';
import { useQuery } from 'react-query';
import ProductsCard from './ProductsCard';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';

const Products = () => {
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
    if(isLoading){
        return <LoadingAnimation></LoadingAnimation>
    }
    return (
        <div>
            <div className='m-6'>
                <h1 className='text-3xl text-center my-6 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>All Products</h1>
                {
                    products.map((product, ind) => <ProductsCard
                        key={ind}
                        product={product}
                    ></ProductsCard>)
                }
            </div>
        </div>
    );
};

export default Products;