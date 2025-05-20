export default function HeroSection() {
  return (
    <section
      className="relative bg-gradient-to-r from-green-300 via-green-100 to-white h-screen flex items-center justify-center px-6 md:px-16"
      
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center md:text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Welcome to <span className="text-green-600">DietCart</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Healthy, diet-friendly groceries delivered to your door. Discover products tailored for your lifestyle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-center">
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-green-600 text-green-600 font-semibold rounded-xl hover:bg-green-100 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
