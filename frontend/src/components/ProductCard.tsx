
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    dietTypes: string[];
    dietTypeIds: number[];
    imageUrl: string;
}


export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="flex flex-col h-full overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl hover:ring-2 hover:ring-green-500 transition-all duration-300">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                    src={product.imageUrl || "/assets/images/product-placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 p-4 flex flex-col">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
                    {product.name}
                </h3>

                {/* Diet Types */}
                <div className="text-xs text-green-700 mb-3">
                    {product.dietTypes?.join(", ") || "No diet types"}
                </div>

                {/* Price and Stock Info */}
                <div className="mt-auto">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span className="text-green-700 font-semibold text-base">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-gray-500">{product.stockQuantity} in stock</span>
                    </div>
                </div>
            </div>

            <div className="p-3 bg-gray-50">
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors text-sm">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}