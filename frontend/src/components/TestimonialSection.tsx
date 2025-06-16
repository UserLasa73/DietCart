import React from "react";

const testimonials = [
  {
    name: "Nimal Perera",
    feedback:
      "DietCart helped me manage my diabetes without compromising on taste. Their product variety is unmatched!",
    location: "Colombo, Sri Lanka",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Sasha Fernando",
    feedback:
      "As a mom, finding nutritious snacks for my kids was hard — until I found DietCart. Life-saver!",
    location: "Galle, Sri Lanka",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Dr. Anura Jayasuriya",
    feedback:
      "I recommend DietCart to my patients who follow strict dietary plans. Reliable, healthy, and fast delivery.",
    location: "Kandy, Sri Lanka",
    image: "https://i.pravatar.cc/100?img=8",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-8 lg:px-16 ">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-10">
        What Our Customers Say
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full border-2 border-green-500"
              />
              <div>
                <h3 className="font-semibold text-green-900">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">“{t.feedback}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
