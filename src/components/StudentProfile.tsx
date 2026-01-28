
import React from 'react';
import { User, GraduationCap, MapPin, Save, Trophy, BookOpen, Calendar } from 'lucide-react';
import { StudentProfile as StudentProfileType, Formation, Degree, Offer } from '../types';

interface StudentProfileProps {
  profile: StudentProfileType;
  setProfile: (profile: StudentProfileType) => void;
  locations: string[];
  orders: Offer[];
}

const FORMATIONS: Formation[] = ['L1', 'L2', 'L3', 'M1', 'M2', 'PGE', 'PhD', 'Others'];
const DEGREES: Degree[] = ['Business', 'Social Studies', 'Engineering', 'Science', 'Medical Studies', 'Arts', 'Law', 'Others'];

const StudentProfile: React.FC<StudentProfileProps> = ({ profile, setProfile, locations, orders }) => {
  
  // Calculate stats dynamically based on orders + historical data
  const currentMealsSaved = orders.length;
  const totalMealsSaved = profile.totalMealsSaved + currentMealsSaved;

  const handleChange = (field: keyof StudentProfileType, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      {/* Dashboard Stats */}
      <div className="mb-10 flex justify-center">
        <div className="bg-gradient-to-br from-[#D62828] to-red-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden w-full md:w-1/2 lg:w-1/3 text-center">
          <div className="absolute -right-4 -bottom-4 opacity-20">
            <Trophy className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-red-100 text-sm font-medium mb-1 uppercase tracking-wider">Meals Saved</p>
            <p className="text-5xl font-extrabold mb-2">{totalMealsSaved}</p>
            <p className="text-sm text-red-100">You're a food rescue hero!</p>
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5 text-[#D62828]" />
            Personal Information
          </h2>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-xl focus:ring-[#D62828] focus:border-[#D62828] transition-colors outline-none"
                    placeholder="Enter your name"
                />
                </div>
            </div>

            {/* Age */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-xl focus:ring-[#D62828] focus:border-[#D62828] transition-colors outline-none"
                    placeholder="e.g. 22"
                />
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formation */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Year of Study</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={profile.formation}
                  onChange={(e) => handleChange('formation', e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-[#D62828] focus:border-[#D62828] appearance-none cursor-pointer outline-none"
                >
                  {FORMATIONS.map((fmt) => (
                    <option key={fmt} value={fmt}>{fmt}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

             {/* Degree */}
             <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Degree Field</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={profile.degree}
                  onChange={(e) => handleChange('degree', e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-[#D62828] focus:border-[#D62828] appearance-none cursor-pointer outline-none"
                >
                  {DEGREES.map((deg) => (
                    <option key={deg} value={deg}>{deg}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Preferred Crous */}
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Crous</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={profile.preferredCrous}
                  onChange={(e) => handleChange('preferredCrous', e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-[#D62828] focus:border-[#D62828] appearance-none cursor-pointer outline-none"
                >
                  <option value="">Select a restaurant</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
          </div>
        </div>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors">
                <Save className="w-4 h-4" />
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
