import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-green-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-green-900 mb-4 leading-tight">
            Eat Smart. Shop Healthy. <br />
            <span className="text-green-600">Welcome to DietCart</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your one-stop shop for diabetic-friendly, gluten-free, and diet-focused groceries. 
            Curated by nutrition experts to support every health goal.
          </p>
          <a
            href="/shop"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-700 transition"
          >
            Start Shopping 🛒
          </a>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2718/2718224.png"
            alt="Healthy groceries illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
