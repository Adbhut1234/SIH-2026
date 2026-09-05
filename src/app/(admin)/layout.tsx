import Sidebar from "@/app/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="pl-64">
        <header className="fixed top-0 left-64 right-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="h-16 w-full px-space-xl flex items-center justify-between">
            <div className="flex items-center gap-space-md">
              <img src="/logo.svg" alt="TerraVerify Logo" className="h-6 w-auto" />
              <span className="font-label-md text-label-md text-on-surface-variant font-medium tracking-wide uppercase px-2 py-0.5 bg-surface-container-high rounded border border-outline-variant/30">Enterprise</span>
            </div>
          </div>
        </header>
        
        <main className="w-full pt-16 bg-surface">
          {children}
        </main>
      </div>
    </>
  );
}
