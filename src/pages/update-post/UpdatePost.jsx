import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const UpdatePost = () => {
    const { id } = useParams(); // Get post ID from URL
    const { user } = useAuth();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // Fetch post details
    const { data: post = {}, refetch } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts/${id}`);
            return res.data;
        },
        enabled: !!id
    });

    // Populate form fields when post data is fetched
    useEffect(() => {
        if (post) {
            setValue('type', post.type);
            setValue('name', post.name);
            setValue('image', post.image);
            setValue('category', post.category);
            setValue('location', post.location);
            setValue('phone', post.phone);
            setValue('description', post.description);
        }
    }, [post, setValue]);

    const onSubmit = (data) => {
        const updatedPost = {
            ...data,
            ownerName: user?.displayName || 'Anonymous',
            ownerImage: user?.photoURL || '/default-avatar.png',
            ownerEmail: user?.email,
            timestamp: new Date(),
        };

        axiosPublic.put(`/posts/${id}`, updatedPost)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Post Updated Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myAddedPosts');
                }
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again.',
                });
            });
    };

    return (
        <div className='bg-gray-100 px-6 py-12 lg:px-0'>
            <div className="container mx-auto lg:p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md p-12 rounded-lg lg:mx-[300px] mx-auto">
                    <h1 className="text-3xl lg:text-5xl font-bold text-center mb-6">Update Post</h1>

                    {/* Post Type */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Post Type</label>
                        <select {...register('type')} className="input input-bordered w-full dark:bg-white dark:text-black">
                            <option value="lost">Lost</option>
                            <option value="found">Found</option>
                            <option value="item-recovered">Item Recovered</option>
                        </select>
                    </div>

                    {/* Item Name */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Item Name</label>
                        <input type="text" {...register('name')} className="input input-bordered w-full dark:bg-white dark:text-black" />
                    </div>

                    {/* Image URL */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Item Image</label>
                        <input type="url" {...register('image')} className="input input-bordered w-full dark:bg-white dark:text-black" />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Category</label>
                        <select {...register('category')} className="input input-bordered w-full dark:bg-white dark:text-black">
                            <option value="mobile">Mobile</option>
                            <option value="laptop">Laptop</option>
                            <option value="electronics">Electronics</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="documents">Documents</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Location</label>
                        <input type="text" {...register('location')} className="input input-bordered w-full dark:bg-white dark:text-black" />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Phone Number</label>
                        <input type="tel" {...register('phone')} className="input input-bordered w-full dark:bg-white dark:text-black" />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Description</label>
                        <textarea {...register('description')} className="textarea textarea-bordered w-full dark:bg-white dark:text-black" rows="4"></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn bg-[#1a237e] hover:bg-blue-700 text-white w-full">Update Post</button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;
