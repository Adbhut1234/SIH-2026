'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteRecordButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this verified record from the ledger?')) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/records?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete');
      }
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Error deleting record');
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="px-space-md py-space-sm rounded-lg bg-surface-container text-error font-label-md font-semibold hover:bg-error-container hover:text-on-error-container transition-colors flex items-center gap-space-xs shadow-sm disabled:opacity-50"
      title="Delete Record"
    >
      <span className="material-symbols-outlined text-[18px]">
        {isDeleting ? 'hourglass_empty' : 'delete'}
      </span>
    </button>
  );
}
