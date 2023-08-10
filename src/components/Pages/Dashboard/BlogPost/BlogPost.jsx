import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const BlogPost = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Saving the blog into the database
    const handleAddBlog = (data) => {
        const { blogTitle, blogContent } = data;
        const blog = {
            title: blogTitle,
            content: blogContent
        }

        // Sending the blog content into the database.
        fetch('http://localhost:5000/blogContents', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success('Posted successfully');
                    reset();
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <div className='py-7'>
            <h2 className='text-4xl text-center my-5 py-2 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>Post Your Blog </h2>
            <form className='mx-10' onSubmit={handleSubmit(handleAddBlog)}>
                {/* Imput for title of the blog */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Title of Your Blog</span>
                    </label>
                    <input {...register("blogTitle", {
                        required: "Title is required."
                    })} type="text" placeholder="Title of your blog" className="input input-bordered w-full" />
                    {errors.blogTitle && <p className='text-sm mt-2 text-red-500'>{errors.blogTitle?.message}</p>}
                </div>
                {/* Main Blog */}
                <div className="form-control w-full mt-5">
                    <label className="label">
                        <span className="label-text">Script Of Your Blog</span>
                    </label>
                    <textarea {...register("blogContent", {
                        required: "Product description is required."
                    })} rows='7' className="textarea textarea-bordered w-full" placeholder="Write Your Blogs"></textarea>
                    {errors.blogContent && <p className='text-sm mt-2 text-red-500'>{errors.blogContent?.message}</p>}
                </div>
                {/* Submit button */}
                <div className='flex justify-center items-center'>
                    <input className='btn btn-wide bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500 my-5' type="submit" value="Post" />
                </div>
            </form>
        </div>
    );
};

export default BlogPost;