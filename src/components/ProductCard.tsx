import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    await addToCart(product);
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:scale-105">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-3">
            <button
              onClick={handleViewProduct}
              className="bg-white/90 backdrop-blur-sm text-[#722323] p-3 rounded-full hover:bg-white transition-all duration-200 transform hover:scale-110 shadow-lg"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className="bg-[#722323]/90 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#722323] transition-all duration-200 transform hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
        {product.quantity <= 5 && product.quantity > 0 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Only {product.quantity} left
          </div>
        )}
        {product.quantity === 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-[#ECEDB0] text-[#722323] text-xs px-3 py-1 rounded-full capitalize font-medium">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#722323] mb-2 line-clamp-2 group-hover:text-[#722323]/80 transition-colors">
          {product.name}
        </h3>
        <p className="text-[#722323]/70 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#722323]">${product.price}</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
          className="w-full bg-[#722323] text-white py-3 px-4 rounded-xl hover:bg-[#722323]/90 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transform hover:scale-105"
        >
          {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;