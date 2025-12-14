import React, { useState } from 'react';
import { NETWORK_DEVICES } from './constants';
import { DeviceRole } from './types';
import { DeviceCard } from './components/DeviceCard';
import { DhcpModal } from './components/DhcpModal';
import { Activity, Router, ShieldCheck, Users } from 'lucide-react';

const App: React.FC = () => {
  const [isDhcpModalOpen, setIsDhcpModalOpen] = useState(false);

  // Safely find the main router using the Enum
  const mainRouter = NETWORK_DEVICES.find(d => d.role === DeviceRole.MAIN_ROUTER);
  const routerIp = mainRouter?.ip || '192.168.1.1';

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
      
      {/* Light 3D Atmosphere Effects */}
      <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-300/10 blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 blur-[120px] pointer-events-none mix-blend-multiply" />

      {/* Floating Glass Navbar */}
      <header className="fixed top-6 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto h-20 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex items-center justify-between px-6 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-gradient-to-tr from-sky-400 to-indigo-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-sky-100 shadow-sm text-sky-600">
                <Router className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-800 tracking-tight leading-none">NetControl</span>
              <span className="text-[10px] text-sky-600 font-bold tracking-[0.2em] uppercase mt-1">Smart Mesh System</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setIsDhcpModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-200 hover:shadow-md transition-all text-xs font-bold"
             >
                <Users size={14} />
                <span>CLIENTS</span>
             </button>
             
             <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-600 shadow-sm">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="hidden sm:inline">SECURE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 pt-40 pb-20 z-10 perspective-container">
        
        {/* Header Section */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-[fadeIn_1s_ease-out]">
            <div className="max-w-2xl relative">
                <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-sky-700 to-indigo-700 mb-4 tracking-tight drop-shadow-sm">
                  Network Matrix
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-sky-400 to-transparent mb-6 rounded-full opacity-80"></div>
                <p className="text-lg text-slate-600 font-medium max-w-xl border-l-4 border-sky-300 pl-4 leading-relaxed">
                   Giao diện quản trị hệ thống ZTE Mesh trực quan. Giám sát thời gian thực với cấu trúc không gian 3 chiều.
                </p>
            </div>
            
            <div className="flex items-center gap-3 text-slate-600 text-sm font-semibold bg-white/80 px-6 py-3 rounded-2xl border border-white shadow-floating backdrop-blur-md">
                <Activity size={18} className="text-sky-500" />
                <span className="font-mono">LOCAL NET: <span className="text-slate-900 font-bold">192.168.1.0/24</span></span>
            </div>
        </div>

        {/* 3D Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {NETWORK_DEVICES.map((device, index) => (
            <div 
                key={device.id} 
                className="preserve-3d" 
                style={{ animationDelay: `${index * 200}ms` }}
            >
                <DeviceCard device={device} />
            </div>
          ))}
        </div>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/60 backdrop-blur-lg py-8 text-center mt-auto relative z-10">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
            ZTE Mesh Management System v3.0 &copy; {new Date().getFullYear()}
        </p>
      </footer>

      {/* Modal Integration */}
      <DhcpModal 
        isOpen={isDhcpModalOpen} 
        onClose={() => setIsDhcpModalOpen(false)} 
        routerIp={routerIp} 
      />
    </div>
  );
};

export default App;