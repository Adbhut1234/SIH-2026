'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/login/actions';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    const baseClass = "flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-all";
    return isActive
      ? `${baseClass} bg-primary text-on-primary font-bold shadow-md`
      : `${baseClass} text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface`;
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        className="lg:hidden fixed top-3 right-4 z-[60] p-2 rounded-md bg-surface text-on-surface border border-outline-variant/30 shadow-sm flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[45]"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar (Desktop Left, Mobile Right Slide-in) */}
      <aside className={`fixed top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:left-0 right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col">
          <div className="h-16 px-space-xl flex items-center gap-space-md bg-surface-container-low">
            <Link href="/dashboard" onClick={closeMenu}>
              <img src="/logo.svg" alt="TerraVerify Logo" className="h-7 w-auto" />
            </Link>
          </div>
          
          <div className="px-space-md py-space-sm mt-4 lg:mt-0">
            <p className="px-space-md pt-space-md pb-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">Cadastral Operations</p>
            <nav className="space-y-space-2xs">
              <Link href="/dashboard" className={getLinkClass("/dashboard")} onClick={closeMenu}>
                <span className="material-symbols-outlined text-[20px]">dashboard</span>Overview
              </Link>
              <Link href="/upload" className={getLinkClass("/upload")} onClick={closeMenu}>
                <span className="material-symbols-outlined text-[20px]">description</span>Upload Document
              </Link>
              <Link href="/review" className={getLinkClass("/review")} onClick={closeMenu}>
                <span className="material-symbols-outlined text-[20px]">rate_review</span>Review & Extract
              </Link>
              <Link href="/verify" className={getLinkClass("/verify")} onClick={closeMenu}>
                <span className="material-symbols-outlined text-[20px]">verified_user</span>Verification
              </Link>
              <Link href="/records" className={getLinkClass("/records")} onClick={closeMenu}>
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>Verified Records
              </Link>
            </nav>
          </div>
        </div>
        <div className="px-space-md py-space-md border-t border-surface-container-high">
          <form action={logout}>
            <button type="submit" className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-label-md text-label-md w-full text-error hover:bg-error-container/20 transition-all">
              <span className="material-symbols-outlined text-[20px]">logout</span>Logout
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
