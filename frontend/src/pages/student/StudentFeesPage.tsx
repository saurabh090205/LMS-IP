import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface FeeInstallment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Upcoming Due' | 'Overdue';
  receiptNo?: string;
  paymentMode?: string;
  paidOn?: string;
}

const feeStructure: FeeInstallment[] = [
  {
    id: 'fee-01',
    title: 'AY 2026-27 Academic Tuition Fee — Term 1',
    amount: 92500,
    dueDate: '2026-07-30',
    status: 'Paid',
    receiptNo: 'VIT-RCP-2026-09418',
    paymentMode: 'Net Banking (HDFC Bank)',
    paidOn: '2026-07-28',
  },
  {
    id: 'fee-02',
    title: 'AY 2026-27 AI Lab & Computing Cluster Levy',
    amount: 15000,
    dueDate: '2026-08-15',
    status: 'Paid',
    receiptNo: 'VIT-RCP-2026-10255',
    paymentMode: 'UPI Autopay',
    paidOn: '2026-08-12',
  },
  {
    id: 'fee-03',
    title: 'AY 2026-27 Academic Tuition Fee — Term 2 (Module VI)',
    amount: 92500,
    dueDate: '2026-12-15',
    status: 'Upcoming Due',
  },
];

export default function StudentFeesPage() {
  const { addToast } = useToast();
  const [isDemoPayModalOpen, setIsDemoPayModalOpen] = useState(false);

  const totalPaid = feeStructure.filter((f) => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const totalDue = feeStructure.filter((f) => f.status !== 'Paid').reduce((sum, f) => sum + f.amount, 0);

  const handleDownloadReceipt = (receiptNo?: string) => {
    addToast({
      title: 'Downloading Receipt',
      description: `Official digital receipt ${receiptNo} generated and downloaded.`,
      type: 'success',
    });
  };

  const handleMockPay = () => {
    setIsDemoPayModalOpen(false);
    addToast({
      title: 'Mock Payment Simulated',
      description: 'Demo transaction simulation successful. In production, institutional payment gateway is invoked.',
      type: 'info',
    });
  };

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              Finance & Bursar Office
            </span>
            <span className="text-xs text-[#6B756F]">VIT Student Accounts</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Fees & Payment Records
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Verified institutional tuition fee ledger, installment schedules, tax receipts, and payment history.
          </p>
        </div>

        <button
          onClick={() => setIsDemoPayModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-all flex items-center gap-2 cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span>Pay Term 2 Installment</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card">
          <span className="text-xs font-semibold text-[#6B756F]">Total Annual Tuition</span>
          <span className="text-2xl font-black text-[#18221D] block mt-1">₹ 2,00,000</span>
          <span className="text-xs text-[#6B756F] mt-1 block">AY 2026-27 Approved Fee</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card">
          <span className="text-xs font-semibold text-[#6B756F]">Settled / Paid Amount</span>
          <span className="text-2xl font-black text-[#18794E] block mt-1">₹ {totalPaid.toLocaleString('en-IN')}</span>
          <span className="text-xs text-emerald-700 mt-1 block flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Term 1 & AI Lab Settled
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card">
          <span className="text-xs font-semibold text-[#6B756F]">Outstanding Balance</span>
          <span className="text-2xl font-black text-amber-600 block mt-1">₹ {totalDue.toLocaleString('en-IN')}</span>
          <span className="text-xs text-[#6B756F] mt-1 block">Due on Dec 15, 2026</span>
        </div>
      </div>

      {/* Fee Installment Table */}
      <div className="bg-white rounded-3xl border border-[#E5EBE7] shadow-card overflow-hidden">
        <div className="p-4 bg-slate-50/50 border-b border-[#E5EBE7]">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#18221D]">
            AY 2026-27 Installment Ledger & Receipts
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F8F7] text-[#6B756F] uppercase text-[10px] font-bold border-b border-[#E5EBE7]">
              <tr>
                <th className="px-5 py-3">Installment Description</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Receipt / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBE7]">
              {feeStructure.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-bold text-[#18221D] block">{fee.title}</span>
                    {fee.paidOn && (
                      <span className="text-[10px] text-[#6B756F]">Paid via {fee.paymentMode} on {fee.paidOn}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 font-bold text-[#18221D]">
                    ₹ {fee.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-5 py-4 text-[#6B756F]">{fee.dueDate}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        fee.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {fee.receiptNo ? (
                      <button
                        onClick={() => handleDownloadReceipt(fee.receiptNo)}
                        className="px-3 py-1.5 rounded-xl border border-[#E5EBE7] hover:bg-slate-50 text-xs font-bold text-[#18221D] transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#36B875]" />
                        <span>Receipt</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsDemoPayModalOpen(true)}
                        className="px-3 py-1.5 rounded-xl bg-[#36B875] text-white text-xs font-bold hover:bg-[#239B5E] transition-colors cursor-pointer"
                      >
                        Pay Online
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DEMO PAYMENT MODAL */}
      {isDemoPayModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl border border-[#E5EBE7] shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E5EBE7]">
              <CreditCard className="w-5 h-5 text-[#36B875]" />
              <h3 className="text-base font-bold text-[#18221D]">Simulate Tuition Payment</h3>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              <strong>Notice:</strong> This is a client-side mock demonstration. No real financial credentials or payment gateways are queried.
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#E5EBE7]">
                <span className="text-[#6B756F]">Fee Component:</span>
                <span className="font-bold text-[#18221D]">Term 2 (Module VI)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5EBE7]">
                <span className="text-[#6B756F]">Amount Due:</span>
                <span className="font-bold text-[#18794E]">₹ 92,500</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5EBE7]">
                <span className="text-[#6B756F]">Payment Method:</span>
                <span className="font-bold text-[#18221D]">SBI / HDFC Institutional Gateway (Mock)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5EBE7] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDemoPayModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleMockPay}
                className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint cursor-pointer"
              >
                Confirm Simulated Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
