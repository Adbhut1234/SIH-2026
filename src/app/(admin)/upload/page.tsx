'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `scans/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('land_records')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('land_records')
        .getPublicUrl(filePath);

      router.push(`/processing?url=${encodeURIComponent(publicUrl)}`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed! Please ensure you created a public Storage Bucket named "land_records" in Supabase.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-5xl mx-auto px-space-xl py-space-2xl flex flex-col gap-space-2xl">
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-sm items-center">
            <div className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg bg-secondary-container/30 text-on-secondary-container">
              <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-mono-data text-mono-data">1</div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-semibold text-on-secondary-container">Upload</span>
                <span className="font-label-sm text-label-sm text-secondary">Ingest dossier</span>
              </div>
              <span className="material-symbols-outlined ml-auto text-secondary text-[20px]">arrow_forward</span>
            </div>
            {/* Pending Steps... */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs mb-space-2xs">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Cadastral Intake Pipeline</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Upload document</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-2xs">Add a scanned land record to begin automated parsing and spatial validation.</p>
          </div>
        </div>

        <div 
          className="relative group cursor-pointer transition-all duration-300"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !file && fileInputRef.current?.click()}
        >
          <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-secondary-container/40 via-surface-container-high/60 to-secondary-container/20 blur-xl transition-all duration-500 pointer-events-none ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
          <div className="relative w-full rounded-2xl bg-surface-container-lowest p-space-3xl flex flex-col items-center justify-center text-center shadow-md transition-all duration-200" style={{boxShadow: 'inset 0 2px 4px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.03)'}}>
            <input accept=".pdf,.png,.jpg,.jpeg" className="hidden" type="file" ref={fileInputRef} onChange={handleFileChange} />
            
            <div className={`relative w-20 h-20 rounded-2xl ${file ? 'bg-secondary-container' : 'bg-surface-container-low'} flex items-center justify-center mb-space-lg transition-transform duration-300 group-hover:scale-105 shadow-sm`}>
              <span className={`material-symbols-outlined text-[42px] ${file ? 'text-secondary' : 'text-primary'}`}>{file ? 'task_alt' : 'document_scanner'}</span>
            </div>
            
            {!file ? (
              <>
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold mb-space-xs">
                  Drop a document here or <span className="text-secondary underline decoration-secondary/30 underline-offset-4">browse local files</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-xl">
                  Supported formats: PDF, JPG, PNG (cadastral blueprints up to 50MB)
                </p>
                <button className="flex items-center gap-space-sm px-space-xl py-space-md rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-95 shadow-md active:scale-98" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                  <span className="material-symbols-outlined text-[18px]">file_upload</span>
                  <span>Choose file</span>
                </button>
              </>
            ) : (
              <>
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold mb-space-xs">
                  {file.name}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-xl">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
                <div className="flex gap-space-md">
                  <button className="flex items-center gap-space-sm px-space-lg py-space-sm rounded-lg border border-outline-variant text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-low" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                    Remove
                  </button>
                  <button className="flex items-center gap-space-sm px-space-xl py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold shadow-md hover:opacity-95" onClick={(e) => { e.stopPropagation(); handleUpload(); }} disabled={isUploading}>
                    {isUploading ? <span className="material-symbols-outlined animate-spin">sync</span> : <span className="material-symbols-outlined">auto_awesome</span>}
                    <span>{isUploading ? 'Uploading...' : 'Extract Data'}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
