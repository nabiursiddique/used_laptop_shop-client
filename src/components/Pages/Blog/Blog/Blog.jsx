import React from 'react';
import { blogContents } from '../BlogContents/BlogContents';

const Blog = () => {

    return (
        <div className='mb-10 shadow-lg lg:mx-10 my-10 py-10 rounded-lg'>
            <h2 className='text-center text-5xl my-8 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>OUR BLOGS</h2>
            <div className='mx-10'>
                {
                    blogContents.map((blogContent, ind) => <div key={ind} className="collapse collapse-arrow">
                        <input type="radio" name="my-accordion-2" checked="checked" />
                        <div className="collapse-title text-xl text-blue-500 font-medium">
                            {blogContent.question}
                        </div>
                        <div className="collapse-content">
                            <p>{blogContent.answer}</p>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default Blog;