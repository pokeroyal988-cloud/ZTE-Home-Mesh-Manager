import React, { useState, useEffect, useRef } from 'react';
import { NetworkDevice, DeviceRole } from '../types';
import { CopyToClipboard } from './CopyToClipboard';
import { Globe, ArrowRight, RefreshCw, Layers, Server, Shield, Wifi } from 'lucide-react';

interface DeviceCardProps {
  device: NetworkDevice;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const [isReachable, setIsReachable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const checkStatus = async () => {
    setIsChecking(true);
    setIsReachable(null);

    const img = new Image();
    img.onload = () => {
      setIsReachable(true);
      setIsChecking(false);
    };
    img.onerror = () => {
      setIsReachable(false);
      setIsChecking(false);
    };
    img.src = `http://${device.ip}/favicon.ico?t=${new Date().getTime()}`;
    
    setTimeout(() => {
        if (isChecking) {
            setIsChecking(false);
            if (isReachable === null) setIsReachable(false);
        }
    }, 3000);
  };

  useEffect(() => {
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAdminPage = () => {
    window.open(`http://${device.ip}`, '_blank');
  };

  const isMain = device.role === DeviceRole.MAIN_ROUTER;

  // 3D Tilt Effect on Hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10deg to 10deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div 
        className="relative group h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
      {/* Soft Glow Behind */}
      <div className={`absolute -inset-4 rounded-[2.5rem] blur-[30px] transition-all duration-500 opacity-0 group-hover:opacity-70 ${
          isMain ? 'bg-sky-200/60' : 'bg-indigo-100/50'
      }`}></div>

      {/* Main Card Structure */}
      <div 
        ref={cardRef}
        className="relative h-full flex flex-col bg-white/90 backdrop-blur-xl border border-white rounded-3xl overflow-hidden transition-transform duration-200 ease-out shadow-soft-3d preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shine Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/50 to-transparent opacity-80 pointer-events-none z-10"></div>
        
        {/* Top Gradient Bar */}
        <div className={`relative h-1.5 w-full overflow-hidden ${isMain ? 'bg-gradient-to-r from-sky-400 to-blue-400' : 'bg-gradient-to-r from-indigo-300 to-violet-300'}`}></div>

        <div className="p-8 flex-grow flex flex-col relative z-20">
            {/* Header Content */}
            <div className="flex justify-between items-start mb-8 transform translate-z-10 group-hover:translate-z-4 transition-transform duration-300">
                <div className="flex items-center gap-5">
                    <div className={`relative w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm border border-white ${
                        isMain 
                        ? 'bg-sky-50 text-sky-500' 
                        : 'bg-indigo-50 text-indigo-500'
                    }`}>
                        {isMain ? <Globe size={28} strokeWidth={1.5} /> : <Layers size={28} strokeWidth={1.5} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-slate-800 tracking-tight">{device.name}</h3>
                        <div className="flex items-center gap-2 mt-1.5">
                            {isMain ? <Shield size={12} className="text-sky-500" /> : <Wifi size={12} className="text-indigo-400" />}
                            <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${isMain ? 'text-sky-500' : 'text-indigo-400'}`}>
                                {isMain ? 'Primary Gateway' : 'Mesh Node'}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* 3D Status Light */}
                <button 
                    onClick={checkStatus}
                    className="relative group/status transform transition-transform hover:scale-110"
                >
                    <div className={`w-4 h-4 rounded-full shadow-sm border-2 border-white ${
                        isChecking ? 'bg-amber-400' : isReachable ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}></div>
                    
                    {/* Ripple */}
                    {!isChecking && isReachable && (
                         <div className="absolute inset-0 -m-1 rounded-full bg-emerald-400/30 animate-ping"></div>
                    )}
                </button>
            </div>

            {/* Info Fields - Floating Effect */}
            <div className="space-y-4 mb-8 transform translate-z-0 group-hover:translate-z-2 transition-transform duration-300">
                <CopyToClipboard label="IP Address" text={device.ip} icon="Globe" theme={isMain ? 'blue' : 'indigo'} />
                <CopyToClipboard label="Account" text={device.username} icon="User" theme={isMain ? 'blue' : 'indigo'} />
                <CopyToClipboard label="Password" text={device.password || ''} masked={true} icon="Lock" theme={isMain ? 'blue' : 'indigo'} />
            </div>
        </div>

        {/* Action Footer */}
        <div className="p-3 relative z-20 bg-slate-50/30 border-t border-slate-100/50">
            <button
            onClick={openAdminPage}
            className={`w-full group/btn relative overflow-hidden flex items-center justify-center gap-3 font-bold py-3.5 px-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md border ${
                isMain 
                ? 'bg-sky-100 hover:bg-sky-200 border-sky-200 text-sky-700' 
                : 'bg-white hover:bg-white border-slate-200 text-slate-600 hover:text-slate-800'
            }`}
            >
                <span className="text-sm tracking-wide">Truy Cập Thiết Bị</span>
                <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};