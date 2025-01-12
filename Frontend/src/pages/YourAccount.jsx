import React from 'react'
import { Link } from 'react-router'
import { FaBoxArchive } from "react-icons/fa6";
import { IoLockOpen } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { HiMiniCreditCard } from "react-icons/hi2";
import { MdHeadsetMic } from "react-icons/md";
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

function YourAccount() {
    return (
        <div>
            <Navbar />
            <div className='w-fit mx-72 mt-10 mb-20'>
                <h1 className='text-2xl mb-4 font-semibold'>Your Account</h1>
                <div className='flex flex-wrap  gap-7'>
                    <Link to="/order" className='p-2 border-2 border-gray-300 gap-3 rounded-md w-72 h-24 flex items-center pb-4 hover:bg-gray-100'>
                        <FaBoxArchive size={35} className='text-yellow-300 ' />
                        <div>
                            <p className='text-lg '>Your Orders</p>
                            <p className='text-gray-700 text-sm'>Track,return or buy things again.</p>
                        </div>

                    </Link>
                    <Link className='p-2 border-2 border-gray-300 gap-3 rounded-md w-72 h-24 flex items-center pb-4 hover:bg-gray-100'>
                        <IoLockOpen size={35} className="text-gray-500" />
                        <div>
                            <p className='text-lg '>Login & Security</p>
                            <p className='text-gray-700 text-sm'>Edit login ,name and password.</p>
                        </div>
                    </Link>
                    <Link to="/youraddress" className='p-2 border-2 border-gray-300 gap-3 rounded-md w-72 h-24 flex items-center pb-4 hover:bg-gray-100'>
                        < MdLocationPin size={40} className='text-orange-400' />
                        <div>
                            <p className='text-lg'>Your Address</p>
                            <p className='text-gray-700 text-sm'>Edit address for your orders.</p>
                        </div>
                    </Link>
                    <Link className='p-2 border-2 border-gray-300 gap-3 rounded-md w-72 h-24 flex items-center pb-4 hover:bg-gray-100'>
                        <HiMiniCreditCard size={40} className='text-blue-400' />
                        <div>
                            <p className='text-lg'>Payment Options</p>
                            <p className='text-gray-700 text-sm'>Edit or add payment methods.</p>
                        </div>
                    </Link>
                    <Link to="/contactus" className='p-2 border-2 border-gray-300 gap-3 rounded-md w-72 h-24 flex items-center pb-4 hover:bg-gray-100'>
                        <MdHeadsetMic size={40} className='text-green-300' />
                        <div>
                            <p className='text-lg'>Contact Us</p>
                            <p className='text-gray-700 text-sm'>Contact our customer service via call or text.</p>
                        </div>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default YourAccount
