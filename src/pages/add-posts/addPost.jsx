import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';



const AddPost = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: currentUser = [], refetch } = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        },
    });
    // console.log(currentUser);



    const onSubmit = (data) => {

        const postData = {
            ...data,
            ownerName: user?.displayName || 'Anonymous',
            ownerImage: user?.photoURL || '/default-avatar.png',
            ownerEmail: user?.email,
            timestamp: new Date(), // Save current timestamp
        };

        axiosPublic.post('/posts', postData)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Your Post Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                // navigate('/');
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again.',
                });
            });
        // refetch();
    };

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto lg:p-6">

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md p-12 rounded-lg lg:mx-[300px] mx-auto">

                    <h1 className="text-3xl lg:text-5xl font-bold text-center mb-6">Add Post</h1>

                    {/* Post Type (Lost or Found) */}
                    <div className="mb-4">
                        <label htmlFor="type" className="block font-medium mb-1">Post Type</label>
                        <select
                            id="type"
                            {...register('type', { required: 'Post type is required' })}
                            className={`input input-bordered w-full dark:bg-white dark:text-black ${errors.type ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Post Type</option>
                            <option value="lost">Lost</option>
                            <option value="found">Found</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                    </div>
                        
                    {/* Item Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium mb-1">Item Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder='Enter item name'
                            {...register('name', { required: 'Product name is required' })}
                            className={`input input-bordered w-full dark:bg-white dark:text-black ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Item Image URL */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block font-medium mb-1">Item Image</label>
                        <input
                            type="url"
                            id="image"
                            placeholder='Enter item image URL'
                            {...register('image', { required: 'Product image is required' })}
                            className={`input input-bordered w-full dark:bg-white dark:text-black ${errors.image ? 'border-red-500' : ''}`}
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    {/* Item Category */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block font-medium mb-1">Category</label>
                        <select
                            id="category"
                            {...register('category', { required: 'Item category is required' })}
                            className={`input input-bordered w-full dark:bg-white dark:text-black ${errors.category ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select item Category</option>
                            <option value="mobile">Mobile</option>
                            <option value="laptop">Laptop</option>
                            <option value="electronics">Electronics</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="documents">Documents</option>
                            <option value="others">Others</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label htmlFor="location" className="block font-medium mb-1">Location</label>
                        <input
                            type="text"
                            id="location"
                            placeholder='Enter your location'
                            {...register('location', { required: 'Product location is required' })}
                            className={`input input-bordered w-full dark:bg-white dark:text-black ${errors.location ? 'border-red-500' : ''}`}
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="block font-medium mb-1">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder='Enter your phone number'
                            {...register('phone', { required: 'Phone number is required' })}
                            className={`input input-bordered w-full dark:bg-white dark:text-black ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    {/* Item Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block font-medium mb-1">Description</label>
                        <textarea
                            id="description"
                            placeholder='Enter item description'
                            {...register('description', { required: 'Description is required' })}
                            className={`textarea textarea-bordered w-full dark:bg-white dark:text-black ${errors.description ? 'border-red-500' : ''}`}
                            rows="4"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Owner Info */}
                    <div className="mb-4">
                        <label htmlFor="owner" className="block font-medium mb-1">Owner Extra Info</label>
                        <input
                            type="text"
                            id="ownerName"
                            value={user?.displayName || 'Anonymous'}
                            disabled
                            className="input input-bordered w-full dark:bg-white dark:text-black bg-gray-100"
                        />
                        <input
                            type="email"
                            id="ownerEmail"
                            value={user?.email}
                            disabled
                            className="input input-bordered w-full  dark:bg-white dark:text-black bg-gray-100 mt-2"
                        />

                        <input
                            type='url'
                            id='ownerImage'
                            value={user?.photoURL || '/default-avatar.png'}
                            disabled
                            className="input input-bordered w-full dark:bg-white dark:text-black bg-gray-100 mt-2"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn bg-[#1a237e] hover:bg-blue-700 text-white w-full">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;