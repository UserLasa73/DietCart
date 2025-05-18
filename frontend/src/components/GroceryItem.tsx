import { GroceryItem as GroceryItemType } from '../types/types';

interface GroceryItemProps {
  item: GroceryItemType;
  onAddToCart: (item: GroceryItemType) => void;
}

export default function GroceryItem({ item, onAddToCart }: GroceryItemProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{item.name}</h3>
        <p className="text-green-600 font-semibold mb-2">${item.price.toFixed(2)}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.dietTypes.map(diet => (
            <span key={diet} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {diet}
            </span>
          ))}
        </div>
        <button
          onClick={() => onAddToCart(item)}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}