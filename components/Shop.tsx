
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { ShoppingBag, Star, Plus } from 'lucide-react';

const Shop: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="heading-font text-3xl font-extrabold text-white">The Vault</h2>
          <p className="text-white/50 text-xs uppercase tracking-widest font-bold mt-1">Official Gear</p>
        </div>
        <div className="relative">
          <div className="bg-[#da291c] p-3 rounded-2xl shadow-lg">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-emerald-950">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group">
            <div className="relative aspect-square overflow-hidden bg-white/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <button 
                onClick={() => setCartCount(c => c + 1)}
                className="absolute bottom-3 right-3 p-2 bg-white rounded-xl shadow-lg active:scale-90 transition-transform"
              >
                <Plus className="w-5 h-5 text-emerald-950" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                <span className="text-[8px] text-white/40 uppercase font-black tracking-widest">{product.category}</span>
              </div>
              <h3 className="text-white font-bold text-sm line-clamp-1 leading-tight mb-2">{product.name}</h3>
              <p className="text-[#da291c] font-black text-lg">£{product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#006a4e] to-[#012e1f] p-8 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="heading-font text-2xl font-black mb-2">Member Discount</h3>
          <p className="text-white/70 text-sm mb-6 max-w-[200px]">Unlock 20% off all merch with your Digital ID card.</p>
          <button className="bg-white text-emerald-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl">
            Claim Discount
          </button>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12 pointer-events-none">
          <ShoppingBag className="w-48 h-48 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Shop;
