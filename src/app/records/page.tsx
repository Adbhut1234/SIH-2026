import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function VerifiedRecordsPage() {
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

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      <div className="p-space-xl lg:p-space-2xl max-w-7xl mx-auto w-full space-y-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
          <div className="space-y-space-xs">
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">Verified Records</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Comprehensive ledger of all finalized and legally committed cadastral operations.
            </p>
          </div>
          <div className="px-space-md py-space-sm rounded-lg bg-surface-container-high border border-outline-variant flex items-center gap-space-md">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Total Registry Volume</span>
            <span className="font-headline-md text-headline-md font-bold text-on-surface">{records.length}</span>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] w-full bg-surface-container-lowest rounded-2xl shadow-sm text-center px-4">
            <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[40px] text-outline">inventory_2</span>
            </div>
            <h2 className="font-display-sm text-display-sm text-on-surface font-bold mb-2">Ledger Empty</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              No land records have been verified and saved to the registry yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
            {records.map((record) => (
              <div key={record.id} className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-surface-container flex flex-col justify-between h-full group">
                <div className="space-y-space-md">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-space-xs mb-space-2xs">
                        <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                        <span className="font-label-sm text-label-sm font-semibold text-primary uppercase tracking-wider">Blockchain Secured</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{record.document_type || 'Land Title Record'}</h3>
                    </div>
                    <span className="font-mono-data text-mono-data text-on-surface-variant text-sm px-2 py-1 rounded bg-surface-container-low border border-outline-variant">
                      KHS-{record.khasra_number || 'N/A'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-space-md pt-space-xs">
                    <div className="flex flex-col space-y-1 p-space-sm rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline">Owner (Grantor / Grantee)</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-semibold line-clamp-2">
                        {record.grantorName || record.grantor_name} ➔ {record.granteeName || record.grantee_name}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 p-space-sm rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline">Jurisdiction</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-semibold line-clamp-2">
                        {record.tehsil}, {record.district}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 p-space-sm rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline">Parcel Area</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                        {record.totalArea || record.total_area || 'N/A'}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 p-space-sm rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline">Registration Date</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                        {record.registrationDate || record.registration_date || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-space-lg pt-space-md border-t border-surface-container flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline">Ledger Timestamp</span>
                    <span className="font-mono-data text-mono-data text-on-surface-variant text-sm">
                      {new Date(record.created_at).toLocaleString()}
                    </span>
                  </div>
                  
                  {record.document_url ? (
                    <a 
                      href={record.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-space-md py-space-sm rounded-lg bg-secondary-container text-on-secondary-container font-label-md font-semibold hover:bg-secondary hover:text-on-secondary transition-colors flex items-center gap-space-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Download PDF
                    </a>
                  ) : (
                    <button disabled className="px-space-md py-space-sm rounded-lg bg-surface-container text-outline font-label-md font-semibold flex items-center gap-space-xs cursor-not-allowed">
                      <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
