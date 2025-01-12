import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

function ContactUs() {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-50  mt-10 mb-20  flex flex-col items-center">
                
                <h1 className="text-3xl font-semibold mb-10 text-center">
                    Want to chat now or get a call from us?
                </h1>

                
                <div className="flex justify-center gap-10 bg-gray-200 w-full py-10">
                    
                    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 w-80 text-center">
                        <div className="mb-4">
                            
                            <span className="text-gray-700 text-3xl">💬</span>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">Chat right now</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Our messaging assistant can quickly solve many issues or direct you
                            to the right person or place.
                            <br />
                            <strong>Instant chat and always available.</strong>
                        </p>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600">
                            Start chatting
                        </button>
                    </div>

                    {/* Call Option */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 w-80 text-center">
                        <div className="mb-4">
                            {/* Call Icon */}
                            <span className="text-gray-700 text-3xl">📞</span>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">Have us call you</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            We'll first get a few details about your issue and then someone
                            will call you right away.
                        </p>
                        <button className="px-4 py-2 text-sm font-medium  text-white bg-gray-700 rounded-md hover:bg-gray-600">
                            Call me
                        </button>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default ContactUs
