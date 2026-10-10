import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Plus,
  X,
  FileCheck,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface StudentDoc {
  id: string;
  name: string;
  category: 'Identity Proof' | 'Academic Marksheet' | 'Institutional Certificate' | 'Admission Records';
  uploadedAt: string;
  fileSize: string;
  verificationStatus: 'Verified' | 'Pending Verification';
}

const initialDocs: StudentDoc[] = [
  { id: 'doc-01', name: 'Government National Identity Card (Aadhaar).pdf', category: 'Identity Proof', uploadedAt: '2024-08-10', fileSize: '1.4 MB', verificationStatus: 'Verified' },
  { id: 'doc-02', name: 'Higher Secondary School Certificate (Class 12).pdf', category: 'Academic Marksheet', uploadedAt: '2024-08-10', fileSize: '2.1 MB', verificationStatus: 'Verified' },
  { id: 'doc-03', name: 'MHT-CET / JEE Main Official Score Card.pdf', category: 'Admission Records', uploadedAt: '2024-08-12', fileSize: '850 KB', verificationStatus: 'Verified' },
  { id: 'doc-04', name: 'VIT Provisional Admission Allotment Letter.pdf', category: 'Admission Records', uploadedAt: '2024-08-15', fileSize: '1.1 MB', verificationStatus: 'Verified' },
  { id: 'doc-05', name: 'Semester IV Official Grade Transcript.pdf', category: 'Institutional Certificate', uploadedAt: '2026-06-25', fileSize: '1.8 MB', verificationStatus: 'Verified' },
];

export default function StudentDocumentsPage() {
  const { addToast } = useToast();
  const [docs, setDocs] = useState<StudentDoc[]>(initialDocs);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<StudentDoc['category']>('Academic Marksheet');
  const [docName, setDocName] = useState('');

  const handleDownload = (name: string) => {
    addToast({
      title: 'Downloading Document',
      description: `Decrypted copy of ${name} downloaded successfully.`,
      type: 'info',
    });
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    const newDoc: StudentDoc = {
      id: `doc-${Date.now()}`,
      name: `${docName.trim()}.pdf`,
      category: uploadCategory,
      uploadedAt: new Date().toISOString().split('T')[0],
      fileSize: '1.5 MB',
      verificationStatus: 'Pending Verification',
    };

    setDocs((prev) => [newDoc, ...prev]);
    setIsUploadModalOpen(false);
    setDocName('');
    addToast({
      title: 'Document Uploaded',
      description: 'Submitted for verification by VIT Academic Registrar.',
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              Digital Twin Document Vault
            </span>
            <span className="text-xs text-[#6B756F]">Encrypted AES-256 Storage</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            My Academic Documents
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Verified institutional transcripts, identity documents, entrance exam records, and certificates.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-all flex items-center gap-2 cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-3xl border border-[#E5EBE7] shadow-card overflow-hidden">
        <div className="p-4 bg-slate-50/50 border-b border-[#E5EBE7]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#18221D]">
            Official Repository ({docs.length} Files)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F8F7] text-[#6B756F] uppercase text-[10px] font-bold border-b border-[#E5EBE7]">
              <tr>
                <th className="px-5 py-3">File Name & Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Upload Date</th>
                <th className="px-5 py-3">Verification Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBE7]">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#18221D]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#EFF9F3] text-[#36B875] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span>{doc.name}</span>
                        <span className="text-[10px] text-[#6B756F] block font-normal">{doc.fileSize}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#6B756F]">{doc.category}</td>
                  <td className="px-5 py-4 text-[#6B756F]">{doc.uploadedAt}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        doc.verificationStatus === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {doc.verificationStatus === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {doc.verificationStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleDownload(doc.name)}
                      className="px-3 py-1.5 rounded-xl border border-[#E5EBE7] hover:bg-slate-50 text-xs font-semibold text-[#18221D] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#36B875]" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl border border-[#E5EBE7] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EBE7]">
              <h3 className="text-base font-bold text-[#18221D]">Upload Academic Document</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#18221D] mb-1">Document Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e: any) => setUploadCategory(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs"
                >
                  <option value="Academic Marksheet">Academic Marksheet</option>
                  <option value="Identity Proof">Identity Proof</option>
                  <option value="Institutional Certificate">Institutional Certificate</option>
                  <option value="Admission Records">Admission Records</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#18221D] mb-1">Document Name / Label</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Migration Certificate"
                  required
                  className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs"
                />
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-[#B0E7CB] bg-[#EFF9F3]/40 p-6 rounded-2xl text-center">
                <Upload className="w-8 h-8 text-[#36B875] mx-auto mb-2" />
                <p className="font-semibold text-[#18221D]">Drag & drop file or browse</p>
                <p className="text-[10px] text-[#6B756F] mt-1">Supports PDF, JPG, PNG up to 15MB</p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint cursor-pointer"
                >
                  Upload & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
