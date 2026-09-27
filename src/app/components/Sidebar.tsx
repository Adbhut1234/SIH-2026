'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/login/actions';

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    const baseClass = "flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-all";
    return isActive
      ? `${baseClass} bg-primary text-on-primary font-bold shadow-md`
      : `${baseClass} text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface`;
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col">
        <div className="h-16 px-space-xl flex items-center gap-space-md bg-surface-container-low">
          <Link href="/dashboard">
            <img src="/logo.svg" alt="TerraVerify Logo" className="h-7 w-auto" />
          </Link>
        </div>
        
        <div className="px-space-md py-space-sm">
          <p className="px-space-md pt-space-md pb-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">Cadastral Operations</p>
          <nav className="space-y-space-2xs">
            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
              <span className="material-symbols-outlined text-[20px]">dashboard</span>Overview
            </Link>
            <Link href="/upload" className={getLinkClass("/upload")}>
              <span className="material-symbols-outlined text-[20px]">description</span>Upload Document
            </Link>
            <Link href="/review" className={getLinkClass("/review")}>
              <span className="material-symbols-outlined text-[20px]">rate_review</span>Review & Extract
            </Link>
            <Link href="/verify" className={getLinkClass("/verify")}>
              <span className="material-symbols-outlined text-[20px]">verified_user</span>Verification & Save
            </Link>
            <Link href="/records" className={getLinkClass("/records")}>
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
  );
}
