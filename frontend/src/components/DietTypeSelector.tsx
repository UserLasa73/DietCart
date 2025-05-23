import React from "react";

const DietTypeSelector = () => {
  const categories = [
  { name: "Diabetic-Friendly", icon: "🩸" },        // Blood drop
  { name: "Nut-Free", icon: "🥜🚫" },               // No peanuts
  { name: "Dairy-Free", icon: "🥛❌" },              // No milk
  { name: "Gluten-Free", icon: "🌾🚫" },            // No wheat
  { name: "Soy-Free", icon: "🌱🚫" },               // No soy
  { name: "Egg-Free", icon: "🥚❌" },               // No eggs
  { name: "Heart-Healthy", icon: "❤️" },           // Heart
  { name: "Weight Management", icon: "⚖️" },       // Scale
  { name: "Gut Health", icon: "🦠" },              // Microbes
  { name: "Kidney-Friendly", icon: "🫘" },         // Kidney bean (closest representation)
  { name: "Liver Support", icon: "🍵" },           // Herbal/green tea for detox
  { name: "Hypertension-Safe", icon: "💓" },       // Heartbeat
  { name: "PCOS/PCOD Support", icon: "🧬" },       // Hormone/genes
  { name: "Senior Nutrition", icon: "👴" },        // Elderly man
  { name: "Children's Nutrition", icon: "🧒" },    // Child
  { name: "Immune Boosters", icon: "🛡️" },         // Shield
  { name: "Thyroid-Supportive", icon: "🦋" },      // Butterfly (thyroid gland shape)
  { name: "Pregnancy & Postpartum", icon: "🤰" },  // Pregnant woman
  { name: "Vegan Medical Diets", icon: "🌿" },     // Leaf
];


  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-10">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <button
            key={i}
            className="bg-white shadow-md p-4 rounded-xl text-center hover:bg-green-50"
          >
            <div className="text-4xl mb-2">{cat.icon}</div>
            <p className="font-medium">{cat.name}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default DietTypeSelector;
