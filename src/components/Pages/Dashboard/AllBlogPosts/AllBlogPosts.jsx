import React from 'react';
import { useQuery } from 'react-query';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';
import { toast } from 'react-hot-toast';

const AllBlogPosts = () => {
    const { data: blogs = [], isLoading, refetch } = useQuery({
        queryKey: ['blogs'],
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

    // For deleting the post
    const handleBlogPostDelete = (id) => {
        fetch(`http://localhost:5000/blogContents/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Blog Deleted Successfully')
            })
            .catch((error) => {
                console.log(error);
            })
    }
    refetch();

    return (
        <div>
            <h2 className='text-4xl text-center my-5 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>All Blog Posts</h2>
            <hr />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Delete Blog</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs.map((blog, ind) => <tr key={ind}>
                                <th>{ind + 1}</th>
                                <td>{blog.title}</td>
                                <td>{blog.content.slice(0, 100)}...</td>
                                <th>
                                    <label htmlFor="confirmation_modal"
                                        onClick={() => handleBlogPostDelete(blog._id)}
                                        className="btn bg-red-400 text-white btn-sm hover:bg-red-500">X</label>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBlogPosts;