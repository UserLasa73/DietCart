import React from "react";
import {
    HeartIcon,
    TruckIcon,
    CheckCircleIcon,
    ShoppingCartIcon,
  } from "@heroicons/react/24/solid";

const WhyChooseUs = () => {
  const points = [
    {
      title: "Curated for Healthy Living",
      icon: <HeartIcon className="w-8 h-8 text-green-600" />,
      desc: "Carefully selected items to support diabetic, heart, and allergy-safe diets.",
    },
    {
      title: "Fast & Safe Delivery",
      icon: <TruckIcon className="w-8 h-8 text-green-600" />,   
      desc: "Get your groceries delivered fresh, safe, and on time anywhere in Sri Lanka.",
    },
    {
      title: "Doctor & Dietitian Approved",
      icon: <CheckCircleIcon className="w-8 h-8 text-green-600" />,
      desc: "Every product is reviewed by health experts to ensure it meets dietary standards.",
    },
    {
      title: "Affordable & Fresh",
      icon: <ShoppingCartIcon className="w-8 h-8 text-green-600" />,
      desc: "Premium nutrition that fits your budget — with seasonal discounts.",
    },
  ];

  return (
    <section className="bg-green-50 py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Why Choose DietCart?</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {points.map((point, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <div className="flex justify-center mb-4">{point.icon}</div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">{point.title}</h3>
            <p className="text-sm text-gray-600">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
