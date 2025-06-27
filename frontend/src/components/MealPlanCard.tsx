import { CheckCircleIcon } from "@heroicons/react/24/outline"; // Optional: if using Heroicons

export default function MealPlanCard({ plan, dietTypes }: { 
  plan: {
    id: number;
    name: string;
    description: string;
    items: string[];
    dietTypeId: number;
    createdAt: string;
  };
  dietTypes: {
    id: number;
    name: string;
  }[];
}) {
  const dietType = dietTypes.find((dt) => dt.id === plan.dietTypeId);

  return (
    <div className="border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full">
      <div className="p-6 flex-grow">
        {dietType && (
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            #{dietType.name}
          </span>
        )}
        
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{plan.description}</p>
        
        {plan.items?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Meal Includes:
            </h4>
            <ul className="space-y-2">
              {plan.items.map((item, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
      </div>
      
      <div className="px-6 py-4 bg-gray-50 text-xs text-gray-500">
        Posted: {new Date(plan.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  );
}