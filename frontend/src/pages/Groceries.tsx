import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GroceryItem from '../components/GroceryItem';
import { DietType, GroceryItem as GroceryItemType } from '../types/types';

export default function Groceries() {
  const { dietType } = useParams<{ dietType: DietType }>();
  const [groceries, setGroceries] = useState<GroceryItemType[]>([]);
  const [cart, setCart] = useState<GroceryItemType[]>([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await fetch(`/api/groceries?diet=${dietType}`);
        const data: GroceryItemType[] = await response.json();
        setGroceries(data);
      } catch (error) {
        console.error('Error fetching groceries:', error);
      }
    };
    fetchGroceries();
  }, [dietType]);

  const addToCart = (item: GroceryItemType) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{dietType} Groceries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {groceries.map(item => (
          <GroceryItem 
            key={item.id} 
            item={item} 
            onAddToCart={addToCart}
          />
        ))}
      </div>
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <Link 
            to="/checkout" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors flex items-center"
          >
            Proceed to Checkout
            <span className="ml-2 bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center">
              {cart.length}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}