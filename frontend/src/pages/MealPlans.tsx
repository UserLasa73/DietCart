import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MealPlanCard from '../components/MealPlanCard';
import { DietType, MealPlan } from '../types/types';

export default function MealPlans() {
  const { dietType } = useParams<{ dietType: DietType }>();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await fetch(`/api/meal-plans?diet=${dietType}`);
        const data: MealPlan[] = await response.json();
        setMealPlans(data);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      }
    };
    fetchMealPlans();
  }, [dietType]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{dietType} Meal Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealPlans.map(plan => (
          <MealPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}