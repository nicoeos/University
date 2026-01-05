
import React, { useState, useMemo, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Save, Euro, ChevronDown, Camera, Image as ImageIcon, X } from 'lucide-react';
import { Offer, DietType } from '../types';

interface RestaurantDashboardProps {
  offers: Offer[];
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
  locations: string[];
}

const RestaurantDashboard: React.FC<RestaurantDashboardProps> = ({ offers, setOffers, locations }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const generateTimeOptions = () => {
    const times = [];
    for (let i = 11; i <= 20; i++) {
      times.push(`${i}:00`);
      times.push(`${i}:30`);
    }
    return times;
  };

  const generateDateOptions = () => {
      const dates = [];
      const today = new Date();
      for(let i=0; i<6; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() + i);
          dates.push({
              value: d.toISOString().split('T')[0],
              label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString('en-GB', {weekday: 'short', day: 'numeric', month: 'short'})
          });
      }
      return dates;
  };

  const [formData, setFormData] = useState({
    restaurantName: locations[0] || '',
    category: DietType.MEALS,
    price: '3.00',
    quantity: '5',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupStart: '14:00',
    pickupEnd: '15:00',
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const statsData = [
    { name: 'Mon', saved: 12, earned: 36 },
    { name: 'Tue', saved: 19, earned: 57 },
    { name: 'Wed', saved: 15, earned: 45 },
    { name: 'Thu', saved: 22, earned: 66 },
    { name: 'Fri', saved: 28, earned: 84 },
  ];

  const getRelevantImage = (category: string) => {
    if (category === DietType.SANDWICH) return "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80";
    if (category === DietType.DESSERTS_BAKERY) return "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80";
    if (category === DietType.VEGETARIAN || category === DietType.VEGAN) return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80";
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"; 
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = [formData.category as DietType];

    const newOffer: Offer = {
      id: Date.now().toString(),
      title: `${formData.category} Bag`,
      restaurantName: formData.restaurantName, 
      description: `A fresh surplus of ${formData.category} options.`,
      price: parseFloat(formData.price),
      pickupDate: formData.pickupDate,
      pickupTimeStart: formData.pickupStart,
      pickupTimeEnd: formData.pickupEnd,
      imageUrl: uploadedImage || getRelevantImage(formData.category),
      distance: 0,
      rating: 5.0,
      remaining: parseInt(formData.quantity),
      tags: tags,
      isMysteryBag: false
    };
    setOffers([newOffer, ...offers]);
    
    setFormData(prev => ({
        ...prev,
        quantity: '5',
    }));
    setUploadedImage(null);
    alert("Offer published successfully!");
  };

  const timeOptions = useMemo(() => generateTimeOptions(), []);
  const dateOptions = useMemo(() => generateDateOptions(), []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Weekly Impact</h2>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{fontSize: 12}} />
                        <YAxis hide />
                        <Tooltip 
                            cursor={{fill: '#F3F4F6'}} 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
                        />
                        <Bar dataKey="saved" radius={[4, 4, 0, 0]}>
                            {statsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 4 ? '#D62828' : '#E5E7EB'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-green-600 font-bold uppercase mb-1">Meals Saved</p>
                    <p className="text-2xl font-bold text-green-700">423</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-yellow-600 font-bold uppercase mb-1">Money Collected</p>
                    <p className="text-2xl font-bold text-yellow-700">€1,240</p>
                </div>
            </div>
        </div>

        <div className="bg-[#D62828] text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">Transparency Matters</h3>
            <p className="text-white/90 text-sm">
                Adding a photo of the bag increases trust and helps students with allergies or specific diets make better choices.
            </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Upload New Offer</h2>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">Crous Admin</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant / Cafeteria</label>
                <div className="relative">
                    <select
                        value={formData.restaurantName}
                        onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D62828] appearance-none cursor-pointer"
                    >
                        {locations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offer Title (Automatic)</label>
                    <input 
                        type="text" 
                        disabled
                        value={`${formData.category} Bag`}
                        className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 font-bold cursor-not-allowed"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                    <div className="relative">
                        <select 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D62828] appearance-none cursor-pointer"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value as DietType})}
                        >
                            {Object.values(DietType).filter(v => v !== DietType.ALL).map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                 </div>
            </div>

            {/* Photo Upload Section */}
            <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-[#D62828]" />
                        Offer Transparency
                    </h3>
                    {uploadedImage && (
                        <button 
                            type="button"
                            onClick={() => setUploadedImage(null)}
                            className="text-xs text-red-600 font-bold flex items-center gap-1 hover:underline"
                        >
                            <X className="w-3 h-3" /> Remove
                        </button>
                    )}
                </div>

                {!uploadedImage ? (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-white transition-colors group"
                    >
                        <ImageIcon className="w-12 h-12 text-gray-300 group-hover:text-[#D62828] transition-colors mb-2" />
                        <p className="text-sm font-medium text-gray-500">Take a photo of the bag content</p>
                        <p className="text-xs text-gray-400">Helps students see exactly what they're buying</p>
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            capture="environment"
                            onChange={handleImageUpload}
                            className="hidden" 
                        />
                    </div>
                ) : (
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-sm">
                        <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-end p-3">
                            <span className="bg-white/90 text-gray-800 text-[10px] font-bold px-2 py-1 rounded">Actual Content Photo</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Max 50)</label>
                    <div className="relative">
                        <select 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D62828] appearance-none cursor-pointer"
                            value={formData.quantity}
                            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        >
                            {Array.from({length: 50}, (_, i) => i + 1).map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (€)</label>
                    <div className="relative">
                        <select 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D62828] appearance-none cursor-pointer"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                        >
                            <option value="1.00">€1.00</option>
                            <option value="1.50">€1.50</option>
                            <option value="2.00">€2.00</option>
                            <option value="2.50">€2.50</option>
                            <option value="3.00">€3.00</option>
                        </select>
                        <Euro className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                    <div className="relative">
                        <select 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D62828] appearance-none cursor-pointer"
                            value={formData.pickupDate}
                            onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                        >
                            {dateOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <div className="relative">
                        <select 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D62828] appearance-none cursor-pointer"
                            value={formData.pickupStart}
                            onChange={(e) => setFormData({...formData, pickupStart: e.target.value})}
                        >
                            {timeOptions.map(t => <option key={`start-${t}`} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <div className="relative">
                        <select 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D62828] appearance-none cursor-pointer"
                            value={formData.pickupEnd}
                            onChange={(e) => setFormData({...formData, pickupEnd: e.target.value})}
                        >
                            {timeOptions.map(t => <option key={`end-${t}`} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button 
                    type="submit"
                    className="w-full bg-[#D62828] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    Publish {formData.category} Bag
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
