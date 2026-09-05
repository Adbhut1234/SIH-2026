'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get('url');
  const [progress, setProgress] = useState(15);
  const [extractionFailed, setExtractionFailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!fileUrl) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + Math.floor(Math.random() * 8) : prev));
    }, 500);

    const runExtraction = async () => {
      try {
        const res = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileUrl })
        });
        
        const json = await res.json();
        clearInterval(progressInterval);
        
        if (!res.ok) {
          throw new Error(json.error || 'Extraction failed');
        }

        setProgress(100);
        localStorage.setItem('extractedData', JSON.stringify(json.data));
        localStorage.setItem('documentUrl', fileUrl);
        localStorage.removeItem('recordCommitted'); // Reset approval state for new documents

        setTimeout(() => {
          router.push('/review');
        }, 800);
      } catch (err: any) {
        clearInterval(progressInterval);
        setExtractionFailed(true);
        setErrorMsg(err.message);
      }
    };

    runExtraction();
    
    return () => clearInterval(progressInterval);
  }, [fileUrl, router]);

  const isPdf = fileUrl ? (fileUrl.toLowerCase().includes('.pdf') || fileUrl.includes('/pdf')) : false;

  return (
    <div className="flex flex-col w-full">
      <div className="px-space-2xl py-space-xl max-w-7xl mx-auto w-full">
        {/* Breadcrumb & Context Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-2xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-mono-data text-mono-data text-outline">
            <span onClick={() => router.push('/')} className="flex items-center gap-space-2xs text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">folder_open</span>
              Documents
            </span>
            <span className="text-outline-variant font-normal">/</span>
            <span className="text-on-surface font-semibold flex items-center gap-space-2xs">
              <span className="material-symbols-outlined text-[16px] text-secondary">description</span>
              Uploaded_Record.pdf
            </span>
            <span className="text-outline-variant font-normal">/</span>
            <span className="text-secondary font-semibold bg-secondary-container/40 px-space-xs py-space-2xs rounded-sm">
              Processing
            </span>
          </nav>
          
          {/* Ledger Node Telemetry Indicator */}
          <div className="flex items-center gap-space-sm bg-surface-container-lowest shadow-sm px-space-md py-space-xs rounded-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-mono-data text-mono-data text-on-surface-variant font-medium">Cadastral AI Pipeline 4.8.2</span>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-space-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-md items-center">
            {/* Step 1: Upload (Complete) */}
            <div onClick={() => router.push('/upload')} className="flex items-center gap-space-md cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Step 01</span>
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">Upload</span>
              </div>
            </div>
            
            {/* Step 2: Extract (Active) */}
            <div className="flex items-center gap-space-md relative">
              <div className="w-8 h-8 rounded-full bg-primary-container text-secondary-container flex items-center justify-center font-label-md text-label-md shadow-sm relative">
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Active</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold truncate">Extract</span>
              </div>
            </div>

            {/* Step 3: Review (Pending) */}
            <div className="flex items-center gap-space-md opacity-45">
              <div className="w-8 h-8 rounded-full bg-surface-container text-outline flex items-center justify-center font-mono-data text-mono-data">
                03
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Pending</span>
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Processing Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-2xl shadow-sm relative overflow-hidden">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-md">Processing document</h1>
            
            <div className="bg-surface-container-low rounded-xl p-space-lg mb-space-xl shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Overall Extraction Progress</span>
                </div>
                <span className={`font-mono-data text-mono-data font-bold ${extractionFailed ? 'text-error' : 'text-on-surface'}`}>
                  {extractionFailed ? 'ERROR' : `${Math.min(progress, 100)}%`}
                </span>
              </div>
              <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden relative">
                <div className={`h-full transition-all duration-700 ease-out relative ${extractionFailed ? 'bg-error' : 'bg-primary-container'}`} style={{ width: `${Math.min(progress, 100)}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-container to-transparent opacity-40 animate-pulse"></div>
                </div>
              </div>
              {extractionFailed && (
                <p className="mt-space-sm text-error font-body-sm text-body-sm">{errorMsg}</p>
              )}
            </div>

            <div className="space-y-space-md mb-space-2xl">
              <div className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-lowest transition-all">
                <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Document received & validated</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Cryptographic SHA-256 integrity verified.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] transition-all">
                <div className="w-6 h-6 rounded-full bg-primary-container text-secondary-container flex items-center justify-center shrink-0 mt-0.5 animate-spin">
                  <span className="material-symbols-outlined text-[16px]">progress_activity</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Extracting fields with Gemini AI</h2>
                    <p className="font-body-sm text-body-sm text-on-surface font-medium">Resolving Khasra index numbers and parsing metes & bounds.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-space-lg bg-surface-container-high/40 rounded-xl mb-space-2xl flex items-start gap-space-md">
              <span className="material-symbols-outlined text-on-surface text-[22px] shrink-0 mt-0.5">info</span>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Extraction is analyzing cadastral boundaries. You will be automatically redirected to review once complete.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-space-xl">
            <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-space-lg">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-on-surface">document_scanner</span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Real-time Detection</span>
                </div>
              </div>
              <div className="relative w-full h-80 rounded-xl overflow-hidden bg-surface-container-low shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] flex items-center justify-center">
                {fileUrl ? (
                  isPdf ? (
                    <iframe src={fileUrl} className="w-full h-full border-0 bg-white" title="Document Preview" />
                  ) : (
                    <img src={fileUrl} className="w-full h-full object-contain filter contrast-125" alt="Document Preview" />
                  )
                ) : (
                  <div className="text-outline">No Preview</div>
                )}
                
                <div className="absolute inset-0 p-space-lg pointer-events-none flex flex-col justify-between">
                  <div className="w-48 h-36 mx-auto rounded-lg bg-surface-container-high/30 backdrop-blur-[2px] relative flex items-center justify-center mt-12">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-secondary shadow-[0_0_8px_currentColor] animate-bounce"></div>
                    <div className="font-mono-data text-mono-data text-on-surface bg-surface-container-lowest/90 px-space-sm py-space-2xs rounded shadow-sm">
                      Running OCR Engine
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-on-surface">Loading processing page...</div>}>
      <ProcessingContent />
    </Suspense>
  );
}
