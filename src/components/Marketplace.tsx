import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowLeft, Search, Star, ShoppingCart, Store, Tag, TrendingUp, Package, Heart, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MarketplaceProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

export function Marketplace({ onBack, onNavigate }: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    { id: 'all', name: 'All', icon: Package },
    { id: 'electronics', name: 'Electronics', icon: Package },
    { id: 'fashion', name: 'Fashion', icon: Tag },
    { id: 'home', name: 'Home', icon: Store },
    { id: 'beauty', name: 'Beauty', icon: Star },
  ];

  const stores = [
    { 
      id: 1, 
      name: 'TechWorld', 
      rating: 4.8, 
      products: 156,
      verified: true,
      category: 'electronics'
    },
    { 
      id: 2, 
      name: 'StyleHub', 
      rating: 4.6, 
      products: 203,
      verified: true,
      category: 'fashion'
    },
    { 
      id: 3, 
      name: 'HomeEssentials', 
      rating: 4.9, 
      products: 89,
      verified: true,
      category: 'home'
    },
    { 
      id: 4, 
      name: 'BeautyBox', 
      rating: 4.7, 
      products: 124,
      verified: true,
      category: 'beauty'
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      category: 'electronics',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 2341,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY2OTQ3OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      store: 'TechWorld',
      badge: 'Best Seller',
      delivery: 'Free delivery',
      stock: 234,
    },
    {
      id: 2,
      name: 'Smartphone Pro Max',
      category: 'electronics',
      price: 1099.00,
      originalPrice: 1299.00,
      rating: 4.9,
      reviews: 5678,
      image: 'https://images.unsplash.com/photo-1732998369893-af4c9a4695fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc2Njk4NzI5OHww&ixlib=rb-4.1.0&q=80&w=1080',
      store: 'TechWorld',
      badge: 'Deal',
      delivery: 'Free delivery',
      stock: 45,
    },
    {
      id: 3,
      name: 'Athletic Running Shoes',
      category: 'fashion',
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.7,
      reviews: 1823,
      image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzY2OTczMzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      store: 'StyleHub',
      badge: 'Sale',
      delivery: 'Free delivery',
      stock: 156,
    },
    {
      id: 4,
      name: 'Ultra Slim Laptop',
      category: 'electronics',
      price: 1499.00,
      originalPrice: 1799.00,
      rating: 4.8,
      reviews: 3421,
      image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjY5NzIyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      store: 'TechWorld',
      badge: 'Best Seller',
      delivery: 'Free delivery',
      stock: 67,
    },
    {
      id: 5,
      name: 'Luxury Smart Watch',
      category: 'electronics',
      price: 399.00,
      originalPrice: 499.00,
      rating: 4.6,
      reviews: 2156,
      image: 'https://images.unsplash.com/photo-1755621123450-9b1c21b5b704?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMHRpbWVwaWVjZXxlbnwxfHx8fDE3NjcwNTE0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      store: 'TechWorld',
      badge: 'New',
      delivery: 'Free delivery',
      stock: 189,
    },
    {
      id: 6,
      name: 'Travel Backpack Pro',
      category: 'fashion',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.5,
      reviews: 987,
      image: 'https://images.unsplash.com/photo-1680039211156-66c721b87625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZ3xlbnwxfHx8fDE3NjY5OTkyODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      store: 'StyleHub',
      badge: 'Sale',
      delivery: 'Free delivery',
      stock: 234,
    },
    {
      id: 7,
      name: 'Smart Coffee Maker',
      category: 'home',
      price: 249.00,
      originalPrice: 299.00,
      rating: 4.7,
      reviews: 1432,
      image: 'https://images.unsplash.com/photo-1608354580875-30bd4168b351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlcnxlbnwxfHx8fDE3NjY5NzQwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      store: 'HomeEssentials',
      badge: 'Deal',
      delivery: 'Free delivery',
      stock: 78,
    },
    {
      id: 8,
      name: 'Skincare Gift Set',
      category: 'beauty',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.9,
      reviews: 3245,
      image: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2NzAzMjQwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      store: 'BeautyBox',
      badge: 'Best Seller',
      delivery: 'Free delivery',
      stock: 312,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredStores = stores.filter(store => 
    selectedCategory === 'all' || store.category === selectedCategory
  );

  const handleAddToCart = (product: any) => {
    setCartCount(prev => prev + 1);
    toast.success("Added to Cart", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-amber-500';
      case 'Deal':
        return 'bg-red-500';
      case 'Sale':
        return 'bg-green-500';
      case 'New':
        return 'bg-blue-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#0a0a1a] pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 sticky top-0 bg-[#0a0a1a] z-10 border-b border-slate-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full hover:bg-slate-700/30"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Button>
            <div>
              <h1 className="text-2xl text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                Bery Market
              </h1>
              <p className="text-xs text-slate-400">Shop with Bery payment</p>
            </div>
          </div>
          <button 
            className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
            onClick={() => toast.info("Cart", { description: `${cartCount} items in cart` })}
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search products, stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 bg-[#1a1a2e] border-slate-700 text-white placeholder:text-slate-500 rounded-2xl"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 py-4 bg-[#0a0a1a] sticky top-[140px] z-10 border-b border-slate-800/30">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl flex-shrink-0 transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-[#1a1a2e] text-slate-400 hover:bg-slate-800'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Stores */}
      <div className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Featured Stores
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredStores.slice(0, 4).map((store, index) => (
            <motion.button
              key={store.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="rounded-2xl p-4 bg-[#1a1a2e] border border-slate-800 hover:border-blue-600 transition-all text-left"
              onClick={() => toast.info(store.name, { description: `${store.products} products available` })}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Store className="w-5 h-5 text-white" />
                </div>
                {store.verified && (
                  <div className="px-2 py-0.5 bg-blue-600/20 rounded-full">
                    <span className="text-[10px] text-blue-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      Verified
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-white text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {store.name}
              </h3>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-slate-300">{store.rating}</span>
                </div>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">{store.products} items</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <span className="text-xs text-slate-400">{filteredProducts.length} items</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="rounded-2xl bg-[#1a1a2e] border border-slate-800 hover:border-blue-600 transition-all overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-slate-800">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-white px-2 py-1 rounded-lg`}>
                    <span className="text-[10px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      {product.badge}
                    </span>
                  </div>
                )}
                <button 
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success("Added to Wishlist");
                  }}
                >
                  <Heart className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-3">
                <p className="text-[10px] text-slate-500 mb-1">{product.store}</p>
                <h3 className="text-sm text-white mb-2 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-slate-300">{product.rating}</span>
                  <span className="text-xs text-slate-500">({product.reviews.toLocaleString()})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-slate-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Delivery Info */}
                <p className="text-[10px] text-green-400 mb-3">{product.delivery}</p>

                {/* Add to Cart Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl py-2 text-sm"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNavigation currentScreen="marketplace" onNavigate={onNavigate} />
    </div>
  );
}
