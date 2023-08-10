import React from 'react';
import { useQuery } from 'react-query';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';

const Blog = () => {

    const { data: blogContents = [], isLoading } = useQuery({
        queryKey: ['blogContents'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/blogContents');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className='mb-10 shadow-lg lg:mx-10 my-10 py-10 rounded-lg'>
            <h2 className='text-center text-5xl my-8 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>OUR BLOGS</h2>
            <div className='mx-10'>
                {
                    blogContents.map((blogContent, ind) =>
                        <div key={ind} className="collapse collapse-plus">
                            <input type="radio" name="my-accordion" />
                            <div className="collapse-title text-xl text-blue-500 font-medium">
                                {blogContent.title}
                            </div>
                            <div className="collapse-content">
                                <p>{blogContent.content}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Blog;