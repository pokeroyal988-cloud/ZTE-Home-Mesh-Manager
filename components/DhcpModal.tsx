import React, { useEffect, useState } from 'react';
import { X, RefreshCw, Monitor, Smartphone, Globe, AlertCircle } from 'lucide-react';
import { DhcpEntry } from '../types';

interface DhcpModalProps {
  isOpen: boolean;
  onClose: () => void;
  routerIp: string;
}

// Dữ liệu giả lập để demo giao diện (vì trình duyệt chặn CORS không fetch trực tiếp được)
const MOCK_DATA: DhcpEntry[] = [
  { hostname: 'iPhone-14-Pro', ip: '192.168.1.4', status: 'Active' },
  { hostname: 'MacBook-Air-M2', ip: '192.168.1.15', status: 'Active' },
  { hostname: 'Sony-Bravia-TV', ip: '192.168.1.22', status: 'Active' },
  { hostname: 'Xiaomi-Camera-C1', ip: '192.168.1.45', status: 'Inactive' },
  { hostname: 'PC-Gaming-Desktop', ip: '192.168.1.10', status: 'Active' },
];

export const DhcpModal: React.FC<DhcpModalProps> = ({ isOpen, onClose, routerIp }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DhcpEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Giả lập độ trễ mạng khi lấy dữ liệu từ Router
      setTimeout(() => {
        setData(MOCK_DATA);
        setLoading(false);
      }, 1500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden flex flex-col max-h-[85vh] animate-[fadeInScale_0.2s_ease-out]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/60 flex items-center justify-between bg-white/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Globe size={18} className="text-primary-600" />
              Allocated Address (DHCP)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Advanced Setup / Local Network / LAN</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Note about CORS */}
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-start gap-3">
            <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Dữ liệu bên dưới đang hiển thị chế độ xem trước. Để xem dữ liệu thực tế, bạn cần truy cập trực tiếp trang quản trị Router do chính sách bảo mật trình duyệt.
            </p>
        </div>

        {/* List Content */}
        <div className="overflow-y-auto flex-grow p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <RefreshCw size={24} className="animate-spin text-primary-500" />
              <span className="text-sm text-slate-500 font-medium">Đang đọc dữ liệu từ Router...</span>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                    <th className="px-5 py-3 w-1/2">Host Name</th>
                    <th className="px-5 py-3 w-1/2">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((item, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-slate-50/80 transition-colors group cursor-default"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                            {item.hostname.toLowerCase().includes('phone') ? <Smartphone size={16} /> : <Monitor size={16} />}
                          </div>
                          <span className="font-semibold text-slate-700">{item.hostname}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <code className="bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono text-xs border border-slate-200">
                          {item.ip}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
             <button 
                onClick={() => window.open(`http://${routerIp}`, '_blank')}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline"
             >
                Truy cập Advanced Setup &rarr;
             </button>
        </div>
      </div>
    </div>
  );
};