import React from "react";

const team = [
  {
    name: "Lasantha Perera",
    role: "Founder & Backend Developer",
    img: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Nimali Fernando",
    role: "Nutrition Consultant",
    img: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Ruwan De Silva",
    role: "Frontend Developer",
    img: "https://i.pravatar.cc/100?img=8",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-6">About DietCart</h1>
        <p className="text-gray-700 text-lg mb-8">
          DietCart is your trusted online store for health-focused grocery products — designed to support special dietary needs and wellness goals.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mt-10">
        <div className="bg-green-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Our Mission</h2>
          <p className="text-gray-700">
            To empower individuals to live healthier lives by offering easy access to nutritious and diet-specific grocery items — backed by experts.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Our Vision</h2>
          <p className="text-gray-700">
            A world where healthy food choices are convenient, affordable, and personalized for every unique lifestyle and condition.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {team.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-green-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
