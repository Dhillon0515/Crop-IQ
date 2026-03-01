import React from 'react';
import { Home, Leaf, Sprout } from 'lucide-react';

const Sidebar = ({ lang, activePage, setActivePage }) => {
  const navItems = [
    { id: 'home', icon: Home, labelEn: 'Dashboard', labelPa: 'ਡੈਸ਼ਬੋਰਡ' },
    { id: 'doctor', icon: Leaf, labelEn: 'Plant Doctor', labelPa: 'ਫ਼ਸਲ ਡਾਕਟਰ' },
  ];

  return (
    /* Added border-black/10 for light mode and border-white/10 for dark mode + shadow-2xl */
    <aside className="w-64 bg-[var(--bg-body)] h-screen fixed top-0 left-0 border-r border-black/10 dark:border-white/10 flex flex-col z-40 transition-colors duration-300 shadow-2xl">
      
      {/* Project Logo/Branding */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-[var(--nav-green)] p-1.5 rounded-lg shadow-[0_0_15px_rgba(57,255,20,0.3)]">
             <Sprout size={20} className="text-black" />
          </div>
          <h1 className="text-2xl font-black text-[var(--text-main)] tracking-tighter">
            Crop<span className="text-[var(--nav-green)]">IQ</span>
          </h1>
        </div>
        
        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">
          GNDEC Project
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 mt-4 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all duration-300 ${
                isActive 
                  ? 'bg-[var(--nav-green)] text-black shadow-[0_10px_25px_rgba(57,255,20,0.3)] scale-[1.02]' 
                  : 'text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--text-main)]'
              }`}
            >
              <Icon size={22} className={isActive ? 'animate-pulse' : 'text-[var(--nav-green)]'} />
              <span className="text-lg">
                {lang === 'en' ? item.labelEn : item.labelPa}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-black/5 dark:border-white/10">
        <p className="text-[9px] font-bold text-[var(--text-muted)] opacity-50 uppercase text-center tracking-widest">
          v2.0 Modern Agritech
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;