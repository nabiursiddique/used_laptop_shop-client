import Aos from 'aos';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import 'aos/dist/aos.css';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleContactUs = (data) => {
        console.log(data.name, data.email, data.message);
        toast.success("Thanks for contacting us");
        reset();
    }

    useEffect(()=>{
        Aos.init();
    },[]);

    return (
        <div className='flex justify-center items-center my-10 mx-5'>
           <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-5 gap-3'>
           <h2 className=' flex  justify-center items-center text-center lg:text-8xl md:text-6xl text-5xl mt-5 bg-gradient-to-r from-blue-700  to-blue-200 text-transparent bg-clip-text font-extrabold'  data-aos="fade-down" data-aos-delay="200" data-aos-duration="1000" data-aos-once="false">Contact Us</h2>
            <div className=' p-7 my-7 shadow-lg border border-white rounded-lg'>
                <form onSubmit={handleSubmit(handleContactUs)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input {...register("name", {
                            required: "Name is required.",
                            maxLength: { value: 15, message: "Maximum 15 characters." },
                            minLength: { value: 4, message: "Name must be at least 4 letters" }
                        })} type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        {errors.name && <p className='text-sm mt-2 text-red-500'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", { required: "Email Address is required." })} type="text" placeholder="Your Email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-sm mt-2 text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className='form-control w-full'>
                    <label className="label"><span className="label-text">Your Message</span></label>
                        <textarea {...register("message", { required: "message is required." })} className="textarea input-bordered" rows="5" cols="50" placeholder="Your Query Here..."></textarea>
                        {errors.message && <p className='text-sm mt-2 text-red-500'>{errors.message?.message}</p>}
                    </div>
                    <input value='Submit' className='btn w-full my-4 bg-gradient-to-r from-sky-700  to-sky-500 text-white hover:from-blue-700 hover:to-blue-500' type="submit" />
                </form>
            </div>
           </div>
        </div>
    );
};

export default ContactUs;