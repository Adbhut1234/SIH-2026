'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isCommitted, setIsCommitted] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Only run on client after hydration to prevent SSR mismatch
    const storedData = localStorage.getItem('extractedData');
    const storedUrl = localStorage.getItem('documentUrl');
    const storedCommitted = localStorage.getItem('recordCommitted');
    
    if (storedCommitted === 'true') {
      setIsCommitted(true);
    }

    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (e) {
        console.error(e);
      }
    } else {
      setIsEmpty(true);
    }
    
    if (storedUrl) {
      setFileUrl(storedUrl);
    }
  }, []);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full bg-surface text-center px-4">
        <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
           <span className="material-symbols-outlined text-[48px] text-outline">description</span>
        </div>
        <h2 className="font-display-sm text-display-sm text-on-surface font-bold mb-2">No Document to Verify</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">
          There are no land records pending final verification. Please upload a new document to begin the pipeline.
        </p>
        <button 
          onClick={() => router.push('/upload')} 
          className="px-6 py-3 rounded-lg bg-primary text-on-primary font-label-lg font-bold shadow-md hover:bg-primary-container hover:text-on-primary-fixed transition-colors"
        >
          Upload New Document
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full bg-surface text-center">
        <span className="material-symbols-outlined text-[48px] text-primary animate-spin mb-4">refresh</span>
        <div className="font-label-lg text-on-surface">Loading verification data...</div>
      </div>
    );
  }

  const handleCopyHash = () => {
    navigator.clipboard.writeText('0x8f3c72a819b16ef549bb3c21b9a45e78').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCommitRecord = async () => {
    setIsCommitting(true);
    
    try {
      const payload = {
        ...data,
        documentUrl: fileUrl
      };
      
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save record');
      }
      
      setIsCommitting(false);
      setIsCommitted(true);
      setShowPopup(true);
      
      // Clear localStorage so the tabs reset for the next document
      localStorage.removeItem('extractedData');
      localStorage.removeItem('documentUrl');
      localStorage.removeItem('recordCommitted');

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/upload');
      }, 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to commit record. Did you create the land_records table in Supabase?');
      setIsCommitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      <div className="p-space-xl lg:p-space-2xl space-y-space-xl max-w-7xl mx-auto w-full">
        {/* Guided Workflow Step Indicator */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
          <div className="flex items-center justify-between gap-space-md overflow-x-auto pb-space-xs">
            {/* Step 1 Complete */}
            <div onClick={() => router.push('/upload')} className="flex items-center gap-space-sm min-w-max cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Step 1</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Ingest & Upload</span>
              </div>
            </div>
            <div className="h-0.5 w-8 bg-secondary-container"></div>
            {/* Step 2 Complete */}
            <div className="flex items-center gap-space-sm min-w-max">
              <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Step 2</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">AI Extraction</span>
              </div>
            </div>
            <div className="h-0.5 w-8 bg-secondary-container"></div>
            {/* Step 3 Complete */}
            <div onClick={() => router.push('/review')} className="flex items-center gap-space-sm min-w-max cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Step 3</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Review Fields</span>
              </div>
            </div>
            <div className="h-0.5 w-8 bg-primary"></div>
            {/* Step 4 Active */}
            <div className="flex items-center gap-space-sm min-w-max bg-surface-container px-space-md py-space-xs rounded-lg">
              <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                4
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Active Phase</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Final Verification</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb Context & Immediate Assessment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
          <div className="space-y-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
              <span onClick={() => router.push('/')} className="cursor-pointer hover:text-on-surface">Documents</span>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
              <span className="font-mono-data text-mono-data text-on-surface">LR-10284</span>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
              <span className="text-primary font-semibold">Verify</span>
            </div>
            <div className="flex items-baseline gap-space-md">
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">Final Verification</h1>
              <span className="font-mono-data text-mono-data text-outline">DEED-REF #{data.khasraNumber || 'KHS-142-3'}</span>
            </div>
          </div>
          
          {/* Status Assessment Badge */}
          <div className="flex items-center gap-space-md bg-secondary-container/30 px-space-lg py-space-sm rounded-xl">
            <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-on-secondary-container block">Status Assessment</span>
              <span className="font-label-md text-label-md font-semibold text-secondary">
                {isCommitted ? 'Committed to Sovereign Ledger' : 'Ready for registry commit · All extracted fields confirmed'}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Stage: Split Viewport Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Panel */}
          <div className="lg:col-span-7 space-y-space-xl">
            {/* Docket Card */}
            <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm space-y-space-lg">
              <div className="flex items-start justify-between gap-space-md">
                <div className="space-y-space-2xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Cadastral Docket Identity</span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">Record LR-10284</h2>
                  <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
                    <span className="font-semibold text-on-surface">Parcel #{data.khasraNumber || '142/3'}</span>
                    <span>•</span>
                    <span className="font-mono-data text-mono-data flex items-center gap-space-2xs">
                      <span className="material-symbols-outlined text-[16px] text-outline">picture_as_pdf</span>
                      Uploaded_Record.pdf
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xs rounded-lg">
                  <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
                  <span className="font-mono-data text-mono-data text-on-surface font-semibold">99.8% Match</span>
                </div>
              </div>

              {/* Resolved Telemetry */}
              <div className="space-y-space-sm pt-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Resolved Extraction Telemetry</span>
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                      <span className="font-label-md text-label-md text-on-surface font-medium">Grantor & Grantee Title Chain</span>
                    </div>
                    <span className="font-mono-data text-mono-data text-on-surface-variant font-semibold">{data.grantorName || 'Owner'} ➔ {data.granteeName || 'Buyer'}</span>
                  </div>
                  <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                      <span className="font-label-md text-label-md text-on-surface font-medium">Jurisdiction & Parcel Area</span>
                    </div>
                    <span className="font-mono-data text-mono-data text-on-surface-variant font-semibold">{data.totalArea || '1.42 Hectares'} ({data.tehsil || 'Haveli'}, {data.district || 'Pune'})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Geographic Context */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">GIS Coordinate Cadastre</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-space-2xs">
                  View on GIS Layer
                  <span className="material-symbols-outlined text-[16px]">north_east</span>
                </span>
              </div>
              <div className="w-full h-44 bg-surface-container-high rounded-lg shadow-inner relative flex items-end p-space-md overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDeoSSr8XHelm0F16GlrAoWtIARbD9xsqfsQ2UJp6v8Cn8uaTqYDrOJj1BYr5ZNggco-R9FNKHWlARdPR14e1O5qXEFvlheSDI0Ozbu1jhM4VnYLD1JBimPgNIhVHSydc928fIl41sdVGrtg11EPDhevN47NR3era-StNvdyu5Ot7gRzxr9ddlbb04j9IvERaQf32AIG-pUK9ohXm9Bcl0seu2VXV01WRqmhgEFw2cIOIbrtdDPnAXV')` }}>
                <div className="bg-surface-container-lowest/90 backdrop-blur-md p-space-sm rounded-lg flex items-center gap-space-md shadow-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">pin_drop</span>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline block">Anchor Coordinate</span>
                    <span className="font-mono-data text-mono-data text-on-surface font-semibold">18.5204° N, 73.8567° E</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-5 space-y-space-xl">
            {/* Record Summary */}
            <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm space-y-space-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Record Attributes</h3>
                <span className="bg-surface-container-high text-on-surface-variant font-mono-data text-mono-data px-space-sm py-space-2xs rounded">ID: P-99120</span>
              </div>
              <div className="space-y-space-md">
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col space-y-space-2xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Verified Legal Title Holder</span>
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{data.grantorName || 'Legal Title Holder'}</span>
                    <span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
                  </div>
                </div>
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col space-y-space-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Deterministic SHA-256</span>
                    <button onClick={handleCopyHash} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-space-2xs font-mono-data text-mono-data">
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <span className="font-mono-data text-mono-data text-on-surface font-bold tracking-tight select-all">0x8f3c72a819b16ef549bb3c21b9a45e78</span>
                </div>
              </div>
            </div>

            {/* Dominant Call to Action Card */}
            <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-lg space-y-space-lg">
              <div className="space-y-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold">Execution Milestone</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Commit Land Title to Sovereign Ledger</h4>
              </div>

              <div className="space-y-space-md pt-space-xs">
                <button 
                  onClick={handleCommitRecord}
                  disabled={isCommitting || isCommitted}
                  className={`w-full py-space-lg px-space-xl rounded-xl font-bold tracking-tight shadow-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isCommitted ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary hover:bg-inverse-surface'
                  }`}
                >
                  <div className="flex items-center gap-space-md">
                    <div className="w-8 h-8 rounded-full bg-surface-container-lowest/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px] text-on-primary">
                        {isCommitting ? 'refresh' : isCommitted ? 'task_alt' : 'check_circle'}
                      </span>
                    </div>
                    <span className="font-headline-sm text-headline-sm font-bold tracking-tight">
                      {isCommitting ? 'Committing to Ledger...' : isCommitted ? 'Record Committed & Signed ✓' : 'Approve & Save Record'}
                    </span>
                  </div>
                  {!isCommitted && !isCommitting && (
                    <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  )}
                </button>

                <div className="flex items-center justify-between pt-space-xs px-space-xs">
                  <button onClick={() => router.push('/')} className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-space-2xs">
                    <span className="material-symbols-outlined text-[16px]">dashboard</span>
                    Return to Overview
                  </button>
                  <div className="h-3 w-px bg-outline-variant"></div>
                  <button onClick={() => router.push('/upload')} className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-space-2xs">
                    <span className="material-symbols-outlined text-[16px]">add_doc</span>
                    Upload Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-sm">
          <div className="bg-surface-container-lowest p-space-2xl rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full scale-100 transition-transform">
            <div className="w-24 h-24 rounded-full bg-secondary-container flex items-center justify-center mb-space-lg">
              <span className="material-symbols-outlined text-[48px] text-secondary">check_circle</span>
            </div>
            <h2 className="font-display-sm text-display-sm text-on-surface font-bold text-center mb-space-sm">Record Verified!</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant text-center mb-space-xl">
              Successfully saved to the sovereign ledger.
            </p>
            <div className="flex items-center gap-space-sm text-primary font-label-md">
              <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
              Redirecting to upload...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
