'use client'
import authService from '@/app/apiServices/authApi/AuthApi'
import PrimaryButton from '@/components/button/PrimaryButton'
import InputField from '@/components/inputField/InputField'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Cookies from "js-cookie";
import Loader from '@/components/loader/Loader'

type FormValues = {

    email: string;
    password: string;
};
const Page = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<FormValues>()
    const [loading, setLoading] = useState(false)

    const loginFun = async (data: FormValues) => {
        setLoading(true)
        try {
            const response = await authService.login(data);
            console.log("response", response);

            // store tokens in cookie
            Cookies.set("accessToken", response.accessToken);
            Cookies.set("refreshToken", response.refreshToken);

            toast.success(response.message);

            // redirect to dashboard after login
            window.location.href = "/dashboard";
        } catch (error) {
            console.log("ERROR", error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>

            {loading &&
                <Loader />
            }
            <div className="flex w-full h-screen items-center justify-between md:p-2 lg:p-4">
                {/* Left Image */}
                <div className="relative md:w-[49%] xl:w-[69%] h-full">
                    <Image
                        src="/assets/admin/auth/singinImg.png"
                        alt="Signin Img"
                        fill
                        className="object-cover rounded-[16px]"
                    />
                    <div
                        className="absolute inset-0 rounded-[16px]"
                        style={{
                            background: "linear-gradient(to top, #C0DCD5 5%, transparent 100%)",
                        }}
                    ></div>
                </div>

                {/* Right Section */}
                <div className="w-[100%] md:w-[50%] xl:w-[30%] md:rounded-[16px] h-full bg-gradient-to-b from-greyscale50 to-primaryColorLight  px-8 flex items-center justify-center">

                    <div className='flex flex-col gap-y-4 md:gap-y-10 w-[100%]' >
                        <div className='w-[100%] flex flex-col gap-y-1'>

                            <h1 className="h1Semi">Sign In</h1>
                            <p className='headlineRegular'>Sign in to your Admin account</p>
                        </div >
                        <form onSubmit={handleSubmit(loginFun)} className='mt-2  w-[100%] flex flex-col gap-y-4'>
                            <InputField

                                label="Email ID"
                                name="email"
                                placeholder="Enter your email"
                                register={register}
                                error={errors.email}
                                required
                            />
                            <InputField

                                label="Password"
                                name="password"
                                placeholder="Enter your password"
                                register={register}
                                error={errors.password}
                                required
                                type='password'
                            />
                            <div className='w-[100%] flex items-center justify-center mt-6'>
                                <PrimaryButton text='Sign In' bgColor="bg-primaryColor" py='py-3' textColor='text-white' width='w-[100%] md:w-[60%]' />
                            </div>
                        </form>
                    </div >
                </div >
            </div>
        </div>


    )
}

export default Page
