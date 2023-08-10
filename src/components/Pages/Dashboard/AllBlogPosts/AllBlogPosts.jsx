import React, { useState } from 'react';
import { useQuery } from 'react-query';
import LoadingAnimation from '../../../LittleComponents/LoadingAnimation/LoadingAnimation';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';

const AllBlogPosts = () => {
    const [deletingBlog, setDeletingBlog] = useState(null);

    const closeModal = () => {
        setDeletingBlog(null);
    };

    const { data: blogs = [], isLoading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            try {
                const res = await fetch('https://used-laptop-shop-server.vercel.app/blogContents');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    // For deleting the post
    const handleBlogPostDelete = (id) => {
        fetch(`https://used-laptop-shop-server.vercel.app/blogContents/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Blog Deleted Successfully');
                refetch();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

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
                                    <label
                                        htmlFor="confirmation_modal"
                                        onClick={() => setDeletingBlog(blog)}
                                        className="btn bg-red-400 text-white btn-sm hover:bg-red-500"
                                    >X</label>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingBlog &&
                <ConfirmationModal
                    title={`Want to delete ${deletingBlog.title}?`}
                    deleteFunction={handleBlogPostDelete}
                    successButtonName={"Delete"}
                    cancelButtonName={"Cancel"}
                    closeModal={closeModal}
                    deletingInfo={deletingBlog._id}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllBlogPosts;