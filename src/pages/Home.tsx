import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Heart, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(6)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setFeaturedProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFBC7] via-[#ECEDB0] to-[#FEFBC7]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23722323' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/sts.jpg" 
                  alt="Switch To Style" 
                  className="h-24 w-24 rounded-full shadow-2xl border-4 border-white/50 backdrop-blur-sm" 
                />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 text-[#722323] animate-pulse" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#722323] mb-6 tracking-tight">
              Switch To Style
            </h1>
            <p className="text-xl md:text-2xl text-[#722323]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover exquisite women's fashion accessories that celebrate your unique beauty. 
              From elegant earrings to stunning pendants, find pieces that make you shine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/products"
                className="bg-[#722323] text-white px-8 py-4 rounded-2xl hover:bg-[#722323]/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center font-semibold text-lg"
              >
                <ShoppingBag className="h-6 w-6 mr-2" />
                Explore Collection
                <ArrowRight className="h-6 w-6 ml-2" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-[#722323] text-[#722323] px-8 py-4 rounded-2xl hover:bg-[#722323] hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#722323] mb-4">Featured Collection</h2>
            <p className="text-xl text-[#722323]/70 max-w-2xl mx-auto">
              Handpicked pieces that embody elegance and style
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-3"></div>
                    <div className="h-6 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="h-24 w-24 text-[#722323]/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#722323] mb-4">No Products Available</h3>
              <p className="text-[#722323]/70 mb-8">Our collection is being updated. Please check back soon!</p>
            </div>
          )}

          {featuredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center bg-[#722323] text-white px-8 py-3 rounded-xl hover:bg-[#722323]/90 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                View All Products
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-[#FEFBC7] to-[#ECEDB0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#722323] mb-4">Why Choose Switch To Style?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-[#722323]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-[#722323]" />
              </div>
              <h3 className="text-xl font-semibold text-[#722323] mb-2">Premium Quality</h3>
              <p className="text-[#722323]/70">Carefully curated accessories made with the finest materials for lasting beauty.</p>
            </div>

            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-[#722323]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-[#722323]" />
              </div>
              <h3 className="text-xl font-semibold text-[#722323] mb-2">Made with Love</h3>
              <p className="text-[#722323]/70">Each piece is selected with care to help you express your unique style.</p>
            </div>

            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-[#722323]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-[#722323]" />
              </div>
              <h3 className="text-xl font-semibold text-[#722323] mb-2">Trendy Designs</h3>
              <p className="text-[#722323]/70">Stay ahead of fashion trends with our constantly updated collection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#722323] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Style?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of women who have discovered their perfect accessories with us.
          </p>
          <Link
            to="/products"
            className="bg-white text-[#722323] px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-semibold text-lg inline-flex items-center"
          >
            <ShoppingBag className="h-6 w-6 mr-2" />
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;