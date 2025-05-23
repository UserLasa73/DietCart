import React from "react";

const FeaturedProducts = () => {
  const products = [
    { name: "Almond Flour", price: "$6.99", img: "https://via.placeholder.com/100" },
    { name: "Sugar-Free Cookies", price: "$4.50", img: "https://via.placeholder.com/100" },
    { name: "Keto Granola", price: "$5.20", img: "https://via.placeholder.com/100" },   
    { name: "Keto Granola", price: "$5.20", img: "https://via.placeholder.com/100" }, 
  ];

  return (
    <section className="py-8 px-4 bg-gray-50">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-10">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img src={product.img} alt={product.name} className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
