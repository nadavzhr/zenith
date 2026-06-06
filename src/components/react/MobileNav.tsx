import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Hash, User, ScrollText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { normalizePath } from '../../lib/utils';

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  basePath: string;
  currentPath: string;
  children?: React.ReactNode;
}

const iconMap = {
  'Home': Home,
  'Articles': ScrollText,
  'Topics': Hash,
  'About': User
};

export function MobileNav({ navItems, basePath, currentPath, children }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedBasePath = normalizePath(basePath);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="md:hidden flex items-center">
      <ThemeToggle className="mr-1" />
      <button 
        className="text-secondary p-2 hover:text-primary focus:outline-none rounded-full transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/10 z-40 mt-16" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-0 top-16 bg-surface border-t border-on-surface/10 px-margin-page py-6 flex flex-col gap-6 shadow-xl z-50 animate-in slide-in-from-top duration-300">
            <div className="w-full relative z-[100]">
              {children}
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const fullPath = `${basePath}${item.href}`.replace(/\/+$/, '') + '/';
                const normalizedFullPath = normalizePath(fullPath);
                
                const isHome = item.href === '';
                const isActive = isHome 
                  ? normalizedCurrentPath === normalizedBasePath 
                  : normalizedCurrentPath.startsWith(normalizedFullPath);

                const Icon = iconMap[item.label as keyof typeof iconMap];

                return (
                  <a 
                    key={item.href}
                    href={fullPath} 
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 text-[16px] font-medium py-2 transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-on-surface'}`}
                  >
                    {Icon && <Icon size={20} />}
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
