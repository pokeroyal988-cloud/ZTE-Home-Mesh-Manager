import React, { useState, useCallback } from 'react';
import { Copy, Check, Globe, User, Lock, Eye, EyeOff } from 'lucide-react';

interface CopyToClipboardProps {
  text: string;
  label: string;
  masked?: boolean;
  icon?: 'Globe' | 'User' | 'Lock';
  theme?: 'blue' | 'indigo';
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, label, masked = false, icon, theme = 'blue' }) => {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(!masked);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  const IconComponent = () => {
      // Updated colors to be lighter/sky variants
      const cls = theme === 'blue' ? 'text-sky-500' : 'text-indigo-400';
      switch(icon) {
          case 'Globe': return <Globe size={14} className={cls} />;
          case 'User': return <User size={14} className={cls} />;
          case 'Lock': return <Lock size={14} className={cls} />;
          default: return null;
      }
  }

  return (
    <div className="group/field relative">
      <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-slate-100 shadow-sm group-hover/field:border-sky-200 group-hover/field:shadow-md transition-all duration-300">
        <div className="flex items-center space-x-3 overflow-hidden">
            <div className={`p-2 rounded-lg bg-slate-50 border border-slate-100`}>
                <IconComponent />
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                <code className="text-sm font-semibold font-mono text-slate-600 truncate select-all">
                    {showPassword ? text : '••••••••••••'}
                </code>
            </div>
        </div>
        
        <div className="flex items-center space-x-1 pl-2">
            {masked && (
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
            )}
            <button
                onClick={handleCopy}
                className={`p-1.5 rounded-lg transition-all duration-300 ${copied 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-slate-400 hover:text-sky-600 hover:bg-sky-50'}`}
                title="Copy"
            >
                {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
        </div>
      </div>
    </div>
  );
};