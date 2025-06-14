import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    title: "Eat Clean, Live Green",
    subtitle: "Curated healthy foods just for your lifestyle.",
    image: "/assets/images/hero1.jpg",
  },
  {
    title: "Diabetic Friendly Choices",
    subtitle: "Shop foods that care for your sugar levels.",
    image: "/assets/images/Hero2.jpg",
  },
  {
    title: "Gluten-Free Goodness",
    subtitle: "Safe, delicious and gluten-free groceries.",
    image: "/assets/images/hero3.jpg",
  },
];

export default function HeroSection() {
  return (
    <section className="w-full h-[400px] md:h-[600px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-4">
                <h2 className="text-3xl md:text-7xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
