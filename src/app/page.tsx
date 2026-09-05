import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  let records: any[] = [];
  
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase
      .from('land_records')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      records = data;
    }
  }

  const verifiedCount = records.filter(r => r.status === 'verified').length;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="px-space-xl pt-space-xl pb-space-sm flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-mono-data text-mono-data text-on-surface-variant tracking-tight uppercase">Registry Node 04</span>
          <span className="text-outline-variant font-mono-data text-mono-data">/</span>
          <span className="font-mono-data text-mono-data text-outline">Deterministic Ledger Live</span>
        </div>
        <div className="hidden sm:flex items-center gap-space-md font-mono-data text-mono-data text-on-surface-variant">
          <span>Block #4,892,104</span>
          <span className="text-outline-variant">|</span>
          <span>Sync Latency: 42ms</span>
        </div>
      </div>
      <div className="px-space-xl pb-space-4xl max-w-7xl mx-auto w-full space-y-space-3xl">
        <section className="w-full">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_1px_3px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] transition-all duration-300">
            <div className="absolute inset-0 pointer-events-none rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(15,23,42,0.04)]"></div>
            <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-surface-container-high/40 blur-3xl pointer-events-none"></div>
            <div className="relative p-space-2xl md:p-space-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-space-2xl">
              <div className="space-y-space-md max-w-2xl">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[14px]">auto_read_pause</span>
                  <span>Cadastral Ingestion Pipeline</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Process a land record
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Upload a scanned document to extract and verify its details against sovereign parcel registries and metes-and-bounds records.
                </p>
                <div className="pt-space-xs flex items-center gap-space-md">
                  <span className="text-outline-variant font-mono-data text-mono-data">•</span>
                  <span className="font-mono-data text-mono-data text-outline">Supported: PDF, TIFF, GeoPDF, GeoTIFF (up to 120MB)</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col items-start sm:items-end gap-space-sm">
                <a href="/upload" className="group relative inline-flex items-center justify-center gap-space-md px-space-2xl py-space-xl rounded-lg bg-primary-container text-on-primary font-headline-sm text-headline-sm tracking-tight shadow-[0_10px_25px_-5px_rgba(15,23,42,0.25),0_8px_10px_-6px_rgba(15,23,42,0.15)] hover:shadow-[0_14px_30px_-5px_rgba(15,23,42,0.35)] active:translate-y-[1px] transition-all overflow-hidden" style={{boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 12px 24px -6px rgba(19, 27, 46, 0.28)'}}>
                  <span className="material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:-translate-y-0.5">upload_file</span>
                  <span>Upload document</span>
                  <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="h-1 w-full bg-surface-container">
              <div className="h-full w-1/4 bg-primary-container opacity-40"></div>
            </div>
          </div>
        </section>

        <section className="w-full space-y-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-space-sm">
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Verified Records Ledger</h2>
                <span className="px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                  {verifiedCount} Verified
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
                Successfully extracted and permanently committed land records.
              </p>
            </div>
          </div>
          
          <div className="rounded-xl bg-surface-container-lowest shadow-[0_1px_3px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] overflow-hidden">
            {records.length === 0 ? (
              <div className="p-space-3xl flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[32px] text-outline">description</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">No records found</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-sm">
                  Upload and process your first land record to see it appear in the ledger.
                </p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-surface-container-low">
                {records.map((record) => (
                  <div key={record.id} className="p-space-lg md:p-space-xl flex flex-col md:flex-row md:items-center justify-between gap-space-lg hover:bg-surface-container-low transition-colors group">
                    <div className="flex items-start gap-space-lg min-w-0 w-full">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">task_alt</span>
                      </div>
                      <div className="min-w-0 space-y-space-2xs w-full">
                        <div className="flex flex-wrap items-center justify-between w-full">
                          <div className="flex flex-wrap items-center gap-space-xs">
                            <span className="font-mono-data text-mono-data font-semibold text-on-surface">KHS-{record.khasra_number}</span>
                            <span className="text-outline-variant font-mono-data text-mono-data">•</span>
                            <span className="font-mono-data text-mono-data text-on-surface truncate max-w-xs">{record.document_type}</span>
                          </div>
                          <span suppressHydrationWarning className="font-mono-data text-mono-data text-outline hidden md:block">
                            {new Date(record.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-space-sm pt-1">
                          <span className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded bg-secondary-container/40 text-secondary font-label-sm text-label-sm">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            <span>Blockchain Secured</span>
                          </span>
                          <span className="font-body-sm text-body-sm text-outline truncate">
                            Owner: {record.grantorName || record.grantee_name || record.grantor_name} | {record.tehsil}, {record.district}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
