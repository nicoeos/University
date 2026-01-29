
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StatsOverview: React.FC = () => {
    const statsData = [
        { name: 'Mon', saved: 12, earned: 36 },
        { name: 'Tue', saved: 19, earned: 57 },
        { name: 'Wed', saved: 15, earned: 45 },
        { name: 'Thu', saved: 22, earned: 66 },
        { name: 'Fri', saved: 28, earned: 84 },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Weekly Impact</h2>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statsData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis hide />
                            <Tooltip
                                cursor={{ fill: '#F3F4F6' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
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
    );
};

export default StatsOverview;
