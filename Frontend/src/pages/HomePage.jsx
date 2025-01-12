import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const Card = ({ location, area, size, price, provider, link }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded h-auto">
      <h3 className="text-lg font-semibold mb-2">{location}</h3>
      <ul className="text-gray-700 mb-2">
        <li><strong>Area:</strong> {area}</li>
        <li><strong>Size:</strong> {size}</li>
        <li><strong>Price:</strong> ₹{price}</li>
        <li><strong>Provider:</strong> {provider}</li>
      </ul>
      <a href={link} className="text-blue-600 mt-2 block">
        More Details
      </a>
    </div>
  );
};

const HomePage = () => {
  const billboardData = [
    {
      location: "Times Square, New York",
      area: "500 sq.ft",
      size: "50x10 ft",
      price: "500,000",
      provider: "XYZ Advertising Co.",
      link: "/billboard/1",
    },
    {
      location: "Piccadilly Circus, London",
      area: "300 sq.ft",
      size: "30x10 ft",
      price: "400,000",
      provider: "ABC Media Solutions",
      link: "/billboard/2",
    },
    {
      location: "Shibuya Crossing, Tokyo",
      area: "700 sq.ft",
      size: "70x10 ft",
      price: "800,000",
      provider: "Global Ads Ltd.",
      link: "/billboard/3",
    },
    {
      location: "Marine Drive, Mumbai",
      area: "600 sq.ft",
      size: "60x10 ft",
      price: "600,000",
      provider: "India Billboard Co.",
      link: "/billboard/4",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen">
        {/* Billboard Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
          {billboardData.map((billboard, index) => (
            <Card
              key={index}
              location={billboard.location}
              area={billboard.area}
              size={billboard.size}
              price={billboard.price}
              provider={billboard.provider}
              link={billboard.link}
            />
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
