'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [confirmedFields, setConfirmedFields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedData = localStorage.getItem('extractedData');
    const storedUrl = localStorage.getItem('documentUrl');
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
        <h2 className="font-display-sm text-display-sm text-on-surface font-bold mb-2">No Document Pending</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">
          There are no land records currently queued for review. Please upload a new document to begin the pipeline.
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
        <div className="font-label-lg text-on-surface">Loading extracted data...</div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: any, subfield?: string) => {
    if (subfield) {
      setData((prev: any) => ({
        ...prev,
        [field]: {
          ...(prev[field] || {}),
          [subfield]: value
        }
      }));
    } else {
      setData((prev: any) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSaveEdits = () => {
    localStorage.setItem('extractedData', JSON.stringify(data));
    setIsEditing(false);
  };

  const toggleConfirmField = (key: string) => {
    setConfirmedFields(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleEndorse = () => {
    localStorage.setItem('extractedData', JSON.stringify(data));
    router.push('/verify');
  };

  const isPdf = fileUrl.toLowerCase().includes('.pdf') || fileUrl.includes('/pdf');

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      {/* Progress Stepper Header */}
      <div className="w-full bg-surface-container-low px-space-xl py-space-md shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-space-md">
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-space-xs font-mono-data text-mono-data text-on-surface-variant">
            <span onClick={() => router.push('/')} className="hover:text-on-surface cursor-pointer transition-colors">Documents</span>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span className="font-semibold text-on-surface">Uploaded_Record.pdf</span>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span className="bg-surface-container-high px-space-xs py-0.5 rounded text-on-surface font-medium">Review Stage</span>
          </div>
          {/* Linear Process Indicator */}
          <div className="flex items-center gap-space-sm font-label-md text-label-md">
            <div onClick={() => router.push('/upload')} className="flex items-center gap-space-xs text-secondary font-semibold cursor-pointer">
              <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[12px] font-bold">✓</span>
              <span>Upload</span>
            </div>
            <span className="w-6 h-0.5 bg-secondary-container"></span>
            <div className="flex items-center gap-space-xs text-secondary font-semibold">
              <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[12px] font-bold">✓</span>
              <span>Extract</span>
            </div>
            <span className="w-6 h-0.5 bg-primary"></span>
            <div className="flex items-center gap-space-xs text-on-surface font-semibold bg-surface-container-lowest px-space-sm py-1 rounded-full shadow-sm">
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[11px] font-bold">3</span>
              <span>Review</span>
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
            </div>
            <span className="w-6 h-0.5 bg-surface-container-highest"></span>
            <div onClick={() => router.push('/verify')} className="flex items-center gap-space-xs text-outline cursor-pointer hover:text-on-surface">
              <span className="w-5 h-5 rounded-full bg-surface-container-high text-outline flex items-center justify-center text-[11px]">4</span>
              <span>Verify</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Action Strip */}
      <div className="w-full bg-surface px-space-xl py-space-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-space-md">
          <div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Review extracted fields</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
              Automated Gemini analysis completed. Verify and edit entries against the source document.
            </p>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button 
              onClick={() => isEditing ? handleSaveEdits() : setIsEditing(true)} 
              className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md shadow-sm transition-all flex items-center gap-space-xs ${
                isEditing ? 'bg-secondary text-on-secondary font-semibold' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
              }`} 
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">{isEditing ? 'check' : 'edit_note'}</span>
              {isEditing ? 'Save edits' : 'Edit fields'}
            </button>
            <button 
              onClick={() => router.push('/upload')} 
              className="px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-low transition-all flex items-center gap-space-xs" 
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">autorenew</span>
              Reprocess document
            </button>
            <button 
              onClick={handleEndorse} 
              className="px-space-xl py-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-[0_4px_12px_rgba(15,23,42,0.18)] hover:bg-primary-container hover:text-on-primary-fixed transition-all flex items-center gap-space-sm group" 
              type="button"
            >
              <span>Continue to verification</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-space-xl pb-space-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* LEFT: Extraction Pipeline */}
          <div className="lg:col-span-7 flex flex-col gap-space-xl">
            {/* Needs Attention */}
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Needs attention</h2>
                  <span className="px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">1 Flagged</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Requires human underwriter sign-off</span>
              </div>
              
              {/* Card 1: Survey Number */}
              <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Cadastral Reference</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">Survey number / Khasra PIN</span>
                    </div>
                    <div className={`flex items-center gap-1.5 px-space-sm py-1 rounded-md font-mono-data text-mono-data font-semibold ${
                      confirmedFields['khasra'] ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-fixed text-on-tertiary-fixed'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">{confirmedFields['khasra'] ? 'check_circle' : 'warning'}</span>
                      <span>{confirmedFields['khasra'] ? 'Verified' : 'Review required'}</span>
                    </div>
                  </div>
                  
                  <div className="bg-surface-container-low rounded-lg p-space-md flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-space-md w-full">
                      <span className="material-symbols-outlined text-outline text-[20px]">pin_drop</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={data.khasraNumber || ''} 
                          onChange={(e) => handleInputChange('khasraNumber', e.target.value)}
                          className="font-mono-data text-body-lg text-on-surface font-semibold w-full bg-surface px-3 py-1 rounded border border-outline focus:outline-none"
                        />
                      ) : (
                        <span className="font-mono-data text-body-lg text-on-surface font-semibold tracking-tight">{data.khasraNumber || 'N/A'}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-mono-data text-label-sm text-outline">Extracted by Gemini AI</span>
                    <div className="flex items-center gap-space-sm">
                      <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className="px-space-md py-1.5 rounded bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-colors" 
                        type="button"
                      >
                        {isEditing ? 'Cancel' : 'Edit'}
                      </button>
                      <button 
                        onClick={() => toggleConfirmField('khasra')} 
                        className={`px-space-md py-1.5 rounded font-label-md text-label-md font-semibold transition-colors ${
                          confirmedFields['khasra'] ? 'bg-surface-container-highest text-on-surface' : 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-fixed'
                        }`} 
                        type="button"
                      >
                        {confirmedFields['khasra'] ? 'Confirmed ✓' : 'Confirm'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Field Grid */}
            <div className="flex flex-col gap-space-sm">
              <div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.04)] overflow-hidden">
                <button 
                  className="w-full px-space-xl py-space-md flex items-center justify-between text-left hover:bg-surface-container-low transition-colors" 
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                  type="button"
                >
                  <div className="flex items-center gap-space-md">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Extracted Fields</h3>
                      <p className="font-body-sm text-body-sm text-secondary font-medium">Fields extracted by Gemini</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Automated pass</span>
                    <span className="material-symbols-outlined text-outline transition-transform duration-200" style={{ transform: isAccordionOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>expand_more</span>
                  </div>
                </button>
                
                {isAccordionOpen && (
                  <div className="px-space-xl pb-space-lg flex flex-col divide-y divide-surface-container-high/60">
                    {/* Document Type */}
                    <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col w-full">
                        <span className="font-label-sm text-label-sm text-outline">Document Type</span>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={data.documentType || ''} 
                            onChange={(e) => handleInputChange('documentType', e.target.value)}
                            className="font-headline-sm text-body-lg text-on-surface font-semibold bg-surface px-3 py-1 rounded border border-outline focus:outline-none mt-1"
                          />
                        ) : (
                          <span className="font-headline-sm text-body-lg text-on-surface font-semibold">{data.documentType || 'N/A'}</span>
                        )}
                      </div>
                    </div>

                    {/* Grantor / Grantee Owners */}
                    <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col w-full">
                        <span className="font-label-sm text-label-sm text-outline">Owner Name (Grantor / Grantee)</span>
                        {isEditing ? (
                          <div className="flex items-center gap-2 mt-1">
                            <input 
                              type="text" 
                              value={data.grantorName || ''} 
                              onChange={(e) => handleInputChange('grantorName', e.target.value)}
                              placeholder="Grantor"
                              className="font-headline-sm text-body-lg text-on-surface font-semibold w-1/2 bg-surface px-3 py-1 rounded border border-outline focus:outline-none"
                            />
                            <span>➔</span>
                            <input 
                              type="text" 
                              value={data.granteeName || ''} 
                              onChange={(e) => handleInputChange('granteeName', e.target.value)}
                              placeholder="Grantee"
                              className="font-headline-sm text-body-lg text-on-surface font-semibold w-1/2 bg-surface px-3 py-1 rounded border border-outline focus:outline-none"
                            />
                          </div>
                        ) : (
                          <span className="font-headline-sm text-body-lg text-on-surface font-semibold">{data.grantorName || 'N/A'} ➔ {data.granteeName || 'N/A'}</span>
                        )}
                      </div>
                    </div>

                    {/* Total Area */}
                    <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col w-full">
                        <span className="font-label-sm text-label-sm text-outline">Total Parcel Area</span>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={data.totalArea || ''} 
                            onChange={(e) => handleInputChange('totalArea', e.target.value)}
                            className="font-headline-sm text-body-lg text-on-surface font-semibold bg-surface px-3 py-1 rounded border border-outline focus:outline-none mt-1"
                          />
                        ) : (
                          <span className="font-headline-sm text-body-lg text-on-surface font-semibold">{data.totalArea || 'N/A'}</span>
                        )}
                      </div>
                    </div>

                    {/* Jurisdiction */}
                    <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col w-full">
                        <span className="font-label-sm text-label-sm text-outline">Jurisdiction (Tehsil, District)</span>
                        {isEditing ? (
                          <div className="flex items-center gap-2 mt-1">
                            <input 
                              type="text" 
                              value={data.tehsil || ''} 
                              onChange={(e) => handleInputChange('tehsil', e.target.value)}
                              placeholder="Tehsil"
                              className="font-headline-sm text-body-lg text-on-surface font-semibold w-1/2 bg-surface px-3 py-1 rounded border border-outline focus:outline-none"
                            />
                            <input 
                              type="text" 
                              value={data.district || ''} 
                              onChange={(e) => handleInputChange('district', e.target.value)}
                              placeholder="District"
                              className="font-headline-sm text-body-lg text-on-surface font-semibold w-1/2 bg-surface px-3 py-1 rounded border border-outline focus:outline-none"
                            />
                          </div>
                        ) : (
                          <span className="font-headline-sm text-body-lg text-on-surface font-semibold">{data.tehsil || 'N/A'}, {data.district || 'N/A'}</span>
                        )}
                      </div>
                    </div>

                    {/* Registration Date */}
                    <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col w-full">
                        <span className="font-label-sm text-label-sm text-outline">Registration Date</span>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={data.registrationDate || ''} 
                            onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                            className="font-headline-sm text-body-lg text-on-surface font-semibold bg-surface px-3 py-1 rounded border border-outline focus:outline-none mt-1"
                          />
                        ) : (
                          <span className="font-headline-sm text-body-lg text-on-surface font-semibold">{data.registrationDate || 'N/A'}</span>
                        )}
                      </div>
                    </div>

                    {/* Metes and Bounds */}
                    <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                      <div className="flex flex-col w-full">
                        <span className="font-label-sm text-label-sm text-outline">Metes and Bounds</span>
                        {isEditing ? (
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div>
                              <span className="text-xs text-outline">North:</span>
                              <input 
                                type="text" 
                                value={data.metesAndBounds?.north || ''} 
                                onChange={(e) => handleInputChange('metesAndBounds', e.target.value, 'north')}
                                className="w-full text-sm bg-surface p-1 rounded border border-outline"
                              />
                            </div>
                            <div>
                              <span className="text-xs text-outline">South:</span>
                              <input 
                                type="text" 
                                value={data.metesAndBounds?.south || ''} 
                                onChange={(e) => handleInputChange('metesAndBounds', e.target.value, 'south')}
                                className="w-full text-sm bg-surface p-1 rounded border border-outline"
                              />
                            </div>
                            <div>
                              <span className="text-xs text-outline">East:</span>
                              <input 
                                type="text" 
                                value={data.metesAndBounds?.east || ''} 
                                onChange={(e) => handleInputChange('metesAndBounds', e.target.value, 'east')}
                                className="w-full text-sm bg-surface p-1 rounded border border-outline"
                              />
                            </div>
                            <div>
                              <span className="text-xs text-outline">West:</span>
                              <input 
                                type="text" 
                                value={data.metesAndBounds?.west || ''} 
                                onChange={(e) => handleInputChange('metesAndBounds', e.target.value, 'west')}
                                className="w-full text-sm bg-surface p-1 rounded border border-outline"
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="font-headline-sm text-body-lg text-on-surface font-semibold text-sm leading-snug max-w-lg mt-1">
                            N: {data.metesAndBounds?.north || 'N/A'}, S: {data.metesAndBounds?.south || 'N/A'}<br/>
                            E: {data.metesAndBounds?.east || 'N/A'}, W: {data.metesAndBounds?.west || 'N/A'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Document Viewport */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-outline text-[18px]">picture_as_pdf</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">Document Inspection View</span>
              </div>
            </div>
            
            <div className="relative bg-surface-container-low rounded-xl shadow-inner p-space-xs overflow-hidden min-h-[580px] h-full flex flex-col items-center justify-center">
              {fileUrl ? (
                isPdf ? (
                  <iframe 
                    src={fileUrl} 
                    className="w-full h-full min-h-[600px] rounded-lg border-0 bg-white" 
                    title="Land Record PDF Preview"
                  />
                ) : (
                  <img 
                    src={fileUrl} 
                    className="w-full h-full object-contain filter contrast-125 rounded-lg" 
                    alt="Document Preview" 
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center text-outline gap-2 p-10 text-center">
                  <span className="material-symbols-outlined text-[48px]">description</span>
                  <span>No uploaded document preview available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 z-30 w-full bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(15,23,42,0.06)] px-space-xl py-space-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
              <span className="font-label-md text-label-md font-semibold text-on-surface">Pending endorsement</span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <button onClick={handleSaveEdits} className="px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-colors" type="button">
              Save changes
            </button>
            <button onClick={handleEndorse} className="px-space-xl py-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-md hover:bg-primary-container hover:text-on-primary-fixed transition-all flex items-center gap-space-xs" type="button">
              <span>Endorse & Verify</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
