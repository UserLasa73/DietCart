import { 
    SparklesIcon, 
    HeartIcon, 
    TrophyIcon 
  } from '@heroicons/react/24/outline';
  
  export default function AboutUs() {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          </div>
  
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image Column */}
            <div className="lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/assets/images/About.jpg" 
                  alt="Our team preparing healthy food"
                  className="w-full h-auto object-cover"
                />
                
              </div>
            </div>
  
            {/* Text Column */}
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Nourishing Lives Since 2015
              </h3>
              <p className="text-gray-600 mb-6">
                At DietCart, we believe healthy eating should be delicious, convenient, and 
                accessible to everyone. What began as a small farmers' market stand has grown 
                into a mission to revolutionize how people think about grocery shopping.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <SparklesIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Farm Fresh</h4>
                    <p className="text-gray-600 text-sm">
                      Sourced directly from organic farms within 100 miles
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <HeartIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Health First</h4>
                    <p className="text-gray-600 text-sm">
                      Nutritionist-approved selections for every diet
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <TrophyIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Award Winning</h4>
                    <p className="text-gray-600 text-sm">
                      Recognized for excellence in sustainable business
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }